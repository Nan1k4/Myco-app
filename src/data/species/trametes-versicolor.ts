/**
 * @file Rekord gatunku: wrośniak różnobarwny (Trametes versicolor).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const trametesVersicolor: Mushroom = {
  id: mushroomId('trametes-versicolor'),
  scientificName: 'Trametes versicolor',
  scientificSynonyms: ['Coriolus versicolor', 'Polyporus versicolor', 'Boletus versicolor'],
  polishName: 'Wrośniak różnobarwny',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'], 
    gillAttachment: ['not_applicable'],
    capColor: ['brown', 'grey', 'cream', 'black', 'blue'], 
    capShape: ['fan_shaped', 'shelf'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['velvety', 'zonate'], 
    capMargin: ['wavy', 'sharp'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'yellow'],
    sporePrint: ['white'],
    capFleshColor: ['white'], 
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['absent'],
    stipeInterior: ['not_applicable'],
    stipeSurface: ['not_applicable'],
    stipeColor: ['not_applicable'],
    stipeFleshColor: ['not_applicable'],
    stipeFleshColorChange: ['not_applicable'],
    volva: ['absent'],
    stipeBase: ['not_applicable'],
    ring: ['none'],
    growthHabit: ['clustered', 'tiered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['tough', 'no_nutritional_value'],
    notes: 'Skórzasty, nie nadaje się do jedzenia. Używany w naparach ludowych; z gatunku pozyskuje się preparaty polisacharydowe (PSK/PSP) badane w onkologii.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    optimalMeanTempC: { min: 8, max: 24 },
    minPrecipitationMm: 15,
    lagDays: { min: 2, max: 5 },
    frostSensitive: false,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['trametes-versicolor-1'],
  description:
    'Cienkie, skórzaste, wachlarzowate owocniki w dachówkowatych grupach na martwym drewnie, z koncentrycznymi, wielobarwnymi strefami na aksamitnym wierzchu i bardzo drobnymi porami od spodu. Niejadalny.',
};
