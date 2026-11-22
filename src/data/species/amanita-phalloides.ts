/**
 * @file Rekord gatunku: muchomor zielonawy (sromotnikowy).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaPhalloides: Mushroom = {
  id: mushroomId('amanita-phalloides'),
  scientificName: 'Amanita phalloides',
  scientificSynonyms: ['Agaricus phalloides'],
  polishName: 'Muchomor zielonawy',
  vernacularNames: ['muchomor sromotnikowy', 'sromotnik'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['olive', 'green', 'yellow', 'white'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['smooth', 'fibrillose', 'slimy'], 
    capMargin: ['smooth', 'inrolled', 'appendiculate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'fibrillose', 'snakeskin'],
    stipeColor: ['white', 'olive'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'],
    stipeBase: ['rounded_bulb'],
    ring: ['membranous_skirt', 'none'], 
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['none', 'unpleasant'],
    taste: ['mild'], 
  },
  edibility: {
    category: 'deadly',
    syndromes: ['phalloidin'],
    symptomOnsetHours: { min: 6, max: 24 },
    notes: 'Amatoksyny niszczą wątrobę i nerki. Po objawach żołądkowo-jelitowych następuje pozorna poprawa, potem niewydolność wątroby. Gotowanie ani suszenie nie usuwa toksyn.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'carpinus', 'tilia', 'corylus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['amanita-phalloides-1'],
  description:
    'Najczęstsza przyczyna śmiertelnych zatruć grzybami w Polsce. Skórka kapelusza łatwo schodzi - „test skórki” nie świadczy o jadalności.',
};
