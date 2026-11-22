/**
 * @file Rekord gatunku: Maślak modrzewiowy (Suillus grevillei).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillusGrevillei: Mushroom = {
  id: mushroomId('suillus-grevillei'),
  scientificName: 'Suillus grevillei',
  scientificSynonyms: ['Suillus elegans', 'Boletus grevillei'],
  polishName: 'Maślak żółty',
  vernacularNames: ['maślak modrzewiowy'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['yellow', 'orange', 'rust'],
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['slimy', 'smooth'],
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['full'],
    hymenophoreColor: ['yellow', 'olive'],
    sporePrint: ['brown', 'olive_brown'],
    capFleshColor: ['yellow'],
    capFleshColorChange: ['none', 'pink'],
    bruising: ['brown', 'pink'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose', 'reticulate'], 
    stipeColor: ['yellow', 'orange', 'rust'],
    stipeFleshColor: ['yellow', 'brown_light'], 
    stipeFleshColorChange: ['none', 'pink'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['solitary', 'scattered', 'clustered'],
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
    mycorrhizalPartners: ['larix'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['suillus-grevillei-1'],
  description:
    'Wyłącznie pod modrzewiami - także pojedynczymi drzewami w parkach. Kapelusz złocistożółty do pomarańczowego, śluzowaty; błoniasty pierścień białawy, potem żółtawy.',
};
