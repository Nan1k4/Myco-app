/**
 * @file Polskie etykiety UI. `Record<…>` sprawia, że brak etykiety dla nowej
 * wartości słownika jest błędem kompilacji.
 */
import type {
  EdibilityCategory,
  FeatureKey,
  FilterKey,
  FlushLevel,
  Habitat,
  LocationSource,
  ObservationProcedure,
  PredictionConfidence,
  PredictionFactor,
  SubstrateGroup,
  TreeGenus,
} from '../domain';

export const FLUSH_LEVEL_LABELS_PL: Record<FlushLevel, string> = {
  very_low: 'Bardzo słabe',
  low: 'Słabe',
  moderate: 'Umiarkowane',
  high: 'Dobre',
  very_high: 'Bardzo dobre',
};

export const CONFIDENCE_LABELS_PL: Record<PredictionConfidence, string> = {
  low: 'niska',
  medium: 'średnia',
  high: 'wysoka',
};

export const FACTOR_LABELS_PL: Record<PredictionFactor['kind'], string> = {
  precipitation: 'Opady',
  temperature: 'Temperatura',
  season: 'Sezon',
  soil_moisture: 'Wilgotność gleby',
  frost: 'Przymrozki',
};

export const LOCATION_SOURCE_LABELS_PL: Record<LocationSource, string> = {
  gps: 'GPS',
  last_known: 'ostatnia znana pozycja',
  manual: 'wybrana ręcznie',
};

export const EDIBILITY_LABELS_PL: Record<EdibilityCategory, string> = {
  edible: 'Jadalny',
  conditionally_edible: 'Warunkowo jadalny',
  inedible: 'Niejadalny',
  unknown: 'Jadalność nieznana',
  poisonous: 'Trujący',
  deadly: 'Śmiertelnie trujący',
};

export const FEATURE_LABELS_PL: Record<FeatureKey, string> = {
  hymenophore: 'Hymenofor',
  gillAttachment: 'Przyczep blaszek',
  capColor: 'Barwa kapelusza',
  capShape: 'Kształt kapelusza',
  capSize: 'Średnica kapelusza',
  capSurface: 'Powierzchnia kapelusza',
  capMargin: 'Brzeg kapelusza',
  capPeelability: 'Zdejmowalność skórki',
  hymenophoreColor: 'Barwa hymenoforu / wnętrza',
  sporePrint: 'Wysyp zarodników',
  capFleshColor: 'Barwa miąższu kapelusza',
  capFleshColorChange: 'Zmiana barwy miąższu kapelusza',
  bruising: 'Barwa po uciśnięciu',
  latex: 'Mleczko',
  stipeColor: 'Barwa trzonu',
  stipeShape: 'Kształt trzonu',
  stipeFleshColor: 'Barwa miąższu trzonu',
  stipeFleshColorChange: 'Zmiana barwy miąższu trzonu',
  stipeInterior: 'Wnętrze trzonu',
  stipeSurface: 'Powierzchnia trzonu',
  volva: 'Pochwa',
  stipeBase: 'Podstawa trzonu',
  ring: 'Pierścień',
  growthHabit: 'Sposób wzrostu',
  smell: 'Zapach',
  taste: 'Smak',
};

/** Etykieta dowolnej obserwacji filtra (cecha owocnika lub otoczenia). */
export const FILTER_KEY_LABELS_PL: Record<FilterKey, string> = {
  ...FEATURE_LABELS_PL,
  trees: 'Drzewa w pobliżu',
  substrate: 'Podłoże',
  habitat: 'Siedlisko',
};

/** Czynność w zdaniu „Pewne - wykonano: …”. */
export const PROCEDURE_LABELS_PL: Record<ObservationProcedure, string> = {
  look: 'obejrzenie',
  touch: 'dotknięcie / uciśnięcie',
  cut: 'przekrój wzdłuż',
  dig_base: 'wykopanie z podstawą',
  spore_print: 'wysyp zarodników (ok. 2 h)',
  smell: 'powąchanie',
  taste: 'próba smaku (wypluć!)',
};

export const TREE_LABELS_PL: Record<TreeGenus, string> = {
  pinus: 'sosna',
  picea: 'świerk',
  abies: 'jodła',
  larix: 'modrzew',
  quercus: 'dąb',
  fagus: 'buk',
  betula: 'brzoza',
  carpinus: 'grab',
  populus: 'topola / osika',
  salix: 'wierzba',
  alnus: 'olsza',
  tilia: 'lipa',
  tsuga: 'choina',
  corylus: 'leszczyna',
  castanea: 'kasztan jadalny',
  none: 'brak drzew w pobliżu',
};

export const SUBSTRATE_GROUP_LABELS_PL: Record<SubstrateGroup, string> = {
  ground: 'ziemia / ściółka / mech',
  wood: 'drewno',
};
export const HABITAT_LABELS_PL: Record<Habitat, string> = {
  coniferous_forest: 'Las iglasty',
  deciduous_forest: 'Las liściasty',
  mixed_forest: 'Las mieszany',
  forest_edge: 'Skraj lasu',
  meadow: 'Łąka, pastwisko',
  heath: 'Wrzosowisko',
  park: 'Park, zieleniec',
  roadside: 'Pobocze drogi',
  bog: 'Torfowisko, mokradło',
};
