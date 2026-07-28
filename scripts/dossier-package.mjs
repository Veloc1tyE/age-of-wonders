#!/usr/bin/env node

/**
 * Assemble the Aquila dossier — and own the output tree.
 *
 * Everything lands in pdfs/dossier-aquila/ as a clean, self-describing filesystem.
 * Two documents sit on the desk; the verification is abstracted one level down:
 *
 *   pdfs/dossier-aquila/
 *   ├── README.txt                          what this is, and what to read
 *   ├── Lightway — Pre-NDA Briefing.pdf     shareable, no NDA required
 *   ├── The Aquila Dossier.pdf              THE DOCUMENT — executive memo + thesis §I–XIII
 *   └── Verification/                       internal verification and reproduction
 *       ├── The Verification — Thesis Appendices A–M.pdf
 *       ├── The Engineering — Blueprint and Design Reviews.pdf
 *       └── Components/                     individual documents, if an advisor wants one
 *
 * A head of state opens the folder and sees the thing to read. No reading-order preamble,
 * no volume numbering, no explanation of how to read the explanation.
 *
 * The thesis stays ONE source file; it is split at `# Appendix A` here, at package
 * time, so the editor and every cross-reference keep working.
 *
 * Usage: node scripts/dossier-package.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, readdirSync, statSync, cpSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import puppeteer from 'puppeteer';
import { assertNoDevBuild } from './dossier-devcheck.mjs';

// ---------------------------------------------------------------- 0. the dev-mode guard
// The site can be built with an in-browser editor (DOSSIER_DEV=1). That build is for this
// machine only. If one is sitting in private/dossier-aquila/site/, the author has not
// rebuilt clean — and a package run is exactly the moment before material goes out the
// door. Fail here, loudly, rather than trust anyone to remember.
try {
  assertNoDevBuild();
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DOSSIER = join(ROOT, 'private/dossier-aquila');
const PKG = join(DOSSIER, 'package');
const SRC_BUILD = join(DOSSIER, '.build');          // temp markdown
const OUT = join(ROOT, 'pdfs/dossier-aquila');      // the tree we own

// The desk copy sits at the TOP level: two PDFs, nothing else. A principal opens the
// folder and sees the thing to read. The verification layer — appendices, blueprint,
// design reviews, individual components — is abstracted one level down. It is not
// hidden (an advisor goes straight to it); it is simply not on the desk.
const DIR_VER  = join(OUT, 'Verification');
const DIR_COMP = join(DIR_VER, 'Components');
const DIR_BUILD = join(OUT, '.build');
// The package declares the models to be the artefacts of record, so they have to
// travel with it. An adversarial pass given only PDFs could reproduce nothing.
const DIR_MODELS = join(DIR_VER, 'Models');
const SRC_SIM = join(DOSSIER, 'sim');
const DIR_PRE = OUT;      // the booklet and the dossier both live at the root
const DIR_DOSS = OUT;

const render = (md, outDir, name) =>
  execFileSync('node', [join(ROOT, 'scripts/thesis-to-pdf.mjs'), md, '--out', outDir, '--name', name,
    '--no-page-numbers'],
    { stdio: ['ignore', 'ignore', 'inherit'] });

/**
 * Stamp page numbers onto a finished PDF.
 *
 * Components are rendered WITHOUT numbers, because a volume is a merge of several of
 * them and each would otherwise restart its own count at 1 — page 5 of Volume I printed
 * "1" (it was page 1 of the memo), so every page reference in the volume contents was
 * wrong. Numbering must be applied to the artefact the reader actually holds.
 *
 * `firstNumbered` skips the cover: the contents table starts its page cursor at 2.
 */
async function stampPageNumbers(pdfDoc, { firstNumbered = 1, startAt = 1 } = {}) {
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  pages.forEach((page, i) => {
    if (i + 1 < firstNumbered) return;
    const n = String(startAt + (i + 1 - firstNumbered));
    const { width } = page.getSize();
    const size = 8;
    const w = font.widthOfTextAtSize(n, size);
    page.drawText(n, {
      x: width - 66 - w,        // matches the 88px footer padding in thesis-to-pdf
      y: 30,
      size,
      font,
      color: rgb(0.73, 0.73, 0.73),
    });
  });
}

