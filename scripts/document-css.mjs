/**
 * Shared CSS module for Aquila sovereign documents.
 *
 * Exports `getSharedCSS({ register })` which returns a CSS string for a given
 * register:
 *   - "thesis": Armor — long-form, dense, justified, page-breaks only at roman
 *               sections. Smaller visual primitives.
 *   - "deck":   Spear — presentation-style reading deck. Sparse, page-break per
 *               section. Larger primitives, wider figures, cover page.
 *
 * Also exports `inlineAssets(html, rootDir)` which takes an HTML string with
 * `<figure class="diagram" data-src="..." data-caption="...">`-style placeholders
 * and `<img src="...">` tags referencing files under `public/`, and inlines them
 * so the resulting HTML is self-contained (SVGs embedded inline, PNGs as data
 * URIs). This keeps Puppeteer from needing a base URL.
 */

import { readFileSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

export function getSharedCSS({ register }) {
  const isDeck = register === 'deck';

  // Fonts are INLINED (base64), not assumed present on the rendering machine.
  // Previously these PDFs relied on system-installed Cormorant/Inter — if the face
  // was missing, Puppeteer silently substituted and the document shipped wrong.
  //   thesis -> Heebo + Inter  (engineering register; matches the dossier site)
  //   deck   -> Cormorant + Inter (unchanged)
  const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
  const fontFile = isDeck
    ? 'private/book/assets/fonts/fonts-inline.css'
    : 'private/dossier-aquila/assets/fonts-dossier.css';
  let fonts = '';
  try {
    fonts = readFileSync(join(ROOT, fontFile), 'utf-8');
  } catch {
    fonts = ''; // fall back to system faces rather than fail the build
  }

  // Shared palette + typography tokens. All visual primitives reference these
  // so the two registers stay visually consistent.
  const base = `
${fonts}
:root {
  --ink: #1A1A1A;
  --ink-soft: #333;
  --grey: #707070;
  --grey-soft: #888;
  --pale: #E8E8E8;
  --paler: #F2F2F2;
  --offwhite: #FAFAFA;
  --amber: #C89455;
  --amber-soft: #F2D9BF;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  background: #FAFAFA;
}

article strong { font-weight: 500; color: var(--ink); }
article em { font-style: italic; }

article a {
  color: #444;
  text-decoration: none;
  border-bottom: 0.5px solid #ccc;
}

article ul, article ol { margin: ${isDeck ? '9px 0 12px 0' : '14px 0 18px 0'}; padding-left: 22px; }
article li { margin-bottom: ${isDeck ? '4px' : '7px'}; orphans: 3; widows: 3; page-break-inside: avoid; }
article li p { margin-bottom: 4px; }

article hr {
  border: none;
  border-top: ${isDeck ? 'none' : '0.4pt solid #ddd'};
  margin: ${isDeck ? '0' : '20px 0'};
}

article blockquote {
  margin: 22px 0;
  padding: 18px 20px;
  border-left: 2pt solid #ccc;
  background: #fafafa;
  color: #444;
  font-style: italic;
  page-break-inside: avoid;
}
article blockquote p { margin-bottom: 0; text-align: left; }

article table {
  width: 100%;
  border-collapse: collapse;
  margin: ${isDeck ? '18px 0 22px' : '24px 0 28px'};
  page-break-inside: avoid;
}
article thead th {
  font-weight: 600;
  color: var(--ink);
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1.5pt solid #222;
  font-size: ${isDeck ? '8pt' : '9pt'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
article tbody td {
  padding: ${isDeck ? '7px 12px' : '9px 12px'};
  border-bottom: 0.5pt solid #ececec;
  color: #333;
  vertical-align: top;
}
article tbody tr:last-child td { border-bottom: 1pt solid #bbb; }
`;

  const visualPrimitives = `
/* ─── SECTION HEAD ───────────────────────────────── */
/* A wrapper that binds a kicker to its H1 so they never split across pages.
   In both registers, each .section-head starts a fresh page. */
.section-head {
  page-break-before: always;
  break-before: page;
  page-break-inside: avoid;
  break-inside: avoid;
  page-break-after: avoid;
  break-after: avoid;
  ${isDeck ? `
  padding-top: 56px;
  ` : ``}
}
article > .section-head:first-of-type {
  page-break-before: auto;
  break-before: auto;
  ${isDeck ? `padding-top: 0;` : ``}
}

/* ─── KICKER DIVIDER ─────────────────────────────── */
/* A small capsule/kicker that introduces a section.
   On deck: sits above a large H1 at top of a fresh page.
   On thesis: sits tight to a roman H1 inline. */
.kicker {
  font-family: 'Inter', sans-serif;
  font-size: ${isDeck ? '8.5pt' : '7.5pt'};
  text-transform: uppercase;
  letter-spacing: ${isDeck ? '2.4px' : '1.8px'};
  color: var(--grey-soft);
  font-weight: 500;
  margin-top: ${isDeck ? '0' : '26px'};
  margin-bottom: ${isDeck ? '16px' : '10px'};
  padding-bottom: ${isDeck ? '0' : '4px'};
  display: block;
}
.kicker::before { content: "\u00A7 "; color: var(--amber); opacity: 0.8; }

/* ─── STAT ROW ───────────────────────────────────── */
/* Three-up stat block. On deck: prominent, large. On thesis: compact. */
.stat-row {
  display: flex;
  gap: ${isDeck ? '28px' : '20px'};
  margin: ${isDeck ? '28px 0 34px' : '16px 0 20px'};
  padding: ${isDeck ? '22px 0' : '14px 0'};
  border-top: 0.75pt solid #e0e0e0;
  border-bottom: 0.75pt solid #e0e0e0;
  page-break-inside: avoid;
}
.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${isDeck ? '10px' : '5px'};
}
.stat .n {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: ${isDeck ? '30pt' : '20pt'};
  font-weight: 400;
  color: var(--ink);
  line-height: 1;
  letter-spacing: -0.3px;
}
.stat .l {
  font-family: 'Inter', sans-serif;
  font-size: ${isDeck ? '9.5pt' : '8pt'};
  color: var(--grey);
  line-height: 1.45;
  font-weight: 400;
}

/* ─── PULL QUOTE ────────────────────────────────── */
/* A sentence that is meant to land. */
.pull-quote {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: ${isDeck ? '18pt' : '17pt'};
  font-weight: 300;
  font-style: italic;
  line-height: ${isDeck ? '1.4' : '1.35'};
  color: var(--ink);
  margin: ${isDeck ? '26px 0' : '24px 12px'};
  padding-left: ${isDeck ? '28px' : '18px'};
  border-left: ${isDeck ? '2pt' : '1.5pt'} solid var(--amber);
  page-break-inside: avoid;
  orphans: 3;
  widows: 3;
}
.pull-quote .source {
  display: block;
  margin-top: ${isDeck ? '12px' : '10px'};
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-size: ${isDeck ? '8.5pt' : '8pt'};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--grey);
}

/* ─── COMPARISON BLOCK ──────────────────────────── */
/* Two-column contrast block: legacy vs. proposal. Deck-prominent, thesis-quiet. */
.compare {
  display: flex;
  gap: 0;
  margin: ${isDeck ? '34px 0' : '18px 0'};
  border-top: 0.75pt solid var(--ink);
  border-bottom: 0.75pt solid var(--ink);
  page-break-inside: avoid;
}
.compare > div {
  flex: 1;
  padding: ${isDeck ? '22px 26px' : '18px 20px'};
}
.compare > div:first-child {
  border-right: 0.5pt solid #ccc;
  background: #F6F6F6;
}
.compare h4 {
  font-family: 'Inter', sans-serif;
  font-size: ${isDeck ? '8pt' : '7pt'};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--grey);
  font-weight: 500;
  margin-bottom: ${isDeck ? '12px' : '8px'};
}
.compare .phrase {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: ${isDeck ? '15pt' : '11.5pt'};
  font-weight: 400;
  line-height: 1.35;
  color: var(--ink);
}

/* ─── FIGURE / DIAGRAM FRAME ────────────────────── */
.figure {
  margin: ${isDeck ? '32px 0' : '18px 0'};
  page-break-inside: avoid;
  text-align: center;
}
.figure.diagram {
  margin-left: ${isDeck ? '-12px' : '0'};
  margin-right: ${isDeck ? '-12px' : '0'};
}
.figure svg, .figure img {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}
.figure figcaption {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: ${isDeck ? '10pt' : '8.5pt'};
  color: var(--grey);
  margin-top: ${isDeck ? '12px' : '8px'};
  line-height: 1.4;
}

/* Figure pair: two images side by side. */
.figure-pair {
  display: flex;
  gap: ${isDeck ? '20px' : '14px'};
  margin: ${isDeck ? '32px 0' : '18px 0'};
  page-break-inside: avoid;
}
.figure-pair figure { flex: 1; margin: 0; }
.figure-pair img {
  width: 100%;
  height: auto;
  display: block;
  border: 0.5pt solid #e0e0e0;
}
.figure-pair figcaption {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: ${isDeck ? '9.5pt' : '8pt'};
  color: var(--grey);
  margin-top: ${isDeck ? '10px' : '6px'};
  line-height: 1.4;
  text-align: center;
}

/* ─── SUMMARY CALLOUT BOX ───────────────────────── */
/* Boxed summary for thesis executive summary or deck section foot. */
.summary-box {
  border: 1pt solid var(--ink);
  padding: ${isDeck ? '26px 30px' : '18px 22px'};
  margin: ${isDeck ? '32px 0' : '20px 0'};
  background: #F9F5EE;
  page-break-inside: avoid;
}
.summary-box h4 {
  font-family: 'Inter', sans-serif;
  font-size: ${isDeck ? '8.5pt' : '7.5pt'};
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--amber);
  font-weight: 600;
  margin-bottom: ${isDeck ? '14px' : '8px'};
}
.summary-box p {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: ${isDeck ? '13pt' : '11pt'};
  line-height: 1.55;
  color: var(--ink);
  margin-bottom: 8px !important;
  text-align: left !important;
  font-style: italic;
}
.summary-box p:last-child { margin-bottom: 0 !important; }
`;

  if (isDeck) {
    return base + visualPrimitives + `
/* ──────────────────────────────────────────────── */
/* DECK REGISTER — Spear reading deck              */
/* ──────────────────────────────────────────────── */

@page {
  size: A4 portrait;
  margin: 1.6cm 0 1.6cm 0;
}

body {
  font-size: 11pt;
  line-height: 1.6;
  padding: 0 84px 40px;
}

/* Cover page — special */
.cover {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 0 0;
  page-break-after: always;
}
.cover .top-strap {
  font-family: 'Inter', sans-serif;
  font-size: 8.5pt;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: var(--grey);
  font-weight: 500;
  border-top: 1.5pt solid var(--ink);
  padding-top: 18px;
}
.cover .title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 58pt;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -1px;
  color: var(--ink);
  margin-top: 120px;
  margin-bottom: 30px;
}
.cover .subtitle {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 20pt;
  font-weight: 300;
  font-style: italic;
  color: var(--grey);
  line-height: 1.3;
  max-width: 540px;
}
.cover .foot {
  margin-top: auto;
  padding-top: 80px;
  font-size: 9pt;
  color: var(--grey);
  border-top: 0.5pt solid #ccc;
}
.cover .foot .kv { display: flex; gap: 28px; margin-top: 10px; }
.cover .foot .kv > div { display: flex; flex-direction: column; gap: 4px; }
.cover .foot .kv .label {
  font-size: 7pt;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--grey-soft);
  font-weight: 500;
}
.cover .foot .kv .value { font-size: 9.5pt; color: var(--ink); }

/* Section H1 — large, active.
   Break is on .section-head; H1 itself gets auto so we don't double-break. */
article h1 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 34pt;
  font-weight: 400;
  letter-spacing: -0.5px;
  line-height: 1.08;
  color: var(--ink);
  margin: 0 0 32px 0;
  page-break-before: auto;
  break-before: auto;
  page-break-after: avoid;
  break-after: avoid;
}
.section-head h1 { page-break-before: auto; break-before: auto; margin-top: 0; }
article > h1:first-child,
article > .section-head:first-of-type h1 { page-break-before: auto; break-before: auto; }

/* Kicker sits above H1 with a little breathing room on fresh pages */
.section-head .kicker { margin-top: 0; margin-bottom: 20px; }

article h2 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 20pt;
  font-weight: 400;
  color: var(--ink);
  margin-top: 36px;
  margin-bottom: 14px;
  line-height: 1.25;
  page-break-after: avoid;
}

article h3 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 14pt;
  font-style: italic;
  color: var(--ink-soft);
  margin-top: 24px;
  margin-bottom: 8px;
  page-break-after: avoid;
}

article p {
  margin-bottom: 14px;
  orphans: 4;
  widows: 4;
  font-size: 11pt;
  line-height: 1.62;
  hyphens: auto;
}

article blockquote {
  font-size: 11pt;
  line-height: 1.55;
}

/* Closing page — the final line sits alone on its own page. */
.closing {
  page-break-before: always;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0;
}
.closing .line {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 22pt;
  font-style: italic;
  line-height: 1.55;
  color: var(--ink);
  max-width: 520px;
  margin: 0 0 52px 0;
}
.closing .sig {
  font-family: 'Inter', sans-serif;
  font-size: 8pt;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--grey);
}

/* Final map — full width, starts a fresh page, faces the closing line. */
.figure.final-map {
  margin: 0;
  page-break-before: always;
  page-break-inside: avoid;
}
.figure.final-map svg { width: 100%; height: auto; }
`;
  }

  // THESIS register (Armor)
  //
  // Post-processed below: the SHARED visual primitives still ask for Cormorant, but
  // Cormorant is no longer inlined in this register — left alone it would silently
  // fall back to Georgia. Heebo also ships no true italic, so any `font-style: italic`
  // would render as a synthesised slant. Both are rewritten at the end of this function.
  const thesisCss = base + visualPrimitives + `
/* ──────────────────────────────────────────────── */
/* THESIS REGISTER — Armor strategic thesis        */
/* ──────────────────────────────────────────────── */

@page {
  size: A4;
  margin: 2.1cm 0 1.9cm 0;
}

body {
  font-size: 10.8pt;
  line-height: 1.78;
  padding: 0 118px 52px;
}

/* Document header */
.doc-header {
  padding: 0 0 42px 0;
  margin-bottom: 60px;
  border-bottom: 1.5pt solid #111;
}
.company-name {
  font-family: 'Heebo', sans-serif;
  font-size: 17pt;
  font-weight: 500;
  color: #111;
  letter-spacing: -0.2px;
  margin-bottom: 10px;
}
.classification {
  font-size: 8pt;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: #aaa;
  margin-bottom: 28px;
}
.meta-table { font-size: 9.5pt; line-height: 1.7; color: #555; }
.meta-table .label {
  font-weight: 500;
  color: #999;
  text-transform: uppercase;
  font-size: 8pt;
  letter-spacing: 0.8px;
  width: 56px;
  display: inline-block;
  vertical-align: top;
}
.meta-table .value { color: #333; }
.meta-row { margin-bottom: 5px; }

.document-title {
  font-family: 'Heebo', sans-serif;
  font-size: 23pt;
  font-weight: 600;
  line-height: 1.15;
  color: #111;
  margin-bottom: 8px;
  letter-spacing: -0.3px;
}
.document-subtitle {
  font-family: 'Heebo', sans-serif;
  font-size: 12.5pt;
  font-weight: 300;
  color: #777;
  margin-bottom: 0;
}

/* Section headers (H1 = # Roman-numeral sections) */
article h1 {
  font-family: 'Heebo', sans-serif;
  font-size: 17.5pt;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: #111;
  margin-top: 0;
  margin-bottom: 24px;
  line-height: 1.3;
  page-break-before: always;
  break-before: page;
  page-break-after: avoid;
  break-after: avoid;
  padding-top: 10px;
  border-top: 0.75pt solid #ccc;
}
article h1:first-child,
article > .section-head:first-of-type h1,
article > h1:first-of-type {
  page-break-before: avoid;
  break-before: avoid;
  border-top: none;
  padding-top: 0;
}

/* Subsection headers (H2) */
article h2 {
  font-family: 'Heebo', sans-serif;
  font-size: 13.5pt;
  font-weight: 600;
  letter-spacing: -0.2px;
  color: #111;
  margin-top: 38px;
  margin-bottom: 14px;
  line-height: 1.35;
  page-break-after: avoid;
}

/* Sub-subsection headers (H3) */
article h3 {
  font-family: 'Heebo', sans-serif;
  font-size: 11.5pt;
  font-weight: 500;
  color: #333;
  margin-top: 30px;
  margin-bottom: 10px;
  line-height: 1.4;
  page-break-after: avoid;
}

/* Deep headers (H4) */
article h4 {
  font-family: 'Inter', sans-serif;
  font-size: 9.5pt;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #666;
  margin-top: 32px;
  margin-bottom: 9px;
  page-break-after: avoid;
}

/* Body text */
article p {
  margin-bottom: 17px;
  orphans: 4;
  widows: 4;
  /* Flush both edges. Naive justify + hyphens:auto hyphenated every other line
     (mod-ules, ratio-nally, re-ceiver); the limits below are what make justification
     survivable: only break words of 8+ chars, never leave a stub under 4 chars on
     either side, and never hyphenate more than 2 lines in a row.
     NB: no backticks in this file's comments — they sit inside a template literal. */
  text-align: justify;
  text-align-last: left;
  text-justify: inter-word;
  -webkit-hyphens: auto;
  hyphens: auto;
  hyphenate-limit-chars: 10 5 5;   /* only break words of 10+, never a stub under 5 */
  hyphenate-limit-lines: 2;
}
/* never justify a heading, a cell, or a caption — only running prose */
article h1, article h2, article h3, article h4,
article th, article td, article li, .kicker, .stat .l, .stat .n, figcaption { text-align: left; hyphens: none; }

/* display equation — no KaTeX in this pipeline, so the formula is set by hand */
.eq { margin: 22pt auto; padding: 14pt 16pt; background: #fbfbfb; border: 0.75pt solid #ececec;
      border-radius: 3pt; text-align: center; font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 15pt; line-height: 1.5; break-inside: avoid; }
.eq i { font-style: italic; }
.eq sub { font-size: 0.62em; font-style: italic; vertical-align: -0.25em; }
.eq .op { padding: 0 0.45em; color: #999; font-style: normal; }
.eq .k { font-size: 8.5pt; font-family: 'Inter', sans-serif; color: #777; display: block;
         margin-top: 9pt; line-height: 1.6; }

article blockquote {
  font-size: 10.2pt;
  line-height: 1.75;
}

/* Appendix / source entries */
.references p > strong:first-child {
  display: block;
  margin-top: 4px;
}

/* ─── WIDE TABLES ────────────────────────────────── */
/* Break out of the prose measure and use the page. */
article table.wide {
  width: calc(100% + 156px);
  margin-left: -78px;
  margin-right: -78px;
  font-size: 8pt;
  page-break-inside: auto;   /* a 23-row register cannot fit one page; let it flow */
}
article table.wide th { font-size: 7pt; padding: 6px 7px; }
article table.wide td { padding: 6px 7px; line-height: 1.42; }
article table.wide.dense { font-size: 7.2pt; }
article table.wide.dense th { font-size: 6.5pt; letter-spacing: .3px; }
article table.wide.dense td { padding: 5px 6px; line-height: 1.38; }
article table.wide tr { page-break-inside: avoid; }   /* never split a single row */
article table.wide thead { display: table-header-group; }  /* repeat header on each page */
`;

  return thesisCss
    .replace(/'Cormorant Garamond', Georgia, serif/g, "'Heebo', sans-serif")
    .replace(/\n\s*font-style: italic;/g, '');
}

/**
 * Wrap `<p><span class="kicker">...</span></p>` + following `<h1>...</h1>` into
 * a single `<header class="section-head">` so the page break sits on the pair,
 * not on the H1 alone — this prevents the kicker from orphaning at the bottom
 * of the preceding page.
 *
 * Also handles the marked-parser variant where the kicker span sits inside a
 * paragraph. Run this after `marked.parse` and before `inlineAssets`.
 */
export function groupSectionHeads(html) {
  // Pattern A: <p><span class="kicker">X</span></p>\s*<h1>Y</h1>
  html = html.replace(
    /<p>\s*<span class="kicker">([\s\S]*?)<\/span>\s*<\/p>\s*<h1>([\s\S]*?)<\/h1>/g,
    (_m, kicker, h1) =>
      `<header class="section-head"><span class="kicker">${kicker}</span><h1>${h1}</h1></header>`
  );
  // Pattern B: bare <span class="kicker">X</span>\s*<h1>Y</h1> (in case marked
  // emitted it without a wrapping <p>)
  html = html.replace(
    /<span class="kicker">([\s\S]*?)<\/span>\s*<h1>([\s\S]*?)<\/h1>/g,
    (_m, kicker, h1) =>
      `<header class="section-head"><span class="kicker">${kicker}</span><h1>${h1}</h1></header>`
  );
  return html;
}

/**
 * Inline images referenced as `<img src="/images/..."` or figures with
 * `data-src="images/..."` into the HTML. SVG files are embedded as raw SVG;
 * PNG/JPG are embedded as base64 data URIs.
 */
export function inlineAssets(html, rootDir) {
  const publicDir = join(rootDir, 'public');
  // CONFIDENTIAL FIGURES MUST NEVER LIVE IN public/. That directory is the Astro public
  // root and deploys to ageofwonders.org — anything in it is on the open internet.
  // A data-src beginning "dossier/" resolves to the NDA-only asset directory instead.
  const dossierDir = join(rootDir, 'private/dossier-aquila/assets/diagrams');
  // Photographs live in assets/images/optimised (2000px, ~500KB each). The originals are
  // print-grade and enormous; embedding them would add 47 MB to the PDF for no visible gain.
  const photoDir = join(rootDir, 'private/dossier-aquila/assets/images/optimised');
  const resolveAsset = (src) => {
    if (src.startsWith('dossier/photo/')) return join(photoDir, src.slice('dossier/photo/'.length));
    if (src.startsWith('dossier/')) return join(dossierDir, src.slice('dossier/'.length));
    return join(publicDir, src);
  };

  // Replace <figure class="... diagram ..." data-src="images/...svg" data-caption="..."></figure>
  html = html.replace(
    /<figure([^>]*data-src="([^"]+)"[^>]*)><\/figure>/g,
    (match, attrs, src) => {
      const captionMatch = attrs.match(/data-caption="([^"]*)"/);
      const caption = captionMatch ? captionMatch[1] : '';
      const classMatch = attrs.match(/class="([^"]*)"/);
      const cls = classMatch ? classMatch[1] : 'figure diagram';
      try {
        const assetPath = resolveAsset(src);
        const figcap = caption ? `<figcaption>${caption}</figcaption>` : '';
        const ext = extname(assetPath).toLowerCase();
        // A raster asset must be embedded as a data URI. Reading a JPEG as UTF-8 and
        // injecting it as inline SVG dumps the binary into the document as text — it
        // turned a 9-page booklet into 295 pages of garbage before this check existed.
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
          const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
          const b64 = readFileSync(assetPath).toString('base64');
          return `<figure class="${cls}"><img src="data:${mime};base64,${b64}" alt=""/>${figcap}</figure>`;
        }
        const svgContent = readFileSync(assetPath, 'utf-8')
          .replace(/<\?xml[^>]*\?>\s*/, '');
        return `<figure class="${cls}">${svgContent}${figcap}</figure>`;
      } catch (e) {
        return `<figure class="${cls}"><p>[Missing: ${src}]</p></figure>`;
      }
    }
  );

  // Replace <img src="/images/..."> with inlined SVG or data-URI'd PNG.
  html = html.replace(/<img([^>]*?)src="([^"]+)"([^>]*?)>/g, (match, pre, src, post) => {
    if (!src.startsWith('/images/') && !src.startsWith('images/') && !src.startsWith('dossier/')) return match;
    const rel = src.replace(/^\/+/, '');
    try {
      const abs = resolveAsset(rel);
      const ext = extname(abs).toLowerCase();
      if (ext === '.svg') {
        const svg = readFileSync(abs, 'utf-8').replace(/<\?xml[^>]*\?>\s*/, '');
        return svg;
      }
      const buf = readFileSync(abs);
      const mime = ext === '.png' ? 'image/png'
        : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
        : 'application/octet-stream';
      const dataUri = `data:${mime};base64,${buf.toString('base64')}`;
      return `<img${pre}src="${dataUri}"${post}>`;
    } catch (e) {
      return match;
    }
  });

  return html;
}


/**
 * Wide tables must escape the text column.
 *
 * The measure is tuned for prose (~72 chars). A 6-column roadmap grid or a
 * 5-column falsifier register with 400-character cells crushed into that width
 * renders one word per line and is simply unreadable. These tables get to use the
 * full page: they break out of the measure, drop a type size, and are allowed to
 * split across pages (page-break-inside:avoid on a two-page table pushes it whole
 * and leaves half a page blank).
 */
export function markWideTables(html) {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (whole, inner) => {
    const firstRow = (inner.match(/<tr>[\s\S]*?<\/tr>/) || [''])[0];
    const cols = (firstRow.match(/<th/g) || []).length;
    const longest = Math.max(0, ...(inner.match(/<td[^>]*>([\s\S]*?)<\/td>/g) || [])
      .map((c) => c.replace(/<[^>]+>/g, '').trim().length));
    if (cols >= 5 && longest > 60) return `<table class="wide dense">${inner}</table>`;
    if (cols >= 5) return `<table class="wide">${inner}</table>`;
    return whole;
  });
}
