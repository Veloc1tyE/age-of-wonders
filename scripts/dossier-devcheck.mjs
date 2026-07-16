#!/usr/bin/env node

/**
 * The guard that cannot be forgotten.
 *
 * The Aquila dossier site can be built in DEV MODE (DOSSIER_DEV=1), which injects an
 * in-browser editor. That build is for the author's machine and nowhere else — the shipped
 * folder goes to sovereign wealth funds. This refuses to let a dev build past.
 *
 * It greps the built site for the dev sentinel and for every editor artefact, and exits
 * non-zero if it finds one. scripts/dossier-package.mjs calls it before it packages
 * anything, so forgetting to rebuild clean fails the package rather than shipping.
 *
 *   node scripts/dossier-devcheck.mjs        # or: npm run dossier:check
 *
 * The sentinel is duplicated here on purpose. A guard should not have to import the thing
 * it is policing.
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const SITE = join(ROOT, 'private/dossier-aquila/site');

export const DEV_SENTINEL = 'AQUILA-DOSSIER-DEV-MODE-BUILD';
const ARTEFACTS = [DEV_SENTINEL, 'contenteditable', 'data-ed=', 'class="devbar"', 'id="devmodal"', '/__dev/'];

/** Throws if the built dossier site carries any trace of the editor. */
export function assertNoDevBuild(dir = SITE) {
  if (!existsSync(dir)) return { checked: 0, dir };
  const files = readdirSync(dir).filter((f) => f.endsWith('.html'));
  const bad = [];
  for (const f of files) {
    const html = readFileSync(join(dir, f), 'utf-8');
    const hits = ARTEFACTS.filter((a) => html.includes(a));
    if (hits.length) bad.push(`${f}  →  ${hits.join(', ')}`);
  }
  if (bad.length) {
    throw new Error(
      `\n  ✗ DEV-MODE BUILD DETECTED — refusing to proceed.\n\n`
      + bad.map((b) => `      ${b}`).join('\n')
      + `\n\n  This build carries the in-browser editor. It must never leave this machine.\n`
      + `  Rebuild clean, then retry:\n\n      node private/dossier-aquila/site.mjs\n`,
    );
  }
  return { checked: files.length, dir };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const { checked } = assertNoDevBuild();
    console.log(`\n  ✓ dossier site clean — ${checked} page(s), no editor, no sentinel, no contenteditable\n`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
