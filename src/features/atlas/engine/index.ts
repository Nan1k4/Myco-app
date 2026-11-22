/**
 * @file Publiczne API silnika atlasu.
 * Użycie: `buildAtlasIndex(MUSHROOM_DB)` raz, potem `queryAtlas(index, { filters, sort, search, currentMonth })`.
 */
export {
  EMPTY_FILTERS,
  activeFilterCount,
  activeOptions,
  buildAtlasIndex,
  normalizeSearch,
  queryAtlas,
  type AtlasFilters,
  type AtlasIndex,
  type AtlasQuery,
  type AtlasResult,
  type AtlasSort,
  type FacetSelections,
  type MonthRange,
} from './atlasEngine';
export {
  INITIAL_ATLAS_STATE,
  MAX_PRESETS,
  MAX_PRESET_NAME_LENGTH,
  atlasReducer,
  validatePresetName,
  type AtlasAction,
  type AtlasPreset,
  type AtlasState,
  type PresetNameError,
} from './atlasState';
export { decodeAtlas, encodeAtlas, loadAtlas, saveAtlas, type StoredAtlas } from './atlasStorage';
export { FACETS, FACET_GROUPS, FACET_IDS, type Facet, type FacetGroupId, type FacetId, type FacetOption } from './facets';
