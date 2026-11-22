/**
 * @file Rekord gatunku: płachetka zwyczajna, „kołpak” (Cortinarius caperatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const cortinariusCaperatus: Mushroom = {
  id: mushroomId('cortinarius-caperatus'),
  scientificName: 'Cortinarius caperatus',
  scientificSynonyms: ['Rozites caperata', 'Rozites caperatus', 'Pholiota caperata', 'Dryophila caperata', 'Togaria caperata'],
  polishName: 'Płachetka zwyczajna',
  vernacularNames: ['kołpak', 'płachetka kołpakowata'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'adnexed'],
    capColor: ['brown_light', 'yellow', 'cream'], 
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['wrinkled', 'fibrillose'], 
    capMargin: ['striate'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['cream', 'brown_light'], 
    sporePrint: ['rust'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid'], 
    stipeSurface: ['fibrillose'],
    stipeColor: ['white', 'cream', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['membranous_skirt', 'none'], 
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Wartościowy, smaczny grzyb; ryzyko dotyczy pomyłki z trującymi zasłonakami.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus', 'picea', 'betula'],
    substrates: ['soil', 'moss'], 
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('cortinarius-orellanus'),
      distinguishingFeatures: ['ring', 'capSurface'],
      note: 'Zasłonak rudy (śmiertelnie trujący - orelanina niszczy nerki, objawy dopiero po kilku dniach) nie ma pierścienia ani pomarszczonego kapelusza z białawym nalotem; kapelusz jest pomarańczowordzawy, gładki, jedwabisty.',
    },
    {
      mushroomId: mushroomId('cortinarius-rubellus'),
      distinguishingFeatures: ['ring', 'capSurface'],
      note: 'Zasłonak spiczasty (śmiertelnie trujący - orelanina) ma wyraźnie spiczasty garb, brak pierścienia i brak pomarszczenia; płachetka ma szeroki pierścień na trzonie i pomarszczony kapelusz.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['cortinarius-caperatus-1'],
  description:
    'Ochrowożółty kapelusz, pomarszczony i pokryty srebrzystobiałym nalotem, oraz wyraźny błoniasty pierścień na trzonie; wysyp rdzawy. Rośnie w kwaśnych lasach iglastych i mieszanych, wśród mchów.',
};
