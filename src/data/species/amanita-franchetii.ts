/**
 * @file Rekord gatunku: muchomor szorstki (Amanita franchetii).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaFranchetii: Mushroom = {
  id: mushroomId('amanita-franchetii'),
  scientificName: 'Amanita franchetii',
  scientificSynonyms: ['Amanita aspera var. franchetii', 'Amanita queletii var. franchetii'],
  polishName: 'Muchomor szorstki',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['yellow', 'brown_light', 'brown', 'grey'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['warts', 'smooth'],
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['fibrillose', 'scaly'],
    stipeColor: ['white', 'yellow', 'grey'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'], 
    stipeBase: ['rounded_bulb'],
    ring: ['membranous_skirt', 'none'], 
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Uznawany za trujący; toksyny i przebieg zatrucia słabo poznane.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus'],
    substrates: ['soil', 'moss'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['amanita-franchetii-1'],
  description:
    'Rzadki, w lasach liściastych z dębem i bukiem. Kapelusz szarobrązowożółty, gęsto pokryty siarkowożółtymi brodawkami; pierścień z żółtym obrzeżem, na bulwie żółte pierścienie resztek pochwy.',
};
