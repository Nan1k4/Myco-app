/**
 * @file Rekord gatunku: czubajnik czerwieniejący (Chlorophyllum rhacodes).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const chlorophyllumRhacodes: Mushroom = {
  id: mushroomId('chlorophyllum-rhacodes'),
  scientificName: 'Chlorophyllum rhacodes',
  scientificSynonyms: ['Macrolepiota rhacodes', 'Macrolepiota rachodes', 'Lepiota rhacodes', 'Agaricus rhacodes'],
  polishName: 'Czubajnik czerwieniejący',
  vernacularNames: ['czubajka czerwieniejąca'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['brown_light', 'brown', 'white'], 
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['scaly'],
    capMargin: ['smooth'],
    capPeelability: ['to_third'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['orange', 'red'],
    bruising: ['red', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'], 
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['smooth', 'fibrillose'], 
    stipeColor: ['white', 'cream', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['orange', 'red'],
    volva: ['absent'],
    stipeBase: ['rounded_bulb'],
    ring: ['membranous_skirt', 'none'], 
    growthHabit: ['scattered', 'clustered'],
    smell: ['mushroomy'],
    taste: ['nutty', 'mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Tylko kapelusze, po dokładnym usmażeniu lub ugotowaniu. Za pierwszym razem próbować niewielkiej ilości - u części osób występują dolegliwości żołądkowo-jelitowe.',
    },
    notes: 'Surowy niejadalny. Ryzyko pomyłki ze śmiertelnie trującymi czubajeczkami (Lepiota) - sprawdzać wielkość i czerwienienie miąższu.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil', 'litter'],
    habitats: ['coniferous_forest', 'mixed_forest', 'park'],
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
      mushroomId: mushroomId('lepiota-brunneoincarnata'),
      distinguishingFeatures: ['capSize', 'capFleshColorChange', 'stipeBase'],
      note: 'Czubajeczka Lepiota brunneoincarnata (śmiertelnie trująca - amatoksyny) jest znacznie mniejsza (kapelusz do ok. 8 cm), miąższ po przekrojeniu nie czerwienieje, a pierścień jest wąski, szybko zanika.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['chlorophyllum-rhacodes-1'],
  description:
    'Duży grzyb z brązowołuskowatym kapeluszem i smukłym, gładkim trzonem z podwójnym, ruchomym pierścieniem; miąższ po przekrojeniu żółknie, pomarańczowieje i czerwienieje. Rośnie w lasach iglastych, parkach i ogrodach.',
};
