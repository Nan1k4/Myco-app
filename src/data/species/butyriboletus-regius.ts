/**
 * @file Rekord gatunku: masłoborowik królewski (borowik królewski).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const butyriboletusRegius: Mushroom = {
  id: mushroomId('butyriboletus-regius'),
  scientificName: 'Butyriboletus regius',
  scientificSynonyms: ['Boletus regius', 'Boletus appendiculatus subsp. regius'],
  polishName: 'Masłoborowik królewski',
  vernacularNames: ['borowik królewski'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'], 
    capColor: ['pink', 'red'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['velvety', 'smooth'],
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'olive'], 
    sporePrint: ['olive_brown'],
    capFleshColor: ['yellow'],
    capFleshColorChange: ['none', 'blue'], 
    bruising: ['blue', 'none'],
    latex: ['none'],
    stipeShape: ['clavate', 'ventricose'],
    stipeInterior: ['solid'],
    stipeSurface: ['reticulate'], 
    stipeColor: ['yellow'], 
    stipeFleshColor: ['yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy', 'none'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jadalny, ale ściśle chroniony - zbiór zabroniony.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'carpinus'],
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
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('rubroboletus-legaliae'),
      distinguishingFeatures: ['hymenophoreColor'],
      note: 'Krwistoborowik Le Gala też ma różowawy kapelusz, ale pory pomarańczowoczerwone i trzon z czerwoną siateczką. Królewski ma pory i siateczkę żółte.',
    },
  ],
  legallyProtected: true,
  imageKeys: ['butyriboletus-regius-1'],
  description: 'Kapelusz różowoczerwony, pory i trzon jaskrawożółte, trzon z żółtą siateczką. Miąższ żółty, sinieje słabo. W Polsce skrajnie rzadki i ściśle chroniony - nie zbierać.',
};
