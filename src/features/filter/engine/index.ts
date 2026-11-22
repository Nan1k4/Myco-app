/**
 * @file Publiczne API silnika filtra. Użycie: `buildFilterIndex(MUSHROOM_DB)` raz,
 * potem `evaluateFilter(index, selections)` po każdej odpowiedzi.
 */
export { evaluateFilter } from './evaluateFilter';
export { buildFilterIndex, type FilterIndex } from './filterIndex';
