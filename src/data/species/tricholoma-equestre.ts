/**
 * @file Rekord gatunku: gąska zielonka (Tricholoma equestre).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const tricholomaEquestre: Mushroom = {
  id: mushroomId('tricholoma-equestre'),
  scientificName: 'Tricholoma equestre',
  scientificSynonyms: ['Tricholoma flavovirens', 'Agaricus equestris'],
  polishName: 'Gąska zielonka',
  vernacularNames: ['zielonka', 'gąska żółta'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['sinuate'],
    capColor: ['yellow', 'olive', 'brown', 'green'],
    capShape: ['convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['slimy', 'scaly', 'fibrillose'],
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['full', 'to_half'],
    hymenophoreColor: ['yellow'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose', 'smooth'],
    stipeColor: ['yellow'],
    stipeFleshColor: ['white', 'yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['mealy', 'none'],
    taste: ['mild', 'mealy'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['rhabdomyolysis'],
    symptomOnsetHours: { min: 24, max: 72 },
    notes: 'Powoduje rabdomiolizę (rozpad mięśni prążkowanych, uszkodzenie nerek i serca), zwłaszcza przy powtarzanych lub obfitych posiłkach. W Polsce klasyfikowana jako trująca.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['sand', 'soil', 'moss'],
    habitats: ['coniferous_forest'],
  },
  fruiting: {
    months: [9, 10, 11],
    optimalMeanTempC: { min: 4, max: 14 },
    minPrecipitationMm: 15,
    lagDays: { min: 7, max: 14 },
    frostSensitive: false,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['tricholoma-equestre-1'],
  description:
    'Żółtozielonkawy kapelusz z ciemniejszym, łuseczkowatym środkiem, siarkowożółte blaszki wycięte ząbkiem i żółty trzon. Rośnie późną jesienią w piaszczystych borach sosnowych.',
};
