import type { SQLiteBindValue } from 'expo-sqlite';

import {
  EDIBILITY_CATEGORIES,
  FEATURE_KEYS,
  FEATURE_VOCABULARIES,
  HABITATS,
  SUBSTRATE_GROUPS,
  TREE_GENERA,
  type DangerousLookalike,
  type EdibilityCategory,
  type FeatureKey,
  type Habitat,
  type Month,
  type Mushroom,
  type MushroomId,
  type SubstrateGroup,
  type TreeGenus,
} from '../../domain';
import type { AtlasSort } from '../../features/atlas/engine/atlasEngine';
import {
  FACETS,
  FACET_IDS,
  recordByFacet,
  type AtlasFeatureKey,
  type Facet,
  type FacetId,
} from '../../features/atlas/engine/facets';
import type { FilterIndex, IndexedSpecies } from '../../features/filter/engine/filterIndex';
import { getDb } from '../client';
import {
  MORPHOLOGY_COLUMNS,
  MORPHOLOGY_KEY_TO_COLUMN,
  buildFtsMatchQuery,
  type MorphologyColumn,
} from '../schema';
import type {
  AtlasFacetsResult,
  AtlasQueryParams,
  AtlasSpeciesRow,
  DatabaseMeta,
  PredictorSpeciesRow,
  SpeciesBasicInfo,
} from '../types';

const MORPHOLOGY_SELECT_SQL = MORPHOLOGY_COLUMNS.map((c) => `s.${c.column}`).join(', ');

/* ------------------------------ Pomocniki bitowe ------------------------------ */

function maskFromVocabulary<T extends string>(vocabulary: readonly T[], values: readonly string[]): number {
  let mask = 0;
  for (const value of values) {
    const idx = vocabulary.indexOf(value as T);
    if (idx >= 0) mask |= 1 << idx;
  }
  return mask;
}

function decodeMask<T extends string>(vocabulary: readonly T[], mask: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < vocabulary.length; i++) {
    if ((mask & (1 << i)) !== 0) {
      const value = vocabulary[i];
      if (value !== undefined) result.push(value);
    }
  }
  return result;
}

function monthsRangeMask(from: Month, to: Month): number {
  let mask = 0;
  for (let m = from; m <= to; m++) {
    mask |= 1 << (m - 1);
  }
  return mask;
}

function isAtlasFeatureKey(id: FacetId): id is AtlasFeatureKey {
  return id !== 'edibility' && id !== 'legal' && id !== 'habitat' && id !== 'trees' && id !== 'substrate';
}

/* --------------------------------- Metadane ----------------------------------- */

let cachedMeta: DatabaseMeta | null = null;

export function getDatabaseMeta(): DatabaseMeta {
  if (cachedMeta) return cachedMeta;

  const db = getDb();
  const rows = db.getAllSync<{ readonly key: string; readonly value: string }>(
    'SELECT key, value FROM db_meta',
  );
  const map = new Map(rows.map((r) => [r.key, r.value]));

  cachedMeta = {
    schemaVersion: map.get('schema_version') ?? '1',
    dataVersion: map.get('data_version') ?? 'unknown',
    speciesCount: Number(map.get('species_count') ?? '0'),
  };
  return cachedMeta;
}

/* ----------------------------------- Atlas ------------------------------------ */

interface RawAtlasRow {
  readonly id: string;
  readonly polish_name: string;
  readonly scientific_name: string;
  readonly vernacular_short: string;
  readonly edibility_category: EdibilityCategory;
  readonly dangerous: 0 | 1;
  readonly legally_protected: 0 | 1;
  readonly months_mask: number;
  readonly months_label: string;
}

function buildBaseWhereClause(
  params: Pick<AtlasQueryParams, 'search' | 'months'>,
): { readonly conditions: string[]; readonly bindParams: SQLiteBindValue[] } {
  const conditions: string[] = [];
  const bindParams: SQLiteBindValue[] = [];

  const ftsQuery = buildFtsMatchQuery(params.search);
  if (ftsQuery) {
    conditions.push('s.id IN (SELECT id FROM species_fts WHERE species_fts MATCH ?)');
    bindParams.push(ftsQuery);
  }

  if (params.months) {
    conditions.push('(s.months_mask & ?) != 0');
    bindParams.push(monthsRangeMask(params.months.from, params.months.to));
  }

  return { conditions, bindParams };
}

