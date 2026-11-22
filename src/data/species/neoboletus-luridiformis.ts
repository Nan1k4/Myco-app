/**
 * @file Rekord gatunku: borowik ceglastopory.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const neoboletusLuridiformis: Mushroom = {
  id: mushroomId('neoboletus-luridiformis'),
  scientificName: 'Neoboletus luridiformis',
  scientificSynonyms: ['Boletus luridiformis', 'Boletus erythropus'],
  polishName: 'Borowik ceglastopory',
  vernacularNames: ['ceglastopory'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown', 'brown_dark', 'red_brown'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['velvety'], 
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['red', 'orange'], 
    sporePrint: ['olive_brown'],
    capFleshColor: ['yellow'],
    capFleshColorChange: ['blue'],
    bruising: ['blue'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['punctate'], 
    stipeColor: ['yellow', 'red'],
    stipeFleshColor: ['yellow', 'red'], 
    stipeFleshColorChange: ['blue'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Surowy lub niedogotowany powoduje dolegliwości żołądkowo-jelitowe. Jadalny wyłącznie po dokładnej obróbce termicznej. Miąższ ciemnieje przy przyrządzaniu.',
    },
    notes: 'Wyborny, bardzo zwięzły grzyb jadalny. Podczas obróbki intensywnie niebieski miąższ zmienia barwę na żółtobrązową; idealny do smażenia, duszenia i suszenia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'fagus', 'abies', 'pinus', 'quercus'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [5, 6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('rubroboletus-satanas'),
      distinguishingFeatures: ['stipeSurface', 'capFleshColorChange'],
      note: 'Szatański ma na trzonie czerwoną siateczkę (nie kropki), białawy kapelusz i miąższ siniejący słabo. Ceglastopory ma ciemnobrązowy kapelusz, kropkowany trzon i miąższ natychmiast granatowiejący.',
    },
    {
      mushroomId: mushroomId('rubroboletus-legaliae'),
      distinguishingFeatures: ['stipeSurface'],
      note: 'Krwistoborowik Le Gala ma siateczkę na trzonie i różowawy odcień kapelusza.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['neoboletus-luridiformis-1'],
  description: 'Kapelusz ciemnobrązowy, zamszowy. Pory ciemnoczerwone. Trzon żółty, gęsto czerwono kropkowany - bez siateczki. Miąższ żółty, po przekrojeniu natychmiast intensywnie granatowieje. W lasach na kwaśnych glebach, często pod świerkami i bukami.',
};
