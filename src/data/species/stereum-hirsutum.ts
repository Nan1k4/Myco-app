/**
 * @file Rekord gatunku: skórnik szorstki (Stereum hirsutum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const stereumHirsutum: Mushroom = {
  id: mushroomId('stereum-hirsutum'),
  scientificName: 'Stereum hirsutum',
  scientificSynonyms: ['Thelephora hirsuta'],
  polishName: 'Skórnik szorstki',
  vernacularNames: [],
  features: {
    hymenophore: ['smooth'],
    gillAttachment: ['not_applicable'],
    capColor: ['orange', 'yellow', 'brown', 'grey'], 
    capShape: ['shelf', 'fan_shaped'], 
    capSize: ['under_5'],
    capSurface: ['hairy', 'zonate'],
    capMargin: ['wavy', 'smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'orange', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['cream', 'brown_light'], 
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
    taste: ['unpleasant'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['tough', 'no_nutritional_value'],
    notes: 'Cienki, skórzasty - nie nadaje się do jedzenia.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    optimalMeanTempC: { min: 8, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 2, max: 5 },
    frostSensitive: false,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['stereum-hirsutum-1'],
  description:
    'Cienkie, skórzaste, konsolkowate lub rozpostarte owocniki w dachówkowatych grupach na martwym drewnie liściastym. Wierzch szorstko owłosiony, strefowany pomarańczowożółtobrązowo, spód gładki, żółtopomarańczowy. Niejadalny.',
};
