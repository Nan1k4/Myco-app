/**
 * @file Rekord gatunku: kolczak obłączasty (Hydnum repandum).
 * ⚠ Parametry `fruiting` są szacunkowe - całość wymaga weryfikacji mykologa przed wydaniem.
 * Spód kapelusza to kolce (nie blaszki ani rurki).
 * null / [] = brak publicznych danych; 'none' = cecha nie występuje.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const hydnumRepandum: Mushroom = {
  id: mushroomId('hydnum-repandum'),
  scientificName: 'Hydnum repandum',
  scientificSynonyms: ['Dentinum repandum'],
  polishName: 'Kolczak obłączasty',
  vernacularNames: ['kolczak'],
  features: {
    hymenophore: ['teeth'],
    gillAttachment: ['decurrent'],
    capColor: ['cream', 'ochre', 'orange'],
    capShape: ['convex', 'flat', 'depressed'], 
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['velvety'], 
    capMargin: ['wavy', 'inrolled'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'], 
    sporePrint: ['white', 'cream'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['yellow', 'orange'],
    bruising: ['orange', 'ochre'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['yellow'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'clustered'],
    smell: ['none'],
    taste: ['mild', 'bitter'], 
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny, jędrny, rzadko zaatakowany przez larwy. Starsze okazy bywają gorzkawe - można je wcześniej obgotować.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'fagus', 'quercus', 'betula'],
    substrates: ['soil', 'litter', 'moss'],
    habitats: ['coniferous_forest', 'deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 6, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: false, 
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['hydnum-repandum-1'],
  description:
    'Kremowo-pomarańczowy, nieregularny kapelusz, a zamiast blaszek miękkie, kruche kolce zbiegające na trzon. Miąższ biały, delikatnie żółknie. Jedyny w tym rodzaju grzyb z kolcami, łatwy do rozpoznania.',
};
