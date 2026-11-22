/**
 * @file Rekord gatunku: Amanita submembranacea.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaSubmembranacea: Mushroom = {
  id: mushroomId('amanita-submembranacea'),
  scientificName: 'Amanita submembranacea',
  scientificSynonyms: ['Amanitopsis submembranacea'],
  polishName: 'Muchomor brązowooliwkowy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['olive', 'brown', 'brown_dark', 'grey'], 
    capShape: ['campanulate', 'convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'warts'],
    capMargin: ['striate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'grey'],
    capFleshColorChange: ['none'], 
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['fibrillose', 'snakeskin'], 
    stipeColor: ['grey', 'white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'], 
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'unknown',
    notes: 'Jadalność słabo poznana; jak inne mglejarki na surowo prawdopodobnie szkodliwy.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'abies', 'betula', 'fagus'],
    substrates: ['soil'], 
    habitats: ['coniferous_forest', 'mixed_forest'], 
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['amanita-submembranacea-1'],
  description:
    'Oliwkowobrązowa mglejarka z prążkowanym brzegiem kapelusza, bez pierścienia, z cienką kruchą pochwą. Rzadka, głównie w górskich lasach świerkowych i jodłowych.',
};
