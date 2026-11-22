/**
 * @file Rekord gatunku: włośnianka rosista (Hebeloma crustuliniforme).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const hebelomaCrustuliniforme: Mushroom = {
  id: mushroomId('hebeloma-crustuliniforme'),
  scientificName: 'Hebeloma crustuliniforme',
  scientificSynonyms: ['Agaricus crustuliniformis'],
  polishName: 'Włośnianka rosista',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['sinuate', 'adnexed'],
    capColor: ['cream', 'ochre', 'brown_light', 'brown'],
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['slimy', 'smooth'],
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['to_third'],
    hymenophoreColor: ['cream', 'brown_light', 'brown'],
    sporePrint: ['brown'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['scaly', 'fibrillose'],
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white', 'cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['rounded_bulb', 'plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped', 'fairy_ring'],
    smell: ['radish'],
    taste: ['bitter', 'radish'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 4 },
    notes: 'Trująca - powoduje silny nieżyt żołądkowo-jelitowy (wymioty, biegunka, bóle brzucha).',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula', 'quercus', 'fagus', 'picea', 'pinus', 'salix'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['hebeloma-crustuliniforme-1'],
  description:
    'Kremowoochrowy, w wilgoci śliski kapelusz, blaszki bladobrązowe z kropelkami płynu u młodych okazów („płaczące”), brązowy wysyp i wyraźny zapach rzodkiewki.',
};
