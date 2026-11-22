/**
 * @file Stan wyszukiwania miejsc. Wyszukiwanie na żądanie (Enter / przycisk), nie przy każdym
 * znaku – oszczędza transfer i limity API. Starsze odpowiedzi są ignorowane.
 * @module features/location/usePlaceSearch
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { MIN_QUERY_LENGTH, searchPlaces } from '../../api/geocodingService';
import type { NamedPlace } from '../../domain';

export type PlaceSearchState =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly query: string; readonly places: readonly NamedPlace[] }
  | { readonly status: 'error'; readonly message: string };

export interface UsePlaceSearchResult {
  readonly state: PlaceSearchState;
  readonly search: (query: string) => void;
  readonly reset: () => void;
}

export function usePlaceSearch(): UsePlaceSearchResult {
  const [state, setState] = useState<PlaceSearchState>({ status: 'idle' });
  const runId = useRef(0);

  useEffect(
    () => () => {
      runId.current += 1;
    },
    [],
  );

  const search = useCallback((rawQuery: string) => {
    const query = rawQuery.trim();
    const id = ++runId.current;
    if (query.length < MIN_QUERY_LENGTH) {
      setState({ status: 'error', message: `Wpisz co najmniej ${MIN_QUERY_LENGTH} znaki.` });
      return;
    }

    setState({ status: 'loading' });
    searchPlaces(query)
      .then((result) => {
        if (id !== runId.current) return;
        setState(result.ok ? { status: 'success', query, places: result.places } : { status: 'error', message: result.message });
      })
      .catch((error: unknown) => {
        if (id === runId.current) setState({ status: 'error', message: `Błąd wewnętrzny: ${String(error)}` });
      });
  }, []);

  const reset = useCallback(() => {
    runId.current += 1;
    setState({ status: 'idle' });
  }, []);

  return { state, search, reset };
}
