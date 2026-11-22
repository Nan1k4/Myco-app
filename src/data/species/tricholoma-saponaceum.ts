/**
 * @file Rekord gatunku: gąska mydlana (Tricholoma saponaceum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const tricholomaSaponaceum: Mushroom = {
  id: mushroomId('tricholoma-saponaceum'),
  scientificName: 'Tricholoma saponaceum',
  scientificSynonyms: ['Agaricus saponaceus', 'Gyrophila saponacea'],
  polishName: 'Gąska mydlana',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['sinuate', 'adnexed'], 
    capColor: ['grey', 'olive', 'brown_dark', 'brown_light'], 
    capShape: ['convex', 'campanulate', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'cracked'], 
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none', 'pink'], 
    bruising: ['none', 'pink'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate', 'tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'grey', 'olive', 'pink'], 
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['pink', 'red'], 
    volva: ['absent'],
    stipeBase: ['plain', 'tapering'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['soapy', 'radish'], 
    taste: ['mild', 'soapy'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['unpleasant_smell', 'bitter', 'minor_toxins'],
    notes: 'Zapach mydła i niemiły smak; część źródeł uznaje za lekko trujący. Nie do spożycia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'abies', 'fagus', 'quercus', 'betula'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 6, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['tricholoma-saponaceum-1'],
  description:
    'Szarooliwkowy, często spękany kapelusz, rzadkie grube blaszki, trzon z różowieniem/czerwienieniem miąższu u nasady. Zapach mydła. Gąska bardzo zmienna barwą. W lasach iglastych i liściastych.',
};
