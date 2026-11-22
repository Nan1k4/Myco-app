import type { Edibility, Month, Mushroom, NonEmptyArray } from '../../../../domain';
import { DEADLY, EDIBLE, testDatabase, testSpecies } from '../../../../domain/__fixtures__/testSpecies';
import {
  EMPTY_FILTERS,
  FACET_GROUPS,
  FACET_IDS,
  activeFilterCount,
  buildAtlasIndex,
  normalizeSearch,
  queryAtlas,
  type AtlasFilters,
  type AtlasQuery,
} from '..';

const POISONOUS: Edibility = {
  category: 'poisonous',
  syndromes: ['gastrointestinal'],
  symptomOnsetHours: { min: 1, max: 4 },
};
const UNKNOWN: Edibility = { category: 'unknown' };
const WOOD_ECOLOGY: Mushroom['ecology'] = {
  trophicModes: ['saprotrophic'],
  mycorrhizalPartners: [],
  substrates: ['wood_dead'],
  habitats: ['mixed_forest'],
};
const fruitingMonths = (months: NonEmptyArray<Month>): Mushroom['fruiting'] => ({
  months,
  optimalMeanTempC: { min: 10, max: 20 },
  minPrecipitationMm: 10,
  lagDays: { min: 3, max: 7 },
  frostSensitive: true,
});

const FIXTURE_DB = testDatabase([
  testSpecies(
    'Boletus edulis',
    EDIBLE,
    { hymenophore: ['tubes'], gillAttachment: ['not_applicable'], capColor: ['brown'] },
    { polishName: 'Borowik szlachetny', fruiting: fruitingMonths([8, 9, 10]) },
  ),
  testSpecies(
    'Cantharellus cibarius',
    EDIBLE,
    { hymenophore: ['ridges'], capColor: ['yellow'] },
    { polishName: 'Pieprznik jadalny', fruiting: fruitingMonths([6, 7, 8, 9]) },
  ),
  testSpecies(
    'Hypholoma fasciculare',
    POISONOUS,
    { hymenophore: ['gills'], capColor: ['yellow'] },
    { polishName: 'Maślanka wiązkowa', ecology: WOOD_ECOLOGY, fruiting: fruitingMonths([4, 5, 11]) },
  ),
  testSpecies(
    'Amanita phalloides',
    DEADLY,
    { hymenophore: ['gills'], capColor: ['green'], ring: ['membranous_skirt', 'none'] },
    { polishName: 'Muchomor zielonawy', vernacularNames: ['sromotnik'], fruiting: fruitingMonths([8, 9, 10]) },
  ),
  testSpecies(
    'Galerina marginata',
    DEADLY,
    { hymenophore: ['gills'], capColor: ['brown'] },
    { polishName: 'Hełmówka jadowita', ecology: WOOD_ECOLOGY, fruiting: fruitingMonths([9, 10, 11]) },
  ),
  testSpecies(
    'Cortinarius ignotus',
    UNKNOWN,
    { hymenophore: ['gills'], capColor: ['violet'] },
    { polishName: 'Zasłonak nieznany', fruiting: fruitingMonths([9]) },
  ),
]);

const index = buildAtlasIndex(FIXTURE_DB);
const run = (patch: Partial<AtlasQuery> = {}) =>
  queryAtlas(index, { filters: EMPTY_FILTERS, sort: 'alpha', search: '', currentMonth: 9, ...patch });
const withFacets = (facets: AtlasFilters['facets']): AtlasFilters => ({ ...EMPTY_FILTERS, facets });
const names = (list: readonly Mushroom[]) => list.map((s) => s.polishName);

describe('fasety', () => {
  it('każda faseta jest w dokładnie jednej grupie', () => {
    const grouped = FACET_GROUPS.flatMap((g) => g.facets);
    expect([...grouped].sort()).toEqual([...FACET_IDS].sort());
  });

  it('pokazujemy tylko opcje obecne w bazie', () => {
    expect(index.facets.hymenophore.options.map((o) => o.value)).toEqual(['gills', 'tubes', 'ridges']);
  });
});

