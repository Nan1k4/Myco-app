/**
 * @file Rekord gatunku: muchomor twardawy (Amanita excelsa).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaExcelsa: Mushroom = {
  id: mushroomId('amanita-excelsa'),
  scientificName: 'Amanita excelsa',
  scientificSynonyms: ['Amanita spissa', 'Agaricus excelsus'], 
  polishName: 'Muchomor twardawy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['grey', 'brown_light', 'brown'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['warts', 'smooth'], 
    capMargin: ['smooth'], 
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'], 
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['fibrillose'], 
    stipeColor: ['white', 'grey'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present', 'absent'],
    stipeBase: ['rounded_bulb'],
    ring: ['membranous_striate', 'none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['radish', 'none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Ze względu na łatwą pomyłkę z trującym muchomorem plamistym zdecydowanie odradzany.',
    },
    notes: 'Główne ryzyko to pomyłka z trującym muchomorem plamistym.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'fagus', 'quercus', 'betula'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-pantherina'),
      distinguishingFeatures: ['ring', 'capMargin', 'stipeBase'],
      note: 'Plamisty ma gładki pierścień, prążkowany brzeg kapelusza, czysto białe łatki i bulwę z ostrym obrzeżeniem. Twardawy - pierścień prążkowany od góry, gładki brzeg, szarawe łatki.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-excelsa-1'],
  description:
    'Szarobrązowy kapelusz z szarymi, płaskimi łatkami, pierścień prążkowany od góry, bulwa bez wyraźnego obrzeżenia. Miąższ nie czerwienieje. Zapach rzodkiewki.',
};