// ---------------------------------------------------------------- 0. clean slate
// Remove every loose/stale PDF at the root of the tree (e.g. the superseded
// single-volume build, and slug-named strays from ad-hoc renders).
mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(OUT)) {
  const p = join(OUT, f);
  if (statSync(p).isFile() && f.toLowerCase().endsWith('.pdf')) rmSync(p);
}
// retired layout — remove it, or the old numbered folders sit beside the new tree
for (const stale of ['1 Pre-NDA', '2 The Dossier', '3 Components']) {
  rmSync(join(OUT, stale), { recursive: true, force: true });
}
for (const d of [DIR_VER, DIR_COMP, DIR_BUILD, DIR_MODELS, SRC_BUILD]) {
  rmSync(d, { recursive: true, force: true });
  mkdirSync(d, { recursive: true });
}

// The runnable models, copied verbatim. Caches and scratch output are not evidence.
//
// validate_package.py binds every document to every model, so it resolves the Markdown
// sources at ROOT = sim/.. — the bundle therefore mirrors the repository shape
// (Models/sim/, Models/*.md, Models/package/*.md) rather than flattening it. Flattened,
// the one command that proves the package self-consistent is the one that cannot run.
const SIM_SKIP = (name) => name === '__pycache__' || name.startsWith('.');
const simFiles = readdirSync(SRC_SIM).filter((f) => !SIM_SKIP(f)
  && statSync(join(SRC_SIM, f)).isFile());
mkdirSync(join(DIR_MODELS, 'sim'), { recursive: true });
mkdirSync(join(DIR_MODELS, 'package'), { recursive: true });
for (const f of simFiles) cpSync(join(SRC_SIM, f), join(DIR_MODELS, 'sim', f));
const MODEL_SOURCES = ['investment-thesis.md', 'engineering-blueprint.md', 'executive-memo.md',
  'design-haps-relay.md', 'design-network-operations.md', 'design-pcsel-array.md',
  'design-receiver-thermal.md', 'reference-v1.0-architecture.md'];
const MODEL_PKG_SOURCES = ['booklet-pre-nda.md', 'evaluator-guide.md', 'package-map.md',
  'revision-history.md'];
for (const f of MODEL_SOURCES) cpSync(join(DOSSIER, f), join(DIR_MODELS, f));
for (const f of MODEL_PKG_SOURCES) cpSync(join(PKG, f), join(DIR_MODELS, 'package', f));

