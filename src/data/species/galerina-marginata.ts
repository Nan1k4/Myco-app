/**
 * @file Rekord gatunku: hełmówka jadowita (Galerina autumnalis)
 */
import { mushroomId, type Mushroom } from '../../domain';

export const galerinaMarginata: Mushroom = {
  id: mushroomId('galerina-marginata'),
  scientificName: 'Galerina marginata',
  scientificSynonyms: ['Galerina autumnalis'],
  polishName: 'Hełmówka jadowita',
  vernacularNames: ['hełmówka obrzeżona'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'adnate', 'decurrent'],
    capColor: ['yellow', 'orange', 'brown_light', 'brown'], 
    capShape: ['campanulate', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy', 'fibrillose'], 
    capMargin: ['smooth', 'striate', 'inrolled', 'appendiculate'],
    capPeelability: ['full', 'to_half', 'none'],
    hymenophoreColor: ['white', 'cream', 'yellow', 'brown_light', 'rust', 'brown'], 
    sporePrint: ['rust', 'brown'],
    capFleshColor: ['yellow', 'brown_light'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed', 'fibrous'],
    stipeSurface: ['fibrillose', 'smooth'],
    stipeColor: ['cream', 'brown_light', 'brown', 'brown_dark'],
    stipeFleshColor: ['brown_light', 'brown', 'brown_dark'], 
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['membranous_skirt', 'fibrous_zone', 'none'], 
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['flour', 'none'],
    taste: ['flour', 'mild'],
  },
  edibility: {
    category: 'deadly',
    syndromes: ['phalloidin'],
    symptomOnsetHours: { min: 6, max: 24 },
    notes: 'Amatoksyny jak u muchomora zielonawego. Najgroźniejsza pomyłka przy zbieraniu opieniek.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead', 'soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 5, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: false,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['galerina-marginata-1'],
  description:
    'Mała, miodowobrązowa, rośnie kępami na drewnie - często tuż obok opieniek. Gładki kapelusz bez łusek, rdzawobrązowy wysyp, nietrwały pierścień. Zawiera amatoksyny jak muchomor zielonawy.',
};
