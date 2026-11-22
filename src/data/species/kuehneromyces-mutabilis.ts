/**
 * @file Rekord gatunku: łuszczak zmienny (Kuehneromyces mutabilis).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const kuehneromycesMutabilis: Mushroom = {
  id: mushroomId('kuehneromyces-mutabilis'),
  scientificName: 'Kuehneromyces mutabilis',
  scientificSynonyms: ['Pholiota mutabilis', 'Galerina mutabilis', 'Agaricus mutabilis'],
  polishName: 'Łuszczak zmienny',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'decurrent'],
    capColor: ['brown', 'brown_light', 'yellow'], 
    capShape: ['convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'], 
    capMargin: ['smooth', 'striate'], 
    capPeelability: ['to_third'],
    hymenophoreColor: ['cream', 'brown_light', 'brown'], 
    sporePrint: ['brown'],
    capFleshColor: ['cream', 'brown_light'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['scaly', 'fibrillose'], 
    stipeColor: ['cream', 'brown'],
    stipeFleshColor: ['brown_light'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['membranous_skirt', 'none'], 
    growthHabit: ['clustered'],
    smell: ['mushroomy'], 
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny, ceniony grzyb do zup i sosów. Jeść tylko kapelusze (trzony włókniste i twarde). Pomylenie z hełmówką jadowitą (amatoksyny) bywa śmiertelne.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [4, 5, 6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 3, max: 7 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('galerina-marginata'),
      distinguishingFeatures: ['stipeSurface', 'capSurface'],
      note: 'Hełmówka jadowita (śmiertelna) ma trzon gładki, jedwabisto-włókienkowaty (bez ciemnych łusek pod pierścieniem), zapach mączny i częściej rośnie na mchu na drewnie; łuszczak ma łuskowaty trzon poniżej pierścienia i przyjemny zapach.',
    },
    {
      mushroomId: mushroomId('hypholoma-fasciculare'),
      distinguishingFeatures: ['hymenophoreColor', 'sporePrint', 'ring'],
      note: 'Maślanka wiązkowa ma żółte, potem zielonkawe blaszki, purpurowobrązowy wysyp i bardzo gorzki smak; łuszczak - blaszki jasnobrązowe, wysyp brązowy, smak łagodny, wyraźny pierścień.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['kuehneromyces-mutabilis-1'],
  description:
    'Kępy miodowobrązowych grzybów na pniach liściastych, kapelusz dwubarwny (wilgotny ciemniejszy, wysychający od środka). Trzon z wyraźnym pierścieniem, poniżej łuskowaty i ciemny. Smaczny, ale łatwy do pomylenia ze śmiertelną hełmówką jadowitą.',
};
