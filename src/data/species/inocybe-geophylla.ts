/**
 * @file Rekord gatunku: strzępiak ziemistoblaszkowy (Inocybe geophylla).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const inocybeGeophylla: Mushroom = {
  id: mushroomId('inocybe-geophylla'),
  scientificName: 'Inocybe geophylla',
  scientificSynonyms: ['Agaricus geophyllus'],
  polishName: 'Strzępiak ziemistoblaszkowy',
  vernacularNames: ['strzępiak liliowy'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'sinuate'],
    capColor: ['white', 'cream', 'violet', 'purple', 'pink'],
    capShape: ['conical', 'campanulate', 'convex', 'umbonate'],
    capSize: ['under_5'],
    capSurface: ['fibrillose', 'smooth'],
    capMargin: ['smooth', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'grey', 'brown_light', 'brown'],
    sporePrint: ['brown'],
    capFleshColor: ['white', 'violet'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose', 'smooth'],
    stipeColor: ['white', 'violet'],
    stipeFleshColor: ['white', 'violet'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain', 'rounded_bulb'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['earthy', 'unpleasant'],
    taste: ['unpleasant', 'mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['muscarine'],
    symptomOnsetHours: { min: 0.25, max: 2 },
    notes: 'Zawiera muskarynę - wywołuje silne pocenie, ślinotok, wymioty, biegunkę i zaburzenia widzenia. Odmiana liliowa (var. lilacina) bywa mylona z lakówką ametystową.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'picea', 'pinus', 'betula'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['inocybe-geophylla-1'],
  description:
    'Mały, stożkowaty, jedwabisto-włóknisty kapelusz (biały lub fioletowy w odmianie lilacina), blaszki szarawe do ziemistobrązowych, wysyp brązowy i nieprzyjemny ziemisty zapach.',
};
