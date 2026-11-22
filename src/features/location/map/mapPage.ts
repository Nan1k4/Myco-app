/**
 * @file Strona HTML z mapą (Leaflet + kafelki OpenStreetMap) dla WebView oraz kontrakt
 * wiadomości strona → aplikacja. Czyste funkcje, bez zależności od React Native.
 *
 * Bezpieczeństwo: Leaflet z CDN z przypiętą wersją i SRI (podmieniony plik się nie wykona);
 * wiadomości ze strony są walidowane jak dane z zewnątrz.
 *
 * @module features/location/map/mapPage
 */
import { isValidCoordinates, type GeoCoordinates } from '../../../domain';

const LEAFLET = {
  css: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  cssIntegrity: 'sha512-Zcn6bjR/8RZbLEpLIeOwNtzREBAJnUKESxces60Mpoj+2okopSAcSUIUOseddDm0cxnGQzxIR7vJgsLZbdLE3w==',
  js: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  jsIntegrity: 'sha512-BwHfrr4c9kmRkLw6iXFdzcdWV/PGkVgiIyIWLLlTSXzWQzxuSg4DiQUCpauz/EWjgk5TYQqX/kvn9pG1NpYfqg==',
} as const;

/** Kafelki OSMF – wymagają identyfikującego User-Agenta (`APP_USER_AGENT`) i widocznej atrybucji. */
const OSM_TILES = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
} as const;

export interface MapViewport {
  readonly center: GeoCoordinates;
  readonly zoom: number;
}

/** Cała Polska na ekranie telefonu. */
export const POLAND_VIEWPORT: MapViewport = { center: { latitude: 52.07, longitude: 19.48 }, zoom: 6 };

/** Przybliżenie, gdy mapa startuje od znanego punktu (widać pojedyncze lasy i drogi). */
export const PLACE_ZOOM = 12;

/** Wiadomości strona → aplikacja. */
export type MapMessage =
  | { readonly type: 'ready' }
  | { readonly type: 'pick'; readonly coords: GeoCoordinates }
  /** `leaflet` – biblioteka się nie załadowała (brak sieci / SRI); `tiles` – kafelki nie dochodzą. */
  | { readonly type: 'error'; readonly reason: 'leaflet' | 'tiles' };

/** Strona mapy. `marker` – punkt zaznaczony na starcie (np. poprzedni wybór). */
export function buildMapPage(viewport: MapViewport, marker: GeoCoordinates | null): string {
  const config = {
    lat: viewport.center.latitude,
    lng: viewport.center.longitude,
    zoom: viewport.zoom,
    marker: marker ? { lat: marker.latitude, lng: marker.longitude } : null,
    tiles: OSM_TILES,
  };

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" href="${LEAFLET.css}" integrity="${LEAFLET.cssIntegrity}" crossorigin="">
<style>html, body, #map { height: 100%; margin: 0; padding: 0; }</style>
</head>
<body>
<div id="map"></div>
<script>
  function send(message) {
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify(message));
  }
</script>
<script src="${LEAFLET.js}" integrity="${LEAFLET.jsIntegrity}" crossorigin=""
        onerror="send({ type: 'error', reason: 'leaflet' })"></script>
<script>
(function () {
  if (typeof L === 'undefined') return; // błąd już zgłosił onerror
  var config = ${toScriptJson(config)};

  var map = L.map('map', { minZoom: 4, maxZoom: config.tiles.maxZoom }).setView([config.lat, config.lng], config.zoom);
  var tiles = L.tileLayer(config.tiles.url, {
    maxZoom: config.tiles.maxZoom,
    attribution: config.tiles.attribution,
  }).addTo(map);

  var tileErrorReported = false;
  tiles.on('tileerror', function () {
    if (tileErrorReported) return;
    tileErrorReported = true;
    send({ type: 'error', reason: 'tiles' });
  });

  // circleMarker zamiast L.marker: nie potrzebuje obrazków ikon z CDN.
  var marker = null;
  function place(latlng) {
    if (marker) marker.setLatLng(latlng);
    else marker = L.circleMarker(latlng, { radius: 9, color: '#2f4f2f', weight: 3, fillColor: '#ffffff', fillOpacity: 1 }).addTo(map);
  }
  if (config.marker) place([config.marker.lat, config.marker.lng]);

  // 'click' = dotknięcie; przesuwanie i przybliżanie go nie wywołują.
  map.on('click', function (event) {
    var point = event.latlng.wrap(); // po przewinięciu mapy dookoła świata długość może wyjść poza ±180
    place(point);
    send({ type: 'pick', latitude: point.lat, longitude: point.lng });
  });

  send({ type: 'ready' });
})();
</script>
</body>
</html>`;
}

/**
 * Dane wiadomości z WebView. `null` dla wszystkiego, co nie jest poprawną wiadomością –
 * treść pochodzi ze strony, więc traktujemy ją jak dane z zewnątrz.
 */
export function parseMapMessage(raw: string): MapMessage | null {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof data !== 'object' || data === null) return null;
  const message = data as Record<string, unknown>;

  switch (message.type) {
    case 'ready':
      return { type: 'ready' };
    case 'pick': {
      const { latitude, longitude } = message;
      if (typeof latitude !== 'number' || typeof longitude !== 'number') return null;
      const coords = { latitude, longitude };
      return isValidCoordinates(coords) ? { type: 'pick', coords } : null;
    }
    case 'error':
      return message.reason === 'leaflet' || message.reason === 'tiles' ? { type: 'error', reason: message.reason } : null;
    default:
      return null;
  }
}

/**
 * Nawigacja w WebView: strona startowa zostaje, linki http(s) (np. atrybucja OSM) idą do
 * zewnętrznej przeglądarki, wszystko inne jest blokowane.
 */
export function classifyNavigation(url: string): 'allow' | 'external' | 'block' {
  if (url === 'about:blank' || url.startsWith('data:')) return 'allow';
  if (/^https?:\/\//i.test(url)) return 'external';
  return 'block';
}

/** JSON bezpieczny wewnątrz `<script>` (bez `</script>` i separatorów linii JS). */
function toScriptJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
