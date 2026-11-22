/**
 * @file Rekord gatunku: modroborowik ponury (borowik ponury).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillellusLuridus: Mushroom = {
  id: mushroomId('suillellus-luridus'),
  scientificName: 'Suillellus luridus',
  scientificSynonyms: ['Boletus luridus'],
  polishName: 'Modroborowik ponury',
  vernacularNames: ['borowik ponury'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'], 
    capColor: ['olive', 'brown_light', 'brown', 'orange'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['velvety', 'smooth'],
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'orange', 'red'], 
    sporePrint: ['olive_brown'],
    capFleshColor: ['yellow'],
    capFleshColorChange: ['blue'],
    bruising: ['blue'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['reticulate'], 
    stipeColor: ['yellow', 'orange', 'red'],
    stipeFleshColor: ['yellow', 'red'], 
    stipeFleshColorChange: ['blue'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: true,
      youngSpecimensOnly: false,
      notes: 'Surowy lub niedogotowany trujący - wymaga długiego gotowania (min. 20 min) ze zlaniem wody. Opisywano reakcje nietolerancji przy spożyciu z alkoholem. ',
    },
    notes: 'Łatwy do pomylenia z krwistoborowikami - odradzany początkującym.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'tilia', 'carpinus', 'betula'],
    substrates: ['soil'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [5, 6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 14, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('rubroboletus-satanas'),
      distinguishingFeatures: ['stipeShape', 'capFleshColorChange'],
      note: 'Szatański ma białawy do szarawego kapelusz, brzuchaty trzon i miąższ, który sinieje słabo. Ponury ma oliwkowobrązowy kapelusz i miąższ natychmiast intensywnie siniejący.',
    },
    {
      mushroomId: mushroomId('rubroboletus-legaliae'),
      distinguishingFeatures: ['stipeShape'],
      note: 'Krwistoborowik Le Gala ma kapelusz z wyraźnym różowawym odcieniem. Rozróżnienie bywa trudne - w razie wątpliwości nie zbierać.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['suillellus-luridus-1'],
  description: 'Kapelusz oliwkowobrązowy, pory pomarańczowoczerwone, trzon z czerwoną siateczką. Miąższ natychmiast sinieje, u podstawy trzonu winnoczerwony, nad rurkami czerwona linia. Na glebach wapiennych pod drzewami liściastymi.',
};
