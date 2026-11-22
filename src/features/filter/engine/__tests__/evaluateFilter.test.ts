import { mushroomId, type FeatureSelections, type FilterResult, type FilterSelections, type Mushroom } from '../../../../domain';
import { DEADLY, EDIBLE, testDatabase, testSpecies } from '../../../../domain/__fixtures__/testSpecies';
import { buildFilterIndex, evaluateFilter } from '..';

/** Jadalny sobowtór „pieczarka” z relacją do śmiertelnego „muchomora”. */
const agaricus = testSpecies(
  'Testus agaricus',
  EDIBLE,
  { hymenophoreColor: ['pink', 'brown'], sporePrint: ['purple_brown'] },
  {
    dangerousLookalikes: [
      { mushroomId: mushroomId('testus-mortalis'), distinguishingFeatures: ['volva', 'hymenophoreColor'], note: 'N1' },
    ],
  },
);
const mortalis = testSpecies(
  'Testus mortalis',
  DEADLY,
  { volva: ['present'], capColor: ['white', 'green'] },
  { ecology: { trophicModes: ['mycorrhizal'], mycorrhizalPartners: ['fagus'], substrates: ['soil'], habitats: ['meadow'] } },
);
/** Jadalny „borowik” bez relacji – Bramka i tak musi go odróżnić od muchomora (hymenofor). */
const boletus = testSpecies(
  'Testus boletus',
  EDIBLE,
  { hymenophore: ['tubes'], gillAttachment: ['not_applicable'], hymenophoreColor: ['white', 'yellow'], sporePrint: ['olive_brown'] },
  { ecology: { trophicModes: ['mycorrhizal'], mycorrhizalPartners: ['pinus'], substrates: ['soil'], habitats: ['meadow'] } },
);

const evaluate = (selections: FilterSelections, species: readonly Mushroom[] = [agaricus, mortalis, boletus]) =>
  evaluateFilter(buildFilterIndex(testDatabase(species)), selections);
const withFeatures = (features: FeatureSelections): FilterSelections => ({ features });
const eliminatedIds = (result: FilterResult) => result.eliminated.map((e) => e.mushroomId);

describe('evaluateFilter – Bramka', () => {
  it('bez obserwacji: weryfikacja, najpierw tanie sprawdzenia rozstrzygające, opisy z relacji', () => {
    const result = evaluate(withFeatures({}));
    if (result.status !== 'verification_required') throw new Error(result.status);

    expect(result.dangerousCandidateIds).toEqual([mortalis.id]);
    expect(result.unresolvedCandidateIds).toEqual([agaricus.id, boletus.id]);
    expect(result.pendingChecks.map((c) => c.feature)).toEqual([
      'hymenophoreColor', // obejrzeć, opisane w danych
      'hymenophore', // obejrzeć – borowik bez relacji też jest rozstrzygany
      'volva', // wykopać
      'gillAttachment', // przekroić
      'sporePrint', // wysyp (godziny)
    ]);
    expect(result.pendingChecks[0].notes).toEqual(['N1']);
    expect(result.pendingChecks[1]?.notes).toEqual([]);
  });

  it('niepewna obserwacja nie wyklucza gatunku niebezpiecznego, ale wyklucza niegroźny', () => {
    const result = evaluate(
      withFeatures({ volva: { value: 'absent', certainty: 'uncertain' }, hymenophore: { value: 'gills', certainty: 'uncertain' } }),
    );
    if (result.status !== 'verification_required') throw new Error(result.status);

    expect(result.dangerousCandidateIds).toEqual([mortalis.id]);
    expect(result.eliminated).toEqual([{ mushroomId: boletus.id, conflictingFeatures: ['hymenophore'] }]);
    expect(result.pendingChecks.map((c) => c.feature)).toContain('volva'); // trzeba potwierdzić
  });

  it('pewna obserwacja cechy Bramki wyklucza gatunek niebezpieczny i znika z listy sprawdzeń', () => {
    const result = evaluate(withFeatures({ hymenophore: { value: 'gills', certainty: 'certain' } }));
    if (result.status !== 'verification_required') throw new Error(result.status);
    expect(result.pendingChecks.map((c) => c.feature)).not.toContain('hymenophore');

    const cleared = evaluate(withFeatures({ volva: { value: 'absent', certainty: 'certain' } }));
    expect(cleared).toMatchObject({
      status: 'clear',
      matchingIds: [agaricus.id, boletus.id],
      suggestedNextFeature: 'hymenophore', // dzieli pulę, najtańszy, pierwszy w kolejności
    });
    expect(cleared.eliminated).toEqual([{ mushroomId: mortalis.id, conflictingFeatures: ['volva'] }]);
  });

  it.each<readonly [string, FeatureSelections]>([
    ['barwa kapelusza', { capColor: { value: 'brown', certainty: 'certain' } }],
    ['zapach', { smell: { value: 'anise', certainty: 'certain' } }],
    ['sposób wzrostu', { growthHabit: { value: 'clustered', certainty: 'certain' } }],
    ['smak', { taste: { value: 'bitter', certainty: 'certain' } }],
  ])('%s (nawet pewny) nie wyklucza gatunku niebezpiecznego', (_, features) => {
    const result = evaluate(withFeatures(features));
    expect(eliminatedIds(result)).toEqual([agaricus.id, boletus.id]);
    expect(result).toMatchObject({ status: 'dangerous_match', matchingIds: [mortalis.id] });
  });

  it('dangerous_match, gdy niegroźny sobowtór różni się tylko cechą subiektywną', () => {
    const twin = testSpecies('Testus gemellus', EDIBLE, { volva: ['present'], capColor: ['brown'] });
    expect(evaluate(withFeatures({}), [mortalis, twin])).toMatchObject({
      status: 'dangerous_match',
      dangerousCandidateIds: [mortalis.id],
      matchingIds: [mortalis.id, twin.id],
    });
  });

  it('no_match, gdy pewne obserwacje wykluczają wszystkich', () => {
    const result = evaluate(
      withFeatures({ volva: { value: 'present', certainty: 'certain' }, hymenophore: { value: 'tubes', certainty: 'certain' } }),
    );
    expect(result.status).toBe('no_match');
    expect(eliminatedIds(result)).toEqual([agaricus.id, mortalis.id, boletus.id]);
  });
});

describe('evaluateFilter – otoczenie', () => {
  it('drzewa wykluczają tylko niegroźne gatunki wyłącznie mikoryzowe', () => {
    const result = evaluate({ features: {}, trees: ['quercus'] });
    expect(result.eliminated).toEqual([{ mushroomId: boletus.id, conflictingFeatures: ['trees'] }]);
  });

  it('podłoże nigdy nie wyklucza gatunku niebezpiecznego', () => {
    const result = evaluate({ features: {}, substrate: 'wood' });
    expect(eliminatedIds(result)).toEqual([agaricus.id, boletus.id]);
    expect(result.status).toBe('dangerous_match');
  });
});

describe('evaluateFilter – sugestia następnej cechy', () => {
  it('null, gdy został jeden gatunek', () => {
    const result = evaluate(withFeatures({ hymenophore: { value: 'tubes', certainty: 'certain' } }));
    expect(result).toMatchObject({ status: 'clear', matchingIds: [boletus.id], suggestedNextFeature: null });
  });
});
