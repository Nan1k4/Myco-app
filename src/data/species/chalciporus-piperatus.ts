/**
 * @file Rekord gatunku: maślaczek pieprzowy (Chalciporus piperatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const chalciporusPiperatus: Mushroom = {
  id: mushroomId('chalciporus-piperatus'),
  scientificName: 'Chalciporus piperatus',
  scientificSynonyms: ['Boletus piperatus', 'Suillus piperatus'],
  polishName: 'Maślaczek pieprzowy',
  vernacularNames: ['maślak pieprzowy'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['orange', 'rust', 'brown_light', 'brown'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'], 
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['orange', 'rust', 'brown'], 
    sporePrint: ['rust', 'brown'],
    capFleshColor: ['cream', 'yellow'],
    capFleshColorChange: ['none', 'pink'], 
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['brown_light', 'orange', 'yellow'], 
    stipeFleshColor: ['yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'], 
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['peppery'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['unpleasant_taste'],
    notes: 'Nie zbiera się go do jedzenia; bywa używany w małej ilości jako przyprawa.',
  },
  ecology: {
    trophicModes: ['mycorrhizal', 'parasitic'],
    mycorrhizalPartners: ['pinus', 'picea', 'betula'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['chalciporus-piperatus-1'],
  description:
    'Mały, cynamonowobrązowy, pory rdzawomiedziane, miąższ żółtawy, a grzybnia u podstawy trzonu jaskrawożółta. Smak ostry, pieprzny – niejadalny, najwyżej jako przyprawa w małej ilości. Często obok muchomora czerwonego.',
};
