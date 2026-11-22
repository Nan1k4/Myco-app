/**
 * @file Zapisane miejsca („moje lasy”) – kontrakt danych trwale przechowywanych na telefonie.
 * @module domain/places
 */
import type { Brand, IsoDateTime } from './common';
import type { NamedPlace } from './predictor';

/** Lokalny identyfikator zapisanego miejsca (nie zmienia się po zmianie nazwy). */
export type SavedPlaceId = Brand<string, 'SavedPlaceId'>;

const SAVED_PLACE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Jedyne miejsce rzutowania `string → SavedPlaceId`.
 * @throws {Error} gdy identyfikator nie jest kebab-case z małych liter i cyfr.
 */
export function savedPlaceId(raw: string): SavedPlaceId {
  if (!SAVED_PLACE_ID_PATTERN.test(raw) || raw.length > 64) {
    throw new Error(`Invalid SavedPlaceId: "${raw}"`);
  }
  return raw as SavedPlaceId;
}

/** Miejsce zapisane przez użytkownika. `name` – nazwa nadana przez niego („Las za stawem”). */
export interface SavedPlace extends NamedPlace {
  readonly id: SavedPlaceId;
  readonly createdAt: IsoDateTime;
}

/** Limit listy: każde miejsce to osobne zapytanie przy odświeżaniu (limity darmowego API). */
export const MAX_SAVED_PLACES = 20;

export const MAX_PLACE_NAME_LENGTH = 40;
