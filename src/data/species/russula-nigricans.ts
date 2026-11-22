/**
 * @file Rekord gatunku: gołąbek czarniawy (Russula nigricans).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaNigricans: Mushroom = {
  id: mushroomId('russula-nigricans'),
  scientificName: 'Russula nigricans',
  scientificSynonyms: ['Agaricus nigricans'],
  polishName: 'Gołąbek czarniawy',
  vernacularNames: ['gołąbek czernielejący'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate'], 
    capColor: ['white', 'grey', 'brown_dark', 'black'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth'], 
    capMargin: ['inrolled', 'smooth'], 
    capPeelability: ['to_half'],
    hymenophoreColor: ['cream', 'white'], 
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['red', 'black'], 
    bruising: ['red', 'black'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'grey', 'black'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['red', 'black'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'fruity'],
    taste: ['mild', 'acrid'], 
  },
  edibility: {
    category: 'edible',
    notes: 'Najlepiej zbierać tylko młode, jeszcze jasne okazy. Potrawa ciemnieje przy obróbce. Mało wartościowy, mięsisty i twardawy.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'abies', 'pinus', 'fagus', 'quercus', 'betula'],
    substrates: ['soil', 'litter'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['russula-nigricans-1'],
  description:
    'Duży, twardy gołąbek o rzadkich, grubych blaszkach. Młody białawy, z wiekiem brunatnieje i czernieje; miąższ po przekrojeniu czerwienieje, potem czernieje. Smak łagodny lub lekko ostry.',
};
