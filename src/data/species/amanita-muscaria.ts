/**
 * @file Rekord gatunku: muchomor czerwony (Amanita muscaria).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaMuscaria: Mushroom = {
  id: mushroomId('amanita-muscaria'),
  scientificName: 'Amanita muscaria',
  scientificSynonyms: ['Agaricus muscarius'],
  polishName: 'Muchomor czerwony',
  vernacularNames: ['none'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['red', 'orange', 'yellow'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20', 'over_20'],
    capSurface: ['warts', 'smooth', 'slimy'],
    capMargin: ['striate', 'smooth', 'inrolled', 'appendiculate'],
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
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'],
    stipeBase: ['rounded_bulb'],
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['isoxazole'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Zespół pantherinowy (kwas ibotenowy, muscymol): pobudzenie, splątanie, halucynacje, senność. Szczególnie niebezpieczny dla dzieci.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula', 'pinus', 'picea'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['amanita-muscaria-1'],
  description:
    'Czerwony kapelusz z białymi łatkami (deszcz może je zmyć). Pochwa w postaci pierścieni na bulwie. Szczególnie groźny dla dzieci.',
};
