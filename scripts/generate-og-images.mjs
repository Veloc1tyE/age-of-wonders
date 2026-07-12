#!/usr/bin/env node

/**
 * Generate per-essay Open Graph cards (1200x630) into public/og/.
 *
 * Extends the family of public/og-default.png: off-white field, gold ring,
 * Cormorant Garamond title, quiet grey subtitle. Fonts are inlined from the
 * book pipeline's fonts-inline.css so rendering needs no network.
 *
 * Usage: node scripts/generate-og-images.mjs
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ESSAYS = join(ROOT, 'src/content/essays');
const OUT = join(ROOT, 'public/og');
const FONTS_CSS = join(ROOT, 'private/book/assets/fonts/fonts-inline.css');

const fontsCss = readFileSync(FONTS_CSS, 'utf-8');

function frontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return fm;
}

function cardHtml(title, description) {
  // Longer titles step down so two lines always fit above the fold.
  const size = title.length > 26 ? 68 : title.length > 18 ? 78 : 88;
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
${fontsCss}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px; height: 630px;
  background: #fafafa;
  font-family: 'Cormorant Garamond', serif;
  display: flex; align-items: center;
}
.ring {
  flex: 0 0 auto;
  width: 236px; height: 236px;
  border: 19px solid #d5a72e;
  border-radius: 50%;
  margin-left: 76px;
}
.text { margin-left: 88px; margin-right: 80px; max-width: 700px; }
.eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 20px; font-weight: 500;
  letter-spacing: 4px; color: #9a9a9a;
  text-transform: uppercase;
  margin-bottom: 26px;
}
.title {
  font-size: ${size}px; font-weight: 600;
  color: #141414; line-height: 1.08;
  margin-bottom: 24px;
}
.desc {
  font-size: 31px; font-weight: 500;
  color: #8a8a8a; line-height: 1.35;
}
</style></head>
<body>
  <div class="ring"></div>
  <div class="text">
    <div class="eyebrow">Age of Wonders</div>
    <div class="title">${title}</div>
    ${description ? `<div class="desc">${description}</div>` : ''}
  </div>
</body></html>`;
}

mkdirSync(OUT, { recursive: true });

const files = readdirSync(ESSAYS).filter((f) => f.endsWith('.mdx') && !f.startsWith('_'));
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

for (const f of files) {
  const slug = f.replace(/\.mdx$/, '');
  const fm = frontmatter(readFileSync(join(ESSAYS, f), 'utf-8'));
  if (fm.draft === 'true') continue;
  await page.setContent(cardHtml(fm.title, fm.description || ''), { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  writeFileSync(join(OUT, `${slug}.png`), png);
  console.log(`  og/${slug}.png  (${fm.title})`);
}

await browser.close();
console.log(`\nGenerated ${files.length} cards in public/og/`);