function appendFacetConditions(
  facets: AtlasQueryParams['facets'],
  conditions: string[],
  bindParams: SQLiteBindValue[],
): void {
  for (const id of FACET_IDS) {
    const selected = facets[id];
    if (!selected || selected.length === 0) continue;

    if (id === 'edibility') {
      const placeholders = selected.map(() => '?').join(', ');
      conditions.push(`s.edibility_category IN (${placeholders})`);
      bindParams.push(...selected);
    } else if (id === 'legal') {
      conditions.push('s.legally_protected = 1');
    } else if (id === 'habitat') {
      conditions.push('(s.habitats_mask & ?) != 0');
      bindParams.push(maskFromVocabulary(HABITATS, selected));
    } else if (id === 'substrate') {
      conditions.push('(s.substrates_mask & ?) != 0');
      bindParams.push(maskFromVocabulary(SUBSTRATE_GROUPS, selected));
    } else if (id === 'trees') {
      conditions.push('(s.trees_mask IS NOT NULL AND (s.trees_mask & ?) != 0)');
      bindParams.push(maskFromVocabulary(TREE_GENERA, selected));
    } else {
      const col = MORPHOLOGY_KEY_TO_COLUMN[id];
      conditions.push(`(s.${col} & ?) != 0`);
      bindParams.push(maskFromVocabulary(FEATURE_VOCABULARIES[id], selected));
    }
  }
}

export function queryAtlasSpecies(
  query: AtlasQueryParams,
  sort: AtlasSort,
): readonly AtlasSpeciesRow[] {
  const db = getDb();
  const { conditions, bindParams } = buildBaseWhereClause(query);

  if (query.inSeasonNow) {
    conditions.push('(s.months_mask & ?) != 0');
    bindParams.push(1 << (query.currentMonth - 1));
  }

  if (query.favorableWeather && query.favorableIds !== null) {
    if (query.favorableIds.size === 0) {
      conditions.push('1 = 0');
    } else {
      const ids = [...query.favorableIds];
      conditions.push(`s.id IN (${ids.map(() => '?').join(', ')})`);
      bindParams.push(...ids);
    }
  }

  appendFacetConditions(query.facets, conditions, bindParams);

  const whereSql = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const orderBy =
    sort === 'edible_first'
      ? 'ORDER BY s.edibility_rank ASC, s.sort_key ASC'
      : sort === 'dangerous_first'
        ? 'ORDER BY s.edibility_rank DESC, s.sort_key ASC'
        : 'ORDER BY s.sort_key ASC';

  const sql = `
    SELECT
      s.id,
      s.polish_name,
      s.scientific_name,
      s.vernacular_short,
      s.edibility_category,
      s.dangerous,
      s.legally_protected,
      s.months_mask,
      s.months_label
    FROM species s
    ${whereSql}
    ${orderBy}
  `;

  return db.getAllSync<RawAtlasRow>(sql, bindParams).map((row) => ({
    id: row.id as MushroomId,
    polishName: row.polish_name,
    scientificName: row.scientific_name,
    vernacularShort: row.vernacular_short,
    edibilityCategory: row.edibility_category,
    dangerous: row.dangerous === 1,
    legallyProtected: row.legally_protected === 1,
    monthsMask: row.months_mask,
    monthsLabel: row.months_label,
  }));
}

type FacetMaskRow = {
  readonly edibility_rank: number;
  readonly legally_protected: 0 | 1;
  readonly months_mask: number;
  readonly habitats_mask: number;
  readonly substrates_mask: number;
  readonly trees_mask: number | null;
  readonly id: string;
} & Readonly<Record<MorphologyColumn, number>>;

