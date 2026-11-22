/**
 * @file Rekord gatunku: gołąbek żółciowy (Russula fellea).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaFellea: Mushroom = {
  id: mushroomId('russula-fellea'),
  scientificName: 'Russula fellea',
  scientificSynonyms: ['Agaricus felleus'],
  polishName: 'Gołąbek żółciowy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate'],
    capColor: ['yellow', 'ochre'], 
    capShape: ['convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth', 'striate'], 
    capPeelability: ['to_half'],
    hymenophoreColor: ['yellow', 'cream'], 
    sporePrint: ['white', 'cream'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['smooth'],
    stipeColor: ['yellow', 'cream'],
    stipeFleshColor: ['white', 'cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['floral', 'fruity'],
    taste: ['bitter', 'acrid'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['bitter', 'acrid'],
    notes: 'Gorzko-piekący; jeden okaz psuje całą potrawę. Nie jest uznawany za silnie trujący.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'picea', 'abies'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'], 
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['russula-fellea-1'],
  description:
    'Cały słomkowożółty (kapelusz, blaszki i trzon), pachnie pelargonią, smak gorzko-palący. Pospolity w buczynach i lasach mieszanych.',
};
