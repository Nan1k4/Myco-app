/**
 * @file Rekord gatunku: zasłonak wonny (Cortinarius traganus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const cortinariusTraganus: Mushroom = {
  id: mushroomId('cortinarius-traganus'),
  scientificName: 'Cortinarius traganus',
  scientificSynonyms: ['Agaricus traganus', 'Inoloma traganum'],
  polishName: 'Zasłonak wonny',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'sinuate'],
    capColor: ['violet', 'purple', 'grey', 'brown_light'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['fibrillose', 'smooth'],
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['ochre', 'brown', 'rust'],
    sporePrint: ['rust'],
    capFleshColor: ['ochre', 'yellow', 'brown_light'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose'],
    stipeColor: ['violet', 'grey', 'brown_light'],
    stipeFleshColor: ['ochre', 'yellow', 'brown_light'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['rounded_bulb'],
    ring: ['cortina', 'none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['unpleasant', 'gas', 'fruity'],
    taste: ['bitter', 'unpleasant'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 1, max: 6 },
    notes: 'Lekko trujący / niejadalny o odpychającym zapachu acetylenu lub przejrzałych gruszek; powoduje zaburzenia żołądkowo-jelitowe.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'betula'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest', 'bog'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['cortinarius-traganus-1'],
  description:
    'Liliowoszary, jedwabiście włókienkowaty kapelusz, ochrowordzawe blaszki, rdzawy wysyp i szafranowożółty miąższ o ostrym, nieprzyjemnym zapachu.',
};
