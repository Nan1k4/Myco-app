/**
 * @file Rekord gatunku: Amanita bisporigera.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaBisporigera: Mushroom = {
  id: mushroomId('amanita-bisporigera'),
  scientificName: 'Amanita bisporigera',
  scientificSynonyms: [],
  polishName: 'Muchomor dwuzarodnikowy', 
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['white'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['fibrillose', 'scaly'], 
    stipeColor: ['white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'],
    stipeBase: ['rounded_bulb'],
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'unpleasant'],
    taste: ['mild'], 
  },
  edibility: {
    category: 'deadly',
    syndromes: ['phalloidin'],
    symptomOnsetHours: { min: 6, max: 24 },
    notes: 'Amatoksyny niszczą wątrobę. Objawy pojawiają się z opóźnieniem, po nich następuje pozorna poprawa - przy podejrzeniu zatrucia natychmiast do szpitala.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'betula', 'pinus', 'fagus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 16, max: 26 },
    minPrecipitationMm: 25,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['amanita-bisporigera-1'],
  description:
    'Cały biały, smukły, z pierścieniem i workowatą pochwą na bulwie. Najczęstszy śmiertelny muchomor wschodniej Ameryki Płn. Zawiera amatoksyny.',
};
