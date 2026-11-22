/**
 * @file Rekord gatunku: żółciak siarkowy (Laetiporus sulphureus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const laetiporusSulphureus: Mushroom = {
  id: mushroomId('laetiporus-sulphureus'),
  scientificName: 'Laetiporus sulphureus',
  scientificSynonyms: ['Polyporus sulphureus', 'Boletus sulphureus', 'Grifola sulphurea'],
  polishName: 'Żółciak siarkowy',
  vernacularNames: ['kurczak z lasu'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['yellow', 'orange'], 
    capShape: ['shelf', 'fan_shaped'],
    capSize: ['10_to_20', 'over_20'],
    capSurface: ['velvety', 'wrinkled'], 
    capMargin: ['wavy', 'lobed'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['yellow', 'cream'], 
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
    growthHabit: ['clustered', 'tiered'],
    smell: ['fruity', 'mushroomy'],
    taste: ['mild', 'sour'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Tylko młode, miękkie brzegi owocnika, zawsze po dokładnej obróbce cieplnej. Pierwszy raz próbować niewielkiej porcji. Okazów z cisa, drzew iglastych i eukaliptusa lepiej unikać (większe ryzyko reakcji).',
    },
    notes: 'Ceniony za mięsisty, „kurczakowy” miąższ, ale część osób reaguje nudnościami, wymiotami, wysypką lub gorączką; objawy zwykle pojawiają się w ciągu 30 min–4 h.',
  },
  ecology: {
    trophicModes: ['saprotrophic', 'parasitic'],
    mycorrhizalPartners: [],
    substrates: ['wood_living', 'wood_dead'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'park'], 
  },
  fruiting: {
    months: [5, 6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['laetiporus-sulphureus-1'],
  description:
    'Duże, jaskrawożółte i pomarańczowe, dachówkowate konsole z siarkowożółtymi porami na drzewach liściastych, szczególnie dębie, wierzbie i wiśni. Jadalne tylko młode brzegi po dokładnej obróbce; u części osób wywołuje dolegliwości.',
};