function rowFacetMask(row: FacetMaskRow, id: FacetId): number {
  switch (id) {
    case 'edibility':
      return 1 << row.edibility_rank;
    case 'legal':
      return row.legally_protected === 1 ? 1 : 0;
    case 'habitat':
      return row.habitats_mask;
    case 'substrate':
      return row.substrates_mask;
    case 'trees':
      return row.trees_mask ?? 0;
    default:
      return row[MORPHOLOGY_KEY_TO_COLUMN[id]];
  }
}

function selectedFacetMask(id: FacetId, selected: readonly string[]): number {
  switch (id) {
    case 'edibility':
      return maskFromVocabulary(EDIBILITY_CATEGORIES, selected);
    case 'legal':
      return selected.includes('protected') ? 1 : 0;
    case 'habitat':
      return maskFromVocabulary(HABITATS, selected);
    case 'substrate':
      return maskFromVocabulary(SUBSTRATE_GROUPS, selected);
    case 'trees':
      return maskFromVocabulary(TREE_GENERA, selected);
    default:
      return maskFromVocabulary(FEATURE_VOCABULARIES[id], selected);
  }
}

function facetVocabulary(id: FacetId): readonly string[] {
  switch (id) {
    case 'edibility':
      return EDIBILITY_CATEGORIES;
    case 'legal':
      return ['protected'];
    case 'habitat':
      return HABITATS;
    case 'substrate':
      return SUBSTRATE_GROUPS;
    case 'trees':
      return TREE_GENERA;
    default:
      return FEATURE_VOCABULARIES[id];
  }
}

function addMaskToCounts(target: Record<string, number>, vocabulary: readonly string[], mask: number): void {
  let remaining = mask;
  while (remaining !== 0) {
    const bit = remaining & -remaining;
    const index = 31 - Math.clz32(bit);
    const value = vocabulary[index];
    if (value !== undefined) {
      target[value] = (target[value] ?? 0) + 1;
    }
    remaining ^= bit;
  }
}

/**
 * Oblicza liczniki faset w pojedynczym przebiegu na maskach INT z SQLite (semantyka „jak w sklepie”).
 * Wywoływać wyłącznie gdy panel filtrów jest otwarty (`filtersOpen === true`).
 */
export function computeAtlasFacets(query: AtlasQueryParams): AtlasFacetsResult {
  const db = getDb();
  const { conditions, bindParams } = buildBaseWhereClause(query);
  const whereSql = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const sql = `
    SELECT
      s.edibility_rank,
      s.legally_protected,
      s.months_mask,
      s.habitats_mask,
      s.substrates_mask,
      s.trees_mask,
      s.id,
      ${MORPHOLOGY_SELECT_SQL}
    FROM species s
    ${whereSql}
  `;

  const rows = db.getAllSync<FacetMaskRow>(sql, bindParams);
  const currentMonthBit = 1 << (query.currentMonth - 1);

  const activeFacets: { readonly id: FacetId; readonly mask: number }[] = [];
  for (const id of FACET_IDS) {
    const selected = query.facets[id];
    if (selected && selected.length > 0) {
      activeFacets.push({ id, mask: selectedFacetMask(id, selected) });
    }
  }

  const counts = recordByFacet((): Record<string, number> => ({}));
  let inSeasonNowCount = 0;
  let favorableWeatherCount = 0;

  for (const row of rows) {
    const inSeasonNow = (row.months_mask & currentMonthBit) !== 0;

    let failedCount = 0;
    let onlyFailedId: FacetId | null = null;
    for (const active of activeFacets) {
      if ((rowFacetMask(row, active.id) & active.mask) === 0) {
        failedCount += 1;
        onlyFailedId = active.id;
        if (failedCount >= 2) break;
      }
    }

    const isFavorable = query.favorableIds !== null && query.favorableIds.has(row.id as MushroomId);
    if (failedCount === 0 && (!query.inSeasonNow || inSeasonNow) && isFavorable) {
      favorableWeatherCount += 1;
    }
    if (query.favorableWeather && query.favorableIds !== null && !isFavorable) continue;

    if (failedCount === 0 && inSeasonNow) {
      inSeasonNowCount += 1;
    }
    if (query.inSeasonNow && !inSeasonNow) continue;

    if (failedCount === 0) {
      for (const id of FACET_IDS) {
        addMaskToCounts(counts[id], facetVocabulary(id), rowFacetMask(row, id));
      }
    } else if (failedCount === 1 && onlyFailedId !== null) {
      addMaskToCounts(counts[onlyFailedId], facetVocabulary(onlyFailedId), rowFacetMask(row, onlyFailedId));
    }
  }

  return { counts, inSeasonNowCount, favorableWeatherCount }
}

