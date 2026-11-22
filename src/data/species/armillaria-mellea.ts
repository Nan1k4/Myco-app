/**
 * @file Rekord gatunku: opieńka miodowa (Armillaria mellea).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const armillariaMellea: Mushroom = {
  id: mushroomId('armillaria-mellea'),
  scientificName: 'Armillaria mellea',
  scientificSynonyms: ['Armillariella mellea', 'Agaricus melleus'],
  polishName: 'Opieńka miodowa',
  vernacularNames: ['podpieńka', 'opieńka miodowa właściwa'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'decurrent'],
    capColor: ['yellow', 'brown_light', 'olive', 'brown'],
    capShape: ['convex', 'flat', 'umbonate', 'depressed'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['smooth', 'scaly'], 
    capMargin: ['inrolled', 'striate'], 
    capPeelability: ['to_third'],
    hymenophoreColor: ['white', 'cream', 'brown_light'],
    sporePrint: ['white', 'cream'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'], 
    stipeInterior: ['stuffed', 'solid'], 
    stipeSurface: ['fibrillose', 'scaly'], 
    stipeColor: ['cream', 'brown_light', 'brown'],
    stipeFleshColor: ['white', 'brown_light'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain', 'rounded_bulb'],
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['clustered'],
    smell: ['mushroomy'],
    taste: ['mild', 'astringent'], 
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Tylko kapelusze młodych okazów, po obgotowaniu min. 15-20 min z odlaniem wywaru; trzony włókniste - odrzucić. Surowe lub niedogotowane są szkodliwe.',
    },
    notes: 'Cenny w kuchni po obróbce, ale część osób reaguje dolegliwościami żołądkowymi nawet po ugotowaniu - za pierwszym razem próbować niewielkiej porcji.',
  },
  ecology: {
    trophicModes: ['parasitic', 'saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_living', 'wood_dead'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest', 'park'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 6, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('hypholoma-fasciculare'),
      distinguishingFeatures: ['sporePrint', 'hymenophoreColor', 'ring'],
      note: 'Maślanka wiązkowa ma siarkowożółte, potem zielonkawe blaszki, purpurowobrązowy wysyp, bardzo gorzki smak i brak trwałego pierścienia; opieńka - białe blaszki, biały wysyp i wyraźny pierścień.',
    },
    {
      mushroomId: mushroomId('galerina-marginata'),
      distinguishingFeatures: ['sporePrint'],
      note: 'Hełmówka jadowita (śmiertelna) ma rdzawobrązowy wysyp, miodowo-rdzawy kapelusz, mączny zapach i rośnie na mchu na drewnie; opieńka ma biały wysyp.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['armillaria-mellea-1'],
  description:
    'Kępy miodowożółtych grzybów na pniach i u podstawy drzew, z czarnymi ryzomorfami pod korą. Kapelusz z drobnymi ciemnymi łuseczkami, biały wysyp, na trzonie trwały pierścień. Jadalna wyłącznie po dokładnym ugotowaniu.',
};
