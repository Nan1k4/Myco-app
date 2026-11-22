/**
 * @file Zapytanie atlasu: wyszukiwanie + fasety + sezon → posortowana lista i liczniki opcji.
 * @module features/atlas/engine/atlasEngine
 */
import { EDIBILITY_CATEGORIES, type Month, type Mushroom, type MushroomDatabase } from '../../../domain';
import { FACETS, FACET_IDS, recordByFacet, type Facet, type FacetId, type FacetOption } from './facets';

export interface MonthRange {
  readonly from: Month;
  readonly to: Month;
}

export type FacetSelections = { readonly [F in FacetId]?: readonly string[] };

export interface AtlasFilters {
  readonly facets: FacetSelections;
  readonly months: MonthRange | null;
  readonly inSeasonNow: boolean;
  readonly favorableWeather: boolean;
}

export type AtlasSort = 'alpha' | 'edible_first' | 'dangerous_first';

export const EMPTY_FILTERS: AtlasFilters = { 
  facets: {}, 
  months: null, 
  inSeasonNow: false,
  favorableWeather: false
};

interface AtlasEntry {
  readonly species: Mushroom;
  readonly searchText: string;
  readonly values: Readonly<Record<FacetId, ReadonlySet<string>>>;
  readonly months: ReadonlySet<Month>;
}

export interface AtlasIndex {
  readonly entries: readonly AtlasEntry[];
  readonly facets: Readonly<Record<FacetId, Facet>>;
}

export interface AtlasQuery {
  readonly filters: AtlasFilters;
  readonly sort: AtlasSort;
  readonly search: string;
  readonly currentMonth: Month;
}

export interface AtlasResult {
  readonly species: readonly Mushroom[];
  readonly total: number;
  readonly counts: Readonly<Record<FacetId, Readonly<Record<string, number>>>>;
  readonly inSeasonNowCount: number;
}

export function buildAtlasIndex(db: MushroomDatabase): AtlasIndex {
  const entries = db.species.map(toEntry);
  const facets = recordByFacet((id): Facet => {
    const present = new Set(entries.flatMap((entry) => [...entry.values[id]]));
    const facet = FACETS[id];
    return { ...facet, options: facet.options.filter((option) => present.has(option.value)) };
  });
  return { entries, facets };
}

export function queryAtlas(index: AtlasIndex, { filters, sort, search, currentMonth }: AtlasQuery): AtlasResult {
  const needle = normalizeSearch(search);
  const active = FACET_IDS.flatMap((id) => {
    const selected = filters.facets[id];
    return selected && selected.length > 0 ? [{ id, selected }] : [];
  });
  const counts = recordByFacet((): Record<string, number> => ({}));
  const matching: Mushroom[] = [];
  let inSeasonNowCount = 0;

  for (const entry of index.entries) {
    if (needle && !entry.searchText.includes(needle)) continue;
    if (filters.months && !overlaps(entry.months, filters.months)) continue;
    const inSeasonNow = entry.months.has(currentMonth);

    const failed = active.filter(({ id, selected }) => !selected.some((value) => entry.values[id].has(value)));
    if (failed.length === 0 && inSeasonNow) inSeasonNowCount += 1;
    if (filters.inSeasonNow && !inSeasonNow) continue;

    const [onlyFailure, ...more] = failed;
    if (!onlyFailure) {
      matching.push(entry.species);
      for (const id of FACET_IDS) addCounts(counts[id], entry.values[id]);
    } else if (more.length === 0) {
      addCounts(counts[onlyFailure.id], entry.values[onlyFailure.id]);
    }
  }

  return { species: matching.sort(COMPARATORS[sort]), total: index.entries.length, counts, inSeasonNowCount };
}

export function activeFilterCount(filters: AtlasFilters, weatherAvailable = true): number {
  const facetCount = FACET_IDS.reduce((sum, id) => sum + (filters.facets[id]?.length ?? 0), 0);
  return (
    facetCount +
    (filters.months ? 1 : 0) +
    (filters.inSeasonNow ? 1 : 0) +
    (filters.favorableWeather && weatherAvailable ? 1 : 0)
  );
}

export function activeOptions(index: AtlasIndex, filters: AtlasFilters): readonly { readonly facet: FacetId; readonly option: FacetOption }[] {
  return FACET_IDS.flatMap((facet) => {
    const selected = new Set(filters.facets[facet] ?? []);
    return index.facets[facet].options.filter((option) => selected.has(option.value)).map((option) => ({ facet, option }));
  });
}

export function normalizeSearch(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (char) => PL_ASCII[char] ?? char)
    .replace(/\s+/g, ' ');
}

/* -------------------------------- Narzędzia -------------------------------- */

const PL_ASCII: Readonly<Record<string, string>> = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };

function toEntry(species: Mushroom): AtlasEntry {
  const names = [species.polishName, species.scientificName, ...species.scientificSynonyms, ...species.vernacularNames];
  return {
    species,
    searchText: normalizeSearch(names.join(' | ')),
    values: recordByFacet((id): ReadonlySet<string> => new Set(FACETS[id].valuesOf(species))),
    months: new Set(species.fruiting.months),
  };
}

function overlaps(months: ReadonlySet<Month>, { from, to }: MonthRange): boolean {
  for (const month of months) if (month >= from && month <= to) return true;
  return false;
}

function addCounts(target: Record<string, number>, values: ReadonlySet<string>): void {
  for (const value of values) target[value] = (target[value] ?? 0) + 1;
}

const byName = (a: Mushroom, b: Mushroom) => a.polishName.localeCompare(b.polishName, 'pl');
const risk = (s: Mushroom) => EDIBILITY_CATEGORIES.indexOf(s.edibility.category);

const COMPARATORS: Readonly<Record<AtlasSort, (a: Mushroom, b: Mushroom) => number>> = {
  alpha: byName,
  edible_first: (a, b) => risk(a) - risk(b) || byName(a, b),
  dangerous_first: (a, b) => risk(b) - risk(a) || byName(a, b),
};
