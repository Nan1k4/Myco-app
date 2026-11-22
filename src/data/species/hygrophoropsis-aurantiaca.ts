/**
 * @file Rekord gatunku: lisówka pomarańczowa (Hygrophoropsis aurantiaca).
 * ⚠ Parametry `fruiting` są szacunkowe - całość wymaga weryfikacji mykologa przed wydaniem.
 * ⚠ Źródła różnie klasyfikują jadalność (niejadalna / warunkowo jadalna); zapisano wersję ostrożną.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const hygrophoropsisAurantiaca: Mushroom = {
  id: mushroomId('hygrophoropsis-aurantiaca'),
  scientificName: 'Hygrophoropsis aurantiaca',
  scientificSynonyms: ['Cantharellus aurantiacus', 'Clitocybe aurantiaca', 'Merulius aurantiacus'],
  polishName: 'Lisówka pomarańczowa',
  vernacularNames: ['fałszywa kurka'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['decurrent'],
    capColor: ['orange', 'brown_light', 'yellow'],
    capShape: ['convex', 'depressed', 'funnel'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['velvety', 'smooth'],
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['orange'], 
    sporePrint: ['white', 'cream'],
    capFleshColor: ['cream', 'orange'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'velvety'],
    stipeColor: ['orange', 'brown_light'],
    stipeFleshColor: ['orange', 'cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['poor_quality', 'confusion_risk'],
    notes: 'Miąższ cienki, o mało atrakcyjnym smaku; dawne źródła podają jako jadalną, nowsze jako niejadalną z możliwymi dolegliwościami żołądkowymi. Często mylona z kurką - kurka ma listewki, nie prawdziwe blaszki.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['litter', 'wood_dead', 'soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'heath'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 6, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['hygrophoropsis-aurantiaca-1'],
  description:
    'Pomarańczowy, aksamitny kapelusz z podwiniętym brzegiem i gęstymi, widełkowatymi, zbiegającymi blaszkami intensywnie pomarańczowymi. Rośnie w lasach iglastych, na ściółce i zbutwiałym drewnie. Często mylona z kurką.',
};
