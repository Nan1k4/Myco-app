/**
 * @file Rekord gatunku: goryczak żółtonogi (Harrya chromapes).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const harryaChromapes: Mushroom = {
  id: mushroomId('harrya-chromapes'),
  scientificName: 'Harrya chromapes',
  scientificSynonyms: ['Boletus chromapes', 'Tylopilus chromapes', 'Leccinum chromapes'],
  polishName: 'Goryczak żółtonogi',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['pink', 'brown_light'],
    capShape: ['convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['smooth', 'velvety'],
    capMargin: ['smooth'],
    capPeelability: ['to_third'],
    hymenophoreColor: ['white', 'pink'], 
    sporePrint: ['pink_brown'],
    capFleshColor: ['white', 'pink'], 
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid'],
    stipeSurface: ['scabrous'], 
    stipeColor: ['white', 'pink', 'yellow'], 
    stipeFleshColor: ['white', 'yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny grzyb jadalny o łagodnym, lekko kwaskowatym lub orzechowym smaku. Wymaga obróbki termicznej; miąższ w trzonie jest zwięzły, natomiast u starszych owocników bywa włóknisty.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'betula', 'fagus', 'pinus', 'tsuga'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 14, max: 22 },
    minPrecipitationMm: 50,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['harrya-chromapes-1'],
  description:
    'Różowy kapelusz, trzon z różowymi kosmkami i jaskrawo chromowożółtą podstawą - cecha niepowtarzalna. Pory białe, potem różowawe; wysyp różowobrązowy.',
};
