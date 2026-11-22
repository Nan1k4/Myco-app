/**
 * @file Rekord gatunku: Podgrzybek oprószony (Xerocomellus pruinatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const xerocomellusPruinatus: Mushroom = {
  id: mushroomId('xerocomellus-pruinatus'),
  scientificName: 'Xerocomellus pruinatus',
  scientificSynonyms: ['Xerocomus pruinatus', 'Boletus pruinatus'],
  polishName: 'Podgrzybek oprószony',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown_dark', 'brown', 'burgundy'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['pruinose', 'velvety'], 
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'olive'], 
    sporePrint: ['olive_brown'],
    capFleshColor: ['yellow'], 
    capFleshColorChange: ['blue', 'none'],
    bruising: ['blue'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose', 'smooth'], 
    stipeColor: ['yellow', 'red'], 
    stipeFleshColor: ['yellow', 'red'], 
    stipeFleshColorChange: ['blue', 'none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Dobrej jakości grzyb jadalny o łagodnym smaku i zwięzłym, niebiesiejącym miąższu. Miąższ jest trwalszy i mniej podatny na robaczywienie niż u podgrzybka zajączka.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'carpinus', 'picea', 'pinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['xerocomellus-pruinatus-1'],
  description:
    'Kapelusz ciemnobrązowy z bordowym odcieniem, matowy, jakby oprószony, rzadko pęka. Miąższ cytrynowożółty, u podstawy trzonu z czerwonymi punkcikami. Gatunek późnojesienny.',
};
