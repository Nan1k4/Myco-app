/**
 * @file Stan atlasu (czysty reducer): bieżące filtry, sortowanie, wyszukiwanie, zapisane zestawy.
 * @module features/atlas/engine/atlasState
 */
import type { IsoDateTime } from '../../../domain';
import { EMPTY_FILTERS, type AtlasFilters, type AtlasSort, type FacetSelections, type MonthRange } from './atlasEngine';
import type { FacetId } from './facets';

/** Zapisany zestaw filtrów, np. „Wystawa – trujące”. */
export interface AtlasPreset {
  readonly id: string;
  readonly name: string;
  readonly filters: AtlasFilters;
  readonly sort: AtlasSort;
  readonly createdAt: IsoDateTime;
}

export const MAX_PRESETS = 12;
export const MAX_PRESET_NAME_LENGTH = 32;

export interface AtlasState {
  readonly hydrated: boolean;
  readonly filters: AtlasFilters;
  readonly sort: AtlasSort;
  readonly search: string;
  readonly presets: readonly AtlasPreset[];
}

export const INITIAL_ATLAS_STATE: AtlasState = {
  hydrated: false,
  filters: EMPTY_FILTERS,
  sort: 'alpha',
  search: '',
  presets: [],
};

export type AtlasAction =
  | { readonly type: 'hydrate'; readonly filters: AtlasFilters; readonly sort: AtlasSort; readonly presets: readonly AtlasPreset[] }
  | { readonly type: 'toggle'; readonly facet: FacetId; readonly value: string }
  | { readonly type: 'clear_facet'; readonly facet: FacetId }
  | { readonly type: 'set_months'; readonly months: MonthRange | null }
  | { readonly type: 'set_in_season_now'; readonly value: boolean }
  | { readonly type: 'clear_all' }
  | { readonly type: 'set_sort'; readonly sort: AtlasSort }
  | { readonly type: 'set_search'; readonly search: string }
  | { readonly type: 'save_preset'; readonly preset: AtlasPreset }
  | { readonly type: 'apply_preset'; readonly id: string }
  | { readonly type: 'delete_preset'; readonly id: string }
  | { readonly type: 'set_favorable_weather'; readonly value: boolean };

export function atlasReducer(state: AtlasState, action: AtlasAction): AtlasState {
  switch (action.type) {
    case 'hydrate':
      return { ...state, hydrated: true, filters: action.filters, sort: action.sort, presets: action.presets };
    case 'toggle': {
      const current = state.filters.facets[action.facet] ?? [];
      const next = current.includes(action.value) ? current.filter((v) => v !== action.value) : [...current, action.value];
      return withFacets(state, setFacet(state.filters.facets, action.facet, next));
    }
    case 'clear_facet':
      return withFacets(state, setFacet(state.filters.facets, action.facet, []));
    case 'set_months':
      return { ...state, filters: { ...state.filters, months: isWholeYear(action.months) ? null : action.months } };
    case 'set_in_season_now':
      return { ...state, filters: { ...state.filters, inSeasonNow: action.value } };
    case 'clear_all':
      return { ...state, filters: EMPTY_FILTERS };
    case 'set_sort':
      return { ...state, sort: action.sort };
    case 'set_search':
      return { ...state, search: action.search };
    case 'save_preset': {
      if (validatePresetName(action.preset.name, state.presets) !== null) return state;
      return { ...state, presets: [...state.presets, action.preset] };
    }
    case 'apply_preset': {
      const preset = state.presets.find((p) => p.id === action.id);
      return preset ? { ...state, filters: preset.filters, sort: preset.sort } : state;
    }
    case 'delete_preset':
      return { ...state, presets: state.presets.filter((p) => p.id !== action.id) };
    case 'set_favorable_weather':
      return { ...state, filters: { ...state.filters, favorableWeather: action.value } };
  }
}

export type PresetNameError = 'empty' | 'too_long' | 'duplicate' | 'limit';

export function validatePresetName(rawName: string, presets: readonly AtlasPreset[]): PresetNameError | null {
  const name = rawName.trim();
  if (name === '') return 'empty';
  if (name.length > MAX_PRESET_NAME_LENGTH) return 'too_long';
  if (presets.some((p) => p.name.trim().toLocaleLowerCase('pl') === name.toLocaleLowerCase('pl'))) {
    return 'duplicate';
  }
  if (presets.length >= MAX_PRESETS) return 'limit';
  return null;
}

function isWholeYear(range: MonthRange | null): boolean {
  return range === null || (range.from === 1 && range.to === 12);
}

function withFacets(state: AtlasState, facets: FacetSelections): AtlasState {
  return { ...state, filters: { ...state.filters, facets } };
}

function setFacet(facets: FacetSelections, facet: FacetId, values: readonly string[]): FacetSelections {
  const { [facet]: _removed, ...rest } = facets;
  return values.length > 0 ? { ...rest, [facet]: values } : rest;
}
