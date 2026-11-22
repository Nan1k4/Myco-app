/**
 * @file Rekord gatunku: Maślak ziarnisty (Suillus granulatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillusGranulatus: Mushroom = {
  id: mushroomId('suillus-granulatus'),
  scientificName: 'Suillus granulatus',
  scientificSynonyms: ['Boletus granulatus'],
  polishName: 'Maślak ziarnisty',
  vernacularNames: ['none'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['yellow', 'orange', 'brown_light', 'brown', 'rust'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['slimy', 'smooth'],
    capMargin: ['smooth'],
    capPeelability: ['full'],
    hymenophoreColor: ['cream', 'yellow'],
    sporePrint: ['brown', 'olive_brown'],
    capFleshColor: ['cream', 'yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'brown'],
    latex: ['none'], 
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['glandular_dots', 'smooth'], 
    stipeColor: ['white', 'cream', 'yellow'],
    stipeFleshColor: ['cream', 'yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'clustered'],
    smell: ['none', 'fruity'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Zdjąć śluzowatą skórkę kapelusza - u wrażliwych osób wywołuje dolegliwości żołądkowo-jelitowe.',
    },
    notes: 'Dobry grzyb jadalny.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [5, 6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 13, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['suillus-granulatus-1'],
  description:
    'Pod sosnami, często w młodnikach i na glebach wapiennych; owocnikuje wcześnie. Brak pierścienia. Młode rurki wydzielają mleczne kropelki, a górna część trzonu jest pokryta ziarenkami.',
};
