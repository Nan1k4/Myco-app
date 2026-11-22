/**
 * @file Rekord gatunku: koślarz pomarańczowożółty (Leccinum versipelle).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const leccinumVersipelle: Mushroom = {
  id: mushroomId('leccinum-versipelle'),
  scientificName: 'Leccinum versipelle',
  scientificSynonyms: ['Leccinum testaceoscabrum', 'Boletus versipellis'],
  polishName: 'Koźlarz pomarańczowożółty',
  vernacularNames: ['kozak', 'czerwony kozak'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['orange', 'yellow', 'brown_light'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['fibrillose', 'smooth'], 
    capMargin: ['overhanging'], 
    capPeelability: ['none'],
    hymenophoreColor: ['grey', 'cream', 'brown_light'],
    sporePrint: ['brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['violet', 'grey', 'black'], 
    bruising: ['grey', 'black'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid', 'fibrous'],
    stipeSurface: ['scabrous'], 
    stipeColor: ['white', 'grey'], 
    stipeFleshColor: ['white', 'green'], 
    stipeFleshColorChange: ['violet', 'grey', 'black'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Niedogotowany lub surowy może wywołać dolegliwości żołądkowo-jelitowe - dokładnie obrobić termicznie. Ciemnieje po ugotowaniu.',
    },
    notes: 'Smaczny grzyb jadalny o zwięzłym miąższu. Wymaga obróbki termicznej; trzony bywają włókniste i często są odcinane.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula'],
    substrates: ['soil', 'moss'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest', 'bog'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['leccinum-versipelle-1'],
  description:
    'Pod brzozami. Kapelusz pomarańczowy z wystającą na brzegu skórką, trzon gruby z czarnymi kosmkami. Miąższ po przekrojeniu szarofioletowieje i czernieje - to normalne dla tego gatunku.',
};
