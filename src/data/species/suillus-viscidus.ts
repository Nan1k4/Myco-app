/**
 * @file Rekord gatunku: Maślak pstry (Suillus variegatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillusViscidus: Mushroom = {
  id: mushroomId('suillus-viscidus'),
  scientificName: 'Suillus viscidus',
  scientificSynonyms: ['Suillus aeruginascens', 'Suillus laricinus', 'Boletus viscidus'],
  polishName: 'Maślak lepki',
  vernacularNames: ['maślak szary'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['white', 'grey', 'olive', 'brown_light'], 
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['slimy', 'smooth'],
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'grey', 'brown_light'],
    sporePrint: ['brown', 'purple_brown'], 
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['blue', 'none'], 
    bruising: ['blue', 'none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid'],
    stipeSurface: ['reticulate', 'fibrillose'], 
    stipeColor: ['white', 'grey', 'olive'],
    stipeFleshColor: ['white'], 
    stipeFleshColorChange: ['blue', 'none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['membranous_skirt', 'none'], 
    growthHabit: ['scattered', 'clustered'],
    smell: ['none'],
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
    notes: 'Jadalny, niskiej wartości - miąższ miękki i wodnisty.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['larix'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['suillus-viscidus-1'],
  description:
    'Wyłącznie pod modrzewiami, często w trawie. Cały blady - szarobiaławy do szarooliwkowego - i bardzo śluzowaty. Pory duże, kanciaste, szarawe; miąższ i pory mogą lekko zielononiebieszczeć.',
};