let cachedAtlasFacets: Readonly<Record<FacetId, Facet>> | null = null;

/** Fasety z opcjami faktycznie obecnymi w bazie (cache w pamięci po pierwszym odczycie). */
export function getAvailableAtlasFacets(): Readonly<Record<FacetId, Facet>> {
  if (cachedAtlasFacets) return cachedAtlasFacets;

  const db = getDb();
  const rows = db.getAllSync<FacetMaskRow>(`
    SELECT
      s.edibility_rank,
      s.legally_protected,
      s.months_mask,
      s.habitats_mask,
      s.substrates_mask,
      s.trees_mask,
      ${MORPHOLOGY_SELECT_SQL}
    FROM species s
  `);

  const unionMasks = recordByFacet(() => 0) as Record<FacetId, number>;
  for (const row of rows) {
    for (const id of FACET_IDS) {
      unionMasks[id] |= rowFacetMask(row, id);
    }
  }

  cachedAtlasFacets = recordByFacet((id): Facet => {
    const present = new Set(decodeMask(facetVocabulary(id), unionMasks[id]));
    const facet = FACETS[id];
    return {
      ...facet,
      options: facet.options.filter((option) => present.has(option.value)),
    };
  });

  return cachedAtlasFacets;
}

/* ------------------------------------ Quiz ------------------------------------ */

type RawQuizRow = {
  readonly id: string;
  readonly polish_name: string;
  readonly scientific_name: string;
  readonly edibility_category: EdibilityCategory;
  readonly dangerous: 0 | 1;
  readonly deadly: 0 | 1;
  readonly habitats_mask: number;
  readonly substrates_mask: number;
  readonly trees_mask: number | null;
  readonly only_mycorrhizal: 0 | 1;
  readonly lookalikes_json: string;
} & Readonly<Record<MorphologyColumn, number>>;

export interface QuizIndexBundle {
  readonly filterIndex: FilterIndex;
  readonly speciesById: ReadonlyMap<MushroomId, SpeciesBasicInfo>;
}

/**
 * Zastępuje `buildFilterIndex(MUSHROOM_DB)`.
 * Pojedyncze synchroniczne zapytanie SQL pobierające gotowe maski bitowe i `lookalikes_json`.
 */
export function loadQuizIndexBundle(): QuizIndexBundle {
  const db = getDb();
  const meta = getDatabaseMeta();

  const rows = db.getAllSync<RawQuizRow>(`
    SELECT
      s.id,
      s.polish_name,
      s.scientific_name,
      s.edibility_category,
      s.dangerous,
      s.deadly,
      s.habitats_mask,
      s.substrates_mask,
      s.trees_mask,
      s.only_mycorrhizal,
      s.lookalikes_json,
      ${MORPHOLOGY_SELECT_SQL}
    FROM species s
    ORDER BY s.sort_key ASC
  `);

  const species: IndexedSpecies[] = [];
  const speciesById = new Map<MushroomId, SpeciesBasicInfo>();

  for (const row of rows) {
    const id = row.id as MushroomId;
    const masks = Object.fromEntries(
      FEATURE_KEYS.map((key) => [key, row[MORPHOLOGY_KEY_TO_COLUMN[key]]]),
    ) as Record<FeatureKey, number>;

    const treePartners: ReadonlySet<TreeGenus> | null =
      row.only_mycorrhizal === 1 && row.trees_mask !== null
        ? new Set(decodeMask(TREE_GENERA, row.trees_mask))
        : null;

    const substrateGroups: ReadonlySet<SubstrateGroup> = new Set(
      decodeMask(SUBSTRATE_GROUPS, row.substrates_mask),
    );
    const habitats: ReadonlySet<Habitat> = new Set(decodeMask(HABITATS, row.habitats_mask));
    const lookalikes = JSON.parse(row.lookalikes_json) as readonly DangerousLookalike[];

    species.push({
      id,
      dangerous: row.dangerous === 1,
      deadly: row.deadly === 1,
      masks,
      treePartners,
      substrateGroups,
      habitats,
      lookalikes,
    });

    speciesById.set(id, {
      id,
      polishName: row.polish_name,
      scientificName: row.scientific_name,
      edibilityCategory: row.edibility_category,
    });
  }

  return {
    filterIndex: { dataVersion: meta.dataVersion, species },
    speciesById,
  };
}

