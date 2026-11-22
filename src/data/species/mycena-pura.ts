/**
 * @file Rekord gatunku: grzybówka fioletowawa (Mycena pura).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const mycenaPura: Mushroom = {
  id: mushroomId('mycena-pura'),
  scientificName: 'Mycena pura',
  scientificSynonyms: ['Agaricus purus', 'Prunulus purus'],
  polishName: 'Grzybówka fioletowawa',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'sinuate'],
    capColor: ['violet', 'purple', 'pink', 'grey'],
    capShape: ['campanulate', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5'],
    capSurface: ['smooth'],
    capMargin: ['striate'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'pink', 'violet'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'violet'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow'],
    stipeSurface: ['smooth'],
    stipeColor: ['violet', 'pink', 'white'],
    stipeFleshColor: ['violet', 'white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['radish'],
    taste: ['radish'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['muscarine'],
    symptomOnsetHours: { min: 0.25, max: 2 },
    notes: 'Zawiera muskarynę (objawy: ślinotok, pocenie się, łzawienie, zwężenie źrenic, zaburzenia żołądkowo-jelitowe). Ze względu na małe rozmiary i niską wartość nie do zbioru.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['litter', 'soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 6, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 9 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['mycena-pura-1'],
  description:
    'Delikatna grzybówka o fioletowawym do liliowoszarego, dzwonkowatym kapeluszu z prążkowanym brzegiem, wyraźnym zapachu rzodkiewki i fioletowawym trzonie. Wysyp biały. Spotykana w ściółce lasów liściastych, zwłaszcza bukowych. Trująca.',
};
