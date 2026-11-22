/**
 * @file Rekord gatunku: muchomor rdzawobrązowy (Amanita fulva).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaFulva: Mushroom = {
  id: mushroomId('amanita-fulva'),
  scientificName: 'Amanita fulva',
  scientificSynonyms: ['Amanitopsis fulva', 'Amanita vaginata var. fulva'],
  polishName: 'Muchomor rdzawobrązowy',
  vernacularNames: ['panienka', 'mglejarka'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['orange', 'rust', 'brown_light', 'brown'],
    capShape: ['campanulate', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['striate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'],
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
      notes: 'Surowy trujący (hemolizyny). Brak pierścienia to cecha zawodna - muchomor zielonawy może go utracić. Odradzany początkującym.',
    },
    notes: 'Surowy zawiera hemolizyny. Główne ryzyko to pomyłka z muchomorem zielonawym lub jadowitym.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula', 'picea', 'pinus', 'fagus', 'quercus'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest', 'bog'], 
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['capMargin', 'stipeBase'],
      note: 'Muchomor zielonawy ma gładki brzeg kapelusza, bulwę u podstawy i zwykle pierścień - który może odpaść.',
    },
    {
      mushroomId: mushroomId('amanita-pantherina'),
      distinguishingFeatures: ['stipeBase'],
      note: 'Plamisty ma białe łatki na kapeluszu, pierścień i bulwę z obrzeżeniem; rdzawobrązowy - gładki kapelusz, bez pierścienia, z workowatą pochwą bez bulwy.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-fulva-1'],
  description:
    'Pomarańczowobrązowy kapelusz z ciemniejszym garbkiem i prążkowanym brzegiem, bez pierścienia, z workowatą pochwą w rdzawe plamy. Częsty w wilgotnych borach.',
};
