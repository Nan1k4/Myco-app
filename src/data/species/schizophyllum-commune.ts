/**
 * @file Rekord gatunku: rozszczepka pospolita (Schizophyllum commune).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const schizophyllumCommune: Mushroom = {
  id: mushroomId('schizophyllum-commune'),
  scientificName: 'Schizophyllum commune',
  scientificSynonyms: ['Agaricus alneus'],
  polishName: 'Rozszczepka pospolita',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['not_applicable'],
    capColor: ['grey', 'white', 'cream', 'brown_light'], 
    capShape: ['fan_shaped', 'shelf'],
    capSize: ['under_5'],
    capSurface: ['hairy'],
    capMargin: ['lobed', 'inrolled'], 
    capPeelability: ['none'],
    hymenophoreColor: ['grey', 'pink', 'brown_light'],
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
    reasons: ['tough', 'allergen'],
    notes: 'Skórzasty i twardy; w tropikach jest jedzony, ale może uczulać, a zarodniki rzadko wywołują zakażenia dróg oddechowych u osób z osłabioną odpornością.',
  },
  ecology: {
    trophicModes: ['saprotrophic', 'parasitic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead', 'wood_living'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    optimalMeanTempC: { min: 10, max: 25 },
    minPrecipitationMm: 20,
    lagDays: { min: 3, max: 7 },
    frostSensitive: false,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['schizophyllum-commune-1'],
  description:
    'Małe, wachlarzowate, owłosione, szarobiałe owocniki o rozszczepionych wzdłuż „blaszkach”, bez trzonu, na martwym drewnie. Po wysuszeniu zwija się i odżywa po deszczu. Niejadalny w Europie.',
};
