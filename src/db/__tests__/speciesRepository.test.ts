import path from 'node:path';
import Database from 'better-sqlite3';

import { MUSHROOM_DB } from '../../data';
import { FEATURE_VOCABULARIES } from '../../domain';
import {
  computeAtlasFacets,
  getAvailableAtlasFacets,
  loadQuizIndexBundle,
  queryAtlasSpecies,
} from '../repositories/speciesRepository';

const mockRealDb = new Database(path.resolve(__dirname, '../../../assets/db/myco.db'), { readonly: true });

jest.mock('../client', () => ({
  getDb: () => ({
    getAllSync: <T,>(sql: string, params: unknown[] = []) => mockRealDb.prepare(sql).all(...params) as T[],
    getFirstSync: <T,>(sql: string, params: unknown[] = []) => mockRealDb.prepare(sql).get(...params) as T | null,
  }),
}));

const BASE_QUERY = {
  search: '',
  facets: {},
  months: null,
  inSeasonNow: false,
  favorableWeather: false,
  favorableIds: null,
  currentMonth: 9 as const,
};

describe('speciesRepository × real myco.db (ring = none w Atlasie vs Quizie)', () => {
  afterAll(() => {
    mockRealDb.close();
  });

  it('w Atlasie ring=["none"] zwraca wyłącznie gatunki z ring: ["none"]', () => {
    const expectedNoRingIds = new Set(
      MUSHROOM_DB.species
        .filter((s) => s.features.ring.length === 1 && s.features.ring[0] === 'none')
        .map((s) => s.id),
    );
    expect(expectedNoRingIds.size).toBeGreaterThan(0);
    expect(expectedNoRingIds.size).toBeLessThan(MUSHROOM_DB.species.length);

    const rows = queryAtlasSpecies({ ...BASE_QUERY, facets: { ring: ['none'] } }, 'alpha');
    expect(new Set(rows.map((r) => r.id))).toEqual(expectedNoRingIds);
    expect(rows.some((r) => r.id === 'amanita-phalloides')).toBe(false);

    const facets = computeAtlasFacets(BASE_QUERY);
    expect(facets.counts.ring.none).toBe(expectedNoRingIds.size);

    const available = getAvailableAtlasFacets();
    expect(available.ring.options.map((o) => o.value)).toContain('none');
  });

  it('w Atlasie ring=["none", "movable"] łączy gatunki bez pierścienia oraz z ruchomym pierścieniem', () => {
    const expectedIds = new Set(
      MUSHROOM_DB.species
        .filter(
          (s) =>
            (s.features.ring.length === 1 && s.features.ring[0] === 'none') ||
            s.features.ring.includes('movable'),
        )
        .map((s) => s.id),
    );

    const rows = queryAtlasSpecies({ ...BASE_QUERY, facets: { ring: ['none', 'movable'] } }, 'alpha');
    expect(new Set(rows.map((r) => r.id))).toEqual(expectedIds);
    expect(rows.some((r) => r.id === 'macrolepiota-procera')).toBe(true);
    expect(rows.some((r) => r.id === 'amanita-phalloides')).toBe(false);
  });

  it('w Quizie (loadQuizIndexBundle) bit "none" pozostaje ustawiony również przy gatunkach z pierścieniem', () => {
    const noneBit = 1 << FEATURE_VOCABULARIES.ring.indexOf('none');
    const { filterIndex } = loadQuizIndexBundle();
    const phalloides = filterIndex.species.find((s) => s.id === 'amanita-phalloides');
    expect(phalloides).toBeDefined();
    expect((phalloides!.masks.ring & noneBit) !== 0).toBe(true);
  });

  it('w Atlasie filtr ochrony obsługuje zarówno "protected", "unprotected", jak i oba naraz', () => {
    const protectedIds = new Set(MUSHROOM_DB.species.filter((s) => s.legallyProtected).map((s) => s.id));
    const unprotectedIds = new Set(MUSHROOM_DB.species.filter((s) => !s.legallyProtected).map((s) => s.id));
    expect(protectedIds.size).toBeGreaterThan(0);
    expect(unprotectedIds.size).toBeGreaterThan(0);

    const onlyProtected = queryAtlasSpecies({ ...BASE_QUERY, facets: { legal: ['protected'] } }, 'alpha');
    expect(new Set(onlyProtected.map((r) => r.id))).toEqual(protectedIds);

    const onlyUnprotected = queryAtlasSpecies({ ...BASE_QUERY, facets: { legal: ['unprotected'] } }, 'alpha');
    expect(new Set(onlyUnprotected.map((r) => r.id))).toEqual(unprotectedIds);

    const both = queryAtlasSpecies({ ...BASE_QUERY, facets: { legal: ['protected', 'unprotected'] } }, 'alpha');
    expect(both.length).toBe(MUSHROOM_DB.species.length);

    const facets = computeAtlasFacets({ ...BASE_QUERY, facets: { legal: ['unprotected'] } });
    expect(facets.counts.legal.protected).toBe(protectedIds.size);
    expect(facets.counts.legal.unprotected).toBe(unprotectedIds.size);

    const available = getAvailableAtlasFacets();
    expect(available.legal.options.map((o) => o.value)).toEqual(['protected', 'unprotected']);
  });
});
