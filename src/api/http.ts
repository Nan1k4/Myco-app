/**
 * @file Wspólne pobieranie JSON z timeoutem i klasyfikacją błędów ({@link NetworkErrorKind}).
 * Używane przez serwis pogody i wyszukiwarkę miejsc. Nigdy nie rzuca.
 * @module api/http
 */
import type { NetworkErrorKind } from '../domain';

export type JsonFetchResult =
  | { readonly ok: true; readonly body: unknown }
  | { readonly ok: false; readonly kind: NetworkErrorKind; readonly message: string };

export interface FetchJsonOptions {
  readonly timeoutMs: number;
  /** Prefiks komunikatów dla użytkownika, np. „Serwer pogody” („Serwer pogody: brak odpowiedzi…”). */
  readonly serviceLabel: string;
  readonly fetchFn?: typeof fetch;
  /** Wyciąga przyczynę z ciała odpowiedzi błędu (format zależy od API). */
  readonly extractErrorReason?: (body: unknown) => string | null;
}

/**
 * GET z nagłówkiem `Accept: application/json`.
 * Natywny `fetch` w RN nie ma timeoutu – bez niego żądanie przy słabym zasięgu wisi bez końca.
 * Timer obejmuje też odczyt body.
 */
export async function fetchJson(url: string, options: FetchJsonOptions): Promise<JsonFetchResult> {
  const { timeoutMs, serviceLabel, fetchFn = fetch, extractErrorReason } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let response: Response;
    try {
      response = await fetchFn(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    } catch (error) {
      // RN zgłasza brak sieci jako `TypeError: Network request failed` – nie odróżnia DNS od braku zasięgu.
      return controller.signal.aborted
        ? failure('timeout', `${serviceLabel}: brak odpowiedzi w ${Math.ceil(timeoutMs / 1000)} s.`)
        : failure('offline', `Brak połączenia z internetem (${describeError(error)}).`);
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch (error) {
      if (controller.signal.aborted) {
        return failure('timeout', `${serviceLabel}: przekroczono czas odczytu odpowiedzi.`);
      }
      if (response.ok) {
        return failure('invalid_response', `${serviceLabel}: odpowiedź nie jest poprawnym JSON (${describeError(error)}).`);
      }
      body = null; // błąd HTTP bez JSON – obsłużony niżej
    }

    if (!response.ok) {
      const reason = extractErrorReason?.(body) ?? null;
      return failure('http', `${serviceLabel}: błąd HTTP ${response.status}${reason ? ` (${reason.replace(/\.+$/, '')})` : ''}.`);
    }
    return { ok: true, body };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Query string z obiektu. Ręcznie, bo `URLSearchParams` w React Native ma historycznie
 * niepełną implementację.
 */
export function buildQuery(params: Readonly<Record<string, string>>): string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function failure(kind: NetworkErrorKind, message: string): JsonFetchResult {
  return { ok: false, kind, message };
}
