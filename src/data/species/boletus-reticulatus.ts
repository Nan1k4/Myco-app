/**
 * @file Rekord gatunku: borowik usiatkowany (letni).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const boletusReticulatus: Mushroom = {
  id: mushroomId('boletus-reticulatus'),
  scientificName: 'Boletus reticulatus',
  scientificSynonyms: ['Boletus aestivalis'],
  polishName: 'Borowik usiatkowany',
  vernacularNames: ['borowik letni', 'prawdziwek letni', 'prawdziwek dębowy'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'], 
    capColor: ['brown_light', 'brown', 'cream'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['velvety', 'cracked'], 
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
    stipeSurface: ['reticulate'], 
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
    notes: 'Często robaczywy.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'carpinus', 'tilia'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [5, 6, 7, 8, 9],
    optimalMeanTempC: { min: 15, max: 24 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('rubroboletus-satanas'),
      distinguishingFeatures: ['hymenophoreColor'],
      note: 'Szatański ma czerwone pory i czerwono podbarwiony trzon; usiatkowany ma pory białe do oliwkowych i brązowawy trzon.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['boletus-reticulatus-1'],
  description: 'Najwcześniejszy z borowików (od maja), pod dębami i bukami. Kapelusz matowy, zamszowy, w suszy spękany; brązowawa siateczka na całej długości trzonu. Często robaczywy.',
};
