/**
 * @file Rekord gatunku: pniarek brzozowy (Fomitopsis betulina).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const fomitopsisBetulina: Mushroom = {
  id: mushroomId('fomitopsis-betulina'),
  scientificName: 'Fomitopsis betulina',
  scientificSynonyms: ['Piptoporus betulinus', 'Boletus betulinus', 'Polyporus betulinus'],
  polishName: 'Pniarek brzozowy',
  vernacularNames: ['huba brzozowa'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown_light', 'grey', 'cream'], 
    capShape: ['hoof_shaped', 'convex'], 
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['smooth'], 
    capMargin: ['rounded', 'inrolled'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
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
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['bitter'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['tough', 'bitter'],
    notes: 'Młode owocniki bywają opisywane jako jadalne w niektórych regionach, ale są gorzkie i korkowate - w praktyce niejadalny. Tradycyjnie używany jako pasek do ostrzenia brzytew i w medycynie ludowej.',
  },
  ecology: {
    trophicModes: ['parasitic', 'saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_living', 'wood_dead'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 22 },
    minPrecipitationMm: 35,
    lagDays: { min: 14, max: 30 },
    frostSensitive: false,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['fomitopsis-betulina-1'],
  description:
    'Białawy do szarobrązowego, poduszkowaty owocnik rosnący wyłącznie na brzozach, z cienką skórką i białymi rurkami. Miąższ biały, gumowaty, gorzki. Niejadalny.',
};
