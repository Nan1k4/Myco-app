/**
 * @file Rekord gatunku: muchomor oliwkowy (Amanita battarrae).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaBattarrae: Mushroom = {
  id: mushroomId('amanita-battarrae'),
  scientificName: 'Amanita battarrae',
  scientificSynonyms: ['Amanita umbrinolutea'],
  polishName: 'Muchomor oliwkowy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free', 'adnexed'],
    capColor: ['olive', 'brown_light', 'brown', 'yellow'], 
    capShape: ['campanulate', 'convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth'],
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
    stipeColor: ['white', 'brown_light', 'grey'],
    stipeFleshColor: ['white'],
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
      notes: 'Na surowo trujący - tylko po dokładnym ugotowaniu.',
    },
    notes: 'Gatunek rzadki; zbiór odradzany ze względu na podobieństwo do trujących muchomorów.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'abies', 'pinus'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['capMargin', 'stipeBase'],
      note: 'Sromotnikowy ma pierścień, bulwę u podstawy trzonu i gładki, nieprążkowany brzeg kapelusza; oliwkowy - bez pierścienia i bulwy, brzeg mocno prążkowany. Pierścień sromotnikowego może odpaść!',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-battarrae-1'],
  description:
    'Rzadka mglejarka górskich borów świerkowych i jodłowych. Kapelusz oliwkowo- lub żółtobrązowy, z ciemniejszą strefą przy prążkowanym brzegu; ciemne ostrza blaszek, brak pierścienia, biała workowata pochwa.',
};
