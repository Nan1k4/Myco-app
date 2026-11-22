/**
 * @file Rekord gatunku: uszak bzowy (Auricularia auricula-judae).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const auriculariaAuriculaJudae: Mushroom = {
  id: mushroomId('auricularia-auricula-judae'),
  scientificName: 'Auricularia auricula-judae',
  scientificSynonyms: ['Hirneola auricula-judae', 'Exidia auricula-judae'],
  polishName: 'Uszak bzowy',
  vernacularNames: ['ucho Judasza', 'ucho bzowe'],
  features: {
    hymenophore: ['smooth'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown', 'brown_dark', 'purple'],
    capShape: ['ear_shaped'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['velvety', 'wrinkled'],
    capMargin: ['wavy', 'smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['brown', 'purple'],
    sporePrint: ['white'],
    capFleshColor: ['brown_light', 'brown'],
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
    growthHabit: ['clustered', 'scattered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Przed użyciem namoczyć/ugotować; po wysuszeniu pęcznieje. Chrupiąca, galaretowata konsystencja; ceniony w kuchni azjatyckiej (podobny uszak chiński), mało smaku. W nadmiarze ma lekkie działanie przeciwzakrzepowe.',
  },
  ecology: {
    trophicModes: ['saprotrophic', 'parasitic'],
    mycorrhizalPartners: [],
    substrates: ['wood_living', 'wood_dead'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    optimalMeanTempC: { min: 0, max: 16 },
    minPrecipitationMm: 10,
    lagDays: { min: 2, max: 5 },
    frostSensitive: false,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['auricularia-auricula-judae-1'],
  description:
    'Galaretowaty, brązowofioletowy owocnik w kształcie ucha, na bzie czarnym i innych drzewach liściastych. Wierzch delikatnie omszony, spód żyłkowany; po wyschnięciu kurczy się i twardnieje, po deszczu pęcznieje. Jadalny.',
};
