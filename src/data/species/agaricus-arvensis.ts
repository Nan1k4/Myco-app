/**
 * @file Rekord gatunku: pieczarka biaława (Agaricus arvensis).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const agaricusArvensis: Mushroom = {
  id: mushroomId('agaricus-arvensis'),
  scientificName: 'Agaricus arvensis',
  scientificSynonyms: ['Psalliota arvensis'],
  polishName: 'Pieczarka biaława',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['white', 'cream', 'yellow'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'fibrillose'], 
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['grey', 'pink', 'brown_dark'],
    sporePrint: ['brown_dark'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none', 'yellow'],
    bruising: ['yellow'], 
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'fibrillose'], 
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none', 'yellow'],
    volva: ['absent'],
    stipeBase: ['plain', 'rounded_bulb'], 
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['scattered', 'fairy_ring'],
    smell: ['anise'], 
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny i wydajny; pieczarki kumulują metale ciężkie - nie zbierać przy ruchliwych drogach i na terenach skażonych.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil'],
    habitats: ['meadow', 'park', 'forest_edge'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 25,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('agaricus-xanthodermus'),
      distinguishingFeatures: ['bruising', 'stipeFleshColorChange'],
      note: 'Pieczarka żółtawa (trująca - dolegliwości żołądkowo-jelitowe) pachnie fenolem lub atramentem, a u nasady trzonu po przekrojeniu intensywnie żółknie; pieczarka biaława pachnie anyżkiem.',
    },
    {
      mushroomId: mushroomId('amanita-virosa'),
      distinguishingFeatures: ['hymenophoreColor', 'sporePrint', 'volva'],
      note: 'Muchomor jadowity (śmiertelnie trujący - amatoksyny) ma zawsze białe blaszki, biały wysyp i pochwę u podstawy trzonu; pieczarka ma blaszki szarawe do brązowych, brązowy wysyp, brak pochwy.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['agaricus-arvensis-1'],
  description:
    'Duża, biała pieczarka, z czasem żółknąca, o anyżkowym zapachu; ma duży, dwuwarstwowy pierścień, blaszki szarawe, potem różowe i czekoladowobrązowe, brązowy wysyp. Rośnie na łąkach, pastwiskach i w ogrodach.',
};
