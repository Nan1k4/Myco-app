/**
 * @file Rekord gatunku: muchomor cytrynowy (Amanita citrina).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaCitrina: Mushroom = {
  id: mushroomId('amanita-citrina'),
  scientificName: 'Amanita citrina',
  scientificSynonyms: ['Amanita mappa'],
  polishName: 'Muchomor cytrynowy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['yellow', 'cream', 'white'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'], 
    capSurface: ['warts', 'smooth'],
    capMargin: ['smooth'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'cream', 'yellow'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'], 
    stipeBase: ['marginate_bulb'], 
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['raw_potato'], 
    taste: ['mild'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['unpleasant_smell', 'unpleasant_taste', 'minor_toxins'],
    notes: 'Śladowe ilości bufoteniny. Głównym zagrożeniem jest pomyłka z muchomorem zielonawym.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus', 'picea', 'quercus', 'fagus', 'betula'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['stipeBase', 'volva'],
      note: 'Cytrynowy pachnie surowym ziemniakiem i ma kulistą bulwę z rowkiem; zielonawy ma workowatą, odstającą pochwę i bez zapachu ziemniaka. Przy wątpliwości traktować jak zielonawy.',
    },
    {
      mushroomId: mushroomId('amanita-virosa'),
      distinguishingFeatures: ['stipeBase', 'volva'],
      note: 'Biała forma cytrynowego bywa mylona z jadowitym - jadowity ma workowatą pochwę i nie pachnie ziemniakiem.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-citrina-1'],
  description:
    'Bladocytrynowy kapelusz z płaskimi łatkami, duża bulwa z wyraźnym rowkiem, zapach surowego ziemniaka. Bardzo pospolity w borach na kwaśnych glebach. Niejadalny - i łatwo go pomylić z muchomorem zielonawym.',
};
