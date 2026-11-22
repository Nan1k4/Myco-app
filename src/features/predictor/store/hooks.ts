/**
 * @file Podpięcie magazynu prognoz do Reacta oraz automatyczne odświeżanie.
 *
 * Odświeżanie działa tylko przy otwartej aplikacji: przy wejściu na ekran, po powrocie
 * aplikacji na pierwszy plan i co {@link CHECK_INTERVAL_MS}. Odświeżane są tylko wpisy starsze
 * niż {@link AUTO_REFRESH_MAX_AGE_MS} – częściej nie ma sensu, model pogody i tak aktualizuje się
 * co kilka godzin, a darmowe API ma limity.
 *
 * @module features/predictor/store/hooks
 */
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { AppState } from 'react-native';
import type { ForecastState } from './forecastStore';
import { forecastStore } from './instance';

export const AUTO_REFRESH_MAX_AGE_MS = 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 10 * 60 * 1000;

/** Stan magazynu; pierwszy użyty komponent uruchamia odczyt z dysku. */
export function useForecastState(): ForecastState {
  useEffect(() => {
    void forecastStore.hydrate();
  }, []);
  return useSyncExternalStore(forecastStore.subscribe, forecastStore.getState);
}

/** Automatyczne odświeżanie zapisanych miejsc, gdy ekran jest widoczny. */
export function useAutoRefresh(): void {
  useFocusEffect(
    useCallback(() => {
      const run = () => void forecastStore.refreshStale(AUTO_REFRESH_MAX_AGE_MS);
      run();
      const timer = setInterval(run, CHECK_INTERVAL_MS);
      const subscription = AppState.addEventListener('change', (status) => {
        if (status === 'active') run();
      });
      return () => {
        clearInterval(timer);
        subscription.remove();
      };
    }, []),
  );
}
