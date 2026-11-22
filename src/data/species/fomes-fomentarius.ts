/**
 * @file Rekord gatunku: hubiak pospolity (Fomes fomentarius).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const fomesFomentarius: Mushroom = {
  id: mushroomId('fomes-fomentarius'),
  scientificName: 'Fomes fomentarius',
  scientificSynonyms: ['Boletus fomentarius', 'Polyporus fomentarius'],
  polishName: 'Hubiak pospolity',
  vernacularNames: ['huba'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['grey', 'brown', 'brown_light', 'black'],
    capShape: ['hoof_shaped'],
    capSize: ['10_to_20', 'over_20'],
    capSurface: ['smooth', 'zonate', 'crust'], 
    capMargin: ['rounded'],
    capPeelability: ['none'],
    hymenophoreColor: ['cream', 'brown_light'],
    sporePrint: ['white'],
    capFleshColor: ['brown', 'brown_light'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['absent'], 
    stipeInterior: ['not_applicable'],
    stipeSurface: ['not_applicable'],
    stipeColor: ['not_applicable'],
    stipeFleshColor: ['not_applicable'],
    stipeFleshColorChange: ['not_applicable'],
    volva: ['absent'],
    stipeBase: ['not_applicable'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['tough', 'no_nutritional_value'],
    notes: 'Zdrewniały, nie do zjedzenia. Historycznie używany jako hubka do rozniecania ognia oraz do wyrobu przedmiotów z „amadou”.',
  },
  ecology: {
    trophicModes: ['parasitic', 'saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_living', 'wood_dead'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    optimalMeanTempC: { min: 5, max: 22 },
    minPrecipitationMm: 30,
    lagDays: { min: 14, max: 30 },
    frostSensitive: false,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['fomes-fomentarius-1'],
  description:
    'Duży, kopytowaty, szarobrązowy owocnik z twardą skorupą i koncentrycznymi strefami, na bukach i brzozach. Rurki warstwowe, spód płaski; miąższ korkowaty. Niejadalny.',
};
