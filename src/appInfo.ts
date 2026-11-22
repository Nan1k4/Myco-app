/**
 * @file Identyfikacja aplikacji w żądaniach do usług zewnętrznych.
 *
 * Zasady kafelków OpenStreetMap wymagają User-Agenta z nazwą aplikacji; ruch z domyślnym
 * User-Agentem WebView jest blokowany. Wersję podbijaj razem z `version` w `app.json`.
 * Przed publikacją w sklepie dopisz kontakt, np. `(+https://twoja-strona.pl)`.
 *
 * @module appInfo
 */
export const APP_NAME = 'MycoApp';
export const APP_VERSION = '1.0.0';

export const APP_USER_AGENT = `${APP_NAME}/${APP_VERSION} (Android; React Native WebView)`;
