/**
 * @file Rekord gatunku: gołąbek grynszpanowy (Russula aeruginea).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaAeruginea: Mushroom = {
  id: mushroomId('russula-aeruginea'),
  scientificName: 'Russula aeruginea',
  scientificSynonyms: ['Russula graminicolor'],
  polishName: 'Gołąbek grynszpanowy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['green', 'olive', 'grey'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth', 'striate'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['cream', 'yellow'],
    sporePrint: ['cream'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'brown'], 
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed'],
    stipeSurface: ['smooth'],
    stipeColor: ['white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    
    notes: 'Uwaga na pomyłkę z muchomorem zielonawym - zawsze oglądać podstawę trzonu.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula', 'picea'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 13, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['volva', 'stipeBase'],
      note: 'Z góry bardzo podobny do sromotnikowego. Wykop cały trzon: muchomor ma pierścień i białą pochwę u bulwiastej podstawy, gołąbek - kruchy trzon bez pierścienia, bez bulwy i bez pochwy.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['russula-aeruginea-1'],
  description:
    'Pod brzozami. Kapelusz gładki, trawiasto- do grynszpanowozielonego, w deszczu lepki; blaszki kremowe, trzon biały z rdzawymi plamkami. Smak łagodny.',
};
