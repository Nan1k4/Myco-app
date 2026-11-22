/**
 * @file Rekord gatunku: Maślak rdzawobrązowy (Suillus collinitus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillusCollinitus: Mushroom = {
  id: mushroomId('suillus-collinitus'),
  scientificName: 'Suillus collinitus',
  scientificSynonyms: ['Suillus fluryi', 'Boletus collinitus'],
  polishName: 'Maślak rdzawobrązowy',
  vernacularNames: ['none'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown', 'rust', 'brown_dark'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['slimy', 'fibrillose'], 
    capMargin: ['smooth', 'inrolled'],
    capPeelability: ['full'],
    hymenophoreColor: ['yellow', 'olive'],
    sporePrint: ['brown', 'olive_brown'],
    capFleshColor: ['yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['glandular_dots', 'smooth'],
    stipeColor: ['yellow', 'cream', 'pink'],
    stipeFleshColor: ['yellow', 'pink'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'], 
    ring: ['none'],
    growthHabit: ['scattered', 'clustered'],
    smell: ['none', 'sour'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Zdjąć śluzowatą skórkę kapelusza - u wrażliwych osób wywołuje dolegliwości żołądkowo-jelitowe.',
    },
    notes: 'Jadalny, przeciętnej wartości.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'park'],
  },
  fruiting: {
    months: [8, 9, 10, 11, 12], 
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['suillus-collinitus-1'],
  description:
    'Gatunek ciepłolubny, głównie śródziemnomorski, pod sosnami na suchych, piaszczystych glebach. Kapelusz rdzawobrązowy z ciemniejszymi promienistymi włókienkami. Kluczowa cecha: różowa grzybnia u podstawy trzonu.',
};
