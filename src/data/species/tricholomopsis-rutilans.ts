/**
 * @file Rekord gatunku: rycerzyk czerwonozłoty (Tricholomopsis rutilans).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const tricholomopsisRutilans: Mushroom = {
  id: mushroomId('tricholomopsis-rutilans'),
  scientificName: 'Tricholomopsis rutilans',
  scientificSynonyms: ['Agaricus rutilans', 'Gymnopus rutilans', 'Tricholoma rutilans'],
  polishName: 'Rycerzyk czerwonozłoty',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'sinuate'],
    capColor: ['yellow', 'red', 'purple'], 
    capShape: ['convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['scaly', 'fibrillose'], 
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['yellow'], 
    sporePrint: ['white'],
    capFleshColor: ['yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['scaly', 'fibrillose'], 
    stipeColor: ['yellow', 'red'],
    stipeFleshColor: ['yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'clustered'],
    smell: ['musty'], 
    taste: ['bitter'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['bitter', 'poor_quality'],
    notes: 'Nietrujący, ale gorzki i bez wartości kulinarnej.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead', 'wood_buried'], 
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['tricholomopsis-rutilans-1'],
  description:
    'Kapelusz żółty, gęsto pokryty purpurowoczerwonymi łuseczkami; blaszki i miąższ jaskrawożółte, wysyp biały. Rośnie na pniakach i martwym drewnie iglastym. Gorzki, niejadalny.',
};
