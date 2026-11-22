/**
 * @file Rekord gatunku: gąsówka fioletowawa (Lepista nuda).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lepistaNuda: Mushroom = {
  id: mushroomId('lepista-nuda'),
  scientificName: 'Lepista nuda',
  scientificSynonyms: ['Clitocybe nuda', 'Collybia nuda', 'Rhodopaxillus nudus', 'Agaricus nudus'],
  polishName: 'Gąsówka fioletowawa',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'sinuate'], 
    capColor: ['violet', 'purple', 'brown_light', 'brown'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth'],
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['violet', 'purple', 'pink', 'brown_light'],
    sporePrint: ['pink', 'cream'],
    capFleshColor: ['violet', 'white', 'grey'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['fibrillose'], 
    stipeColor: ['violet', 'purple', 'brown_light'],
    stipeFleshColor: ['violet', 'white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['rounded_bulb', 'plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped', 'fairy_ring'],
    smell: ['fruity', 'aromatic'], 
    taste: ['mild', 'sweet'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Obowiązkowo dokładna obróbka cieplna (np. obgotować i wywar odlać); na surowo powoduje dolegliwości żołądkowe. Najlepsze młode okazy.',
    },
    notes: 'Smaczny po obróbce, ale bywa alergizujący - pierwszy raz jeść niewielką porcję. Łatwo pomylić z fioletowymi zasłonakami.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['litter', 'soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest', 'park'],
  },
  fruiting: {
    months: [9, 10, 11, 12],
    optimalMeanTempC: { min: 2, max: 12 },
    minPrecipitationMm: 15,
    lagDays: { min: 7, max: 14 },
    frostSensitive: false,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('cortinarius-violaceus'),
      distinguishingFeatures: ['sporePrint', 'capSurface', 'hymenophoreColor'],
      note: 'Zasłonak fioletowy (Cortinarius violaceus): wysyp rdzawobrązowy, kapelusz ciemnofioletowy, łuseczkowaty i suchy, blaszki ciemne, rzadkie; gąsówka ma kapelusz gładki i wysyp różowawy.',
    },
    {
      mushroomId: mushroomId('cortinarius-traganus'),
      distinguishingFeatures: ['sporePrint'],
      note: 'Cortinarius traganus (niejadalny/trujący): miąższ szafranowo-żółty, ostry zapach acetylenu lub gruszek, wysyp rdzawy, zasnówka na trzonie.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['lepista-nuda-1'],
  description:
    'Fioletowy, gładki kapelusz z podwiniętym brzegiem, liliowe gęste blaszki i fioletowawy trzon o owocowym zapachu. Wysyp różowawy. Rośnie późną jesienią w ściółce lasów. Jadalna wyłącznie po obróbce cieplnej.',
};
