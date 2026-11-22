/**
 * @file Rekord gatunku: pniarek obrzeżony (Fomitopsis pinicola)
 */
import { mushroomId, type Mushroom } from '../../domain';

export const fomitopsisPinicola: Mushroom = {
  id: mushroomId('fomitopsis-pinicola'),
  scientificName: 'Fomitopsis pinicola',
  scientificSynonyms: ['Fomes pinicola', 'Polyporus pinicola', 'Boletus pinicola'],
  polishName: 'Pniarek obrzeżony',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown_dark', 'red', 'orange', 'cream'], 
    capShape: ['hoof_shaped', 'shelf'],
    capSize: ['10_to_20', 'over_20'],
    capSurface: ['crust', 'zonate', 'smooth'], 
    capMargin: ['rounded'],
    capPeelability: ['none'],
    hymenophoreColor: ['cream', 'yellow'],
    sporePrint: ['white'],
    capFleshColor: ['cream', 'brown_light'], 
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['absent'],
    stipeInterior: ['not_applicable'],
    stipeSurface: ['not_applicable'],
    stipeColor: ['not_applicable'],
    stipeFleshColor: ['not_applicable'],
    stipeFleshColorChange: ['not_applicable'],
    volva: ['absent'],
    stipeBase: ['not_applicable'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['sour'],
    taste: ['bitter'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['tough', 'bitter'],
    notes: 'Twardy, korkowaty i gorzki; brak wartości kulinarnej.',
  },
  ecology: {
    trophicModes: ['saprotrophic', 'parasitic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead', 'wood_living'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    optimalMeanTempC: { min: 5, max: 22 },
    minPrecipitationMm: 30,
    lagDays: { min: 14, max: 30 },
    frostSensitive: false,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['fomitopsis-pinicola-1'],
  description:
    'Kopytowaty lub konsolowaty owocnik o lakierowanej, czerwonobrązowej skorupie z jasnym, pomarańczowym do kremowego obrzeżeniem. Rośnie na martwym i osłabionym drewnie, głównie świerkowym. Niejadalny.',
};
