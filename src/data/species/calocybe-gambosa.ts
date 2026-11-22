/**
 * @file Rekord gatunku: majówka wiosenna (Calocybe gambosa).
 * null / [] = brak publicznych danych.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const calocybeGambosa: Mushroom = {
  id: mushroomId('calocybe-gambosa'),
  scientificName: 'Calocybe gambosa',
  scientificSynonyms: ['Tricholoma gambosum', 'Calocybe georgii', 'Tricholoma georgii', 'Lyophyllum gambosum', 'Agaricus gambosus'],
  polishName: 'Majówka wiosenna',
  vernacularNames: ['gąska majowa'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['sinuate', 'adnexed'],
    capColor: ['white', 'cream', 'brown_light'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'velvety'],
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'], 
    stipeInterior: ['solid'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'fairy_ring'], 
    smell: ['mealy'],
    taste: ['mealy'], 
  },
  edibility: {
    category: 'edible',
    notes: 'Ceniony wiosenny grzyb o mącznym smaku; nadaje się do duszenia, smażenia i suszenia.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil'],
    habitats: ['meadow', 'park', 'deciduous_forest'],
  },
  fruiting: {
    months: [4, 5, 6],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: false,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('inocybe-erubescens'),
      distinguishingFeatures: ['bruising', 'sporePrint'],
      note: 'Strzępiak ceglasty (bardzo trujący - muskaryna, możliwe zejścia śmiertelne) owocnikuje w tym samym czasie; po uciśnięciu i uszkodzeniu czerwienieje, ma brązowy wysyp zarodników i nie pachnie mąką. Majówka: biały wysyp, mączny zapach, nie czerwienieje.',
    },
    {
      mushroomId: mushroomId('entoloma-sinuatum'),
      distinguishingFeatures: ['sporePrint', 'hymenophoreColor'],
      note: 'Entoloma sinuatum (trujący, objawy żołądkowo-jelitowe) ma blaszki żółtawe, potem różowe i różowy wysyp; majówka ma blaszki białe i biały wysyp. Rośnie głównie latem i jesienią.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['calocybe-gambosa-1'],
  description:
    'Kremowobiały, krępy, mięsisty grzyb z kapeluszem podwiniętym na brzegu i gęstymi białymi blaszkami; silnie pachnie mąką. Rośnie wiosną na łąkach, w parkach i na skrajach lasów, często w kręgach.',
};
