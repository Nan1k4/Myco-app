/**
 * @file Rekord gatunku: złociec czerwonawy (Buchwaldoboletus lignicola).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const buchwaldoboletusLignicola: Mushroom = {
  id: mushroomId('buchwaldoboletus-lignicola'),
  scientificName: 'Buchwaldoboletus lignicola',
  scientificSynonyms: [
    'Boletus lignicola',
    'Pulveroboletus lignicola',
    'Xerocomus lignicola',
    'Gyrodon lignicola',
    'Phlebopus lignicola',
  ],
  polishName: 'Złociec czerwonawy',
  vernacularNames: ['złotak czerwonawy', 'borowik czerwonawy', 'podgrzybek czerwonawy'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'], 
    capColor: ['rust', 'brown', 'orange', 'yellow'],
    capShape: ['convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['velvety', 'cracked'], 
    capMargin: ['inrolled', 'smooth'], 
    capPeelability: ['full'], 
    hymenophoreColor: ['yellow', 'brown_light'],
    sporePrint: ['brown'],
    capFleshColor: ['yellow'],
    capFleshColorChange: ['blue', 'none'], 
    bruising: ['blue'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose', 'smooth'],
    stipeColor: ['yellow', 'rust', 'brown'], 
    stipeFleshColor: ['yellow'],
    stipeFleshColorChange: ['blue', 'none'],
    volva: ['absent'],
    stipeBase: ['plain'], 
    ring: ['none'],
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['fruity', 'unpleasant'], 
    taste: ['unpleasant'],
  },
  edibility: {
    category: 'unknown',
    notes: 'Źródła sprzeczne (jadalny / jadalność nieznana). Gatunek bardzo rzadki - nie zbierać.',
  },
  ecology: {
    trophicModes: ['parasitic', 'saprotrophic'], 
    mycorrhizalPartners: [],
    substrates: ['wood_dead'], 
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 14, max: 32 },
    minPrecipitationMm: 45,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['buchwaldoboletus-lignicola-1'],
  description:
    'Rdzawy, zamszowy kapelusz, jaskrawożółte pory siniejące po uciśnięciu, żółta grzybnia u podstawy. Rośnie na drewnie drzew iglastych (często modrzewi), zawsze tam, gdzie murszak rdzawy. Bardzo rzadki - nie zbierać.',
};
