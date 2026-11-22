import { mushroomId, type Mushroom, type SpeciesFeatureProfile } from '..';
import { DEADLY, EDIBLE, testDatabase, testSpecies } from '../__fixtures__/testSpecies';
import { validateDatabase, type DatabaseRule } from '../validateDatabase';

const edible = testSpecies(
  'Testus edulis',
  EDIBLE,
  { hymenophoreColor: ['pink'], sporePrint: ['purple_brown'] },
  { dangerousLookalikes: [{ mushroomId: mushroomId('testus-mortalis'), distinguishingFeatures: ['volva'], note: '' }] },
);
const deadly = testSpecies('Testus mortalis', DEADLY, { volva: ['present'] });

const withFeatures = (species: Mushroom, patch: Partial<SpeciesFeatureProfile>): Mushroom => ({
  ...species,
  features: { ...species.features, ...patch },
});

const rulesOf = (species: readonly Mushroom[]): DatabaseRule[] =>
  validateDatabase(testDatabase(species)).map((issue) => issue.rule);

describe('validateDatabase', () => {
  it('akceptuje spójną bazę', () => {
    expect(validateDatabase(testDatabase([edible, deadly]))).toEqual([]);
  });

  it('akceptuje id ze starej nazwy przeniesionej do synonimów (stabilność id)', () => {
    const renamed: Mushroom = { ...edible, scientificName: 'Novus edulis', scientificSynonyms: ['Testus edulis'] };
    expect(validateDatabase(testDatabase([renamed, deadly]))).toEqual([]);
  });

  const cases: readonly (readonly [DatabaseRule, readonly Mushroom[]])[] = [
    ['duplicate_id', [edible, deadly, deadly]],
    ['id_mismatch', [{ ...edible, scientificName: 'Testus alius' }, deadly]],
    ['duplicate_value', [withFeatures(edible, { capColor: ['brown', 'brown'] }), deadly]],
    ['invalid_number', [{ ...edible, fruiting: { ...edible.fruiting, lagDays: { min: 7, max: 3 } } }, deadly]],
    ['mycorrhizal_partners', [{ ...edible, ecology: { ...edible.ecology, trophicModes: ['mycorrhizal'] } }, deadly]],
    ['ring_without_none', [edible, withFeatures(deadly, { ring: ['membranous_skirt'] })]],
    ['warts_without_smooth', [edible, withFeatures(deadly, { capSurface: ['warts'] })]],
    ['gill_attachment', [withFeatures(edible, { hymenophore: ['tubes'] }), deadly]],
    ['stipe_not_applicable', [withFeatures(edible, { stipeShape: ['absent'] }), deadly]],
    ['stipe_not_applicable', [withFeatures(edible, { stipeColor: ['not_applicable'] }), deadly]],
    ['lookalike_on_dangerous', [edible, { ...deadly, dangerousLookalikes: edible.dangerousLookalikes }]],
    [
      'lookalike_unknown',
      [
        {
          ...edible,
          dangerousLookalikes: [{ mushroomId: mushroomId('testus-ignotus'), distinguishingFeatures: ['volva'], note: '' }],
        },
        deadly,
      ],
    ],
    ['lookalike_not_dangerous', [edible, { ...deadly, edibility: { category: 'inedible', reasons: ['bitter'] } }]],
    [
      'lookalike_duplicate',
      [{ ...edible, dangerousLookalikes: [...edible.dangerousLookalikes, ...edible.dangerousLookalikes] }, deadly],
    ],
    [
      'lookalike_feature_indistinct',
      [{ ...edible, dangerousLookalikes: [{ mushroomId: deadly.id, distinguishingFeatures: ['ring'], note: '' }] }, deadly],
    ],
  ];

  it.each(cases)('wykrywa %s', (rule, species) => {
    expect(rulesOf(species)).toContain(rule);
  });
});
