/**
 * @file Rekord gatunku: muchomor jadowity (Amanita virosa).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaVirosa: Mushroom = {
  id: mushroomId('amanita-virosa'),
  scientificName: 'Amanita virosa',
  scientificSynonyms: ['Agaricus virosus'],
  polishName: 'Muchomor jadowity',
  vernacularNames: ['biały muchomor'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['white'],
    capShape: ['conical', 'campanulate', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy'], // lepki po deszczu
    capMargin: ['smooth', 'inrolled', 'appendiculate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['fibrillose', 'scaly'],
    stipeColor: ['white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'],
    stipeBase: ['rounded_bulb'],
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['none', 'unpleasant'],
    taste: ['mild'],
  },
  edibility: {
    category: 'deadly',
    syndromes: ['phalloidin'],
    symptomOnsetHours: { min: 6, max: 24 },
    notes: 'Amatoksyny jak u muchomora zielonawego - uszkodzenie wątroby i nerek po okresie utajenia. Gotowanie nie usuwa toksyn.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'betula', 'fagus'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['amanita-virosa-1'],
  description: 'Cały biały. Mylony z pieczarkami - pieczarki mają różowe lub brązowe blaszki i nie mają pochwy.',
};
