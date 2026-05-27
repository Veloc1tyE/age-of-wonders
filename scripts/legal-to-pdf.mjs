#!/usr/bin/env node

/**
 * Generate formatted legal document PDFs (NDA, MOU, agreements).
 *
 * Usage:
 *   node scripts/legal-to-pdf.mjs private/legal/nda-zimbabwe.md
 */

import { readFileSync, mkdirSync } from 'fs';
import { join, resolve, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'pdfs', 'legal');

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
@page {
  size: A4;
  margin: 2.5cm 2.8cm 2.5cm 2.8cm;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Times New Roman', Times, 'Georgia', serif;
  font-size: 11pt;
  line-height: 1.6;
  color: #000;
  -webkit-font-smoothing: antialiased;
  text-align: justify;
  hyphens: auto;
}

.doc-header {
  border-bottom: 0.5pt solid #bbb;
  padding-bottom: 20px;
  margin-bottom: 32px;
}

.doc-parties {
  font-size: 9pt;
  color: #444;
  line-height: 1.8;
  margin-bottom: 0;
}

.doc-parties .label {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 7pt;
  letter-spacing: 1px;
  color: #888;
  display: inline-block;
  width: 52px;
}

.doc-title {
  font-family: 'Times New Roman', Times, serif;
  font-size: 14pt;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #000;
  margin-bottom: 6px;
  line-height: 1.4;
}

.doc-subtitle {
  font-family: 'Times New Roman', Times, serif;
  font-size: 10pt;
  font-weight: normal;
  font-style: italic;
  text-align: center;
  color: #555;
  margin-bottom: 20px;
}

.doc-meta {
  font-size: 8.5pt;
  color: #666;
  text-align: center;
  margin-bottom: 18px;
  border-top: 0.5pt solid #ddd;
  border-bottom: 0.5pt solid #ddd;
  padding: 7px 0;
}

/* Headings */
article h3 {
  font-family: 'Times New Roman', Times, serif;
  font-size: 10.5pt;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #000;
  margin-top: 32px;
  margin-bottom: 12px;
  border-bottom: 0.5pt solid #ccc;
  padding-bottom: 5px;
  page-break-after: avoid;
}

article h2 {
  font-family: 'Times New Roman', Times, serif;
  font-size: 12pt;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
  text-align: center;
  margin-top: 36px;
  margin-bottom: 14px;
  page-break-before: always;
  page-break-after: avoid;
}

article h2:first-child {
  page-break-before: avoid;
}

/* Body text */
article p {
  margin-bottom: 10px;
  orphans: 3;
  widows: 3;
}

article strong {
  font-weight: bold;
  color: #000;
}

article em {
  font-style: italic;
}

/* Numbered and bulleted lists */
article ol {
  margin: 10px 0 10px 0;
  padding-left: 0;
  list-style: none;
  counter-reset: clause-counter;
}

article ol li {
  margin-bottom: 8px;
  padding-left: 28px;
  position: relative;
  page-break-inside: avoid;
  hyphens: manual;
}

article ul {
  margin: 10px 0;
  padding-left: 28px;
  list-style: disc;
}

article ul li {
  margin-bottom: 6px;
  page-break-inside: avoid;
  hyphens: manual;
}

/* Tables */
article table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0 20px;
  font-size: 10pt;
  line-height: 1.5;
  page-break-inside: avoid;
}

article thead th {
  font-weight: bold;
  text-align: left;
  padding: 7px 10px;
  border-top: 1.5pt solid #000;
  border-bottom: 1pt solid #000;
  font-size: 9pt;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: #f8f8f8;
}

article tbody td {
  padding: 6px 10px;
  border-bottom: 0.5pt solid #ccc;
  vertical-align: top;
}

article tbody tr:last-child td {
  border-bottom: 1pt solid #000;
}

/* Horizontal rule */
article hr {
  border: none;
  border-top: 0.5pt solid #bbb;
  margin: 22px 0;
}

/* Signature block */
.signature-block {
  margin-top: 32px;
  page-break-inside: avoid;
}

/* Blockquote for definitions etc */
article blockquote {
  margin: 12px 0 12px 24px;
  font-style: normal;
  color: #222;
}
`;
}

function buildHTML(data, bodyHtml) {
  const parts = [];
  const docTitle = [data.title, data.subtitle].filter(Boolean).join(' — ') || 'Legal Document';

  parts.push('<!DOCTYPE html>');
  parts.push('<html lang="en">');
  parts.push('<head>');
  parts.push('<meta charset="utf-8">');
  parts.push('<title>' + escapeHtml(docTitle) + '</title>');
  parts.push('<style>' + getCSS() + '</style>');
  parts.push('</head>');
  parts.push('<body>');

  // Title block
  parts.push('<div class="doc-header">');
  if (data.title) {
    parts.push('<div class="doc-title">' + escapeHtml(data.title) + '</div>');
  }
  if (data.subtitle) {
    parts.push('<div class="doc-subtitle">' + escapeHtml(data.subtitle) + '</div>');
  }

  // Meta row: date, classification
  const metaParts = [];
  if (data.date) metaParts.push(escapeHtml(data.date));
  if (data.classification) metaParts.push(escapeHtml(data.classification));
  if (metaParts.length) {
    parts.push('<div class="doc-meta">' + metaParts.join('&ensp;|&ensp;') + '</div>');
  }

  // Parties
  if (data.to || data.from) {
    parts.push('<div class="doc-parties">');
    if (data.from) {
      parts.push('<div><span class="label">Party A</span> ' + escapeHtml(data.from) + '</div>');
    }
    if (data.to) {
      parts.push('<div><span class="label">Party B</span> ' + escapeHtml(data.to) + '</div>');
    }
    parts.push('</div>');
  }

  parts.push('</div>'); // end doc-header

  parts.push('<article>' + bodyHtml + '</article>');
  parts.push('</body>');
  parts.push('</html>');
  return parts.join('\n');
}

async function generatePDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '2.5cm', bottom: '2.5cm', left: '2.8cm', right: '2.8cm' },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="width:100%;font-family:Times New Roman,serif;font-size:8px;color:#999;
                  display:flex;justify-content:space-between;padding:0 2.8cm;box-sizing:border-box;">
        <span>Confidential</span>
        <span class="title"></span>
      </div>`,
    footerTemplate: `
      <div style="width:100%;font-family:Times New Roman,serif;font-size:8px;color:#999;
                  display:flex;justify-content:space-between;padding:0 2.8cm;box-sizing:border-box;">
        <span>Aquila Space Technologies Pty Ltd &amp; NextEra</span>
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>`,
    printBackground: true,
    preferCSSPageSize: false,
  });

  await browser.close();
}

async function main() {
  const filepath = process.argv[2];
  if (!filepath) {
    console.error('\n  Usage: node scripts/legal-to-pdf.mjs <path-to-markdown>\n');
    process.exit(1);
  }

  const absPath = resolve(ROOT, filepath);
  const raw = readFileSync(absPath, 'utf-8');
  const { data, content } = parseFrontmatter(raw);
  const bodyHtml = marked.parse(content);
  const fullHtml = buildHTML(data, bodyHtml);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  const slug = basename(filepath, '.md');
  const out = join(OUTPUT_DIR, slug + '.pdf');

  process.stdout.write('\n  > ' + slug + ' ... ');
  await generatePDF(fullHtml, out);
  console.log('done');
  console.log('  ' + out + '\n');
}

main().catch((err) => { console.error(err); process.exit(1); });
