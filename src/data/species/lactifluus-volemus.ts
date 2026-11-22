/**
 * @file Rekord gatunku: mleczaj smaczny (Lactifluus volemus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lactifluusVolemus: Mushroom = {
  id: mushroomId('lactifluus-volemus'),
  scientificName: 'Lactifluus volemus',
  scientificSynonyms: ['Lactarius volemus', 'Agaricus volemus', 'Galorrheus volemus'],
  polishName: 'Mleczaj smaczny',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'decurrent'],
    capColor: ['orange', 'brown_light'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['velvety', 'cracked'], 
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['brown'],
    bruising: ['brown'], 
    latex: ['white'], 
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth', 'velvety'],
    stipeColor: ['orange', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['brown'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'fishy'], 
    taste: ['mild'], 
  },
  edibility: {
    category: 'edible',
    notes: 'Jeden z najsmaczniejszych mleczajów; nie wymaga moczenia, bo mleczko jest łagodne.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'carpinus', 'picea', 'pinus'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 25,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('lactarius-rufus'),
      distinguishingFeatures: ['capFleshColorChange', 'bruising', 'capSurface'],
      note: 'Mleczaj rudy (surowy trujący, silnie piekący) ma gładki, rudobrązowy kapelusz i mleczko białe, o piekącym smaku, które nie brunatnieje; mleczaj smaczny ma mleczko słodkawe, obfite, a miąższ i blaszki brunatnieją.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['lactifluus-volemus-1'],
  description:
    'Rdzawopomarańczowy, matowy kapelusz i bardzo obfite białe mleczko, które na powietrzu brunatnieje; miąższ i blaszki brunatnieją po uszkodzeniu. Starsze okazy pachną rybą.',
};
