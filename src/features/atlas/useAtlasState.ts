/**
 * @file Stan atlasu z zapisem na dysk: odczyt przy pierwszym wejściu, zapis po każdej zmianie
 * filtrów/sortowania/zestawów (z krótkim opóźnieniem – seria dotknięć = jeden zapis).
 * @module features/atlas/useAtlasState
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useReducer, type Dispatch } from 'react';
import { INITIAL_ATLAS_STATE, atlasReducer, loadAtlas, saveAtlas, type AtlasAction, type AtlasState } from './engine';

const SAVE_DELAY_MS = 400;

export function useAtlasState(): readonly [AtlasState, Dispatch<AtlasAction>] {
  const [state, dispatch] = useReducer(atlasReducer, INITIAL_ATLAS_STATE);
  const { hydrated, filters, sort, presets } = state;

  useEffect(() => {
    let cancelled = false;
    void loadAtlas(AsyncStorage).then((stored) => {
      if (!cancelled) dispatch({ type: 'hydrate', ...stored });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Przed odczytem nie zapisujemy – pusty stan startowy nadpisałby zapisane filtry.
    if (!hydrated) return undefined;
    const timer = setTimeout(() => {
      saveAtlas(AsyncStorage, { filters, sort, presets }).catch((error: unknown) =>
        console.warn('[atlas] zapis filtrów nie powiódł się:', error),
      );
    }, SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hydrated, filters, sort, presets]);

  return [state, dispatch];
}
