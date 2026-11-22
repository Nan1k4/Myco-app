/**
 * @file Rekord gatunku: gołąbek brudnożółty (Russula citrina).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaOchroleuca: Mushroom = {
  id: mushroomId('russula-ochroleuca'),
  scientificName: 'Russula ochroleuca',
  scientificSynonyms: ['Russula citrina', 'Russula granulosa'],
  polishName: 'Gołąbek brudnożółty',
  vernacularNames: ['gołąbek ochrowożółty'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['yellow', 'brown_light', 'olive'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth', 'striate'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white', 'cream'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'grey'], 
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'grey'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none', 'grey'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'fruity'],
    taste: ['mild', 'acrid'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Tylko okazy o łagodnym smaku (sprawdzić kawałek i wypluć); ostre odrzucić.',
    },
    notes: 'Mało wartościowy.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'fagus', 'quercus', 'betula'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['russula-ochroleuca-1'],
  description:
    'Jeden z najpospolitszych gołąbków. Kapelusz matowy, ochrowożółty; blaszki i trzon białe, trzon z wiekiem szarzeje. Smak zmienny - od łagodnego po ostry.',
};
