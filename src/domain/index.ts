/**
 * @file Publiczne API domeny dla reszty aplikacji (`features/`, `api/`, `data/`, `app/`).
 * Pliki WEWNĄTRZ `domain/` importują się nawzajem bezpośrednio, nie przez ten barrel
 * (ochrona przed cyklami importów w Metro).
 * @module domain
 */
export * from './common';
export * from './vocabulary';
export * from './features';
export * from './mushroom';
export * from './filter';
export * from './predictor';
export * from './places';

