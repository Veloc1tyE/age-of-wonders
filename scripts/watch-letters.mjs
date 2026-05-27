#!/usr/bin/env node

/**
 * Watch private/letters/ and regenerate PDFs on save.
 *
 * Usage:
 *   node scripts/watch-letters.mjs
 */

import { watch } from 'fs';
import { resolve, basename, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const LETTERS_DIR = join(ROOT, 'private', 'letters');
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

function getCSS() {
  return `
@page { size: A4; margin: 1.8cm 0 1.5cm 0; }
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 10.5pt;
  line-height: 1.85;
  color: #222;
  padding: 48px 80px 48px;
  -webkit-font-smoothing: antialiased;
}

.letter-header {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1.5pt solid #222;
}

.company-name {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 22pt;
  font-weight: 500;
  color: #111;
  letter-spacing: -0.3px;
  margin-bottom: 12px;
}

.classification {
  font-size: 8.5pt;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #999;
  margin-bottom: 28px;
}

.meta-table {
  font-size: 9.5pt;
  line-height: 1.8;
  color: #555;
}

.meta-table .label {
  font-weight: 500;
  color: #888;
  text-transform: uppercase;
  font-size: 8pt;
  letter-spacing: 0.8px;
  width: 60px;
  display: inline-block;
  vertical-align: top;
}

.meta-table .value {
  color: #333;
}

.meta-row {
  margin-bottom: 6px;
}

.document-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 28pt;
  font-weight: 400;
  line-height: 1.15;
  color: #111;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}

.document-subtitle {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 16pt;
  font-weight: 300;
  font-style: italic;
  color: #666;
  margin-bottom: 32px;
}

article h2 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 17pt;
  font-weight: 500;
  color: #111;
  margin-top: 36px;
  margin-bottom: 14px;
  line-height: 1.25;
  page-break-before: always;
  page-break-after: avoid;
}

article h2:first-child {
  page-break-before: avoid;
}

article h3 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 13pt;
  font-weight: 500;
  color: #1a1a1a;
  margin-top: 28px;
  margin-bottom: 10px;
  line-height: 1.35;
  page-break-after: avoid;
}

article p { margin-bottom: 16px; orphans: 3; widows: 3; }
article a { color: #444; text-decoration: none; border-bottom: 0.5px solid #ccc; }
article strong { font-weight: 500; color: #1a1a1a; }

article ul, article ol { margin: 14px 0; padding-left: 26px; }
article li { margin-bottom: 5px; }

article hr {
  border: none;
  border-top: 0.5pt solid #ddd;
  margin: 32px 0;
}

article blockquote {
  margin: 24px 0;
  padding: 0 0 0 22px;
  border-left: 2px solid #ddd;
  color: #555;
  font-style: italic;
}

.signature {
  margin-top: 8px;
}

article table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0 24px;
  font-size: 9.5pt;
  line-height: 1.6;
  page-break-inside: avoid;
}

article thead th {
  font-weight: 500;
  color: #111;
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1.5pt solid #222;
  font-size: 8.5pt;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

article tbody td {
  padding: 7px 12px;
  border-bottom: 0.5pt solid #e8e8e8;
  color: #333;
  vertical-align: top;
}

article tbody tr:last-child td {
  border-bottom: 1pt solid #ccc;
}

article tbody td strong {
  font-weight: 500;
  color: #111;
}

h2, h3 { page-break-after: avoid; }
p { orphans: 3; widows: 3; }
`;
}

function buildHTML(data, bodyHtml) {
  const fontsUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap';
  const parts = [];
  parts.push('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">');
  parts.push('<link rel="preconnect" href="https://fonts.googleapis.com">');
  parts.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
  parts.push('<link href="' + fontsUrl + '" rel="stylesheet">');
  parts.push('<style>' + getCSS() + '</style></head><body>');
  parts.push('<div class="letter-header">');
  parts.push('<div class="company-name">Aquila Space Technologies Pty Ltd</div>');
  if (data.classification) parts.push('<div class="classification">' + escapeHtml(data.classification) + '</div>');
  parts.push('<div class="meta-table">');
  if (data.date) parts.push('<div class="meta-row"><span class="label">Date</span> <span class="value">' + escapeHtml(data.date) + '</span></div>');
  if (data.to) parts.push('<div class="meta-row"><span class="label">To</span> <span class="value">' + escapeHtml(data.to) + '</span></div>');
  if (data.from) parts.push('<div class="meta-row"><span class="label">From</span> <span class="value">' + escapeHtml(data.from) + '</span></div>');
  parts.push('</div></div>');
  if (data.title) parts.push('<div class="document-title">' + escapeHtml(data.title) + '</div>');
  if (data.subtitle) parts.push('<div class="document-subtitle">' + escapeHtml(data.subtitle) + '</div>');
  parts.push('<article>' + bodyHtml + '</article></body></html>');
  return parts.join('\n');
}

async function generatePDF(mdPath) {
  const slug = basename(mdPath, '.md');
  const outPath = join(OUTPUT_DIR, slug + '.pdf');
  const raw = readFileSync(mdPath, 'utf-8');
  const { data, content } = parseFrontmatter(raw);
  const bodyHtml = marked.parse(content);
  const html = buildHTML(data, bodyHtml);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  const tmpHtml = join(OUTPUT_DIR, '_tmp_letter.html');
  writeFileSync(tmpHtml, html);

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file://' + tmpHtml, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: outPath,
    format: 'A4',
    margin: { top: '1.8cm', bottom: '1.5cm', left: '0', right: '0' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;text-align:center;font-size:8px;color:#ccc;"><span class="pageNumber"></span></div>',
    printBackground: true,
    preferCSSPageSize: false,
  });
  await browser.close();
  try { unlinkSync(tmpHtml); } catch {}

  return outPath;
}

// Debounce: wait 400ms after last change before regenerating
const timers = new Map();

function onFileChange(filename) {
  if (!filename || !filename.endsWith('.md') || filename.startsWith('_')) return;

  const mdPath = join(LETTERS_DIR, filename);
  if (timers.has(filename)) clearTimeout(timers.get(filename));

  timers.set(filename, setTimeout(async () => {
    timers.delete(filename);
    const slug = basename(filename, '.md');
    process.stdout.write(`  ↻  ${slug} ... `);
    try {
      const out = await generatePDF(mdPath);
      console.log(`done  →  ${out}`);
    } catch (err) {
      console.error(`\n  ✗  ${slug}: ${err.message}`);
    }
  }, 400));
}

watch(LETTERS_DIR, { persistent: true }, (_, filename) => onFileChange(filename));

console.log(`\n  Watching private/letters/ — save any .md to regenerate its PDF.\n  Ctrl+C to stop.\n`);
