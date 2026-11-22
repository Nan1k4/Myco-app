/**
 * @file Rekord gatunku: pieczarka polna (Agaricus campestris).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const agaricusCampestris: Mushroom = {
  id: mushroomId('agaricus-campestris'),
  scientificName: 'Agaricus campestris',
  scientificSynonyms: ['Psalliota campestris'],
  polishName: 'Pieczarka polna',
  vernacularNames: ['pieczarka łąkowa'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['white', 'cream'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10'],
    capSurface: ['smooth', 'fibrillose'],
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['pink', 'brown_dark'], 
    sporePrint: ['brown_dark'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none', 'pink'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none', 'pink'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['membranous_thin', 'none'], 
    growthHabit: ['scattered', 'fairy_ring'],
    smell: ['mushroomy'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny, podobny do pieczarki hodowlanej. Nie zbierać przy ruchliwych drogach.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil'], 
    habitats: ['meadow', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-virosa'),
      distinguishingFeatures: ['hymenophoreColor', 'sporePrint', 'volva', 'ring'],
      note: 'Muchomor jadowity (śmiertelnie trujący - amatoksyny) ma zawsze białe blaszki, biały wysyp, pochwę u podstawy trzonu i zwykle obwisły pierścień; pieczarka ma blaszki różowe do brązowych, brązowy wysyp i brak pochwy.',
    },
    {
      mushroomId: mushroomId('agaricus-xanthodermus'),
      distinguishingFeatures: ['bruising', 'stipeFleshColorChange'],
      note: 'Pieczarka żółtawa (trująca - dolegliwości żołądkowo-jelitowe) żółknie po uciśnięciu, zwłaszcza u nasady trzonu, i pachnie fenolem; pieczarka polna nie żółknie i pachnie przyjemnie.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['agaricus-campestris-1'],
  description:
    'Biała, krępa pieczarka z cienkim, szybko zanikającym pierścieniem, blaszkami najpierw różowymi, potem czekoladowobrązowymi i brązowym wysypem. Nie żółknie. Rośnie na łąkach i pastwiskach.',
};
