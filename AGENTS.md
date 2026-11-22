This is an Expo/React Native mobile application (`myco-app`, UI language: Polish). Prioritize mobile-first patterns, offline-first reliability, and cross-platform compatibility.

For full architecture, data flow, and domain invariants (SQLite build pipeline, 32-bit bitmask limits, Safety Gate type rules), read `KONTEKST.md` before making non-trivial changes.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json` (currently `^58.0.0`).
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch `https://docs.expo.dev/llms.txt` — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

This project uses `npm` (`package-lock.json` is present).

```bash
npx expo install <package>              # ALWAYS use instead of npm install for Expo/RN packages — resolves SDK-compatible versions
npm start                               # start the Expo dev server (expo start)
npm run android                         # build/run native Android (expo run:android)
npm run typecheck                       # TypeScript check (tsc --noEmit, includes src/__typetests__/)
npm test                                # run Jest unit and database tests
node scripts/generate-species-index.mjs # regenerate src/data/species/index.ts after adding/removing species
npm run build:db                        # compile src/data -> assets/db/myco.db (requires matching dataVersion & DB_DATA_VERSION)
npx expo-doctor                         # diagnose dependency and config issues
npx expo install --fix                  # fix incompatible package versions
```

Note: ESLint / `npx expo lint` is not configured in this repository. Always run `npm run typecheck` and `npm test` before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in **`app/`** (at the repository root, NOT `src/app/`): `app/_layout.tsx`, `app/(tabs)/`, `app/forecast/[key].tsx`, `app/species/[id].tsx`.
- Keep route files in `app/` as thin wrappers/re-exports of screens implemented in `src/features/`. Keep components, domain logic, API clients, DB repositories, hooks, and utils in `src/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Project-Specific Rules

- **Continuous Native Generation (CNG):** `ios/` and `android/` are not tracked in the repo. Never create or edit native directories by hand — configure native behavior in `app.json` and config plugins.
- **Expo Go vs. Development Builds:** Expo Go only includes its bundled native modules. After adding a library with custom native code, use a development build (`npx expo run:android` / `npx expo run:ios`, or EAS Build via `npx eas-cli@latest`).
- **Database & Domain Invariants:**
  - Any edit to `src/data/species/` or `src/db/schema.ts` requires keeping `MUSHROOM_DB.dataVersion` (`src/data/index.ts`) and `DB_DATA_VERSION` (`src/db/schema.ts`) in sync and rebuilding `assets/db/myco.db` via `npm run build:db`.
  - Files inside `src/domain/` must import each other directly (never via `src/domain/index.ts`) to prevent Metro cycles, and `validateDatabase.ts` must stay out of `src/domain/index.ts`.
  - Never bypass `GateFeatureKey` / `QuizKey` exclusions (such as `taste` and `SUBJECTIVE_FEATURES`) with `as` type assertions.
- Prefer recommended Expo modules over third-party libraries. Docs: https://docs.expo.dev/versions/latest/index.md
