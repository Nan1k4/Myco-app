/**
 * @file Rekord gatunku: gołąbek błotny (Russula paludosa).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaPaludosa: Mushroom = {
  id: mushroomId('russula-paludosa'),
  scientificName: 'Russula paludosa',
  scientificSynonyms: ['Russula integra var. paludosa'],
  polishName: 'Gołąbek błotny',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['red', 'orange', 'pink'], 
    capShape: ['hemispherical', 'convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth'],
    capPeelability: ['to_half', 'full'],
    hymenophoreColor: ['cream', 'yellow'],
    sporePrint: ['cream', 'yellow'],
    capFleshColor: ['white', 'pink'],
    capFleshColorChange: ['none', 'grey'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'pink'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none', 'grey'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['fruity', 'none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny grzyb jadalny o łagodnym smaku i kruchym miąższu. Dobry do smażenia, duszenia i zup po obróbce termicznej.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus', 'picea'],
    substrates: ['soil', 'moss'],
    habitats: ['bog', 'coniferous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('russula-emetica'),
      distinguishingFeatures: ['sporePrint', 'hymenophoreColor'],
      note: 'Wymiotny jest mniejszy, kruchy, ma czysto białe blaszki i biały wysyp, smak palący; błotny - kremowe blaszki, kremowo-ochrowy wysyp, smak łagodny.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['russula-paludosa-1'],
  description:
    'W wilgotnych borach i na torfowiskach, w mchu. Duży, kapelusz czerwony do pomarańczowoczerwonego; trzon masywny, biały z różowym nalotem. Smak łagodny.',
};
