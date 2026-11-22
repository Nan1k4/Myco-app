/**
 * @file Rekord gatunku: sarniak dachówkowaty (Sarcodon imbricatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const sarcodonImbricatus: Mushroom = {
  id: mushroomId('sarcodon-imbricatus'),
  scientificName: 'Sarcodon imbricatus',
  scientificSynonyms: ['Hydnum imbricatum', 'Sarcodon imbricatum'],
  polishName: 'Sarniak dachówkowaty',
  vernacularNames: ['sarniak świerkowy'],
  features: {
    hymenophore: ['teeth'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown', 'brown_dark'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['10_to_20', 'over_20'],
    capSurface: ['scaly'],
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'grey', 'brown_light'], 
    sporePrint: ['brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'grey', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'fairy_ring'],
    smell: ['none'],
    taste: ['mild', 'bitter'], 
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Tylko młode owocniki; starsze są gorzkie. U części osób niedogotowany może powodować dolegliwości żołądkowe.',
    },
    notes: 'Jadalny po dokładnej obróbce (obgotowanie lub suszenie łagodzi goryczkę); rzadko spotykany w sprzedaży.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('sarcodon-scabrosus'),
      distinguishingFeatures: ['capSurface', 'stipeShape'],
      note: 'Sarniak szorstki (niejadalny, bardzo gorzki) ma ciemniejszy, szarozielonkawoczarny miąższ u podstawy trzonu i gorzki smak; sarniak dachówkowaty ma miąższ jasny i smak łagodny lub tylko lekko gorzkawy.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['sarcodon-imbricatus-1'],
  description:
    'Duży, brązowy kapelusz pokryty dachówkowato ułożonymi, ciemnymi łuskami; od spodu kolce zamiast blaszek lub rurek, białoszare, potem brązowawe. Rośnie w borach iglastych na kwaśnej glebie.',
};
