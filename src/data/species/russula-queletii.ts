/**
 * @file Rekord gatunku: gołąbek agrestowy (Russula queletii).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaQueletii: Mushroom = {
  id: mushroomId('russula-queletii'),
  scientificName: 'Russula queletii',
  scientificSynonyms: ['Russula sardonia f. queletii', 'Russula drimeia var. queletii', 'Russula flavovirens'],
  polishName: 'Gołąbek agrestowy',
  vernacularNames: ['gołąbek Queleta'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'adnate'],
    capColor: ['purple', 'violet', 'red'],
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth', 'striate'],
    capPeelability: ['to_half', 'full'],
    hymenophoreColor: ['white', 'cream', 'yellow'],
    sporePrint: ['cream'],
    capFleshColor: ['white', 'purple'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth'], 
    stipeColor: ['purple', 'pink'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['fruity'],
    taste: ['acrid'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Trótujący - powoduje ostre dolegliwości żołądkowo-jelitowe (wymioty, biegunkę, bóle brzucha). Bardzo ostry, piekący smak.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea'],
    substrates: ['soil', 'litter'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 8, max: 17 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['russula-queletii-1'],
  description:
    'Pod świerkami, zwłaszcza w górach i na glebach wapiennych. Kapelusz winnopurpurowy, trzon również purpurowy; zapach agrestu lub kompotu jabłkowego.',
};
