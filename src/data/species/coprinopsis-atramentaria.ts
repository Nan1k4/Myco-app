/**
 * @file Rekord gatunku: czernidłak pospolity (Coprinopsis atramentaria).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const coprinopsisAtramentaria: Mushroom = {
  id: mushroomId('coprinopsis-atramentaria'),
  scientificName: 'Coprinopsis atramentaria',
  scientificSynonyms: ['Coprinus atramentarius', 'Agaricus atramentarius'],
  polishName: 'Czernidłak pospolity',
  vernacularNames: ['czernidłak szary'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['grey', 'brown_light'],
    capShape: ['ovate', 'campanulate', 'conical'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'fibrillose'],
    capMargin: ['striate', 'deliquescent'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'grey', 'black'],
    sporePrint: ['black'],
    capFleshColor: ['white', 'grey'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow'],
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'grey'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain', 'tapering'],
    ring: ['fibrous_zone', 'none'],
    growthHabit: ['clustered', 'grouped'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['coprine'],
    symptomOnsetHours: { min: 0.25, max: 2 },
    notes: 'Zawiera koprynę - w połączeniu z alkoholem (nawet do 3-5 dni przed lub po posiłku) wywołuje silne zatrucie koprynowe (uderzenia krwi, kołatanie serca, duszność, wymioty).',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil', 'wood_buried'],
    habitats: ['park', 'roadside', 'meadow', 'deciduous_forest'],
  },
  fruiting: {
    months: [5, 6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 3, max: 8 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['coprinopsis-atramentaria-1'],
  description:
    'Szary, jajowato-dzwonkowaty kapelusz o bruzdowanym brzegu, bez odstających białych łusek; dojrzewając, rozpływa się w czarną ciecz. W połączeniu z alkoholem silnie trujący.',
};
