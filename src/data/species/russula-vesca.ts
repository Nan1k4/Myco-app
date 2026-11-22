/**
 * @file Rekord gatunku: gołąbek wyborny (Russula vesca).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaVesca: Mushroom = {
  id: mushroomId('russula-vesca'),
  scientificName: 'Russula vesca',
  scientificSynonyms: [],
  polishName: 'Gołąbek wyborny',
  vernacularNames: ['gołąbek jadalny', 'surojadka'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed'],
    capColor: ['pink', 'red', 'brown_light'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['5_to_10'],
    capSurface: ['smooth', 'slimy'], 
    capMargin: ['smooth', 'cuticle_short'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'brown'], 
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['smooth', 'wrinkled'],
    stipeColor: ['white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jeden z najsmaczniejszych gołąbków; orzechowy smak, nadaje się do smażenia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'betula', 'carpinus', 'pinus', 'picea'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 8 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('russula-emetica'),
      distinguishingFeatures: ['capMargin'],
      note: 'Wymiotny ma jaskrawoczerwony, błyszczący kapelusz, prążkowany brzeg i bardzo piekący smak. Wyborny ma łagodny, orzechowy smak, bladsze, plamiste barwy i skórkę niedochodzącą do brzegu kapelusza. Przy zbiorze próba smaku (wypluć) odróżnia oba gatunki.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['russula-vesca-1'],
  description:
    'Mięsisty, cielistoróżowy do brunatnego kapelusz, plamisty, ze skórką krótszą od brzegu (końce blaszek wystają). Blaszki i trzon białe, trzon z wiekiem rdzawo plamisty. Smak łagodny, orzechowy.',
};
