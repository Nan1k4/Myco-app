/**
 * @file Rekord gatunku: borowik dwubarwny (Baorangia bicolor).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const baorangiaBicolor: Mushroom = {
  id: mushroomId('baorangia-bicolor'),
  scientificName: 'Baorangia bicolor',
  scientificSynonyms: ['Boletus bicolor', 'Ceriomyces bicolor', 'Xerocomus bicolor', 'Boletus rubellus subsp. bicolor'],
  polishName: 'Borowik dwubarwny',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['red', 'pink', 'rust'],
    capShape: ['convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['velvety', 'smooth', 'cracked'],
    capMargin: ['smooth'],
    capPeelability: ['to_third'],
    hymenophoreColor: ['yellow', 'olive'], 
    sporePrint: ['olive_brown'],
    capFleshColor: ['yellow'], 
    capFleshColorChange: ['blue', 'none'], 
    bruising: ['blue'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth', 'fibrillose'], 
    stipeColor: ['red', 'yellow'], 
    stipeFleshColor: ['yellow'], 
    stipeFleshColorChange: ['blue', 'none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Odradzany początkującym - ryzyko pomyłki z trującymi, szybko siniejącymi borowikami.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9],
    optimalMeanTempC: { min: 15, max: 24 },
    minPrecipitationMm: 45,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['baorangia-bicolor-1'],
  description:
    'Czerwony kapelusz i trzon, żółte pory powoli granatowiejące po uciśnięciu. Pod dębami we wschodniej Ameryce Płn. Odradzany początkującym - łatwo pomylić z trującymi, szybko siniejącymi borowikami.',
};
