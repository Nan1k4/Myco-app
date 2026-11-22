/**
 * @file Rekord gatunku: grzybówka hełmiasta (Mycena galericulata).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const mycenaGalericulata: Mushroom = {
  id: mushroomId('mycena-galericulata'),
  scientificName: 'Mycena galericulata',
  scientificSynonyms: ['Agaricus galericulatus'],
  polishName: 'Grzybówka hełmiasta',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate'], 
    capColor: ['grey', 'brown_light', 'brown'], 
    capShape: ['conical', 'campanulate', 'umbonate', 'flat'],
    capSize: ['under_5'],
    capSurface: ['smooth'],
    capMargin: ['striate'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'pink'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'grey'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow'],
    stipeSurface: ['smooth'],
    stipeColor: ['grey', 'brown_light', 'white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['rooting', 'plain'], 
    ring: ['none'],
    growthHabit: ['clustered', 'scattered'],
    smell: ['mealy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['poor_quality', 'tough'],
    notes: 'Nie uważany za trujący, ale cienki, twardy trzon i mączny zapach czynią go bezwartościowym kulinarnie.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest', 'park'],
  },
  fruiting: {
    months: [4, 5, 6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 10,
    lagDays: { min: 3, max: 8 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['mycena-galericulata-1'],
  description:
    'Smukła, szaro- do brązowawej grzybówka z dzwonkowatym, prążkowanym kapeluszem i długim, pustym, korzeniastym trzonem. Rośnie kępkami na pniakach i butwiejącym drewnie, zapach mączny. Niejadalna.',
};
