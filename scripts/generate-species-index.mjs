#!/usr/bin/env node
/**
 * Generuje `src/data/species/index.ts` z listy plików w `src/data/species/`.
 * Każdy plik gatunku musi eksportować dokładnie jeden rekord: `export const nazwa: Mushroom = { … }`.
 *
 * Użycie:
 *   node scripts/generate-species-index.mjs          – zapisuje index.ts
 *   node scripts/generate-species-index.mjs --check  – kod wyjścia 1, gdy index.ts jest nieaktualny (CI)
 *
 * Bez zależności (czysty Node ≥ 18), więc działa niezależnie od Metro i Jest.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SPECIES_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/species');
const INDEX_FILE = join(SPECIES_DIR, 'index.ts');
const EXPORT_PATTERN = /export\s+const\s+([A-Za-z_$][\w$]*)\s*:\s*Mushroom\b/g;

const files = readdirSync(SPECIES_DIR)
  .filter((name) => name.endsWith('.ts') && name !== 'index.ts' && !name.endsWith('.test.ts'))
  .sort();

const errors = [];
const entries = files.map((file) => {
  const source = readFileSync(join(SPECIES_DIR, file), 'utf8');
  const names = [...source.matchAll(EXPORT_PATTERN)].map((match) => match[1]);
  if (names.length !== 1) {
    errors.push(`${file}: oczekiwano 1 eksportu "export const x: Mushroom", znaleziono ${names.length}`);
  }
  return { module: file.slice(0, -'.ts'.length), name: names[0] };
});

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const output = [
  '/**',
  ' * @file Lista wszystkich gatunków. PLIK GENEROWANY – nie edytuj ręcznie.',
  ' * Po dodaniu, usunięciu lub zmianie nazwy pliku gatunku: `node scripts/generate-species-index.mjs`.',
  ' * @module data/species',
  ' */',
  "import type { Mushroom } from '../../domain';",
  ...entries.map(({ module, name }) => `import { ${name} } from './${module}';`),
  '',
  '/** Wszystkie gatunki w kolejności alfabetycznej plików. */',
  'export const ALL_SPECIES: readonly Mushroom[] = [',
  ...entries.map(({ name }) => `  ${name},`),
  '];',
  '',
].join('\n');

const normalize = (text) => text.replace(/\r\n/g, '\n');

if (process.argv.includes('--check')) {
  const current = existsSync(INDEX_FILE) ? readFileSync(INDEX_FILE, 'utf8') : '';
  if (normalize(current) !== output) {
    console.error('src/data/species/index.ts jest nieaktualny – uruchom: node scripts/generate-species-index.mjs');
    process.exit(1);
  }
  console.log(`species/index.ts aktualny (${entries.length} gatunków)`);
} else {
  writeFileSync(INDEX_FILE, output);
  console.log(`Zapisano species/index.ts (${entries.length} gatunków)`);
}
