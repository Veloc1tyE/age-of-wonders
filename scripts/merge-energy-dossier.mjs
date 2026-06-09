#!/usr/bin/env node
/**
 * Assemble the Ministry of Energy delivery into separate deliverables:
 *
 *   Standalone — Presidential Letter of Support
 *     Stands on its own as the sovereign endorsement, delivered separately
 *     from the briefing.
 *
 *   Standalone — Presidential Briefing Booklet (Spear)
 *     The reading booklet addressed to His Excellency the President.
 *
 *   Package A — Minister's Briefing (public, pre-NDA)
 *     Presented to the Minister: cover letter, concept note, project proposal.
 *
 *   Package B — Confidential Technical Dossier (NDA-gated)
 *     Unlocked after NDA execution: NDA → MOU → strategic thesis →
 *     Appendix F (safety) → Appendix G (technology & economics).
 *
 * Usage:
 *   node scripts/merge-energy-dossier.mjs
 */
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());
const OUT_ROOT = path.join(ROOT, 'dossier-energy-package');

const MINISTER_NAME = 'Aquila — Minister\'s Briefing — Hon. July Moyo — June 2026';
const CONFIDENTIAL_NAME = 'Aquila — Confidential Technical Dossier — June 2026';

const MINISTER_PKG = path.join(OUT_ROOT, MINISTER_NAME);
const CONFIDENTIAL_PKG = path.join(OUT_ROOT, CONFIDENTIAL_NAME);

// Standalone sovereign endorsement, delivered on its own.
const PRESIDENTIAL_SRC = 'pdfs/legal/letter-presidential-support.pdf';
const PRESIDENTIAL_DEST = 'Letter of Support — President of the Republic of Zimbabwe — June 2026.pdf';

// Standalone presidential briefing booklet.
const SPEAR_SRC = 'pdfs/zimbabwe-thesis-spear.pdf';
const SPEAR_DEST = 'Presidential Briefing — Energy Abundance — June 2026.pdf';

// Standalone concept note for the Minister.
const CONCEPT_NOTE_SRC  = 'pdfs/concept-note-moyo.pdf';
const CONCEPT_NOTE_DEST = 'Concept Note — Energy Network of Light — June 2026.pdf';

// [ source PDF (from ROOT), package subfolder, numbered filename ]
const MINISTER_SOURCES = [
  ['pdfs/cover-letter-moyo.pdf',                  '00_READ_FIRST', '00.00_Cover Letter — Hon. July Moyo.pdf'],
  ['pdfs/concept-note-moyo.pdf',                  '01_PROGRAMME',  '01.01_Concept Note — Energy Network of Light.pdf'],
  ['pdfs/project-proposal-energy.pdf',            '01_PROGRAMME',  '01.02_Project Proposal — National Energy Network Programme.pdf'],
];

const CONFIDENTIAL_SOURCES = [
  ['pdfs/legal/nda-energy.pdf',                   '01_LEGAL_INSTRUMENTS',    '01.01_Mutual Non-Disclosure Agreement.pdf'],
  ['pdfs/legal/mou-energy.pdf',                   '01_LEGAL_INSTRUMENTS',    '01.02_Memorandum of Understanding.pdf'],
  ['pdfs/thesis-energy.pdf',                      '02_STRATEGIC_THESIS',     '02.01_Strategic Thesis — The National Energy Network.pdf'],
  ['pdfs/appendix-f-safety-framework.pdf',        '03_TECHNICAL_APPENDICES', '03.01_Appendix F — Active Safety Framework.pdf'],
  ['pdfs/appendix-g-technology-and-economics.pdf','03_TECHNICAL_APPENDICES', '03.02_Appendix G — Technology and Economics.pdf'],
];

async function placeSources(sources, pkgDir) {
  for (const [src, folder, dest] of sources) {
    await mkdir(path.join(pkgDir, folder), { recursive: true });
    await copyFile(path.join(ROOT, src), path.join(pkgDir, folder, dest));
    console.log(`  placed ${folder}/${dest}`);
  }
}

async function mergePdfs(sources, pkgDir, outPath) {
  const merged = await PDFDocument.create();
  let totalPages = 0;
  for (const [, folder, file] of sources) {
    const fp = path.join(pkgDir, folder, file);
    const bytes = await readFile(fp);
    const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const indices = src.getPageIndices();
    const pages = await merged.copyPages(src, indices);
    pages.forEach((p) => merged.addPage(p));
    console.log(`  + ${file} (${indices.length} pages)`);
    totalPages += indices.length;
  }
  const out = await merged.save();
  await writeFile(outPath, out);
  console.log(`\n  Wrote ${path.relative(ROOT, outPath)} (${totalPages} pages, ${(out.length / 1024 / 1024).toFixed(1)} MB)\n`);
}

async function main() {
  await mkdir(OUT_ROOT, { recursive: true });
  await mkdir(MINISTER_PKG, { recursive: true });
  await mkdir(CONFIDENTIAL_PKG, { recursive: true });

  console.log('\n── Standalone: Presidential Letter of Support ──────────────────────');
  await copyFile(path.join(ROOT, PRESIDENTIAL_SRC), path.join(OUT_ROOT, PRESIDENTIAL_DEST));
  console.log(`  wrote ${PRESIDENTIAL_DEST}`);

  console.log('\n── Standalone: Presidential Briefing Booklet (Spear) ───────────────');
  await copyFile(path.join(ROOT, SPEAR_SRC), path.join(OUT_ROOT, SPEAR_DEST));
  console.log(`  wrote ${SPEAR_DEST}`);

  console.log('\n── Standalone: Concept Note — Energy Network of Light ──────────────');
  await copyFile(path.join(ROOT, CONCEPT_NOTE_SRC), path.join(OUT_ROOT, CONCEPT_NOTE_DEST));
  console.log(`  wrote ${CONCEPT_NOTE_DEST}`);

  console.log('\n── Package A: Minister\'s Briefing ──────────────────────────────────');
  await placeSources(MINISTER_SOURCES, MINISTER_PKG);
  console.log('\nCombined binder:');
  const ministerBinder = path.join(MINISTER_PKG, `${MINISTER_NAME}.pdf`);
  await mergePdfs(MINISTER_SOURCES, MINISTER_PKG, ministerBinder);
  // Also surface as a top-level standalone, mirroring the presidential documents.
  await copyFile(ministerBinder, path.join(OUT_ROOT, `${MINISTER_NAME}.pdf`));
  console.log(`  standalone: ${MINISTER_NAME}.pdf`);

  console.log('── Package B: Confidential Technical Dossier (NDA-gated) ───────────');
  await placeSources(CONFIDENTIAL_SOURCES, CONFIDENTIAL_PKG);
  console.log('\nCombined binder:');
  await mergePdfs(
    CONFIDENTIAL_SOURCES,
    CONFIDENTIAL_PKG,
    path.join(CONFIDENTIAL_PKG, `${CONFIDENTIAL_NAME}.pdf`),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
