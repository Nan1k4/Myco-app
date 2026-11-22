/**
 * @file Rekord gatunku: Maślak syberyjski (Suillus americanus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillusAmericanus: Mushroom = {
  id: mushroomId('suillus-americanus'),
  scientificName: 'Suillus americanus',
  scientificSynonyms: ['Suillus sibiricus', 'Boletus americanus'],
  polishName: 'Maślak syberyjski',
  vernacularNames: ['maślak amerykański'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['yellow', 'orange', 'red'], 
    capShape: ['convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['slimy', 'scaly', 'fibrillose'],
    capMargin: ['appendiculate', 'inrolled'], 
    capPeelability: ['full'],
    hymenophoreColor: ['yellow', 'olive', 'brown'], 
    sporePrint: ['brown', 'olive_brown'],
    capFleshColor: ['yellow'],
    capFleshColorChange: ['none', 'pink'],
    bruising: ['brown', 'pink'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid', 'stuffed', 'hollow'],
    stipeSurface: ['glandular_dots'],
    stipeColor: ['yellow', 'brown_light'],
    stipeFleshColor: ['yellow'],
    stipeFleshColorChange: ['none', 'pink'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['fibrous_zone', 'none'],
    growthHabit: ['scattered', 'clustered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Zdjąć śluzowatą skórkę. Dotykanie owocników u części osób wywołuje kontaktowe zapalenie skóry.',
    },
    notes: 'Jadalny, ale w Polsce chroniony - nie zbierać.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'], 
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: true, 
  imageKeys: ['suillus-americanus-1'],
  description:
    'Pod sosnami pięcioigielnymi; w Polsce rzadki, głównie z limbą w Tatrach. Kapelusz jaskrawożółty z czerwonawymi łuseczkami, brzeg z kłaczkami osłony. Trzon smukły, z brązowymi gruczołkami. Gatunek chroniony.',
};
