/**
 * @file Złożenie lokalnej bazy wiedzy. Jeden plik na gatunek w `species/`,
 * lista gatunków w generowanym `species/index.ts` (`node scripts/generate-species-index.mjs`).
 * ⚠ Dane robocze: cechy i parametry owocnikowania wymagają weryfikacji mykologa przed wydaniem.
 * @module data
 */
import { SCHEMA_VERSION, type Mushroom, type MushroomDatabase, type MushroomId } from '../domain';
import { ALL_SPECIES } from './species';

export const MUSHROOM_DB: MushroomDatabase = {
  schemaVersion: SCHEMA_VERSION,
  dataVersion: '2026.11.22',
  species: ALL_SPECIES,
};

const SPECIES_BY_ID: ReadonlyMap<MushroomId, Mushroom> = new Map(MUSHROOM_DB.species.map((s) => [s.id, s]));

/** Gatunek po id w O(1). `undefined` dla nieznanego id. */
export function getMushroomById(id: MushroomId): Mushroom | undefined {
  return SPECIES_BY_ID.get(id);
}
