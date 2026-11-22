/**
 * @file Rekord gatunku: złotoborowik delikatny (Aureoboletus gentilis).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const aureoboletusGentilis: Mushroom = {
  id: mushroomId('aureoboletus-gentilis'),
  scientificName: 'Aureoboletus gentilis',
  scientificSynonyms: ['Pulveroboletus gentilis', 'Pulveroboletus cramesinus', 'Boletus gentilis', 'Xerocomus gentilis'],
  polishName: 'Złotoborowik delikatny', 
  vernacularNames: ['none'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['pink', 'brown_light', 'brown', 'rust'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['slimy', 'smooth'], 
    capMargin: ['smooth'],
    capPeelability: ['to_third'],
    hymenophoreColor: ['yellow'], 
    sporePrint: ['olive_brown'],
    capFleshColor: ['white', 'pink'],
    capFleshColorChange: ['none'], 
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['yellow', 'pink', 'brown_light'],
    stipeFleshColor: ['white', 'yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'fruity'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jadalny, ale rzadki - lepiej nie zbierać.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'carpinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 15, max: 24 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['aureoboletus-gentilis-1'],
  description:
    'Mały, rzadki, ciepłolubny borowik lasów liściastych. Kapelusz różowobrązowy, lepki w wilgoci; pory złocistożółte, nie zmieniają barwy. Nie mylić ze złotoborowikiem wysmukłym (A. projectellus) spod sosen. Ze względu na rzadkość lepiej nie zbierać.',
};
