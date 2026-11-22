/**
 * @file Rekord gatunku: tęgoskór pospolity (Scleroderma citrinum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const sclerodermaCitrinum: Mushroom = {
  id: mushroomId('scleroderma-citrinum'),
  scientificName: 'Scleroderma citrinum',
  scientificSynonyms: ['Scleroderma aurantium', 'Scleroderma vulgare'],
  polishName: 'Tęgoskór pospolity',
  vernacularNames: [],
  features: {
    hymenophore: ['none'],
    gillAttachment: ['not_applicable'],
    capColor: ['yellow', 'ochre', 'brown_light'],
    capShape: ['spherical'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['scaly', 'cracked'], 
    capMargin: ['none'],
    capPeelability: ['none'],
    hymenophoreColor: ['none'],
    sporePrint: ['black', 'violet'], 
    capFleshColor: ['white', 'black'], 
    capFleshColorChange: ['pink'], 
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
    growthHabit: ['scattered', 'clustered'],
    smell: ['unpleasant', 'earthy'],
    taste: ['unpleasant'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Nudności, wymioty, bóle brzucha. Bywa błędnie brany za purchawkę lub truflę - ciemna gleba po przekrojeniu to odróżnia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'betula', 'pinus', 'picea'],
    substrates: ['soil'], 
    habitats: ['deciduous_forest', 'coniferous_forest', 'mixed_forest', 'heath'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['scleroderma-citrinum-1'],
  description:
    'Kulisty, ziemniaczany owocnik z grubą, żółtobrązową, łuskowato popękaną skórką. Wnętrze twarde, szybko ciemniejące do fioletowoczarnego. Pospolity na piaszczystych glebach. Trujący.',
};
