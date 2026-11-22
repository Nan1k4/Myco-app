/**
 * @file Kodowanie wartości cech jako bitów: wartość = bit o numerze jej pozycji w słowniku,
 * zbiór wartości = maska (OR). Największy słownik ma 14 wartości, więc maska mieści się w `number`.
 * Dopasowanie obserwacji do gatunku to wtedy jedno `&` zamiast przeszukiwania tablicy.
 */
import { FEATURE_KEYS, FEATURE_VOCABULARIES, type FeatureKey, type FeatureValueMap } from '../../../domain';

/** Bit wartości `value` cechy `key`. */
export function bitOf<K extends FeatureKey>(key: K, value: FeatureValueMap[K]): number {
  const index = FEATURE_VOCABULARIES[key].indexOf(value);
  if (index < 0) throw new Error(`Wartość "${String(value)}" spoza słownika cechy "${key}"`);
  return 1 << index;
}

/** Maska zbioru wartości cechy `key`. */
export function maskOf<K extends FeatureKey>(key: K, values: readonly FeatureValueMap[K][]): number {
  return values.reduce((mask, value) => mask | bitOf(key, value), 0);
}

/** Liczba bitów cechy (rozmiar słownika) – do iteracji po wartościach maski. */
export function vocabularySize(key: FeatureKey): number {
  return FEATURE_VOCABULARIES[key].length;
}

/** Rekord z wartością dla każdej cechy. Kompletność kluczy gwarantuje `FEATURE_KEYS`. */
export function recordByFeature<V>(valueOf: (key: FeatureKey) => V): Readonly<Record<FeatureKey, V>> {
  return Object.fromEntries(FEATURE_KEYS.map((key) => [key, valueOf(key)])) as Record<FeatureKey, V>;
}
