/**
 * @file Rekord gatunku: lakówka ametystowa (Laccaria amethystina).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const laccariaAmethystina: Mushroom = {
  id: mushroomId('laccaria-amethystina'),
  scientificName: 'Laccaria amethystina',
  scientificSynonyms: ['Agaricus amethysteus', 'Clitocybe amethystina', 'Laccaria amethystea'],
  polishName: 'Lakówka ametystowa',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'decurrent'],
    capColor: ['violet', 'purple', 'grey', 'brown_light'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'scaly'], 
    capMargin: ['wavy', 'striate'],
    capPeelability: ['none'],
    hymenophoreColor: ['violet', 'purple'], 
    sporePrint: ['white'],
    capFleshColor: ['violet', 'white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['fibrillose'],
    stipeColor: ['violet', 'purple'],
    stipeFleshColor: ['violet'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Mało wartościowy. Silnie kumuluje arsen z gleby (zwłaszcza na terenach skażonych), dlatego nie jeść w dużych ilościach i nie zbierać na terenach przemysłowych.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'picea', 'pinus', 'betula', 'carpinus'],
    substrates: ['soil', 'litter', 'moss'],
    habitats: ['deciduous_forest', 'coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 6, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('mycena-pura'),
      distinguishingFeatures: ['hymenophoreColor', 'capSize'],
      note: 'Grzybówka fioletowawa (trująca, muskaryna): zapach rzodkiewki, cienkie, gęste, białawo-różowawe blaszki, kapelusz dzwonkowaty z prążkowanym brzegiem; lakówka ma grube, rzadkie, fioletowe blaszki.',
    },
    {
      mushroomId: mushroomId('inocybe-geophylla'),
      distinguishingFeatures: ['sporePrint', 'capSurface'],
      note: 'Inocybe geophylla var. lilacina (trujący, muskaryna): wysyp brunatny, kapelusz jedwabisto-włóknisty, stożkowaty, zapach nieprzyjemny, blaszki szarawe → brunatne.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['laccaria-amethystina-1'],
  description:
    'Cały intensywnie fioletowy (ametystowy), po wyschnięciu płowieje do szarawobrązowego. Grube, rzadkie blaszki, długi włóknisty trzon. Wysyp biały. W lasach liściastych i mieszanych, często gromadnie.',
};
