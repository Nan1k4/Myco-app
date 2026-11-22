/**
 * Własności bezpieczeństwa na prawdziwej bazie – niezależne od tego, ile i jakich gatunków w niej jest.
 */
import { MUSHROOM_DB } from '../../../../data';
import {
  FEATURE_KEYS,
  FEATURE_VOCABULARIES,
  isDangerousCategory,
  isGateFeatureKey,
  type FeatureKey,
  type FeatureSelections,
  type Mushroom,
  type ObservationCertainty,
} from '../../../../domain';
import { buildFilterIndex, evaluateFilter } from '..';

const index = buildFilterIndex(MUSHROOM_DB);
const dangerousIds = new Set(
  MUSHROOM_DB.species.filter((s) => isDangerousCategory(s.edibility.category)).map((s) => s.id),
);

/** Pojedyncza obserwacja dowolnej wartości (test przechodzi po wszystkich, typ wartości jest tu nieistotny). */
const single = (key: FeatureKey, value: string, certainty: ObservationCertainty): FeatureSelections =>
  ({ [key]: { value, certainty } }) as FeatureSelections;

const allObservations = (keys: readonly FeatureKey[]) =>
  keys.flatMap((key) => FEATURE_VOCABULARIES[key].map((value) => [key, String(value)] as const));

const eliminatedDangerous = (features: FeatureSelections) =>
  evaluateFilter(index, { features })
    .eliminated.map((e) => e.mushroomId)
    .filter((id) => dangerousIds.has(id));

describe('MUSHROOM_DB × silnik filtra', () => {
  it.each(allObservations(FEATURE_KEYS))('niepewne %s = %s nie wyklucza gatunku niebezpiecznego', (key, value) => {
    expect(eliminatedDangerous(single(key, value, 'uncertain'))).toEqual([]);
  });

  it.each(allObservations(FEATURE_KEYS.filter((key) => !isGateFeatureKey(key))))(
    'pewne %s = %s (smak/cecha subiektywna) nie wyklucza gatunku niebezpiecznego',
    (key, value) => {
      expect(eliminatedDangerous(single(key, value, 'certain'))).toEqual([]);
    },
  );

  it.each(MUSHROOM_DB.species.map((s) => [s.id, s] as const))(
    '%s nie wyklucza się obserwacjami zgodnymi z własnym profilem',
    (id, species: Mushroom) => {
      const features = Object.fromEntries(
        FEATURE_KEYS.map((key) => [key, { value: species.features[key][0], certainty: 'certain' }]),
      ) as FeatureSelections;
      expect(evaluateFilter(index, { features }).eliminated.map((e) => e.mushroomId)).not.toContain(id);
    },
  );

  it('start klucza z gatunkami niebezpiecznymi w bazie wymaga weryfikacji', () => {
    expect(evaluateFilter(index, { features: {} }).status).toBe('verification_required');
  });
});
