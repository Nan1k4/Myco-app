/**
 * @file Rekord gatunku: zasłonak rudy (Cortinarius orellanus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const cortinariusOrellanus: Mushroom = {
  id: mushroomId('cortinarius-orellanus'),
  scientificName: 'Cortinarius orellanus',
  scientificSynonyms: ['Dermocybe orellana'],
  polishName: 'Zasłonak rudy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'sinuate'],
    capColor: ['orange', 'rust', 'red_brown', 'brown'],
    capShape: ['campanulate', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['velvety', 'fibrillose', 'scaly'],
    capMargin: ['smooth', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['orange', 'rust', 'brown'],
    sporePrint: ['rust'],
    capFleshColor: ['yellow', 'orange', 'brown_light'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid', 'fibrous'],
    stipeSurface: ['fibrillose'],
    stipeColor: ['yellow', 'orange', 'rust'],
    stipeFleshColor: ['yellow', 'orange'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain', 'tapering'],
    ring: ['cortina', 'none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['radish', 'none'],
    taste: ['mild', 'radish'],
  },
  edibility: {
    category: 'deadly',
    syndromes: ['orellanine'],
    symptomOnsetHours: { min: 48, max: 480 },
    notes: 'Orelanina powoduje nieodwracalne, śmiertelne uszkodzenie nerek. Objawy pojawiają się bardzo późno (2-20 dni po zjedzeniu), gdy nerki są już ciężko uszkodzone.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'carpinus', 'corylus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['cortinarius-orellanus-1'],
  description:
    'Pomarańczoworudy, aksamitno-włókienkowaty kapelusz, rzadkie rdzawe blaszki i rdzawy wysyp; bez błoniastego pierścienia (tylko nietrwała zasnówka). Śmiertelnie trujący dla nerek.',
};
