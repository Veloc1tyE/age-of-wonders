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
import { join, resolve, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import katex from 'katex';
import puppeteer from 'puppeteer';
import { getSharedCSS, inlineAssets, groupSectionHeads, markWideTables } from './document-css.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'pdfs');
const KATEX_CSS_PATH = fileURLToPath(import.meta.resolve('katex/dist/katex.min.css'));
const KATEX_DIR = dirname(KATEX_CSS_PATH);

const KATEX_CSS = readFileSync(KATEX_CSS_PATH, 'utf-8').replace(
  /src:url\(fonts\/([^)]+\.woff2)\) format\("woff2"\),url\(fonts\/[^)]+\.woff\) format\("woff"\),url\(fonts\/[^)]+\.ttf\) format\("truetype"\)/g,
  (_whole, filename) => {
    const encoded = readFileSync(join(KATEX_DIR, 'fonts', filename)).toString('base64');
    return `src:url(data:font/woff2;base64,${encoded}) format("woff2")`;
  },
);
if (KATEX_CSS.includes('url(fonts/')) {
  throw new Error('KaTeX CSS contains an unembedded font URL');
}

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

function extractMath(body, sourceLabel) {
  const math = [];
  const token = (tex, display) => {
    const id = `AQUILAMATHTOKEN${math.length}END`;
    math.push({ id, tex: tex.trim(), display });
    return id;
  };
  const protectedBody = body.replace(
    /```[\s\S]*?```|`[^`\n]*`|\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g,
    (whole, displayTex, inlineTex) => {
      if (whole.startsWith('`')) return whole;
      if (displayTex !== undefined) return token(displayTex, true);
      return token(inlineTex, false);
    },
  );
  const outsideCode = protectedBody.replace(/```[\s\S]*?```|`[^`\n]*`/g, '');
  const unsupportedDisplay = outsideCode.indexOf('$$');
  if (unsupportedDisplay !== -1) {
    const line = outsideCode.slice(0, unsupportedDisplay).split('\n').length;
    throw new Error(`${sourceLabel}:${line}: unsupported $$ mathematics delimiter; use \\[ and \\]`);
  }
  const bad = outsideCode.match(/\\(?:\[|\]|\(|\))/);
  if (bad) {
    const line = outsideCode.slice(0, bad.index).split('\n').length;
    throw new Error(`${sourceLabel}:${line}: unmatched mathematics delimiter ${bad[0]}`);
  }
  return { body: protectedBody, math };
}

function restoreMath(html, math, sourceLabel) {
  for (const item of math) {
    let rendered;
    try {
      rendered = katex.renderToString(item.tex, {
        displayMode: item.display,
        throwOnError: true,
        strict: false,
        trust: false,
        output: 'htmlAndMathml',
      });
    } catch (error) {
      throw new Error(`${sourceLabel}: invalid mathematics “${item.tex.slice(0, 90)}”: ${error.message}`);
    }
    const wrapped = item.display
      ? `<div class="math-block" role="group" aria-label="display equation">${rendered}</div>`
      : `<span class="math-inline">${rendered}</span>`;
    const paragraph = `<p>${item.id}</p>`;
    if (item.display && html.includes(paragraph)) html = html.replace(paragraph, wrapped);
    else html = html.replaceAll(item.id, wrapped);
    if (html.includes(item.id)) {
      throw new Error(`${sourceLabel}: mathematics token ${item.id} survived rendering`);
    }
  }
  return html;
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
  parts.push('<style>' + getSharedCSS({ register: 'thesis' }) + KATEX_CSS + `
.math-block{margin:18pt 0;padding:12pt 10pt;overflow:hidden;text-align:center;background:#fbfbfb;border:0.6pt solid #ececec;border-radius:3pt;break-inside:avoid}
.math-block .katex-display{margin:0}
.math-inline{white-space:nowrap}
.math-inline .katex{font-size:1em}
th .katex,td .katex{font-size:.96em}
th .katex,th .katex *{text-transform:none!important;letter-spacing:normal}
` + '</style>');
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
  const extracted = extractMath(body, filepath);
  let bodyHtml = marked.parse(extracted.body);
  bodyHtml = groupSectionHeads(bodyHtml);
  bodyHtml = markWideTables(bodyHtml);
  bodyHtml = inlineAssets(bodyHtml, ROOT);
  bodyHtml = restoreMath(bodyHtml, extracted.math, filepath);

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
