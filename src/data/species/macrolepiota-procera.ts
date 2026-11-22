/**
 * @file Rekord gatunku: czubajka kania (Macrolepiota procera).
 * ⚠ Parametry `fruiting` są szacunkowe - całość wymaga weryfikacji mykologa przed wydaniem.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const macrolepiotaProcera: Mushroom = {
  id: mushroomId('macrolepiota-procera'),
  scientificName: 'Macrolepiota procera',
  scientificSynonyms: ['Lepiota procera', 'Agaricus procerus', 'Leucocoprinus procerus'],
  polishName: 'Czubajka kania',
  vernacularNames: ['kania', 'parasolnik'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'], 
    capColor: ['brown', 'brown_light', 'cream'],
    capShape: ['ovate', 'campanulate', 'flat', 'umbonate'], 
    capSize: ['10_to_20', 'over_20'],
    capSurface: ['scaly', 'smooth'], 
    capMargin: ['appendiculate'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow'],
    stipeSurface: ['snakeskin', 'scaly'],
    stipeColor: ['brown_light', 'cream', 'brown'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['rounded_bulb'], 
    ring: ['membranous_skirt', 'movable', 'none'], 
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['nutty', 'mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Cenny grzyb. Jeść same kapelusze, usmażone lub w panierce; trzon włóknisty i zdrewniały, nie nadaje się do jedzenia. Nie jeść na surowo.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil', 'litter'],
    habitats: ['meadow', 'park', 'mixed_forest', 'coniferous_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('lepiota-brunneoincarnata'),
      distinguishingFeatures: ['capSize', 'stipeSurface', 'ring'],
      note: 'Lepiota brunneoincarnata (śmiertelnie trujący): kapelusz 2-6 cm, trzon bez wzoru wężowej skóry, pierścień nietrwały; kania jest dużo większa i ma wzór na trzonie.',
    },
    {
      mushroomId: mushroomId('chlorophyllum-brunneum'),
      distinguishingFeatures: ['stipeBase', 'stipeSurface', 'capFleshColorChange'],
      note: 'Chlorophyllum brunneum (może powodować dolegliwości): trzon bez wężowej skóry, nasada bulwiasta z obrzeżeniem, miąższ czerwienieje po przekrojeniu; kania nie zmienia barwy.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['macrolepiota-procera-1'],
  description:
    'Bardzo duży grzyb: parasolowaty kapelusz z brązowymi łuskami, długi trzon z wzorem „wężowej skóry” i grubym, ruchomym podwójnym pierścieniem, bulwiasta nasada bez pochwy. Rośnie na polanach i skrajach lasów, latem i wczesną jesienią.',
};
