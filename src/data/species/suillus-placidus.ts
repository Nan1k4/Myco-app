/**
 * @file Rekord gatunku: Maślak wejmutkowy (Suillus placidus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillusPlacidus: Mushroom = {
  id: mushroomId('suillus-placidus'),
  scientificName: 'Suillus placidus',
  scientificSynonyms: ['Boletus placidus'],
  polishName: 'Maślak wejmutkowy',
  vernacularNames: ['maślak łagodny'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['white', 'cream', 'yellow', 'grey'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['slimy', 'smooth'],
    capMargin: ['smooth'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream', 'yellow'], 
    sporePrint: ['brown'], 
    capFleshColor: ['white', 'cream', 'yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['glandular_dots'],
    stipeColor: ['white', 'cream', 'yellow'],
    stipeFleshColor: ['white', 'cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
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
    notes: 'Jadalny, niskiej wartości.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['soil'],
    habitats: ['park', 'coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['suillus-placidus-1'],
  description:
    'Gatunek obcy w Polsce, wyłącznie pod sosnami pięcioigielnymi - głównie wejmutką w parkach i nasadzeniach. Kapelusz koloru kości słoniowej, bardzo śluzowaty. Brak pierścienia; biały trzon z ciemniejącymi gruczołkami.',
};
