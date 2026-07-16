#!/usr/bin/env node

/**
 * Generate beautifully formatted thesis/strategic-document PDFs.
 * Designed for long-form sovereign briefing documents with section headers,
 * running page numbers, blockquotes, and proper H1/H2/H3/H4 hierarchy.
 *
 * Uses the shared visual primitives in scripts/document-css.mjs at the
 * "thesis" register — dense, justified, prose-first — so kickers, pull quotes,
 * stat rows, comparison blocks, figures, and diagrams render consistently
 * between this document and the companion reading deck.
 *
 * Usage:
 *   node scripts/thesis-to-pdf.mjs private/letters/zimbabwe-thesis-armor.md
 */

import { readFileSync, mkdirSync } from 'fs';
import { join, resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';
import { getSharedCSS, inlineAssets, groupSectionHeads, markWideTables } from './document-css.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'pdfs');

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
  // Fonts are inlined (base64) by getSharedCSS — no network fetch at render time.
  // The old Google Fonts <link> made a confidential build depend on the internet,
  // and silently substituted faces whenever it failed.
  const docTitle = [data.title, data.subtitle].filter(Boolean).join(': ') || 'Document';
  const shortTitle = data.title || 'Document';

  const parts = [];
  parts.push('<!DOCTYPE html>');
  parts.push('<html lang="en">');
  parts.push('<head>');
  parts.push('<meta charset="utf-8">');
  parts.push('<title>' + escapeHtml(docTitle) + '</title>');
  parts.push('<style>' + getSharedCSS({ register: 'thesis' }) + '</style>');
  if (data.flow === 'continuous') {
    // Short client documents: sections flow instead of each opening a fresh page.
    parts.push('<style>.section-head, article h1 { page-break-before: auto !important; break-before: auto !important; margin-top: 44px; }</style>');
  }
  parts.push('</head>');
  parts.push('<body>');

  // Document header
  parts.push('<div class="doc-header">');
  parts.push('<div class="company-name">' + escapeHtml(data.company || 'Aquila Space Technologies Pty Ltd') + '</div>');
  if (data.classification) {
    parts.push('<div class="classification">' + escapeHtml(data.classification) + '</div>');
  }
  parts.push('<div class="meta-table">');
  const metaFields = [
    ['date', 'Date'],
    ['prepared_for', 'For'],
    ['from', 'From'],
  ];
  for (const [key, label] of metaFields) {
    if (data[key]) {
      parts.push(
        '<div class="meta-row"><span class="label">' + label + '</span> ' +
        '<span class="value">' + escapeHtml(data[key]) + '</span></div>'
      );
    }
  }
  parts.push('</div>');
  parts.push('</div>');

  // Title block
  if (data.title) {
    parts.push('<div class="document-title">' + escapeHtml(data.title) + '</div>');
  }
  if (data.subtitle) {
    parts.push('<div class="document-subtitle">' + escapeHtml(data.subtitle) + '</div>');
  }
  if (data.title || data.subtitle) {
    parts.push('<hr style="border:none;border-top:0.75pt solid #ddd;margin:28px 0 32px;">');
  }

  parts.push('<article>' + bodyHtml + '</article>');
  parts.push('</body>');
  parts.push('</html>');
  return { html: parts.join('\n'), shortTitle };
}

async function generatePDF(htmlContent, outputPath, shortTitle, footerText, numberPages = true) {
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
      padding: 0 88px;
      font-size: 8pt;
      color: #bbb;
      font-family: -apple-system, Helvetica, Arial, sans-serif;
    ">
      <span style="font-size:7pt;font-family:-apple-system,Helvetica,Arial,sans-serif;font-style:normal;letter-spacing:0.5px;text-transform:uppercase;color:#ccc;">
        ${footerText}
      </span>
      ${numberPages ? '<span class="pageNumber"></span>' : '<span></span>'}
    </div>`;

  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '2.2cm', bottom: '2.0cm', left: '0', right: '0' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate,
    printBackground: true,
    preferCSSPageSize: false,
  });

  await browser.close();
}

// Strip Obsidian vault syntax before rendering. Three forms leak from vault
// notes: the auto-generated "## Related" autolinks block, trailing bare
// wiki-link lists, and inline [[target|label]] references. Generated PDFs
// must carry none of them.
function stripWikiSyntax(content) {
  let out = content.replace(/\n*## Related\n<!-- autolinks -->\n[\s\S]*?<!-- \/autolinks -->\n*/g, '\n');
  out = out.replace(/(?:\n[ \t]*-[ \t]*\[\[[^\]\n]+\]\][ \t]*)+\n*$/, '\n');
  out = out.replace(/\[\[([^\]|\n]+)\|([^\]\n]+)\]\]/g, '$2');
  out = out.replace(/\[\[([^\]\n]+)\]\]/g, '$1');
  return out;
}

async function main() {
  const filepath = process.argv[2];
  if (!filepath) {
    console.error('\n  Usage: node scripts/thesis-to-pdf.mjs <path-to-markdown>\n');
    process.exit(1);
  }

  const absPath = resolve(ROOT, filepath);
  const raw = readFileSync(absPath, 'utf-8');
  const { data, content } = parseFrontmatter(raw);

  // Vault furniture: autolinks blocks, trailing wiki-link lists, and inline
  // [[...]] references feed the knowledge graph, not the reader.
  const body = stripWikiSyntax(content);

  let bodyHtml = marked.parse(body);
  bodyHtml = groupSectionHeads(bodyHtml);
  bodyHtml = markWideTables(bodyHtml);
  bodyHtml = inlineAssets(bodyHtml, ROOT);

  const { html, shortTitle } = buildHTML(data, bodyHtml);

  // Output: `--out <dir>` wins (callers that own a directory tree, e.g. dossier-package),
  // else route by source: private/<dir>/... -> pdfs/<dir>/
  const outIdx = process.argv.indexOf('--out');
  const explicitOut = outIdx !== -1 ? process.argv[outIdx + 1] : null;
  const seg = resolve(filepath).includes('/private/')
    ? resolve(filepath).split('/private/')[1].split('/')[0]
    : null;
  const outDir = explicitOut ? resolve(explicitOut)
                             : (seg ? join(ROOT, 'pdfs', seg) : OUTPUT_DIR);
  mkdirSync(outDir, { recursive: true });
  const slug = basename(filepath, '.md');
  // `--name "Nice Name"` renames the artefact (deliverables want human names, not slugs)
  const nameIdx = process.argv.indexOf('--name');
  const outName = nameIdx !== -1 ? process.argv[nameIdx + 1] : slug;
  const out = join(outDir, outName + '.pdf');

  process.stdout.write('\n  > ' + slug + ' ... ');
  const footerText = escapeHtml(data.footer || (data.company ? 'Confidential · ' + data.company : 'Confidential · Aquila Global Infrastructure'));
  // --no-page-numbers: this component is destined for a bound volume, which stamps its
  // own CONTINUOUS numbering after merge. Baked-in per-document numbers restart at 1 in
  // the middle of a volume and make every page reference in the contents wrong.
  const numberPages = !process.argv.includes('--no-page-numbers');
  await generatePDF(html, out, shortTitle, footerText, numberPages);
  console.log('done');
  console.log('  ' + out + '\n');
}

main().catch((err) => { console.error(err); process.exit(1); });
