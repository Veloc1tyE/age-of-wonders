#!/usr/bin/env node
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());
const PKG = path.join(
  ROOT,
  'board-package',
  'Aquila Board Package — Project Phoenix and Strategic Direction — May 2026',
);

const SOURCES = [
  ['00_READ_FIRST', '00.00_READ_ME — Aquila Board Package.pdf'],
  ['00_READ_FIRST', '00.01_Board Decision Required.pdf'],
  ['01_BOARD_CORE', '01.01_Project Phoenix — Strategic Turnaround Plan.pdf'],
  ['01_BOARD_CORE', '01.02_Aquila — Strategic Direction.pdf'],
  ['01_BOARD_CORE', '01.03_Recapitalisation Framework.pdf'],
  ['02_DILIGENCE_APPENDICES', '02.01_Claim Register and Diligence Matrix.pdf'],
  ['02_DILIGENCE_APPENDICES', '02.02_Appendix F — Active Safety Framework.pdf'],
  ['02_DILIGENCE_APPENDICES', '02.03_Appendix G — Technology and Economics.pdf'],
  ['02_DILIGENCE_APPENDICES', '02.04_Appendix I — Zimbabwe Diligence Status.pdf'],
  ['03_SOVEREIGN_COUNTERPARTY_MATERIALS/Zimbabwe', '03.01_Zimbabwe Thesis — Armor.pdf'],
  ['03_SOVEREIGN_COUNTERPARTY_MATERIALS/Zimbabwe', '03.02_Zimbabwe Thesis — Spear.pdf'],
  ['03_SOVEREIGN_COUNTERPARTY_MATERIALS/Zimbabwe', '03.03_Concept Note — Zimbabwe Presidential Consideration.pdf'],
  ['03_SOVEREIGN_COUNTERPARTY_MATERIALS/Zimbabwe', '03.04_Project Proposal — Zimbabwe Energy Partnership.pdf'],
  ['03_SOVEREIGN_COUNTERPARTY_MATERIALS/Zimbabwe', '03.05_Project Proposal — ICT Partnership.pdf'],
  ['03_SOVEREIGN_COUNTERPARTY_MATERIALS/Zimbabwe', '03.06_Letter — Permanent Secretary Energy.pdf'],
  ['03_SOVEREIGN_COUNTERPARTY_MATERIALS/Zimbabwe', '03.07_Project Proposal — ZIMRA Persistent Customs Surveillance.pdf'],
  ['03_SOVEREIGN_COUNTERPARTY_MATERIALS/South Africa', '03.08_Concept Note — South Africa Presidential Consideration.pdf'],
  ['04_SUPPORTING_MATERIALS', '04.01_Aquila UAE Deck.pdf'],
];

const CORE_BINDER_INDICES = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]);

async function mergePdfs(sources, outPath) {
  const merged = await PDFDocument.create();
  let totalPages = 0;
  for (const [folder, file] of sources) {
    const fp = path.join(PKG, folder, file);
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
  return totalPages;
}

async function main() {
  await mkdir(PKG, { recursive: true });
  console.log('\nFull package binder:');
  await mergePdfs(
    SOURCES,
    path.join(
      PKG,
      'Aquila Board Package — Project Phoenix and Strategic Direction — May 2026.pdf',
    ),
  );

  const coreSources = SOURCES.filter((_, i) => CORE_BINDER_INDICES.has(i));
  const sovereignSources = SOURCES.filter((_, i) => !CORE_BINDER_INDICES.has(i));

  console.log('Core Board Pack binder:');
  await mergePdfs(
    coreSources,
    path.join(PKG, 'Aquila Board Package — Core Board Pack.pdf'),
  );

  console.log('Sovereign and Technical Appendices binder:');
  await mergePdfs(
    sovereignSources,
    path.join(
      PKG,
      'Aquila Board Package — Sovereign and Technical Appendices.pdf',
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
