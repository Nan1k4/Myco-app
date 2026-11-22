/**
 * @file Rekord gatunku: muchomor pochwiasty (Amanita vaginata).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaVaginata: Mushroom = {
  id: mushroomId('amanita-vaginata'),
  scientificName: 'Amanita vaginata',
  scientificSynonyms: ['Amanitopsis vaginata', 'Agaricus vaginatus'],
  polishName: 'Muchomor pochwiasty',
  vernacularNames: ['muchomor szarawy', 'mglejarka'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['grey', 'brown_light', 'white'], 
    capShape: ['campanulate', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'], 
    capMargin: ['striate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['smooth', 'fibrillose', 'snakeskin'], 
    stipeColor: ['white', 'grey'],
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
      notes: 'Surowy trujący (hemolizyny). Brak pierścienia to cecha zawodna - muchomor zielonawy i jadowity mogą go utracić. Odradzany początkującym.',
    },
    notes: 'Surowy zawiera hemolizyny. Główne ryzyko to pomyłka z muchomorem zielonawym lub jadowitym.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula', 'fagus', 'quercus', 'picea', 'pinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['capMargin', 'stipeBase'],
      note: 'Muchomor zielonawy ma gładki (nieprążkowany) brzeg kapelusza, bulwę u podstawy i zwykle pierścień - który może odpaść.',
    },
    {
      mushroomId: mushroomId('amanita-virosa'),
      distinguishingFeatures: ['capMargin', 'stipeBase'],
      note: 'Białe formy pochwiastego bardzo łatwo pomylić z jadowitym. Jadowity ma gładki brzeg kapelusza, kosmkowaty trzon z pierścieniem i bulwę.',
    },
    {
      mushroomId: mushroomId('amanita-pantherina'),
      distinguishingFeatures: ['stipeBase', 'stipeSurface'],
      note: 'Plamisty ma białe łatki na kapeluszu, pierścień i bulwę z obrzeżeniem; pochwiasty - zwykle gładki kapelusz, bez pierścienia, z zygzakowatym trzonem i workowatą pochwą bez bulwy.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-vaginata-1'],
  description:
    'Szary kapelusz z mocno prążkowanym brzegiem, brak pierścienia, smukły trzon tkwiący w białej workowatej pochwie. Pochwę trzeba odkopać - często zostaje w ziemi.',
};
