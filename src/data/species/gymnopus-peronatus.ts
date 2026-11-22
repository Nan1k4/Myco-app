/**
 * @file Rekord gatunku: łysostopek cierpki (Gymnopus peronatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const gymnopusPeronatus: Mushroom = {
  id: mushroomId('gymnopus-peronatus'),
  scientificName: 'Gymnopus peronatus',
  scientificSynonyms: ['Collybia peronata', 'Marasmius peronatus'],
  polishName: 'Łysostopek cierpki',
  vernacularNames: ['łysostopek ostry'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['brown_light', 'ochre', 'brown', 'cream'],
    capShape: ['convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'wrinkled'],
    capMargin: ['striate', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'ochre', 'brown_light'],
    sporePrint: ['white', 'cream'],
    capFleshColor: ['cream', 'yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'fibrous'],
    stipeSurface: ['hairy', 'fibrillose'],
    stipeColor: ['yellow', 'ochre', 'brown_light'],
    stipeFleshColor: ['yellow', 'cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped', 'clustered'],
    smell: ['none', 'sour'],
    taste: ['acrid', 'peppery'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Silnie piekący smak; spożycie wywołuje podrażnienie i zaburzenia żołądkowo-jelitowe.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['litter'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['gymnopus-peronatus-1'],
  description:
    'Drobny grzyb ściółkowy o żółtobrązowawych, rzadszych blaszkach i trzonie gęsto owłosionym żółtawymi kosmkami u nasady. Smak silnie piekący.',
};
