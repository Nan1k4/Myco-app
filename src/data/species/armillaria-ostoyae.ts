/**
 * @file Rekord gatunku: opieńka ciemna (Armillaria ostoyae).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const armillariaOstoyae: Mushroom = {
  id: mushroomId('armillaria-ostoyae'),
  scientificName: 'Armillaria ostoyae',
  scientificSynonyms: ['Armillaria polymyces', 'Armillaria obscura'],
  polishName: 'Opieńka ciemna',
  vernacularNames: ['opieńka', 'podpieńka', 'pniokówka'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'decurrent'],
    capColor: ['brown_light', 'brown'],
    capShape: ['hemispherical', 'convex', 'flat', 'depressed', 'umbonate'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['scaly'],
    capMargin: ['smooth', 'striate'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'pink'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['fibrous', 'solid'],
    stipeSurface: ['fibrillose', 'scaly'],
    stipeColor: ['cream', 'brown_light', 'brown', 'brown_dark'],
    stipeFleshColor: ['cream', 'brown_light'], // włóknisty, ku nasadzie brązowawy
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['clustered', 'scattered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild', 'bitter'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Tylko kapelusze, dokładnie obgotowane, wodę odlać. Niedogotowane szkodzą.',
    },
    notes: 'Wartościowy grzyb jadalny, ale niedogotowany wywołuje dolegliwości żołądkowo-jelitowe.',
  },
  ecology: {
    trophicModes: ['parasitic', 'saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_living', 'wood_dead'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [9, 10, 11],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: false,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('galerina-marginata'),
      distinguishingFeatures: ['sporePrint', 'hymenophoreColor', 'capSurface'],
      note: 'Hełmówka ma rdzawobrązowy wysyp i gładki kapelusz bez łusek; opieńka - biały wysyp i łuseczki.',
    },
    {
      mushroomId: mushroomId('hypholoma-fasciculare'),
      distinguishingFeatures: ['hymenophoreColor', 'sporePrint', 'ring'],
      note: 'Maślanka ma siarkowożółte, potem oliwkowe blaszki, ciemny wysyp i brak błoniastego pierścienia.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['armillaria-ostoyae-1'],
  description: 'Kępami na pniakach i korzeniach, głównie drzew iglastych. Ciemne łuseczki na kapeluszu, wyraźny pierścień, czarne sznury grzybni.',
};
