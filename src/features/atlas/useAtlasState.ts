/**
 * @file Stan atlasu z zapisem na dysk: odczyt przy pierwszym wejściu, zapis po każdej zmianie
 * filtrów/sortowania/zestawów (z krótkim opóźnieniem – seria dotknięć = jeden zapis).
 * @module features/atlas/useAtlasState
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useReducer, useRef, type Dispatch } from 'react';
import { AppState } from 'react-native';
import {
  INITIAL_ATLAS_STATE,
  atlasReducer,
  loadAtlas,
  saveAtlas,
  type AtlasAction,
  type AtlasState,
  type StoredAtlas,
} from './engine';

const SAVE_DELAY_MS = 400;

export function useAtlasState(): readonly [AtlasState, Dispatch<AtlasAction>] {
  const [state, dispatch] = useReducer(atlasReducer, INITIAL_ATLAS_STATE);
  const { hydrated, filters, sort, presets } = state;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<StoredAtlas | null>(null);
  const lastLoadedRef = useRef<StoredAtlas | null>(null);
  const writeChainRef = useRef<Promise<void>>(Promise.resolve());

  const flushPending = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const pending = pendingRef.current;
    if (!pending) return;
    pendingRef.current = null;
    writeChainRef.current = writeChainRef.current
      .then(() => saveAtlas(AsyncStorage, pending))
      .catch((error: unknown) => console.warn('[atlas] zapis filtrów nie powiódł się:', error));
  }, []);

  useEffect(() => {
    let cancelled = false;
    void loadAtlas(AsyncStorage).then((stored) => {
      if (cancelled) return;
      lastLoadedRef.current = stored;
      dispatch({ type: 'hydrate', ...stored });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Przed odczytem nie zapisujemy – pusty stan startowy nadpisałby zapisane filtry.
    if (!hydrated) return undefined;

    const loaded = lastLoadedRef.current;
    if (loaded && loaded.filters === filters && loaded.sort === sort && loaded.presets === presets) {
      return undefined;
    }
    lastLoadedRef.current = null;

    pendingRef.current = { filters, sort, presets };
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      flushPending();
    }, SAVE_DELAY_MS);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [hydrated, filters, sort, presets, flushPending]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      if (status !== 'active') flushPending();
    });
    return () => {
      subscription.remove();
      flushPending();
    };
  }, [flushPending]);

  return [state, dispatch];
}
