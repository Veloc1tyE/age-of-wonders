#!/usr/bin/env node

/**
 * Generate reading-deck PDFs (Spear register).
 *
 * A reading deck is a presentation-style document: cover page, page-break
 * per section, larger active headings, and generous use of visual primitives
 * (kickers, pull quotes, stat rows, figures, diagrams). Designed for
 * principal-level reading in a single sitting.
 *
 * Usage:
 *   node scripts/deck-to-pdf.mjs private/letters/zimbabwe-thesis-spear.md
 */

import { readFileSync, mkdirSync } from 'fs';
import { join, resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';
import { getSharedCSS, inlineAssets, groupSectionHeads } from './document-css.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'pdfs');
const LOGO_PATH = join(ROOT, 'public/images/aquila-logo-black.png');
const FLAG_PATH = join(ROOT, 'public/images/zimbabwe-flag.png');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (/^['"].*['"]$/.test(value)) value = value.slice(1, -1);
    data[kv[1]] = value;
  }
  return { data, content: match[2] };
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHTML(data, bodyHtml) {
  const fontsUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap';
  const docTitle = [data.title, data.subtitle].filter(Boolean).join(' — ') || 'Document';

  // Embed logo as base64 data URI
  let logoDataUri = '';
  try {
    const logoBuffer = readFileSync(LOGO_PATH);
    logoDataUri = 'data:image/png;base64,' + logoBuffer.toString('base64');
  } catch (_) { /* logo not found — skip */ }

  // Embed flag as base64 data URI
  let flagDataUri = '';
  try {
    const flagBuffer = readFileSync(FLAG_PATH);
    flagDataUri = 'data:image/png;base64,' + flagBuffer.toString('base64');
  } catch (_) { /* flag not found — skip */ }

  const parts = [];
  parts.push('<!DOCTYPE html>');
  parts.push('<html lang="en">');
  parts.push('<head>');
  parts.push('<meta charset="utf-8">');
  parts.push('<title>' + escapeHtml(docTitle) + '</title>');
  parts.push('<link rel="preconnect" href="https://fonts.googleapis.com">');
  parts.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
  parts.push('<link href="' + fontsUrl + '" rel="stylesheet">');
  parts.push('<style>' + getSharedCSS({ register: 'deck' }) + '</style>');
  parts.push('</head>');
  parts.push('<body>');

  // Cover page
  parts.push('<div class="cover">');

  // TOP ROW: logo left, flag right — symmetric letterhead
  parts.push('<div style="display:flex;justify-content:space-between;align-items:flex-start;">');
  if (logoDataUri) {
    parts.push('  <img src="' + logoDataUri + '" alt="Aquila" style="height:56px;width:auto;display:block;">');
  } else {
    parts.push('  <div></div>');
  }
  if (flagDataUri) {
    parts.push('  <img src="' + flagDataUri + '" alt="Zimbabwe" style="height:38px;width:auto;display:block;border-radius:2px;box-shadow:0 1px 6px rgba(0,0,0,0.15);">');
  }
  parts.push('</div>');

  // TITLE BLOCK — centre of gravity
  parts.push('<div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:64px 0 48px;">');
  if (data.title) {
    parts.push('  <div class="title">' + escapeHtml(data.title) + '</div>');
  }
  if (data.subtitle) {
    parts.push('  <div class="subtitle">' + escapeHtml(data.subtitle) + '</div>');
  }
  parts.push('</div>');

  // FOOT: separator line, then stacked meta
  parts.push('<div class="foot">');
  parts.push('  <div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:13pt;letter-spacing:0.3px;color:#1A1A1A;margin-bottom:4px;">Aquila Space Technologies Pty Ltd</div>');
  if (data.address) {
    parts.push('  <div style="font-family:\'Inter\',sans-serif;font-size:8pt;color:#999;margin-bottom:20px;letter-spacing:0.1px;">' + escapeHtml(data.address) + '</div>');
  }
  // Stacked KV rows
  const metaFields = [
    ['date', 'Date'],
    ['prepared_for', 'Addressed to'],
    ['from', 'From'],
  ];
  for (const [key, label] of metaFields) {
    if (data[key]) {
      parts.push(
        '  <div style="display:flex;gap:0;margin-bottom:5px;">' +
        '<span style="font-family:\'Inter\',sans-serif;font-size:7pt;letter-spacing:0.6px;text-transform:uppercase;color:#aaa;min-width:90px;padding-top:1px;">' + label + '</span>' +
        '<span style="font-family:\'Inter\',sans-serif;font-size:9pt;color:#333;line-height:1.5;">' + escapeHtml(data[key]) + '</span>' +
        '</div>'
      );
    }
  }
  // Classification tag bottom-right
  if (data.classification) {
    parts.push('  <div style="margin-top:20px;font-family:\'Inter\',sans-serif;font-size:7pt;letter-spacing:0.7px;text-transform:uppercase;color:#bbb;">' + escapeHtml(data.classification) + '</div>');
  }
  parts.push('</div>');

  parts.push('</div>');
  parts.push('</div>');

  parts.push('<article>' + bodyHtml + '</article>');
  parts.push('</body>');
  parts.push('</html>');
  return parts.join('\n');
}

async function generatePDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  const footerTemplate = `
    <div style="
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 100px;
      font-size: 8pt;
      color: #bbb;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-style: italic;
    ">
      <span style="font-size:7pt;font-family:Inter,sans-serif;font-style:normal;letter-spacing:0.5px;text-transform:uppercase;color:#ccc;">
        Aquila | NextEra
      </span>
      <span class="pageNumber"></span>
    </div>`;

  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '2.0cm', bottom: '2.0cm', left: '0', right: '0' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate,
    printBackground: true,
    preferCSSPageSize: false,
  });

  await browser.close();
}

async function main() {
  const filepath = process.argv[2];
  if (!filepath) {
    console.error('\n  Usage: node scripts/deck-to-pdf.mjs <path-to-markdown>\n');
    process.exit(1);
  }

  const absPath = resolve(ROOT, filepath);
  const raw = readFileSync(absPath, 'utf-8');
  const { data, content } = parseFrontmatter(raw);

  // Allow raw HTML in markdown; marked does this by default.
  let bodyHtml = marked.parse(content);
  bodyHtml = groupSectionHeads(bodyHtml);
  bodyHtml = inlineAssets(bodyHtml, ROOT);

  const html = buildHTML(data, bodyHtml);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  const slug = basename(filepath, '.md');
  const out = join(OUTPUT_DIR, slug + '.pdf');

  process.stdout.write('\n  > ' + slug + ' (deck) ... ');
  await generatePDF(html, out);
  console.log('done');
  console.log('  ' + out + '\n');
}

main().catch((err) => { console.error(err); process.exit(1); });
