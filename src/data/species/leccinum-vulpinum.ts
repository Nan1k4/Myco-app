/**
 * @file Rekord gatunku: koślarz sosnowy (Leccinum vulpinum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const leccinumVulpinum: Mushroom = {
  id: mushroomId('leccinum-vulpinum'),
  scientificName: 'Leccinum vulpinum',
  scientificSynonyms: ['Leccinum aurantiacum var. vulpinum', 'Krombholziella vulpina'],
  polishName: 'Koźlarz sosnowy',
  vernacularNames: ['kozak'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['red', 'rust', 'brown', 'orange'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['fibrillose', 'velvety'],
    capMargin: ['overhanging'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'grey'],
    sporePrint: ['brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['violet', 'grey', 'black'],
    bruising: ['brown', 'grey'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid', 'fibrous'],
    stipeSurface: ['scabrous'], 
    stipeColor: ['white', 'cream'], 
    stipeFleshColor: ['white'],
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
    notes: 'Smaczny grzyb jadalny o zwięzłym miąższu. Wymaga obróbki termicznej; trzony bywają włókniste.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['leccinum-vulpinum-1'],
  description:
    'Pod sosnami, często w borach z mchami i borówką. Kapelusz ciemnorudy do ceglastobrązowego, kosmki na trzonie rdzawobrązowe do czarniawych. Miąższ szarofioletowo ciemnieje.',
};
