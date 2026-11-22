/**
 * @file Rekord gatunku: muchomor narcyzowy. (Amanita gemmata).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaGemmata: Mushroom = {
  id: mushroomId('amanita-gemmata'),
  scientificName: 'Amanita gemmata',
  scientificSynonyms: ['Amanita junquillea', 'Agaricus gemmatus'],
  polishName: 'Muchomor narcyzowy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['yellow', 'cream'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['warts', 'smooth', 'slimy'], 
    capMargin: ['striate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'yellow'],
    capFleshColorChange: ['none'], 
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'], 
    stipeBase: ['marginate_bulb'],
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'radish'],
    taste: ['mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['isoxazole'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Zmienna zawartość kwasu ibotenowego i muscymolu; zatrucia podobne do wywołanych muchomorem plamistym.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus', 'picea', 'quercus', 'fagus'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [5, 6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['amanita-gemmata-1'],
  description:
    'Bladożółty kapelusz z prążkowanym brzegiem i białymi łatkami, nietrwały pierścień, bulwa z kołnierzykowatym obrzeżeniem. Mylony z muchomorem szafranowym i gołąbkami.',
};