describe('queryAtlas', () => {
  it('bez filtrów - cała baza, alfabetycznie po polsku', () => {
    const r = run();
    expect(r.species.length).toBe(FIXTURE_DB.species.length);
    const sorted = [...names(r.species)].sort((a, b) => a.localeCompare(b, 'pl'));
    expect(names(r.species)).toEqual(sorted);
  });

  it('„tylko trujące” = trujące + śmiertelnie trujące (opcje jednej fasety łączy „lub”)', () => {
    const isToxic = (s: Mushroom) => s.edibility.category === 'poisonous' || s.edibility.category === 'deadly';
    const r = run({ filters: withFacets({ edibility: ['poisonous', 'deadly'] }) });
    expect(r.species.every(isToxic)).toBe(true);
    expect(r.species.length).toBe(FIXTURE_DB.species.filter(isToxic).length);
  });

  it('różne fasety łączy „i”', () => {
    const r = run({ filters: withFacets({ edibility: ['deadly'], substrate: ['wood'] }) });
    expect(names(r.species)).toEqual(['Hełmówka jadowita']);
  });

  it('liczniki jak w sklepie: opcja zaznaczonej fasety liczy się bez niej samej, inne fasety - z nią', () => {
    const r = run({ filters: withFacets({ edibility: ['deadly'] }) });
    expect(r.counts.edibility.poisonous).toBe(1);
    expect(r.counts.edibility.deadly).toBe(2);
    expect(r.counts.substrate.wood).toBe(1);
    expect(r.counts.hymenophore.tubes).toBeUndefined();
  });

  it('licznik opcji = liczba wyników po jej dodaniu', () => {
    const base = withFacets({ edibility: ['poisonous', 'deadly'], hymenophore: ['gills'] });
    const r = run({ filters: base });
    for (const option of index.facets.capColor.options) {
      const after = run({ filters: withFacets({ ...base.facets, capColor: [option.value] }) });
      expect(r.counts.capColor[option.value] ?? 0).toBe(after.species.length);
    }
  });

  it('sezon: zakres miesięcy i „owocnikuje teraz” z własnym licznikiem', () => {
    const april = run({ filters: { ...EMPTY_FILTERS, months: { from: 4, to: 5 } } });
    expect(names(april.species)).toEqual(['Maślanka wiązkowa']);
    const now = run({ currentMonth: 11, filters: { ...EMPTY_FILTERS, inSeasonNow: true } });
    expect(now.species.length).toBe(run({ currentMonth: 11 }).inSeasonNowCount);
    expect(now.species.every((s) => s.fruiting.months.includes(11))).toBe(true);
  });

  it('wyszukiwanie: nazwy ludowe, łacina, bez polskich znaków', () => {
    expect(names(run({ search: 'sromotnik' }).species)).toEqual(['Muchomor zielonawy']);
    expect(names(run({ search: 'GALERINA' }).species)).toEqual(['Hełmówka jadowita']);
    expect(names(run({ search: 'helmowka' }).species)).toEqual(['Hełmówka jadowita']);
    expect(normalizeSearch('  Gąska  Zielonka ')).toBe('gaska zielonka');
  });

  it('sortowanie wg jadalności w obie strony, remis alfabetycznie', () => {
    const edible = run({ sort: 'edible_first' }).species;
    const dangerous = run({ sort: 'dangerous_first' }).species;
    expect(edible[0]?.edibility.category).toBe('edible');
    expect(dangerous[0]?.edibility.category).toBe('deadly');
    expect(names(dangerous.slice(0, 2))).toEqual(['Hełmówka jadowita', 'Muchomor zielonawy']);
  });

  it('activeFilterCount liczy opcje, zakres i „teraz” oraz pogodę zależnie od weatherAvailable', () => {
    expect(
      activeFilterCount({
        facets: { capColor: ['red', 'brown'] },
        months: { from: 6, to: 9 },
        inSeasonNow: true,
        favorableWeather: false,
      }),
    ).toBe(4);

    const withWeather: AtlasFilters = {
      facets: {},
      months: null,
      inSeasonNow: false,
      favorableWeather: true,
    };
    expect(activeFilterCount(withWeather, true)).toBe(1);
    expect(activeFilterCount(withWeather, false)).toBe(0);
  });

  it('filtr „Brak pierścienia” (ring: none) w Atlasie wyklucza gatunki mające także inny typ pierścienia', () => {
    const noRing = run({ filters: withFacets({ ring: ['none'] }) });
    expect(names(noRing.species)).not.toContain('Muchomor zielonawy');
    expect(noRing.counts.ring.none).toBe(FIXTURE_DB.species.length - 1);
    expect(noRing.counts.ring.membranous_skirt).toBe(1);

    const skirt = run({ filters: withFacets({ ring: ['membranous_skirt'] }) });
    expect(names(skirt.species)).toEqual(['Muchomor zielonawy']);

    const either = run({ filters: withFacets({ ring: ['none', 'membranous_skirt'] }) });
    expect(either.species.length).toBe(FIXTURE_DB.species.length);
  });

  it('filtr ochrony: niechronione oraz oba wybory łącznie', () => {
    const db = testDatabase([
      testSpecies('Boletus edulis', EDIBLE, { hymenophore: ['tubes'] }, { polishName: 'Borowik szlachetny', legallyProtected: false }),
      testSpecies('Butyriboletus regius', EDIBLE, { hymenophore: ['tubes'] }, { polishName: 'Borowik królewski', legallyProtected: true }),
    ]);
    const localIndex = buildAtlasIndex(db);
    const protectedRes = queryAtlas(localIndex, { filters: withFacets({ legal: ['protected'] }), sort: 'alpha', search: '', currentMonth: 9 });
    expect(names(protectedRes.species)).toEqual(['Borowik królewski']);

    const unprotectedRes = queryAtlas(localIndex, { filters: withFacets({ legal: ['unprotected'] }), sort: 'alpha', search: '', currentMonth: 9 });
    expect(names(unprotectedRes.species)).toEqual(['Borowik szlachetny']);
    expect(unprotectedRes.counts.legal).toEqual({ unprotected: 1, protected: 1 });

    const bothRes = queryAtlas(localIndex, { filters: withFacets({ legal: ['protected', 'unprotected'] }), sort: 'alpha', search: '', currentMonth: 9 });
    expect(bothRes.species.length).toBe(2);
  });
});