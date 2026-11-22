/**
 * @file Rekord gatunku: gołąbek modrozielony (Russula cyanoxantha).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaCyanoxantha: Mushroom = {
  id: mushroomId('russula-cyanoxantha'),
  scientificName: 'Russula cyanoxantha',
  scientificSynonyms: ['Agaricus cyanoxanthus'],
  polishName: 'Gołąbek modrozielony',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate'], 
    capColor: ['purple', 'violet', 'green', 'olive', 'grey'],
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy', 'fibrillose'],
    capMargin: ['smooth'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['smooth'],
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
    notes: 'Jeden z najlepszych gołąbków; elastyczne blaszki nie łamią się.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'carpinus', 'betula', 'picea', 'pinus'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 20,
    lagDays: { min: 4, max: 9 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['ring', 'volva', 'stipeBase'],
      note: 'Zielonawy kapelusz bywa mylony z muchomorem zielonawym. Muchomor ma pierścień, białą pochwę i bulwę u nasady trzonu, a miąższ kruchy gołąbka jest bez tych cech. Gołąbek ma elastyczne, tłuste blaszki i łamliwy, kredowy trzon.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['russula-cyanoxantha-1'],
  description:
    'Kapelusz fioletowy, zielony lub szary, często wielobarwny. Blaszki białe, elastyczne i tłuste (nie łamią się jak u innych gołąbków). Bez pierścienia i pochwy; smak łagodny.',
};
