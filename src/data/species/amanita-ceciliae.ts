/**
 * @file Rekord gatunku: muchomor złotawy (Amanita ceciliae).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaCeciliae: Mushroom = {
  id: mushroomId('amanita-ceciliae'),
  scientificName: 'Amanita ceciliae',
  scientificSynonyms: ['Amanita inaurata'],
  polishName: 'Muchomor złotawy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['brown_light', 'brown', 'orange', 'yellow'], 
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['warts', 'smooth'], 
    capMargin: ['striate'], 
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['snakeskin'], 
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
      notes: 'Na surowo trujący - tylko po dokładnym ugotowaniu.',
    },
    notes: 'Zbiór odradzany: łatwo pomylić z trującymi muchomorami.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'betula', 'picea'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 13, max: 21 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-pantherina'),
      distinguishingFeatures: ['ring', 'capSurface', 'volva'],
      note: 'Plamisty ma pierścień, białe brodawki i bulwę z ostrym obrzeżeniem; złotawy - brak pierścienia, szare łatki, szare pierścienie resztek u podstawy.',
    },
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['ring', 'capMargin', 'volva'],
      note: 'Sromotnikowy ma pierścień, gładki (nieprążkowany) brzeg kapelusza i białą workowatą pochwę. Pierścień może odpaść - sprawdzaj wszystkie cechy.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-ceciliae-1'],
  description:
    'Duża mglejarka bez pierścienia. Kapelusz złotobrązowy z szarociemnymi łatkami i mocno bruzdowanym brzegiem; trzon z szarymi przepaskami, u podstawy szare, rozpadające się pierścienie pochwy.',
};
