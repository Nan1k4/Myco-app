/**
 * @file Rekord gatunku: Maślak zwyczajny (Suillus luteus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillusLuteus: Mushroom = {
  id: mushroomId('suillus-luteus'),
  scientificName: 'Suillus luteus',
  scientificSynonyms: ['Boletus luteus'],
  polishName: 'Maślak zwyczajny',
  vernacularNames: ['maślak'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown_light', 'brown', 'brown_dark', 'olive'], 
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['slimy', 'smooth'], 
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['full'],
    hymenophoreColor: ['cream', 'yellow', 'olive'],
    sporePrint: ['brown', 'olive_brown'],
    capFleshColor: ['white', 'yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['glandular_dots', 'smooth'],
    stipeColor: ['white', 'yellow', 'brown_light'],
    stipeFleshColor: ['white', 'yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['membranous_skirt', 'none'], 
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['none', 'mushroomy'],
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
    notes: 'Dobry grzyb jadalny, nadaje się do marynowania i suszenia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['suillus-luteus-1'],
  description:
    'W młodych borach i nasadzeniach sosnowych, często licznie. Kapelusz czekoladowobrązowy, bardzo śluzowaty; duży błoniasty pierścień, od spodu fioletowawy. Nad pierścieniem trzon pokryty ziarenkami.',
};
