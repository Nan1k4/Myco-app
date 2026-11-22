/**
 * @file Rekord gatunku: mleczaj chrząstka (Lactifluus vellereus, dawniej Lactarius vellereus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lactifluusVellereus: Mushroom = {
  id: mushroomId('lactifluus-vellereus'),
  scientificName: 'Lactifluus vellereus',
  scientificSynonyms: ['Lactarius vellereus', 'Agaricus vellereus'],
  polishName: 'Mleczaj chrząstka',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'subdecurrent'],
    capColor: ['white', 'cream'],
    capShape: ['funnel', 'depressed', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['velvety'], 
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['white'], 
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['velvety'],
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'fruity'],
    taste: ['acrid'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['acrid', 'poor_quality'],
    notes: 'Bardzo ostry, piekący miąższ; surowy może podrażniać przewód pokarmowy. W niektórych źródłach jadalny po długim moczeniu i gotowaniu - nie zalecany.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'carpinus', 'betula'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['lactifluus-vellereus-1'],
  description:
    'Duży, biały, twardy i sztywny owocnik z aksamitnym kapeluszem i rzadkimi blaszkami; obfite, białe, piekące mleczko. Pospolity w lasach liściastych.',
};
