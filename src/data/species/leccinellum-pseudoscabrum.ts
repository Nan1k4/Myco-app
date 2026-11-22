/**
 * @file Rekord gatunku: koślarz grabowy (Leccinellum pseudoscabrum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const leccinellumPseudoscabrum: Mushroom = {
  id: mushroomId('leccinellum-pseudoscabrum'),
  scientificName: 'Leccinellum pseudoscabrum',
  scientificSynonyms: ['Leccinum pseudoscabrum', 'Leccinum carpini', 'Leccinellum carpini'],
  polishName: 'Koźlarz grabowy',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['grey', 'brown_light', 'brown', 'olive'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['wrinkled', 'cracked'], 
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'yellow', 'brown_light'],
    sporePrint: ['brown'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['pink', 'violet', 'grey', 'black'], 
    bruising: ['grey', 'black'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid', 'fibrous'],
    stipeSurface: ['scabrous'],
    stipeColor: ['white', 'grey'], 
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['pink', 'violet', 'grey', 'black'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jadalny, łagodny w smaku; miąższ mocno ciemnieje podczas gotowania. Trzony są włókniste, dlatego wykorzystuje się głównie kapelusze.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['carpinus', 'corylus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 13, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 9 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['leccinellum-pseudoscabrum-1'],
  description:
    'Pod grabami i leszczynami. Kapelusz szarobrązowy, nierówny, pomarszczony, w suszy spękany. Miąższ po przekrojeniu szybko różowofioletowo szarzeje, a potem czernieje.',
};
