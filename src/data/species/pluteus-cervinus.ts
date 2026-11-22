/**
 * @file Rekord gatunku: drobnołuszczak jeleni (Pluteus cervinus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const pluteusCervinus: Mushroom = {
  id: mushroomId('pluteus-cervinus'),
  scientificName: 'Pluteus cervinus',
  scientificSynonyms: ['Pluteus atricapillus', 'Agaricus cervinus'],
  polishName: 'Drobnołuszczak jeleni',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['brown', 'brown_light', 'grey'], 
    capShape: ['campanulate', 'convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'fibrillose'],
    capMargin: ['smooth'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['white', 'pink'], 
    sporePrint: ['pink'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['fibrillose'], 
    stipeColor: ['white', 'grey', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['radish'],
    taste: ['mild', 'radish'],
  },
  edibility: {
    category: 'edible',
    notes: 'Surowy niezalecany; po obróbce miękki o delikatnym smaku rzodkiewki. Mało wartościowy kulinarnie. Nie mylić z miękiszami o różowym wysypie, rosnącymi na ziemi (gleba, nie drewno).',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead', 'wood_buried'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest', 'park'],
  },
  fruiting: {
    months: [4, 5, 6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 20 },
    minPrecipitationMm: 10,
    lagDays: { min: 3, max: 8 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('entoloma-sinuatum'),
      distinguishingFeatures: ['gillAttachment'],
      note: 'Dzwonkówka jadowita ma blaszki przyrośnięte z wycięciem (nie wolne), mączny/ogórkowy zapach, mięsisty trzon i rośnie na ziemi, nie na drewnie; drobnołuszczak ma blaszki wolne i rośnie na drewnie.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['pluteus-cervinus-1'],
  description:
    'Kapelusz jelenio-brązowy, promieniście włókienkowaty, blaszki wolne, białe potem różowe (wysyp różowy), zapach rzodkiewki. Rośnie na pniakach i martwym drewnie. Jadalny, mało wartościowy.',
};
