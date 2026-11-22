/**
 * @file Rekord gatunku: muchomor szyszkowaty (Amanita strobiliformis).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaStrobiliformis: Mushroom = {
  id: mushroomId('amanita-strobiliformis'),
  scientificName: 'Amanita strobiliformis',
  scientificSynonyms: ['Agaricus strobiliformis'],
  polishName: 'Muchomor szyszkowaty',
  vernacularNames: ['muchomor frędzlowaty'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['white', 'cream', 'grey'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['warts', 'smooth'],
    capMargin: ['appendiculate'], 
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['scaly'], 
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present', 'absent'], 
    stipeBase: ['rounded_bulb', 'rooting'], 
    ring: ['membranous_skirt', 'fibrous_zone', 'none'], 
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Rzadki gatunek z Czerwonej listy, kumuluje srebro z gleby. Łatwo pomylić z trującym muchomorem jeżowatym i białymi muchomorami śmiertelnymi - nie zbierać.',
    },
    notes: 'Kumuluje srebro z gleby; jako gatunek rzadki (Czerwona lista) nie powinien być zbierany.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'tilia', 'carpinus'],
    substrates: ['soil'], 
    habitats: ['deciduous_forest', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 15, max: 24 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-echinocephala'),
      distinguishingFeatures: ['hymenophoreColor'],
      note: 'Jeżowaty ma ostre, piramidalne brodawki, zielonkawy odcień blaszek i nieprzyjemny zapach. Szyszkowaty - duże, płaskie łaty i frędzlowaty brzeg kapelusza.',
    },
    {
      mushroomId: mushroomId('amanita-virosa'),
      distinguishingFeatures: ['capSurface', 'volva'],
      note: 'Jadowity ma gładki kapelusz bez łat i wyraźną, workowatą pochwę. U szyszkowatego pochwa rozpada się na łuski na bulwie.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['amanita-strobiliformis-1'],
  description:
    'Duży, biały, z płaskimi szarawymi łatami na kapeluszu i frędzlowatym brzegiem. Kremowy, nietrwały pierścień, korzeniasto wydłużona bulwa. Ciepłolubny, na glebach wapiennych, często w parkach.',
};
