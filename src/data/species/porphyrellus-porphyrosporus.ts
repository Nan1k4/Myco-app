/**
 * @file Rekord gatunku: porfirowiec ciemnobrązowy (Porphyrellus porphyrosporus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const porphyrellusPorphyrosporus: Mushroom = {
  id: mushroomId('porphyrellus-porphyrosporus'),
  scientificName: 'Porphyrellus porphyrosporus',
  scientificSynonyms: ['Porphyrellus pseudoscaber', 'Tylopilus porphyrosporus', 'Boletus porphyrosporus'],
  polishName: 'Porfirowiec ciemnobrązowy',
  vernacularNames: ['none'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown', 'brown_dark', 'grey', 'olive'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['velvety', 'smooth'],
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'grey', 'brown', 'brown_dark'], 
    sporePrint: ['purple_brown'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['blue', 'red'],
    bruising: ['blue', 'black'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth', 'velvety'],
    stipeColor: ['brown', 'brown_dark', 'grey'],
    stipeFleshColor: ['white'], 
    stipeFleshColorChange: ['blue', 'red'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'sour'],
    taste: ['sour', 'bitter', 'mild'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['unpleasant_taste', 'unpleasant_smell'],
    notes: 'Nieprzyjemny, kwaskowaty smak i zapach. Źródła rozbieżne - część uznaje za jadalny niskiej wartości.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'abies', 'fagus', 'quercus', 'pinus', 'tilia'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['porphyrellus-porphyrosporus-1'],
  description:
    'Ponury, szarobrązowy, aksamitny borowik - łatwo go przeoczyć. Wysyp purpurowobrązowy. Miąższ po przekrojeniu winnoczerwony i niebieskozielony, potem ciemnieje. Mylony z goryczakiem żółciowym (niegroźny, gorzki).',
};
