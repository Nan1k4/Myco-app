/**
 * @file Rekord gatunku: opieńka żółtawa (Armillaria gallica).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const armillariaGallica: Mushroom = {
  id: mushroomId('armillaria-gallica'),
  scientificName: 'Armillaria gallica',
  scientificSynonyms: ['Armillaria bulbosa', 'Armillaria lutea', 'Armillariella bulbosa'],
  polishName: 'Opieńka żółtawa',
  vernacularNames: ['opieńka bulwiasta'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'decurrent'], 
    capColor: ['yellow', 'brown_light', 'brown'], 
    capShape: ['convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['scaly'], 
    capMargin: ['striate'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['white', 'cream'], 
    sporePrint: ['white', 'cream'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'brown'], 
    latex: ['none'],
    stipeShape: ['clavate'], 
    stipeInterior: ['stuffed', 'hollow'], 
    stipeSurface: ['fibrillose', 'scaly'], 
    stipeColor: ['yellow', 'brown_light', 'white'],
    stipeFleshColor: ['white', 'yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['rounded_bulb'], 
    ring: ['fibrous', 'none'], 
    growthHabit: ['solitary', 'clustered'], 
    smell: ['mushroomy'],
    taste: ['mild', 'astringent'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Tylko kapelusze młodych okazów, po dokładnym ugotowaniu (kilkanaście minut), wywar odlać. Trzony włókniste - niejadalne.',
    },
    notes: 'Surowa lub niedogotowana wywołuje zatrucie żołądkowo-jelitowe. Rośnie na drewnie, gdzie występują też śmiertelnie trujące gatunki.',
  },
  ecology: {
    trophicModes: ['parasitic', 'saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_living', 'wood_dead', 'soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('galerina-marginata'),
      distinguishingFeatures: ['sporePrint', 'stipeBase', 'ring'],
      note: 'Hełmówka obrzeżona (śmiertelnie trująca - amatoksyny) ma rdzawobrązowy wysyp, cienki trzon bez zgrubienia u podstawy i trwały, błoniasty pierścień; opieńka ma biały wysyp i bulwiastą nasadę.',
    },
    {
      mushroomId: mushroomId('hypholoma-fasciculare'),
      distinguishingFeatures: ['hymenophoreColor', 'sporePrint'],
      note: 'Maślanka wiązkowa (trująca, bardzo gorzka) ma siarkowożółte, potem zielonkawe blaszki, fioletowobrązowy wysyp i gorzki smak; opieńka ma blaszki białe lub kremowe i biały wysyp.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['armillaria-gallica-1'],
  description:
    'Miodowożółty kapelusz z drobnymi ciemnymi łuseczkami, białe blaszki, włóknisty trzon zgrubiały u podstawy z żółtawym, watowatym pierścieniem szybko zanikającym. Rośnie pojedynczo lub w małych kępkach na drewnie; surowa trująca.',
};
