/**
 * @file Rekord gatunku: koślarz czerwony (Leccinum aurantiacum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const leccinumAurantiacum: Mushroom = {
  id: mushroomId('leccinum-aurantiacum'),
  scientificName: 'Leccinum aurantiacum',
  scientificSynonyms: ['Leccinum quercinum', 'Boletus aurantiacus'],
  polishName: 'Koźlarz czerwony',
  vernacularNames: ['czerwony kozak', 'kozak'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['orange', 'red', 'rust', 'brown'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['fibrillose', 'smooth'],
    capMargin: ['overhanging'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'grey', 'olive'],
    sporePrint: ['brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['pink', 'violet', 'grey', 'black'], 
    bruising: ['brown', 'grey'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid', 'fibrous'],
    stipeSurface: ['scabrous'],
    stipeColor: ['white'], 
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
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Niedogotowany lub surowy może wywołać dolegliwości żołądkowo-jelitowe - dokładnie obrobić termicznie. Ciemnieje po ugotowaniu.',
    },
    notes: 'Bardzo smaczny grzyb jadalny o zwięzłym miąższu, który silnie ciemnieje podczas obróbki. Wymaga obróbki termicznej; trzony bywają włókniste.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['populus', 'quercus', 'betula'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
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
  imageKeys: ['leccinum-aurantiacum-1'],
  description:
    'Głównie pod osikami i topolami. Kapelusz pomarańczowoczerwony, kosmki na trzonie białawe, z wiekiem rdzawobrązowe (u pomarańczowożółtego od początku czarne). Miąższ różowoszarzeje, potem czernieje.',
};
