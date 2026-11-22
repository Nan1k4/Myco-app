/**
 * @file Rekord gatunku: krwistoborowik Le Gala.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const rubroboletusLegaliae: Mushroom = {
  id: mushroomId('rubroboletus-legaliae'),
  scientificName: 'Rubroboletus legaliae',
  scientificSynonyms: ['Boletus legaliae'],
  polishName: 'Krwistoborowik Le Gala',
  vernacularNames: ['borowik Le Gala'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'], 
    capColor: ['cream', 'pink', 'grey'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['velvety', 'smooth'],
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'orange', 'red'],
    sporePrint: ['olive_brown'],
    capFleshColor: ['cream', 'yellow'],
    capFleshColorChange: ['blue'],
    bruising: ['blue'],
    latex: ['none'],
    stipeShape: ['clavate', 'ventricose'],
    stipeInterior: ['solid'],
    stipeSurface: ['reticulate'], 
    stipeColor: ['yellow', 'red', 'pink'],
    stipeFleshColor: ['yellow', 'red'],
    stipeFleshColorChange: ['blue'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'unpleasant'],
    taste: ['mild'], 
  },
  edibility: {
    category: 'poisonous',
    
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 6 },
    notes: 'Objawy jak u krwistoborowika szatańskiego - silne wymioty i biegunka.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'carpinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest'],
  },
  fruiting: {
    months: [7, 8, 9],
    optimalMeanTempC: { min: 16, max: 24 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['rubroboletus-legaliae-1'],
  description: 'Kapelusz białawy z różowawym odcieniem, pory pomarańczowoczerwone, trzon z czerwoną siateczką. Miąższ sinieje. Gatunek ciepłolubny, pod dębami i bukami; w Polsce skrajnie rzadki.',
};
