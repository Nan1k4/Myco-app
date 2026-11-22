/**
 * @file Rekord gatunku: muchomor czerwieniejący (Amanita rubescens).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaRubescens: Mushroom = {
  id: mushroomId('amanita-rubescens'),
  scientificName: 'Amanita rubescens',
  scientificSynonyms: ['Agaricus rubescens'],
  polishName: 'Muchomor czerwieniejący',
  vernacularNames: ['muchomor perłowy'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['brown_light', 'brown', 'pink'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['warts', 'smooth'],
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['pink', 'red'],
    bruising: ['pink', 'red'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'pink', 'brown_light'],
    stipeFleshColor: ['white'], 
    stipeFleshColorChange: ['pink', 'red'],
    volva: ['present', 'absent'],
    stipeBase: ['rounded_bulb'],
    ring: ['membranous_striate', 'none'], 
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Surowy trujący (hemolizyny). Ze względu na ryzyko pomyłki z muchomorem plamistym odradzany początkującym.',
    },
    notes: 'Dobry grzyb jadalny po dokładnej obróbce termicznej.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'pinus', 'picea', 'betula'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 13, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-pantherina'),
      distinguishingFeatures: ['capFleshColorChange', 'stipeFleshColorChange', 'bruising', 'stipeBase'],
      note: 'Czerwieniejący różowieje po przekrojeniu; plamisty pozostaje biały i ma bulwę z wyraźnym obrzeżeniem.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-rubescens-1'],
  description: 'Miąższ i miejsca uszkodzone powoli różowieją, korytarze larw w trzonie są czerwone. Pierścień prążkowany.',
};
