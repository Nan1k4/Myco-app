/**
 * @file Rekord gatunku: czubajeczka brązowoczerwonawa (Lepiota brunneoincarnata).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lepiotaBrunneoincarnata: Mushroom = {
  id: mushroomId('lepiota-brunneoincarnata'),
  scientificName: 'Lepiota brunneoincarnata',
  scientificSynonyms: [],
  polishName: 'Czubajeczka brązowoczerwonawa',
  vernacularNames: ['czubajka brązowoczerwonawa'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['brown', 'red_brown', 'pink', 'cream'],
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['scaly', 'fibrillose'],
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'pink'],
    capFleshColorChange: ['none', 'pink'],
    bruising: ['none', 'pink'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['fibrillose', 'scaly'],
    stipeColor: ['white', 'pink', 'brown_light'],
    stipeFleshColor: ['white', 'pink'],
    stipeFleshColorChange: ['none', 'pink'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['fibrous_zone', 'none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['fruity', 'none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'deadly',
    syndromes: ['phalloidin'],
    symptomOnsetHours: { min: 6, max: 24 },
    notes: 'Zawiera amatoksyny (jak muchomor zielonawy) - powoduje śmiertelne uszkodzenie wątroby. Mała czubajeczka (kapelusz 2-6 cm), nigdy nie zbierać małych okazów przypominających kanię.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil', 'litter'],
    habitats: ['park', 'meadow', 'deciduous_forest', 'roadside'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['lepiota-brunneoincarnata-1'],
  description:
    'Niewielka, śmiertelnie trująca czubajeczka o brązoworóżowych łuskach na kapeluszu i nietrwałej, strefowatej osłonie na trzonie (bez ruchomego pierścienia i bez wzoru wężowej skóry).',
};
