/**
 * @file Rekord gatunku: borowik ciemnobrązowy.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const boletusAereus: Mushroom = {
  id: mushroomId('boletus-aereus'),
  scientificName: 'Boletus aereus',
  scientificSynonyms: [],
  polishName: 'Borowik ciemnobrązowy',
  vernacularNames: ['borowik brązowy'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'], // rurki
    capColor: ['brown_dark', 'brown', 'black'], // często z jaśniejszymi, miedzianymi plamami
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['velvety', 'smooth', 'cracked'],
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'yellow', 'olive'],
    sporePrint: ['olive_brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['reticulate'], // brązowawa siateczka
    stipeColor: ['brown_light', 'brown'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'W Polsce bardzo rzadki - choć nie jest chroniony, lepiej go nie zbierać.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'castanea'],
    substrates: ['soil'],
    habitats: ['deciduous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9],
    optimalMeanTempC: { min: 16, max: 24 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['boletus-aereus-1'],
  description: 'Kapelusz ciemnobrązowy do prawie czarnego, zamszowy. Gatunek ciepłolubny, pod dębami i bukami. W Polsce bardzo rzadki - choć nie jest prawnie chroniony, warto go zostawić.',
};
