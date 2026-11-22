/**
 * @file Rekord gatunku: goryczak smukły (Austroboletus gracilis).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const austroboletusGracilis: Mushroom = {
  id: mushroomId('austroboletus-gracilis'),
  scientificName: 'Austroboletus gracilis',
  scientificSynonyms: ['Boletus gracilis', 'Tylopilus gracilis', 'Porphyrellus gracilis'],
  polishName: 'Goryczak smukły',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['rust', 'brown', 'brown_dark', 'brown_light'],
    capShape: ['convex', 'flat'],
    capSize: ['under_5', '5_to_10'], 
    capSurface: ['velvety', 'cracked'],
    capMargin: ['smooth'],
    capPeelability: ['to_third'],
    hymenophoreColor: ['white', 'pink', 'brown'],
    sporePrint: ['pink_brown', 'brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['pink'],
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'], 
    stipeInterior: ['solid'],
    stipeSurface: ['reticulate', 'fibrillose'], 
    stipeColor: ['rust', 'brown', 'brown_light', 'white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['pink', 'yellow'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild', 'sour'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jadalny, lecz słabej jakości. Miąższ jest miękki, często wodnisty lub lekko kwaskowaty, przez co grzyb ma niewielkie znaczenie kulinarne.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['tsuga', 'pinus', 'picea', 'quercus', 'fagus', 'betula'],
    substrates: ['soil', 'wood_dead'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 14, max: 23 },
    minPrecipitationMm: 50,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['austroboletus-gracilis-1'],
  description:
    'Mały kasztanowy kapelusz na nieproporcjonalnie długim, smukłym trzonie z podłużnymi listewkami. Pory białe, potem różowe; nie sinieje. Głównie pod choiną (Tsuga) we wschodniej Ameryce Płn.',
};
