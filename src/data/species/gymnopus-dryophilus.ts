/**
 * @file Rekord gatunku: łysostopek pospolity (Gymnopus dryophilus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const gymnopusDryophilus: Mushroom = {
  id: mushroomId('gymnopus-dryophilus'),
  scientificName: 'Gymnopus dryophilus',
  scientificSynonyms: ['Collybia dryophila', 'Marasmius dryophilus', 'Agaricus dryophilus'],
  polishName: 'Łysostopek pospolity',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'sinuate'],
    capColor: ['brown_light', 'cream', 'yellow', 'brown'], 
    capShape: ['convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth'],
    capMargin: ['smooth', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white', 'cream'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['hollow'],
    stipeSurface: ['smooth'], 
    stipeColor: ['brown_light', 'yellow', 'cream'],
    stipeFleshColor: ['cream', 'brown_light'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain', 'rounded_bulb'], 
    ring: ['none'],
    growthHabit: ['grouped', 'clustered', 'scattered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Tylko kapelusze, dobrze obgotowane; trzon gumowaty i twardy.',
    },
    notes: 'Mało wartościowy; część źródeł podaje go jako niejadalny, u wrażliwych osób bywają dolegliwości żołądkowe.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['litter'],
    habitats: ['deciduous_forest', 'coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [5, 6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 3, max: 8 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('gymnopus-peronatus'),
      distinguishingFeatures: ['stipeSurface', 'hymenophoreColor'],
      note: 'Łysostopek ostry (Gymnopus peronatus, lekko trujący): smak ostry, piekący; trzon z żółtawymi kosmkami u nasady, blaszki żółtawe, rzadsze; dryophilus ma smak łagodny i gładki trzon.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['gymnopus-dryophilus-1'],
  description:
    'Drobny grzyb o higrofanicznym, płowobrązowym do kremowego kapeluszu, gęstych białych blaszkach i gładkim pustym trzonie. Smak łagodny. Rośnie kępkami w ściółce lasów liściastych i iglastych.',
};
