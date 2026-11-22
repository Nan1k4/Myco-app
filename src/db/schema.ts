import type { FeatureKey } from '../domain';

export const DB_NAME = 'myco.db';
export const DB_SCHEMA_VERSION = '1';
/** Musi zgadzać się z `MUSHROOM_DB.dataVersion` (weryfikowane przez `build:db`). */
export const DB_DATA_VERSION = '2026.11.4';
export const DB_VERSION_TAG = `${DB_SCHEMA_VERSION}:${DB_DATA_VERSION}`;

export const MORPHOLOGY_COLUMNS = [
  { key: 'hymenophore', column: 'm_hymenophore' },
  { key: 'gillAttachment', column: 'm_gill_attachment' },
  { key: 'capColor', column: 'm_cap_color' },
  { key: 'capShape', column: 'm_cap_shape' },
  { key: 'capSize', column: 'm_cap_size' },
  { key: 'capSurface', column: 'm_cap_surface' },
  { key: 'capMargin', column: 'm_cap_margin' },
  { key: 'capPeelability', column: 'm_cap_peelability' },
  { key: 'hymenophoreColor', column: 'm_hymenophore_color' },
  { key: 'sporePrint', column: 'm_spore_print' },
  { key: 'capFleshColor', column: 'm_cap_flesh_color' },
  { key: 'capFleshColorChange', column: 'm_cap_flesh_color_change' },
  { key: 'bruising', column: 'm_bruising' },
  { key: 'latex', column: 'm_latex' },
  { key: 'stipeShape', column: 'm_stipe_shape' },
  { key: 'stipeInterior', column: 'm_stipe_interior' },
  { key: 'stipeSurface', column: 'm_stipe_surface' },
  { key: 'stipeColor', column: 'm_stipe_color' },
  { key: 'stipeFleshColor', column: 'm_stipe_flesh_color' },
  { key: 'stipeFleshColorChange', column: 'm_stipe_flesh_color_change' },
  { key: 'volva', column: 'm_volva' },
  { key: 'stipeBase', column: 'm_stipe_base' },
  { key: 'ring', column: 'm_ring' },
  { key: 'growthHabit', column: 'm_growth_habit' },
  { key: 'smell', column: 'm_smell' },
  { key: 'taste', column: 'm_taste' },
] as const satisfies readonly { readonly key: FeatureKey; readonly column: string }[];

export type MorphologyKey = FeatureKey;
export type MorphologyColumn = (typeof MORPHOLOGY_COLUMNS)[number]['column'];

export const MORPHOLOGY_KEY_TO_COLUMN: Readonly<Record<MorphologyKey, MorphologyColumn>> =
  Object.fromEntries(MORPHOLOGY_COLUMNS.map(({ key, column }) => [key, column])) as Record<
    MorphologyKey,
    MorphologyColumn
  >;

export function normalizeSearchText(input: string): string {
  return input
    .toLowerCase()
    .replace(/\u0142/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildFtsMatchQuery(rawQuery: string): string | null {
  const normalized = normalizeSearchText(rawQuery);
  if (!normalized) return null;

  return normalized
    .split(' ')
    .filter(Boolean)
    .map((token) => `${token}*`)
    .join(' ');
}

export function buildCreateSchemaSql(): string {
  const morphologyColsSql = MORPHOLOGY_COLUMNS.map(
    ({ column }) => `${column} INTEGER NOT NULL DEFAULT 0`,
  ).join(',\n  ');

  return `
CREATE TABLE db_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE species (
  id TEXT PRIMARY KEY,
  polish_name TEXT NOT NULL,
  sort_key TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  vernacular_short TEXT NOT NULL,
  edibility_category TEXT NOT NULL,
  edibility_rank INTEGER NOT NULL,
  dangerous INTEGER NOT NULL DEFAULT 0,
  deadly INTEGER NOT NULL DEFAULT 0,
  legally_protected INTEGER NOT NULL DEFAULT 0,
  months_mask INTEGER NOT NULL DEFAULT 0,
  months_label TEXT NOT NULL,
  habitats_mask INTEGER NOT NULL DEFAULT 0,
  substrates_mask INTEGER NOT NULL DEFAULT 0,
  trees_mask INTEGER,
  only_mycorrhizal INTEGER NOT NULL DEFAULT 0,
  ${morphologyColsSql},
  opt_temp_min REAL NOT NULL,
  opt_temp_max REAL NOT NULL,
  min_precip_mm REAL NOT NULL,
  lag_min INTEGER NOT NULL,
  lag_max INTEGER NOT NULL,
  frost_sensitive INTEGER NOT NULL DEFAULT 0,
  lookalikes_json TEXT NOT NULL,
  details_json TEXT NOT NULL
);

CREATE INDEX idx_species_sort ON species (sort_key);
CREATE INDEX idx_species_edibility ON species (edibility_rank, sort_key);

CREATE VIRTUAL TABLE species_fts USING fts5(
  id UNINDEXED,
  search_text,
  tokenize = 'unicode61'
);
`;
}