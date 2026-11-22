/**
 * @file Rekord gatunku: dzwonkówka jadowita (Entoloma sinuatum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const entolomaSinuatum: Mushroom = {
  id: mushroomId('entoloma-sinuatum'),
  scientificName: 'Entoloma sinuatum',
  scientificSynonyms: ['Entoloma lividum', 'Rhodophyllus sinuatus'],
  polishName: 'Dzwonkówka jadowita',
  vernacularNames: ['wieruszka zatokowata'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['sinuate', 'adnexed'],
    capColor: ['grey', 'cream', 'brown_light', 'white'],
    capShape: ['convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'fibrillose'],
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'pink'],
    sporePrint: ['pink'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['fibrillose', 'smooth'],
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain', 'rounded_bulb'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped', 'fairy_ring'],
    smell: ['mealy', 'unpleasant'],
    taste: ['mealy', 'unpleasant'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 4 },
    notes: 'Silnie trująca - wywołuje ciężki, gwałtowny nieżyt żołądkowo-jelitowy z odwodnieniem i możliwym uszkodzeniem wątroby.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'carpinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 14, max: 22 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['entoloma-sinuatum-1'],
  description:
    'Duży, mięsisty grzyb o szarokremowym kapeluszu, początkowo żółtawych, potem łososioworóżowych blaszkach wyciętych ząbkiem i różowym wysypie. Silny mączny zapach.',
};
