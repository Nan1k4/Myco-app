/**
 * @file Rekord gatunku: monetka maślana (Rhodocollybia butyracea).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const rhodocollybiaButyracea: Mushroom = {
  id: mushroomId('rhodocollybia-butyracea'),
  scientificName: 'Rhodocollybia butyracea',
  scientificSynonyms: ['Collybia butyracea', 'Gymnopus butyraceus', 'Agaricus butyraceus'],
  polishName: 'Monetka maślana',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free', 'adnexed'], 
    capColor: ['brown', 'brown_light', 'brown_dark', 'cream'], 
    capShape: ['convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'greasy'], 
    capMargin: ['smooth', 'inrolled'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['cream', 'white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['fibrillose'], 
    stipeColor: ['brown', 'brown_light'],
    stipeFleshColor: ['brown_light'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain', 'rounded_bulb'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Najlepiej jeść same kapelusze; trzony chrząstkowate, nie nadają się do jedzenia. Mało wartościowy, miąższ cienki i wodnisty.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['litter', 'soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 5, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['rhodocollybia-butyracea-1'],
  description:
    'Tłusty w dotyku, higrofaniczny kapelusz o barwie od ciemnobrązowej po płową, gęste białe blaszki, chrząstkowaty trzon rozszerzony u nasady. Pospolita w ściółce lasów iglastych, późnym latem i jesienią.',
};
