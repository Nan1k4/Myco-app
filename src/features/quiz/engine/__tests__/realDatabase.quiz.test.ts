/**
 * Niezmienniki bezpieczeństwa quizu na prawdziwej bazie – niezależne od liczby gatunków.
 */
import { MUSHROOM_DB } from '../../../../data';
import {
  FEATURE_KEYS,
  FEATURE_VOCABULARIES,
  isDangerousCategory,
  isGateFeatureKey,
  type FeatureKey,
  type FeatureSelections,
  type FilterResult,
  type FilterSelections,
  type Mushroom,
  type MushroomId,
  type ObservationCertainty,
} from '../../../../domain';
import { buildFilterIndex, evaluateFilter } from '../../../filter/engine';
import { EMPTY_PROGRESS, STAGE_ORDER, nextQuestion, type QuizKey, type QuizStage } from '../quizEngine';
import { rankBySimilarity } from '../similarity';

const index = buildFilterIndex(MUSHROOM_DB);
const dangerousIds = new Set(MUSHROOM_DB.species.filter((s) => isDangerousCategory(s.edibility.category)).map((s) => s.id));

/** Gatunki niebezpieczne, których Bramka nie wykluczyła. */
const gateDangerous = (gate: FilterResult): MushroomId[] => {
  const eliminated = new Set(gate.eliminated.map((e) => e.mushroomId));
  return [...dangerousIds].filter((id) => !eliminated.has(id)).sort();
};
/** Widoczne + ukryte progiem – próg ukrywa, ale nie wyklucza. */
const rankingDangerous = (selections: FilterSelections, threshold: number) => {
  const r = rankBySimilarity(index.species, selections, threshold);
  return [...r.dangerous, ...r.hiddenDangerous].map((e) => e.species.id).sort();
};

/** Deterministyczny PRNG (mulberry32). */
function prng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomSelections(random: () => number): FilterSelections {
  const features: Record<string, unknown> = {};
  const count = 1 + Math.floor(random() * 7);
  for (let n = 0; n < count; n++) {
    const key = FEATURE_KEYS[Math.floor(random() * FEATURE_KEYS.length)] as FeatureKey;
    const vocabulary: readonly string[] = FEATURE_VOCABULARIES[key];
    const certainty: ObservationCertainty = random() < 0.5 ? 'certain' : 'uncertain';
    features[key] = { value: vocabulary[Math.floor(random() * vocabulary.length)], certainty };
  }
  return { features: features as FeatureSelections };
}

describe('MUSHROOM_DB × quiz – bezpieczeństwo', () => {
  it('niebezpieczne w rankingu (widoczne + ukryte) = pula Bramki, dla każdego progu (2000 losowych zestawów)', () => {
    const random = prng(42);
    for (let n = 0; n < 2000; n++) {
      const selections = randomSelections(random);
      const expected = gateDangerous(evaluateFilter(index, selections));
      for (const threshold of [0.5, 0.8, 1]) expect(rankingDangerous(selections, threshold)).toEqual(expected);
    }
  });

  it.each(MUSHROOM_DB.species.map((s) => [s.id, s] as const))(
    '%s: zgodne z własnym profilem odpowiedzi zostawiają go na liście',
    (id, species: Mushroom) => {
      const features = Object.fromEntries(
        FEATURE_KEYS.filter((k) => k !== 'taste').map((key) => [
          key,
          { value: species.features[key][0], certainty: isGateFeatureKey(key) ? 'certain' : 'uncertain' },
        ]),
      ) as FeatureSelections;
      const ranking = rankBySimilarity(index.species, { features }, 1);
      expect([...ranking.exact, ...ranking.dangerous].map((e) => e.species.id)).toContain(id);
    },
  );
});

describe('MUSHROOM_DB × quiz – przebieg', () => {
  /** Symulacja: użytkownik odpowiada zgodnie z pierwszą wartością profilu `truth`, pewnie przy cechach Bramki. */
  function simulate(truth: Mushroom) {
    let selections: FilterSelections = { features: {} };
    const answeredIn = new Map<QuizKey, QuizStage>();
    const asked: QuizKey[] = [];
    const stages: QuizStage[] = []; // etapy pytań niebędących pytaniami Bramki
    for (let step = 0; step < 40; step++) {
      const gate = evaluateFilter(index, selections);
      const ranking = rankBySimilarity(index.species, selections, 0.8);
      const question = nextQuestion({ gate, ranking, progress: { ...EMPTY_PROGRESS, selections, answeredIn }, pinned: null });
      if (!question) return { asked, stages, gate, ranking };
      asked.push(question.key);
      answeredIn.set(question.key, question.stage);
      if (question.kind !== 'safety') stages.push(question.stage);
      if (question.key === 'habitat') {
        selections = { ...selections, habitat: truth.ecology.habitats[0] };
      } else if (question.key === 'substrate') {
        selections = { ...selections, substrate: truth.ecology.substrates.some((s) => s.startsWith('wood')) ? 'wood' : 'ground' };
      } else if (question.key === 'trees') {
        const partner = truth.ecology.mycorrhizalPartners[0];
        selections = partner ? { ...selections, trees: [partner] } : { ...selections, trees: ['pinus'] };
      } else if (question.kind !== 'environment') {
        const key = question.key;
        const value = truth.features[key][0];
        selections = {
          ...selections,
          features: { ...selections.features, [key]: { value, certainty: isGateFeatureKey(key) ? 'certain' : 'uncertain' } },
        };
      }
    }
    throw new Error(`Quiz nie zakończył się dla ${truth.id}`);
  }

  it.each(MUSHROOM_DB.species.map((s) => [s.id, s] as const))('%s: kończy się, nie pyta o smak, nie gubi gatunku', (id, truth: Mushroom) => {
    const { asked, stages, gate, ranking } = simulate(truth);
    const ranks = stages.map((stage) => STAGE_ORDER.indexOf(stage));
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b)); // zawężanie nie cofa się do wcześniejszego etapu
    expect(asked).not.toContain('taste' as QuizKey);
    expect(new Set(asked).size).toBe(asked.length); // bez powtórzeń
    expect([...ranking.exact, ...ranking.partial, ...ranking.dangerous, ...ranking.hiddenDangerous].map((e) => e.species.id)).toContain(id);
    if (dangerousIds.has(id)) expect(gate.status).not.toBe('clear');
  });
});