// ---------------------------------------------------------------- 1. split the thesis
const thesis = readFileSync(join(DOSSIER, 'investment-thesis.md'), 'utf-8');
const fm = thesis.match(/^---\n[\s\S]*?\n---\n/)[0];
const rest = thesis.slice(fm.length);
const cut = rest.search(/^# Appendix A/m);
if (cut === -1) throw new Error('cannot find "# Appendix A" — thesis structure changed');

writeFileSync(join(SRC_BUILD, 'thesis-body.md'),
  fm.replace(/^subtitle:.*$/m, 'subtitle: ""') + rest.slice(0, cut));
writeFileSync(join(SRC_BUILD, 'thesis-appendices.md'),
  fm.replace(/^title:.*$/m, 'title: "Aquila Energy Thesis: Appendices"')
    .replace(/^subtitle:.*$/m, 'subtitle: "Volume II—The Verification (Appendices A–M)"') + rest.slice(cut));

// ---------------------------------------------------------------- 2. render
// Components get human names (they are deliverables); split halves are intermediates.
const COMPONENTS = [
  ['executive-memo.md', 'Executive Memo'],
  ['investment-thesis.md', 'Investment Thesis (complete)'],
  ['engineering-blueprint.md', 'Engineering Blueprint'],
  ['design-pcsel-array.md', 'Design Review — PCSEL Array'],
  ['design-haps-relay.md', 'Design Review — HAPS Relay'],
  ['design-receiver-thermal.md', 'Design Review — Receiver Thermal'],
  ['design-network-operations.md', 'Design Review — Network Operations'],
];
for (const [f, name] of COMPONENTS) render(join(DOSSIER, f), DIR_COMP, name);
render(join(PKG, 'package-map.md'), DIR_COMP, 'Package Map');
render(join(PKG, 'booklet-pre-nda.md'), DIR_PRE, 'Lightway — Pre-NDA Briefing');
render(join(SRC_BUILD, 'thesis-body.md'), DIR_BUILD, 'thesis-body');
render(join(SRC_BUILD, 'thesis-appendices.md'), DIR_BUILD, 'thesis-appendices');


/**
 * Exact page number for every §I–XIII section of the thesis body.
 *
 * There is no text extractor here (only pdf-lib), so we cannot read a finished PDF and ask
 * which page a heading landed on. But every `article h1` carries `page-break-before: always`,
 * so section boundaries ARE page boundaries: render the body truncated after section k, count
 * the pages, and you know exactly where section k+1 begins. Thirteen renders, once per build.
 * Estimating from DOM heights would drift the moment a table or a widow rule moved.
 */
async function sectionStartPages(mdPath) {
  const raw = readFileSync(mdPath, 'utf-8');
  const fm = (raw.match(/^---\n[\s\S]*?\n---\n/) || [''])[0];
  const rest = raw.slice(fm.length);
  const parts = rest.split(/(?=^# )/m).filter((x) => x.trim());
  const out = [];
  let cursor = 1;                       // section I shares page 1 with the masthead
  for (let k = 0; k < parts.length; k++) {
    const title = (parts[k].match(/^# (.+)$/m) || [, ''])[1].trim();
    out.push({ title, start: cursor });
    const tmp = join(SRC_BUILD, `toc-${k}.md`);
    writeFileSync(tmp, fm + parts.slice(0, k + 1).join(''));
    render(tmp, SRC_BUILD, `toc-${k}`);
    const doc = await PDFDocument.load(readFileSync(join(SRC_BUILD, `toc-${k}.pdf`)));
    cursor = doc.getPageCount() + 1;    // the next section opens on a fresh page
  }
  return out;
}

// ---------------------------------------------------------------- 3. the artefacts
// THE DOSSIER (top level, the read): reading order + the memo + the thesis argument.
// THE VERIFICATION (one level down): the appendices.
// THE ENGINEERING (one level down): blueprint + the four design reviews.
const VOLUMES = [
  {
    num: 'I', name: 'The Aquila Dossier', tone: 'read', top: true,
    file: 'The Aquila Dossier.pdf',
    // The memo and the thesis. Nothing else. A head of state does not want a document
    // explaining how to read the document — the Package Map (reading order, verification
    // chain, claim grades) is an advisor's artefact and lives in Verification/Components.
    parts: [
      { src: join(DIR_COMP, 'Executive Memo.pdf'), title: 'Executive Memo' },
      { src: join(DIR_BUILD, 'thesis-body.pdf'), title: 'Aquila Energy Thesis',
        expandSections: join(SRC_BUILD, 'thesis-body.md') },
    ],
  },
  {
    num: 'II', name: 'The Verification', tone: 'audit',
    file: 'Verification/The Verification — Thesis Appendices A–M.pdf',
    blurb: 'The arithmetic behind every number in the dossier.',
    parts: [{ src: join(DIR_BUILD, 'thesis-appendices.pdf'), title: 'Thesis Appendices A–M' }],
  },
  {
    num: 'III', name: 'The Engineering', tone: 'audit',
    file: 'Verification/The Engineering — Blueprint and Design Reviews.pdf',
    blurb: 'The engineering, allocated, internally reviewed and reproducible.',
    parts: [
      { src: join(DIR_COMP, 'Engineering Blueprint.pdf'), title: 'Lightway Engineering Blueprint' },
      { src: join(DIR_COMP, 'Design Review — PCSEL Array.pdf'), title: 'Design Review: PCSEL Array' },
      { src: join(DIR_COMP, 'Design Review — HAPS Relay.pdf'), title: 'Design Review: HAPS Relay' },
      { src: join(DIR_COMP, 'Design Review — Receiver Thermal.pdf'), title: 'Design Review: Receiver Thermal' },
      { src: join(DIR_COMP, 'Design Review — Network Operations.pdf'), title: 'Design Review: Network Operations' },
    ],
  },
];

const fontsCss = readFileSync(join(ROOT, 'private/book/assets/fonts/fonts-inline.css'), 'utf-8');
const browser = await puppeteer.launch();

async function cover(vol, docs, total) {
  const rows = docs.map((d) =>
    `<div class="row${d.sub ? ' sub' : ''}"><span class="t">${d.title}</span><span class="dots"></span><span class="p">${d.start}</span></div>`).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${fontsCss}
*{margin:0;padding:0;box-sizing:border-box}
body{width:210mm;height:297mm;background:#fdfdfc;font-family:'Cormorant Garamond',serif;color:#141414;padding:44mm 34mm 30mm;display:flex;flex-direction:column}
.class{font-family:'Inter',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#9a6a1f;margin-bottom:26mm}
.vol{font-family:'Inter',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a8a86;margin-bottom:4mm}
h1{font-size:52px;font-weight:400;line-height:1.02;letter-spacing:-0.4px;margin-bottom:7mm}
.sub{font-size:18px;color:#5a5a56;font-weight:400;line-height:1.5;max-width:132mm;margin-bottom:22mm}
.blurb{font-size:15.5px;line-height:1.62;color:#4a4a48;max-width:150mm;margin-bottom:16mm}
.toc{flex:1}
.row{display:flex;align-items:baseline;font-size:16px;margin-bottom:4.2mm}
.row.sub{font-size:12.5px;color:#6a6a68;margin-bottom:2.4mm;padding-left:7mm}
.row.sub .p{font-size:10.5px}
.row.sub .dots{border-bottom-color:#dcdcd8}
.dots{flex:1;border-bottom:1px dotted #c8c8c4;margin:0 3mm 3px}
.p{font-family:'Inter',sans-serif;font-size:12px;color:#888}
.foot{font-family:'Inter',sans-serif;font-size:9.5px;letter-spacing:0.6px;color:#a8a8a4;padding-top:6mm}
</style></head><body>
<div class="class">Confidential · Under NDA</div>
<div class="vol">${vol.top ? 'Aquila Global Infrastructure' : 'Verification · ' + vol.name}</div>
<h1>${vol.name}</h1>
<div class="sub">${vol.top ? 'Delivering energy abundance to billions of people, through the sky, with light.' : 'The Aquila Dossier · July 2026'}</div>
${vol.blurb ? `<div class="blurb">${vol.blurb}</div>` : ''}
<div class="toc">${rows}</div>
<div class="foot">Aquila Global Infrastructure · July 2026${vol.top ? '' : ' · internal verification and reproduction'}</div>
</body></html>`;
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  await page.close();
  return pdf;
}

const built = [];
for (const vol of VOLUMES) {
  const docs = [];
  let cursor = 2;
  for (const p of vol.parts) {
    if (!existsSync(p.src)) throw new Error(`missing component: ${p.src}`);
    const doc = await PDFDocument.load(readFileSync(p.src));
    docs.push({ ...p, doc, start: cursor });
    // A principal opening the dossier should see the whole argument on one page, with
    // page numbers — not one line saying "thesis, p.5". Expand it into §I–XIII.
    if (p.expandSections) {
      const secs = await sectionStartPages(p.expandSections);
      for (const sec of secs) {
        docs.push({ title: sec.title, start: cursor + sec.start - 1, sub: true, doc: null });
      }
    }
    cursor += doc.getPageCount();
  }
  const merged = await PDFDocument.create();
  const cov = await PDFDocument.load(await cover(vol, docs, cursor - 1));
  for (const p of await merged.copyPages(cov, cov.getPageIndices())) merged.addPage(p);
  for (const d of docs) {
    if (!d.doc) continue;   // a section row: a contents entry, not a document to merge
    for (const p of await merged.copyPages(d.doc, d.doc.getPageIndices())) merged.addPage(p);
  }

  // continuous numbering across the whole volume; the cover is page 1 and stays blank,
  // so the first content page is 2 — exactly what the contents cursor assumes.
  await stampPageNumbers(merged, { firstNumbered: 2, startAt: 2 });

  const file = join(OUT, vol.file);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, await merged.save());
  built.push({ vol, file, pages: merged.getPageCount() });
}
await browser.close();

// Volumes are built. NOW stamp the standalone components 1..n — after the volumes have
// consumed the unnumbered copies, never before, or the volume pages get two numbers.
for (const dir of [DIR_COMP, DIR_PRE]) {
  for (const f of readdirSync(dir)) {
    if (!f.toLowerCase().endsWith('.pdf')) continue;
    const path = join(dir, f);
    const doc = await PDFDocument.load(readFileSync(path));
    await stampPageNumbers(doc, { firstNumbered: 1, startAt: 1 });
    writeFileSync(path, await doc.save());
  }
}

// ---------------------------------------------------------------- 4. the README
const pp = (n) => built.find((b) => b.vol.num === n).pages;
writeFileSync(join(OUT, 'README.txt'), `THE AQUILA DOSSIER
Aquila Global Infrastructure · July 2026
Confidential · Institutional Investment Reference


Two documents sit at this level. Read the second one.


Lightway — Pre-NDA Briefing.pdf         Shareable. No NDA required. Every number in it
                                        appears verbatim in the dossier below, at the
                                        same claim grade.

The Aquila Dossier.pdf                  ${String(pp('I')).padStart(3)} pp   THE DOCUMENT.
                                        Reading order, the executive memo, and the
                                        thesis (§I–XIII). The whole bet, and the
                                        argument for it.


Verification/                           ${pp('II') + pp('III')} pp. Every material claim in the dossier,
                                        internally checked and reproducible. One click away.

    The Verification —                  ${String(pp('II')).padStart(3)} pp   Physics derivations, the economic
    Thesis Appendices A–M.pdf                  and financial models, the three-prior
                                               valuation, falsifiers F1–F35, the
                                               corridor pipeline, IP and export control,
                                               the programme and risk registers.

    The Engineering —                   ${String(pp('III')).padStart(3)} pp   The build document and four
    Blueprint and Design Reviews.pdf           internal design reviews. Every number
                                               recomputed from first principles or cited.

    Components/                         ${COMPONENTS.length + 1} individual documents, if an advisor wants
                                        one on its own rather than a bound volume.

    Models/                             The artefacts of record, runnable, beside the
                                        Markdown the PDFs are rendered from.

.build/                                 Build intermediates. Ignore.


ATTACK THESE THREE FIRST
    The PCSEL kilowatt die              Design Review: PCSEL Array §1.2; falsifier F1
    The 0.5 urad two-platform pointing  Design Review: HAPS Relay; WP-B2
    The service-revenue line            Thesis §VIII; falsifier F22 — and Prior 3 of §IX,
                                        which prices the entire case with it struck to zero.


REPRODUCE IT YOURSELF

Nothing here asks to be taken on trust. Verification/Models/ holds the models the
documents are generated from, beside the Markdown sources they are checked against.
Python 3 and Node, no dependencies to install. From Verification/Models/sim/:

    python3 validate_package.py         binds every document to every model and
                                        fails on any figure that has drifted
    python3 corridor_model.py --show    the reference corridor, figure by figure.
                                        Ends by asserting the document agrees.
    python3 econ_model.py --prior hostile   the §IX valuation under hostile priors
    python3 network_sim.py --table F18  the joint-blockage falsifier that fired

Change the priors to yours. The two that decide the case are the input energy price
and the chain efficiency; corridor_model.py --source-curve prices the first one.
`);

// ---------------------------------------------------------------- 5. report
const line = (l, r) => `    ${l.padEnd(38)} ${r}`;
console.log(`
  pdfs/dossier-aquila/
    README.txt
    Lightway — Pre-NDA Briefing.pdf          shareable, no NDA
    The Aquila Dossier.pdf                   ${String(pp('I')).padStart(3)} pp  ← THE DOCUMENT (memo + thesis §I–XIII)
    Verification/                            ${pp('II') + pp('III')} pp  internal verification
        The Verification — Appendices.pdf    ${String(pp('II')).padStart(3)} pp
        The Engineering — Blueprint…pdf      ${String(pp('III')).padStart(3)} pp
        Components/                          ${COMPONENTS.length + 1} individual documents
        Models/                              ${simFiles.length} runnable model files
`);
console.log(`  Total: ${built.reduce((a, b) => a + b.pages, 0)} pp.\n`);
