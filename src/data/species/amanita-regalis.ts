/**
 * @file Rekord gatunku: muchomor królewski.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaRegalis: Mushroom = {
  id: mushroomId('amanita-regalis'),
  scientificName: 'Amanita regalis',
  scientificSynonyms: ['Amanita muscaria var. regalis', 'Amanita umbrina'],
  polishName: 'Muchomor królewski',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['brown_light', 'brown', 'brown_dark', 'olive'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['warts', 'smooth'],
    capMargin: ['striate', 'smooth', 'appendiculate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['fibrillose', 'scaly'], 
    stipeColor: ['white', 'cream', 'yellow'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'], 
    stipeBase: ['rounded_bulb'],
    ring: ['membranous_skirt', 'none'], 
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['isoxazole'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Kwas ibotenowy i muscymol: splątanie, pobudzenie, halucynacje, senność. Działanie jak u muchomora czerwonego.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'betula', 'pinus'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest'], 
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['amanita-regalis-1'],
  description:
    'Jak brązowy muchomor czerwony: wątrobianobrązowy kapelusz z białymi do żółtawych łatkami, bulwa z pierścieniami brodawek. Rzadki, w borach świerkowych na północy i w górach.',
};
