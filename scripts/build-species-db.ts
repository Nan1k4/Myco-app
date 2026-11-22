import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

import { MUSHROOM_DB } from '../src/data';
import {
  EDIBILITY_CATEGORIES,
  HABITATS,
  SUBSTRATE_GROUPS,
  SUBSTRATE_GROUP_OF,
  TREE_GENERA,
  isDangerousCategory,
  type FeatureKey,
  type Month,
  type Mushroom,
  type NonEmptyArray,
} from '../src/domain';
import { validateDatabase } from '../src/domain/validateDatabase';
import {
  DB_DATA_VERSION,
  DB_NAME,
  DB_SCHEMA_VERSION,
  DB_VERSION_TAG,
  MORPHOLOGY_COLUMNS,
  buildCreateSchemaSql,
  normalizeSearchText,
} from '../src/db/schema';
import { formatMonthsLabel } from '../src/features/atlas/copy.pl';
import { maskOf } from '../src/features/filter/engine/featureBits';

const OUTPUT_DIR = path.resolve(__dirname, '../assets/db');
const OUTPUT_PATH = path.join(OUTPUT_DIR, DB_NAME);

function maskFromVocabulary<T extends string>(vocabulary: readonly T[], values: readonly T[]): number {
  return values.reduce((mask, value) => {
    const index = vocabulary.indexOf(value);
    if (index < 0) {
      throw new Error(`Wartość "${value}" spoza słownika`);
    }
    return mask | (1 << index);
  }, 0);
}

function computeMonthsMask(months: readonly Month[]): number {
  return months.reduce((mask, month) => mask | (1 << (month - 1)), 0);
}

function buildMonthsLabel(months: NonEmptyArray<Month>): string {
  return formatMonthsLabel(months);
}

function buildSearchText(species: Mushroom): string {
  return normalizeSearchText(
    [
      species.polishName,
      species.scientificName,
      ...species.scientificSynonyms,
      ...species.vernacularNames,
    ].join(' '),
  );
}

function featureMask<K extends FeatureKey>(features: Mushroom['features'], key: K): number {
  return maskOf(key, features[key]);
}

function assertDatabaseValid(): void {
  if (MUSHROOM_DB.dataVersion !== DB_DATA_VERSION) {
    throw new Error(
      `Niezgodna dataVersion: src/data/index.ts ma "${MUSHROOM_DB.dataVersion}", ` +
        `a src/db/schema.ts ma "${DB_DATA_VERSION}". Zaktualizuj DB_DATA_VERSION.`,
    );
  }

  const issues = validateDatabase(MUSHROOM_DB);
  if (issues.length === 0) return;

  const report = issues.map((i) => `  - [${i.mushroomId}] ${i.rule}: ${i.detail}`).join('\n');
  throw new Error(`Walidacja bazy nie powiodła się (${issues.length} błędów):\n${report}`);
}

