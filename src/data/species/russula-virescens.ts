/**
 * @file Rekord gatunku: gołąbek zielonawy (Russula virescens).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaVirescens: Mushroom = {
  id: mushroomId('russula-virescens'),
  scientificName: 'Russula virescens',
  scientificSynonyms: ['Agaricus virescens'],
  polishName: 'Gołąbek zielonawy',
  vernacularNames: ['gołąbek zielonkawy'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['green', 'olive', 'cream'], 
    capShape: ['hemispherical', 'convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['cracked', 'velvety'], 
    capMargin: ['smooth'],
    capPeelability: ['to_third'], 
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['white'], 
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Zaleca się upiec lub ugotować przed spożyciem. Uważany za najsmaczniejszy z gołąbków; miąższ kruchy, o orzechowym smaku. W Polsce rzadszy, ciepłolubny.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'betula', 'carpinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 15, max: 24 },
    minPrecipitationMm: 25,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['volva', 'stipeBase', 'capSurface'],
      note: 'Muchomor zielonawy (śmiertelnie trujący - amatoksyny) ma pierścień na trzonie, workowatą pochwę u bulwiastej podstawy trzonu, kapelusz gładki z włókienkami i miąższ włóknisty; gołąbek zielonawy nie ma pierścienia ani pochwy, kapelusz jest mozaikowo spękany, a miąższ kruchy.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['russula-virescens-1'],
  description:
    'Gołąbek o jasnozielonkawym, mozaikowo spękanym kapeluszu, białych blaszkach i białym, kruchym trzonie bez pierścienia i pochwy; smak orzechowy. Rośnie w ciepłych lasach liściastych pod dębami i bukami.',
};
