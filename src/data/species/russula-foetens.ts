/**
 * @file Rekord gatunku: gołąbek śmierdzący (Russula foetens).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaFoetens: Mushroom = {
  id: mushroomId('russula-foetens'),
  scientificName: 'Russula foetens',
  scientificSynonyms: [],
  polishName: 'Gołąbek śmierdzący',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'adnate'],
    capColor: ['yellow', 'brown_light', 'brown'], 
    capShape: ['hemispherical', 'convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['slimy', 'smooth'],
    capMargin: ['striate'], 
    capPeelability: ['to_half'],
    hymenophoreColor: ['cream', 'brown'], 
    sporePrint: ['cream'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['brown'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow'], 
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'cream', 'brown'],
    stipeFleshColor: ['white', 'cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['unpleasant'], 
    taste: ['acrid', 'bitter'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['unpleasant_smell', 'acrid', 'bitter'],
    notes: 'Zjedzony może wywołać lekkie dolegliwości żołądkowe.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'betula', 'picea', 'pinus'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['russula-foetens-1'],
  description:
    'Duży, miodowobrązowy, w deszczu bardzo śluzowaty; brzeg kapelusza mocno bruzdowany i gruzełkowaty. Trzon komorowato pusty. Nieprzyjemny zapach zjełczałego oleju, smak ostry i gorzki.',
};
