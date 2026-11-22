/**
 * @file Rekord gatunku: muchomor szafranowy (Amanita crocea).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaCrocea: Mushroom = {
  id: mushroomId('amanita-crocea'),
  scientificName: 'Amanita crocea',
  scientificSynonyms: ['Amanitopsis crocea', 'Amanita vaginata var. crocea'],
  polishName: 'Muchomor szafranowy',
  vernacularNames: ['muchomor żółtawy', 'mglejarka'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['orange', 'yellow'],
    capShape: ['campanulate', 'convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['striate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['fibrillose', 'snakeskin'],
    stipeColor: ['cream', 'yellow', 'orange'],
    stipeFleshColor: ['white', 'cream'],
    stipeFleshColorChange: ['none'],
    volva: ['present'], 
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Surowy trujący (hemolizyny). Brak pierścienia to cecha zawodna - muchomor zielonawy może go utracić. Odradzany początkującym.',
    },
    notes: 'Surowy zawiera hemolizyny. Główne ryzyko to pomyłka z muchomorem zielonawym lub jadowitym.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula', 'fagus', 'quercus', 'picea'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['capMargin', 'stipeBase', 'ring'],
      note: 'Żółtawe formy muchomora zielonawego mają gładki brzeg kapelusza, bulwę u podstawy i zwykle pierścień - który może odpaść.',
    },
    {
      mushroomId: mushroomId('amanita-gemmata'),
      distinguishingFeatures: ['stipeBase', 'stipeSurface', 'capSurface'],
      note: 'Narcyzowy ma bladożółty kapelusz z białymi łatkami, bulwę z kołnierzykowatym obrzeżeniem i nietrwały pierścień; szafranowy - pomarańczowożółty, bez bulwy, z szafranowymi zygzakami na trzonie.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-crocea-1'],
  description:
    'Pomarańczowożółty kapelusz z prążkowanym brzegiem, trzon pokryty szafranowymi zygzakami, bez pierścienia, z dużą białą pochwą. Najczęściej pod brzozami.',
};
