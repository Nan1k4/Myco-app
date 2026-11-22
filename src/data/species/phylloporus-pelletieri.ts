/**
 * @file Rekord gatunku: poroblaszek żółtoczerwony (Phylloporus pelletieri).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const phylloporusPelletieri: Mushroom = {
  id: mushroomId('phylloporus-pelletieri'),
  scientificName: 'Phylloporus pelletieri',
  scientificSynonyms: [
    'Agaricus pelletieri',
    'Clitocybe pelletieri',
    'Paxillus pelletieri',
    'Xerocomus pelletieri',
    'Phylloporus rhodoxanthus subsp. europaeus',
  ],
  polishName: 'Poroblaszek żółtoczerwony',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'], 
    gillAttachment: ['decurrent'],
    capColor: ['red', 'brown', 'brown_light', 'olive'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'], 
    capSurface: ['velvety'],
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'orange', 'rust'],
    sporePrint: ['olive_brown'], 
    capFleshColor: ['yellow', 'pink'], 
    capFleshColorChange: ['none'],
    bruising: ['brown'], 
    latex: ['none'],
    stipeShape: ['tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose'], 
    stipeColor: ['yellow', 'brown'], 
    stipeFleshColor: ['yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Gatunek pod ochroną ścisłą - nie zbierać.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'carpinus', 'abies', 'pinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 14, max: 22 },
    minPrecipitationMm: 50,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: true,
  imageKeys: ['phylloporus-pelletieri-1'],
  description:
    'Borowik z blaszkami: jaskrawożółte, grube, zbiegające blaszki z mostkami, aksamitny czerwonobrązowy kapelusz. Rzadki, w starych buczynach i dąbrowach, głównie w górach i koło Gdańska. Pod ochroną ścisłą.',
};
