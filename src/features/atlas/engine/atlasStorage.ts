/**
 * @file Trwały zapis atlasu: bieżące filtry + sortowanie + zapisane zestawy.
 * @module features/atlas/engine/atlasStorage
 */
import type { IsoDateTime, Month } from '../../../domain';
import type { KeyValueStorage } from '../../predictor/store/persistence';
import { EMPTY_FILTERS, type AtlasFilters, type AtlasSort, type FacetSelections, type MonthRange } from './atlasEngine';
import { MAX_PRESETS, MAX_PRESET_NAME_LENGTH, type AtlasPreset } from './atlasState';
import { FACETS, FACET_IDS } from './facets';

export const ATLAS_STORAGE_KEY = 'myco.atlas';
const VERSION = 1;
const SORTS: readonly AtlasSort[] = ['alpha', 'edible_first', 'dangerous_first'];

export interface StoredAtlas {
  readonly filters: AtlasFilters;
  readonly sort: AtlasSort;
  readonly presets: readonly AtlasPreset[];
}

export const EMPTY_STORED_ATLAS: StoredAtlas = { filters: EMPTY_FILTERS, sort: 'alpha', presets: [] };

export function encodeAtlas(state: StoredAtlas): string {
  return JSON.stringify({ version: VERSION, ...state });
}

export function decodeAtlas(raw: string | null): StoredAtlas {
  if (raw === null) return EMPTY_STORED_ATLAS;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return EMPTY_STORED_ATLAS;
  }
  if (!isRecord(data) || data.version !== VERSION) return EMPTY_STORED_ATLAS;

  const presets = (Array.isArray(data.presets) ? data.presets : [])
    .flatMap((item: unknown) => {
      const preset = decodePreset(item);
      return preset ? [preset] : [];
    })
    .slice(0, MAX_PRESETS);

  return { filters: decodeFilters(data.filters), sort: decodeSort(data.sort), presets };
}

export async function loadAtlas(storage: KeyValueStorage): Promise<StoredAtlas> {
  try {
    return decodeAtlas(await storage.getItem(ATLAS_STORAGE_KEY));
  } catch {
    return EMPTY_STORED_ATLAS;
  }
}

export async function saveAtlas(storage: KeyValueStorage, state: StoredAtlas): Promise<void> {
  await storage.setItem(ATLAS_STORAGE_KEY, encodeAtlas(state));
}

/* ------------------------------- Dekodery --------------------------------- */

function decodeFilters(value: unknown): AtlasFilters {
  if (!isRecord(value)) return EMPTY_FILTERS;
  return {
    facets: decodeFacets(value.facets),
    months: decodeMonths(value.months),
    inSeasonNow: value.inSeasonNow === true,
    favorableWeather: value.favorableWeather === true,
  };
}

function decodeFacets(value: unknown): FacetSelections {
  if (!isRecord(value)) return {};
  const result: { [key: string]: readonly string[] } = {};
  for (const id of FACET_IDS) {
    const raw = value[id];
    if (!Array.isArray(raw)) continue;
    const allowed = new Set(FACETS[id].options.map((option) => option.value));
    const values = [...new Set(raw.filter((v): v is string => typeof v === 'string' && allowed.has(v)))];
    if (values.length > 0) result[id] = values;
  }
  return result;
}

function decodeMonths(value: unknown): MonthRange | null {
  if (!isRecord(value)) return null;
  const { from, to } = value;
  return isMonth(from) && isMonth(to) && from <= to && !(from === 1 && to === 12) ? { from, to } : null;
}

function decodeSort(value: unknown): AtlasSort {
  return SORTS.find((sort) => sort === value) ?? 'alpha';
}

function decodePreset(value: unknown): AtlasPreset | null {
  if (!isRecord(value)) return null;
  const { id, name, createdAt } = value;
  if (typeof id !== 'string' || id === '' || typeof name !== 'string') return null;
  const trimmed = name.trim();
  if (trimmed === '' || trimmed.length > MAX_PRESET_NAME_LENGTH) return null;
  if (typeof createdAt !== 'string' || !Number.isFinite(Date.parse(createdAt))) return null;
  return { id, name: trimmed, filters: decodeFilters(value.filters), sort: decodeSort(value.sort), createdAt: createdAt as IsoDateTime };
}

function isMonth(value: unknown): value is Month {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 12;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
