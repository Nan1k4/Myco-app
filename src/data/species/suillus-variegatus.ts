/**
 * @file Rekord gatunku: Maślak pstry (Suillus variegatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillusVariegatus: Mushroom = {
  id: mushroomId('suillus-variegatus'),
  scientificName: 'Suillus variegatus',
  scientificSynonyms: ['Boletus variegatus'],
  polishName: 'Maślak pstry',
  vernacularNames: ['none'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['yellow', 'olive', 'orange', 'brown_light'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['velvety', 'scaly', 'slimy'], 
    capMargin: ['smooth', 'inrolled'],
    capPeelability: ['to_half', 'none'],
    hymenophoreColor: ['olive', 'brown', 'brown_dark'],
    sporePrint: ['olive_brown', 'brown'],
    capFleshColor: ['cream', 'yellow'],
    capFleshColorChange: ['blue', 'none'], 
    bruising: ['blue', 'none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['yellow', 'orange', 'brown_light'],
    stipeFleshColor: ['yellow', 'brown_light'],
    stipeFleshColorChange: ['blue', 'none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'unpleasant'], 
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jadalny, przeciętnej wartości.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['suillus-variegatus-1'],
  description:
    'W suchych borach sosnowych na piaskach. Kapelusz oliwkowożółty, drobno kosmkowaty - lepki tylko w wilgoci. Pory drobne, oliwkowobrązowe; miąższ po przekrojeniu lekko sinieje. Brak pierścienia.',
};
