import { COLORS, FEATURE_VOCABULARIES, type FeatureSelections, type FilterSelections } from '../../../../domain';
import { DEADLY, EDIBLE, testDatabase, testSpecies } from '../../../../domain/__fixtures__/testSpecies';
import { buildFilterIndex } from '../../../filter/engine';
import { COLOR_NEIGHBOURS, TOLERANT_FEATURES } from '../nearValues';
import { THRESHOLD, normalizeThreshold, rankBySimilarity } from '../similarity';

const edulis = testSpecies('Testus edulis', EDIBLE, { capColor: ['brown'], ring: ['membranous_skirt', 'none'] });
const similis = testSpecies('Testus similis', EDIBLE, { capColor: ['white'], stipeInterior: ['hollow'] });
const mortalis = testSpecies('Testus mortalis', DEADLY, { volva: ['present'], capColor: ['white', 'green'] });
const index = buildFilterIndex(testDatabase([edulis, similis, mortalis]));

const rank = (features: FeatureSelections, threshold: number = THRESHOLD.default, extra: Partial<FilterSelections> = {}) =>
  rankBySimilarity(index.species, { features, ...extra }, threshold);
const ids = (entries: readonly { readonly species: { readonly id: string } }[]) => entries.map((e) => e.species.id);

describe('nearValues', () => {
  it('sąsiedztwo barw jest symetryczne i bez pętli', () => {
    for (const color of COLORS) {
      for (const near of COLOR_NEIGHBOURS[color]) {
        expect(near).not.toBe(color);
        expect(COLOR_NEIGHBOURS[near]).toContain(color);
      }
    }
  });

  it('tolerancja dotyczy tylko cech, których słownik zaczyna się od palety barw (te same bity)', () => {
    for (const key of TOLERANT_FEATURES) {
      const vocabulary: readonly string[] = FEATURE_VOCABULARIES[key];
      expect(vocabulary.slice(0, COLORS.length)).toEqual([...COLORS]);
    }
  });
});

describe('normalizeThreshold', () => {
  it.each([
    [0.83, 0.85],
    [0.3, 0.5],
    [1.2, 1],
    [Number.NaN, THRESHOLD.default],
    [0.8, 0.8],
  ])('%s → %s', (input, expected) => {
    expect(normalizeThreshold(input)).toBe(expected);
  });
});

describe('rankBySimilarity', () => {
  it('bez odpowiedzi: brak %, wszystkie niegroźne w pełnej zgodności, niebezpieczne zawsze widoczne', () => {
    const r = rank({});
    expect(r.reliable).toBe(false);
    expect(r.total).toBe(3);
    expect(ids(r.exact)).toEqual([edulis.id, similis.id]);
    expect(ids(r.dangerous)).toEqual([mortalis.id]);
    expect(r.partial).toEqual([]);
  });

  it('niepewna niezgodność nie usuwa gatunku niegroźnego – trafia do częściowych', () => {
    const r = rank(
      {
        stipeInterior: { value: 'hollow', certainty: 'uncertain' },
        hymenophore: { value: 'gills', certainty: 'certain' },
        sporePrint: { value: 'white', certainty: 'certain' },
        volva: { value: 'absent', certainty: 'uncertain' },
      },
      0.5,
    );
    expect(r.reliable).toBe(true);
    expect(ids(r.exact)).toEqual([similis.id]);
    expect(ids(r.partial)).toEqual([edulis.id]);
    expect(r.partial[0]?.mismatches).toEqual(['stipeInterior']);
  });

  it('pewna niezgodność cechy Bramki wyklucza twardo – także gatunek niebezpieczny', () => {
    const r = rank({ volva: { value: 'absent', certainty: 'certain' } }, 0.5);
    expect(r.excludedIds).toEqual([mortalis.id]);
    expect(r.dangerous).toEqual([]);
  });

  it('próg ukrywa gatunek niebezpieczny, ale go nie wyklucza (widoczne + ukryte = pula)', () => {
    const features: FeatureSelections = {
      volva: { value: 'absent', certainty: 'uncertain' },
      capColor: { value: 'brown', certainty: 'uncertain' },
      sporePrint: { value: 'white', certainty: 'certain' },
    };
    // wynik: 1 / (0,6 + 0,3 + 1) ≈ 53%
    expect(ids(rank(features, 0.5).dangerous)).toEqual([mortalis.id]);
    const strict = rank(features, 0.8);
    expect(strict.dangerous).toEqual([]);
    expect(ids(strict.hiddenDangerous)).toEqual([mortalis.id]);
    expect(strict.excludedIds).not.toContain(mortalis.id);
  });

  it('barwa sąsiednia daje połowę zaliczenia i jest wskazana jako niezgodność', () => {
    const r = rank(
      { capColor: { value: 'brown_dark', certainty: 'uncertain' }, hymenophore: { value: 'gills', certainty: 'certain' }, sporePrint: { value: 'white', certainty: 'certain' } },
      0.5,
    );
    const entry = r.partial.find((e) => e.species.id === edulis.id);
    expect(entry?.mismatches).toEqual(['capColor']);
    // wagi: capColor 0,5·0,6 = 0,3 (zaliczenie 0,5), pozostałe 1 + 1 → (0,15 + 2) / 2,3
    expect(entry?.score).toBeCloseTo(2.15 / 2.3, 6);
  });

  it('pominięta cecha nie wpływa na wynik (nie ma jej w mianowniku)', () => {
    const base = { stipeInterior: { value: 'solid', certainty: 'certain' }, sporePrint: { value: 'white', certainty: 'certain' } } as const;
    const r = rank(base);
    expect(r.exact.find((e) => e.species.id === edulis.id)?.considered).toBe(2);
  });

  it('wyższy próg nigdy nie dodaje gatunków (monotoniczność)', () => {
    const features: FeatureSelections = {
      stipeInterior: { value: 'hollow', certainty: 'uncertain' },
      capColor: { value: 'brown', certainty: 'uncertain' },
      hymenophore: { value: 'gills', certainty: 'certain' },
      ring: { value: 'none', certainty: 'uncertain' },
    };
    let previous = Number.POSITIVE_INFINITY;
    for (let t = THRESHOLD.min; t <= THRESHOLD.max + 1e-9; t += THRESHOLD.step) {
      const visible = rank(features, t).partial.length;
      expect(visible).not.toBeGreaterThan(previous);
      previous = visible;
    }
  });

  it('otoczenie liczy się tylko tam, gdzie jest dowodem (drzewa – tylko gatunki wyłącznie mikoryzowe)', () => {
    const r = rank({}, 0.5, { trees: ['pinus'], substrate: 'ground' });
    expect(r.exact.every((e) => e.considered === 1)).toBe(true); // tylko podłoże; testowe gatunki są saprotrofami
  });
});
