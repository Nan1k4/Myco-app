/**
 * @file Rekord gatunku: koślarz białawy (Leccinum holopus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const leccinumHolopus: Mushroom = {
  id: mushroomId('leccinum-holopus'),
  scientificName: 'Leccinum holopus',
  scientificSynonyms: ['Leccinum niveum', 'Leccinum nucatum', 'Krombholziella holopus'],
  polishName: 'Koźlarz białawy',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['white', 'cream', 'grey', 'olive'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy'], 
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'grey', 'brown_light'],
    sporePrint: ['brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none', 'pink'],
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'fibrous'],
    stipeSurface: ['scabrous'], 
    stipeColor: ['white'], 
    stipeFleshColor: ['white', 'green'], 
    stipeFleshColorChange: ['none', 'pink'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jadalny grzyb o łagodnym smaku i dość wodnistym, miękkim miąższu. Wymaga obróbki termicznej; trzony są dość włókniste i często bywają pomijane.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula'],
    substrates: ['soil', 'moss'],
    habitats: ['bog', 'deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['leccinum-holopus-1'],
  description:
    'Na torfowiskach i w podmokłych lasach pod brzozami, często wśród torfowców. Cały białawy, z wiekiem szarzeje lub zielonkawieje. Kosmki na trzonie białe, z wiekiem ciemnieją. Miąższ wodnisty.',
};
