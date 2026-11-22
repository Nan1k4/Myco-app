/**
 * @file Rekord gatunku: strzępiak ceglasty (Inocybe erubescens).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const inocybeErubescens: Mushroom = {
  id: mushroomId('inocybe-erubescens'),
  scientificName: 'Inocybe erubescens',
  scientificSynonyms: ['Inocybe patouillardii'],
  polishName: 'Strzępiak ceglasty',
  vernacularNames: ['strzępiak Patouillarda'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['white', 'cream', 'pink', 'red', 'brown_light'],
    capShape: ['conical', 'campanulate', 'convex', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['fibrillose', 'cracked'],
    capMargin: ['smooth', 'wavy', 'inrolled'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'olive', 'brown_light', 'red'],
    sporePrint: ['brown'],
    capFleshColor: ['white', 'cream', 'pink'],
    capFleshColorChange: ['red', 'orange'],
    bruising: ['red', 'orange'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose', 'smooth'],
    stipeColor: ['white', 'cream', 'pink', 'red'],
    stipeFleshColor: ['white', 'pink'],
    stipeFleshColorChange: ['red', 'orange'],
    volva: ['absent'],
    stipeBase: ['plain', 'rounded_bulb'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['fruity', 'unpleasant'],
    taste: ['mild'],
  },
  edibility: {
    category: 'deadly',
    syndromes: ['muscarine'],
    symptomOnsetHours: { min: 0.25, max: 2 },
    notes: 'Zawiera bardzo wysokie stężenie muskaryny. Powoduje ciężki zespół muskarynowy, z możliwym zgonem wskutek obrzęku płuc lub zatrzymania krążenia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'tilia', 'carpinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'park'],
  },
  fruiting: {
    months: [5, 6, 7],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['inocybe-erubescens-1'],
  description:
    'Wiosenno-letni, śmiertelnie trujący grzyb o stożkowatym, promieniście popękanym kapeluszu; początkowo białawy, z wiekiem i po uszkodzeniu wyraźnie ceglasto czerwienieje. Wysyp brązowy.',
};