/* ----------------------------- Szczegóły gatunku ------------------------------ */

export function getSpeciesDetailsById(id: string): Mushroom | null {
  const db = getDb();
  const row = db.getFirstSync<{ readonly details_json: string }>(
    'SELECT details_json FROM species WHERE id = ?',
    [id],
  );
  if (!row) return null;
  return JSON.parse(row.details_json) as Mushroom;
}

export function getSpeciesBasicByIds(
  ids: readonly MushroomId[],
): ReadonlyMap<MushroomId, SpeciesBasicInfo> {
  if (ids.length === 0) return new Map();

  const db = getDb();
  const placeholders = ids.map(() => '?').join(', ');
  const rows = db.getAllSync<{
    readonly id: string;
    readonly polish_name: string;
    readonly scientific_name: string;
    readonly edibility_category: EdibilityCategory;
  }>(
    `SELECT id, polish_name, scientific_name, edibility_category FROM species WHERE id IN (${placeholders})`,
    [...ids],
  );

  const map = new Map<MushroomId, SpeciesBasicInfo>();
  for (const row of rows) {
    const id = row.id as MushroomId;
    map.set(id, {
      id,
      polishName: row.polish_name,
      scientificName: row.scientific_name,
      edibilityCategory: row.edibility_category,
    });
  }
  return map;
}

/* --------------------------------- Predyktor ---------------------------------- */

interface RawPredictorRow {
  readonly id: string;
  readonly polish_name: string;
  readonly scientific_name: string;
  readonly edibility_category: EdibilityCategory;
  readonly months_mask: number;
  readonly opt_temp_min: number;
  readonly opt_temp_max: number;
  readonly min_precip_mm: number;
  readonly lag_min: number;
  readonly lag_max: number;
  readonly frost_sensitive: 0 | 1;
}

export function getPredictorSpeciesForMonth(month: Month): readonly PredictorSpeciesRow[] {
  const db = getDb();
  const monthBit = 1 << (month - 1);

  return db
    .getAllSync<RawPredictorRow>(
      `
      SELECT
        id,
        polish_name,
        scientific_name,
        edibility_category,
        months_mask,
        opt_temp_min,
        opt_temp_max,
        min_precip_mm,
        lag_min,
        lag_max,
        frost_sensitive
      FROM species
      WHERE (months_mask & ?) != 0
      ORDER BY sort_key ASC
    `,
      [monthBit],
    )
    .map((row) => ({
      id: row.id as MushroomId,
      polishName: row.polish_name,
      scientificName: row.scientific_name,
      edibilityCategory: row.edibility_category,
      monthsMask: row.months_mask,
      optTempMin: row.opt_temp_min,
      optTempMax: row.opt_temp_max,
      minPrecipMm: row.min_precip_mm,
      lagMin: row.lag_min,
      lagMax: row.lag_max,
      frostSensitive: row.frost_sensitive === 1,
    }));
}

export function getMaxFruitingLagDays(): number {
  const db = getDb();
  const row = db.getFirstSync<{ readonly max_lag: number | null }>(
    'SELECT MAX(lag_max) AS max_lag FROM species',
  );
  return row?.max_lag ?? 0;
}

// Eksport pomocniczy dla ewentualnej weryfikacji typu w przyszłości
export { isAtlasFeatureKey };