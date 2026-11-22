/**
 * @file Rekord gatunku: muchomor cesarski (Amanita caesarea).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaCaesarea: Mushroom = {
  id: mushroomId('amanita-caesarea'),
  scientificName: 'Amanita caesarea',
  scientificSynonyms: ['Agaricus caesareus'],
  polishName: 'Muchomor cesarski',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['orange', 'red', 'yellow'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth'], 
    capMargin: ['striate'],
    capPeelability: ['full'],
    hymenophoreColor: ['yellow'], 
    sporePrint: ['white'],
    capFleshColor: ['white', 'yellow'],
    capFleshColorChange: ['none'], 
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'fibrillose'], 
    stipeColor: ['yellow'],
    stipeFleshColor: ['white', 'yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['present'], 
    stipeBase: ['plain'],
    ring: ['membranous_striate', 'none'], 
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy', 'none'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Nigdy nie zbierać zamkniętych „jaj” - w tym stadium łatwo pomylić go z muchomorem zielonawym.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'castanea', 'fagus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 18, max: 26 },
    minPrecipitationMm: 25,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-muscaria'),
      distinguishingFeatures: ['hymenophoreColor', 'stipeBase', 'ring'],
      note: 'Muchomor czerwony ma białe blaszki i biały trzon, bulwę z pochwą rozpadłą na brodawkowate pierścienie i gładki pierścień. Deszcz zmywa białe łatki z jego kapelusza.',
    },
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['hymenophoreColor', 'capMargin', 'stipeBase'],
      note: 'W stadium „jaja” oba są białe - nigdy nie zbierać zamkniętych owocników. Muchomor zielonawy ma zawsze białe blaszki, gładki brzeg kapelusza i bulwę.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-caesarea-1'],
  description:
    'Gatunek ciepłolubny z południa Europy, w Polsce nienotowany lub skrajnie rzadki. Pomarańczowoczerwony kapelusz z prążkowanym brzegiem, żółte blaszki, trzon i pierścień, duża biała workowata pochwa.',
};