function main(): void {
  console.log(`[build:db] Walidacja ${MUSHROOM_DB.species.length} gatunków (wersja ${DB_VERSION_TAG})...`);
  assertDatabaseValid();

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (fs.existsSync(OUTPUT_PATH)) {
    fs.unlinkSync(OUTPUT_PATH);
  }

  const collator = new Intl.Collator('pl', { sensitivity: 'base' });
  const sortedSpecies = [...MUSHROOM_DB.species].sort((a, b) =>
    collator.compare(a.polishName, b.polishName),
  );

  const db = new Database(OUTPUT_PATH);

  try {
    db.pragma('journal_mode = OFF');
    db.pragma('synchronous = OFF');
    db.exec(buildCreateSchemaSql());

    const morphColumnNames = MORPHOLOGY_COLUMNS.map((c) => c.column);
    const allColumns = [
      'id',
      'polish_name',
      'sort_key',
      'scientific_name',
      'vernacular_short',
      'edibility_category',
      'edibility_rank',
      'dangerous',
      'deadly',
      'legally_protected',
      'months_mask',
      'months_label',
      'habitats_mask',
      'substrates_mask',
      'trees_mask',
      'only_mycorrhizal',
      ...morphColumnNames,
      'opt_temp_min',
      'opt_temp_max',
      'min_precip_mm',
      'lag_min',
      'lag_max',
      'frost_sensitive',
      'lookalikes_json',
      'details_json',
    ];

    const placeholders = allColumns.map((col) => `@${col}`).join(', ');
    const insertSpecies = db.prepare(
      `INSERT INTO species (${allColumns.join(', ')}) VALUES (${placeholders})`,
    );
    const insertFts = db.prepare(`INSERT INTO species_fts (id, search_text) VALUES (?, ?)`);
    const insertMeta = db.prepare(`INSERT INTO db_meta (key, value) VALUES (?, ?)`);

    const runInsert = db.transaction(() => {
      sortedSpecies.forEach((sp, index) => {
        const sortKey = String(index).padStart(6, '0');
        const category = sp.edibility.category;
        const edibilityRank = EDIBILITY_CATEGORIES.indexOf(category);

        const substrateGroups = [...new Set(sp.ecology.substrates.map((s) => SUBSTRATE_GROUP_OF[s]))];
        const onlyMycorrhizal = sp.ecology.trophicModes.every((m) => m === 'mycorrhizal');
        const treesMask =
          sp.ecology.mycorrhizalPartners.length > 0
            ? maskFromVocabulary(TREE_GENERA, sp.ecology.mycorrhizalPartners)
            : null;

        const morphParams: Record<string, number> = {};
        for (const { key, column } of MORPHOLOGY_COLUMNS) {
          morphParams[column] = featureMask(sp.features, key);
        }

        insertSpecies.run({
          id: sp.id,
          polish_name: sp.polishName,
          sort_key: sortKey,
          scientific_name: sp.scientificName,
          vernacular_short: sp.vernacularNames.slice(0, 2).join(', '),
          edibility_category: category,
          edibility_rank: edibilityRank,
          dangerous: isDangerousCategory(category) ? 1 : 0,
          deadly: category === 'deadly' ? 1 : 0,
          legally_protected: sp.legallyProtected ? 1 : 0,
          months_mask: computeMonthsMask(sp.fruiting.months),
          months_label: buildMonthsLabel(sp.fruiting.months),
          habitats_mask: maskFromVocabulary(HABITATS, sp.ecology.habitats),
          substrates_mask: maskFromVocabulary(SUBSTRATE_GROUPS, substrateGroups),
          trees_mask: treesMask,
          only_mycorrhizal: onlyMycorrhizal ? 1 : 0,
          ...morphParams,
          opt_temp_min: sp.fruiting.optimalMeanTempC.min,
          opt_temp_max: sp.fruiting.optimalMeanTempC.max,
          min_precip_mm: sp.fruiting.minPrecipitationMm,
          lag_min: sp.fruiting.lagDays.min,
          lag_max: sp.fruiting.lagDays.max,
          frost_sensitive: sp.fruiting.frostSensitive ? 1 : 0,
          lookalikes_json: JSON.stringify(sp.dangerousLookalikes),
          details_json: JSON.stringify(sp),
        });

        insertFts.run(sp.id, buildSearchText(sp));
      });

      insertMeta.run('version_tag', DB_VERSION_TAG);
      insertMeta.run('schema_version', DB_SCHEMA_VERSION);
      insertMeta.run('data_version', MUSHROOM_DB.dataVersion);
      insertMeta.run('species_count', String(sortedSpecies.length));
      insertMeta.run('built_at', new Date().toISOString());
    });

    runInsert();

    db.exec('VACUUM; ANALYZE;');
    const sizeKb = (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1);
    console.log(`[build:db] Gotowe: ${OUTPUT_PATH} (${sizeKb} KB, ${sortedSpecies.length} gatunków)`);
  } finally {
    db.close();
  }
}

main();