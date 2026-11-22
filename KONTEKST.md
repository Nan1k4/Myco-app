# KONTEKST.md — Architektura `myco-app`

Dokument referencyjny dla agentów AI/LLM opisujący strukturę, przepływ danych, silniki i niezmienniki repozytorium `myco-app`.

---

## 1. Cel i domena aplikacji

`myco-app` to mobilna aplikacja mykologiczna dla Polski (język UI: polski), łącząca identyfikację grzybów opartą na bezpieczeństwie toksykologicznym z prognozowaniem wysypu owocników na podstawie pogody.

- **Tryb działania (offline-first + wybiórcze online):**
  - **Offline:** Cała baza gatunków (`146` gatunków w `src/data/species/` skompilowana do `assets/db/myco.db`), silnik klucza oznaczania (`Quiz`), Bramka Bezpieczeństwa, wyszukiwanie/filtrowanie w Atlasie, zapisane stany filtrów/prognoz w `AsyncStorage` oraz ostatnio pobrane zrzuty pogody działają w pełni bez sieci.
  - **Online:** Pobieranie historii i bieżących danych pogodowych (Open-Meteo Forecast API), wyszukiwanie miejscowości po nazwie (Open-Meteo Geocoding API, `countryCode=PL`) oraz kafelki/skrypt mapy w `WebView` (OpenStreetMap + Leaflet CDN z SRI).
- **Główne moduły biznesowe:**
  1. **Predyktor wysypu (`src/features/predictor/`):** Oblicza heurystyczny indeks wysypu (`0–100`), poziom (`FlushLevel`), pewność (`PredictionConfidence`), czynniki składowe (`PredictionFactor[]`) oraz ranking gatunków pasujących do okna opadów/temperatury/sezonu dla lokalizacji GPS urządzenia, miejsca tymczasowego (`custom`) i maks. `20` zapisanych miejsc (`SavedPlace`).
  2. **Atlas (`src/features/atlas/`):** Przeglądarka gatunków z wyszukiwaniem pełnotekstowym (`species_fts` FTS5), fasetami (jadalność, ochrona, ekologia, morfologia), filtrem sezonu (`months_mask`, „owocnikuje teraz”), filtrem korzystnej pogody (`favorableWeather`) oraz zapisywalnymi zestawami filtrów (`AtlasPreset`, maks. `12`).
  3. **Klucz / Quiz oznaczania (`src/features/quiz/`, `src/features/filter/`):** Wieloetapowy klucz diagnostyczny z **asymetrią dowodową** i **Bramką Bezpieczeństwa (`safetyGate.ts`)**. Odróżnia obserwacje pewne (`certain`, po wykonaniu procedury z `FEATURE_PROCEDURES`) od obserwacji „na oko” (`uncertain`) oraz oddziela twardą eliminację Bramki (`evaluateFilter`) od tolerancyjnego rankingu podobieństwa % (`rankBySimilarity`).
  4. **Karta gatunku (`src/features/species/`):** Szczegóły gatunku (status jadalności, ostrzeżenia toksykologiczne i warunkowe, ochrona prawna, pasek sezonu, ekologia, niebezpieczne sobowtóry z cechami różnicującymi, grupy cech morfologicznych).
  5. **Wybór lokalizacji (`src/features/location/`):** Wyszukiwanie nazwy (Geocoding), wybór punktu na mapie Leaflet (`WebView`) oraz ręczne współrzędne WGS84 z detekcją zamiany `lon, lat` dla Polski.

---

## 2. Stos technologiczny i środowisko

Źródło: `package.json`, `app.json`, `tsconfig.json`, `metro.config.js`.

- **Runtime i framework:** Expo `^58.0.0`, React `19.3.0`, React Native `0.88.1` (New Architecture / React Compiler compatible, portret `orientation: "portrait"`, `userInterfaceStyle: "light"`, URL scheme `myco`).
- **Język i kompilacja:** TypeScript `~6.0.3` w trybie ścisłym (`"strict": true`, `"noUncheckedIndexedAccess": true`, `"noFallthroughCasesInSwitch": true`).
- **Nawigacja:** `expo-router` `~58.0.32` (file-based routing w katalogu **`app/`**, nie `src/app/`).
- **Baza danych:**
  - Build-time: `better-sqlite3` `^13.2.0` + `tsx` `^4.23.15` generują plik `assets/db/myco.db`.
  - Runtime: `expo-sqlite` `~58.0.18` (tryb `PRAGMA query_only = ON`, `mmap_size = 30000000`), `expo-asset` `~58.0.21`, `expo-file-system` `~58.0.14`. `metro.config.js` dopisuje rozszerzenie `'db'` do `config.resolver.assetExts`.
- **Zarządzanie stanem i persystencja:**
  - Lokalny `useReducer` w `QuizScreen` (`quizReducer`) i `AtlasScreen` (`atlasReducer` + `AsyncStorage` w `useAtlasState`).
  - Zewnętrzny store (`createForecastStore`) oparty o `useSyncExternalStore` + `AsyncStorage` (`@react-native-async-storage/async-storage` `2.2.0`) w `src/features/predictor/store/`.
- **UI, listy, animacje, natywne moduły:**
  - `@shopify/flash-list` `2.3.2` (wirtualizowane listy Atlasu, szczegółów prognozy, wyników Quizu).
  - `react-native-reanimated` `4.7.1`, `react-native-gesture-handler` `~3.3.0` (`ReanimatedSwipeable`), `react-native-worklets` `0.13.0`.
  - `react-native-svg` `15.16.0` (łukowy wskaźnik `FlushGaugeSvg`), `react-native-webview` `14.0.1` (mapa OSM/Leaflet).
  - `@miblanchard/react-native-slider` `^2.6.0` (zakres miesięcy w Atlasie) i `@react-native-community/slider` `5.2.1` (suwak progu % w Quizie).
  - `expo-location` `~58.0.22`, `expo-haptics` `~58.0.8`, `expo-status-bar` `~58.0.5`, `@expo/vector-icons` `^15.0.2`, `react-native-safe-area-context` `~5.11.1`, `react-native-screens` `~4.30.1`.
- **Testy:** `jest` `~30.5.2`, `jest-expo` `~58.0.15`.
- **Skrypty (`package.json`):**
  - `npm start` (`expo start`), `npm run android` (`expo run:android`), `npm run ios`, `npm run web`
  - `npm run typecheck` (`tsc --noEmit`), `npm test` (`jest`)
  - `npm run build:db` (`tsx scripts/build-species-db.ts`), `npm run prebuild:android` (`npm run build:db`)
  - `node scripts/generate-species-index.mjs [--check]`

---

## 3. Mapa drzewa katalogów i odpowiedzialności plików

```text
myco-app/
├── app/                                # Definicje tras Expo Router (cienkie wrappery eksportujące ekrany z src/features/)
│   ├── _layout.tsx                     # Root Stack + bramka inicjalizacji SQLite (initDatabase())
│   ├── (tabs)/
│   │   ├── _layout.tsx                 # Nawigator dolnych zakładek: Wysyp, Atlas, Klucz
│   │   ├── index.tsx                   # Zakładka startowa „Wysyp” -> PredictorScreen
│   │   ├── database.tsx                # Zakładka „Atlas” -> AtlasScreen
│   │   └── filter.tsx                  # Zakładka „Klucz” -> QuizScreen
│   ├── forecast/[key].tsx              # Szczegóły prognozy (key = 'device' | 'custom' | SavedPlaceId) -> ForecastDetailsScreen
│   └── species/[id].tsx                # Karta gatunku (id = MushroomId) -> SpeciesDetailsScreen
├── assets/
│   ├── db/myco.db                      # Skompilowana, niemutowalna baza SQLite + FTS5 bundlowana z aplikacją
│   └── *.png                           # Ikony aplikacji i splash screen
├── scripts/
│   ├── generate-species-index.mjs      # Generator src/data/species/index.ts na podstawie plików w src/data/species/
│   └── build-species-db.ts             # Kompilator src/data -> assets/db/myco.db (walidacja, maski bitowe, FTS5, VACUUM)
└── src/
    ├── appInfo.ts                      # Stałe APP_NAME, APP_VERSION, APP_USER_AGENT (wymagane przez kafelki OSM)
    ├── __typetests__/
    │   └── gate.typetest.ts            # Testy typów TS (sprawdzane przez tsc --noEmit) dla Bramki Bezpieczeństwa
    ├── api/                            # Warstwa sieciowa i lokalizacji (nigdy nie rzuca wyjątków I/O, zwraca unie wynikowe)
    │   ├── http.ts                     # fetchJson z AbortController/timeoutem, buildQuery i klasyfikacją NetworkErrorKind
    │   ├── openMeteo.ts                # Budowa URL /v1/forecast (past_days, forecast_days=1), walidacja DTO i agregacja godzinowa
    │   ├── weatherService.ts           # fetchWeatherSnapshot (zaokrągla coords do 2 miejsc ~1.1 km) i isSnapshotStale
    │   ├── geocodingService.ts         # searchPlaces (Open-Meteo Geocoding API, countryCode=PL, min. 2 znaki)
    │   └── locationService.ts          # resolveLocation (uprawnienia -> GPS Balanced z timeoutem 20s -> lastKnown) i manualLocation
    ├── components/                     # Współdzielone komponenty UI i presety animacji
    │   ├── Button.tsx, EdibilityBadge.tsx, motion.ts
    │   ├── icons/Icon.tsx              # Abstrakcja ikon (@expo/vector-icons)
    │   └── ui/                         # Prymitywy: AnimatedBar, FieldError, PressableScale, SegmentedControl, StatusBanner, SurfaceCard
    ├── data/                           # Statyczna baza wiedzy w TS (źródło prawdy dla build:db i testów)
    │   ├── index.ts                    # Składa MUSHROOM_DB (schemaVersion, dataVersion='2026.11.4', species) + getMushroomById
    │   ├── __tests__/database.test.ts  # Test uruchamiający validateDatabase(MUSHROOM_DB) === []
    │   └── species/                    # 146 plików gatunków (<kebab-id>.ts) + generowany index.ts (ALL_SPECIES)
    ├── db/                             # Warstwa runtime SQLite (expo-sqlite)
    │   ├── schema.ts                   # DB_NAME, DB_SCHEMA_VERSION, DB_DATA_VERSION, MORPHOLOGY_COLUMNS, SQL DDL, normalizacja FTS
    │   ├── client.ts                   # initDatabase() (kopiuje assets/db/myco.db przy niezgodności version_tag) i getDb()
    │   ├── types.ts                    # Lekkie projekcje: AtlasSpeciesRow, PredictorSpeciesRow, SpeciesBasicInfo, AtlasFacetsResult
    │   └── repositories/speciesRepository.ts # Jednorazowe/synchroniczne zapytania SQL dla Atlasu, Quizu, Predyktora i Karty gatunku
    ├── domain/                         # Czyste kontrakty domenowe, typy brandowane i słowniki (zero zależności od RN/Expo)
    │   ├── index.ts                    # Publiczny barrel (pliki wewnątrz domain/ importują się bezpośrednio, bez barrela)
    │   ├── common.ts                   # Brand<T,B>, NonEmptyArray<T>, IsoDate, IsoDateTime, Month, NumericRange
    │   ├── mushroom.ts                 # MushroomId, Edibility (unia dyskryminowana), Ecology, FruitingProfile, DangerousLookalike, Mushroom
    │   ├── features.ts                 # FeatureKey (26 cech), FEATURE_VOCABULARIES, FEATURE_PROCEDURES, SUBJECTIVE_FEATURES, GateFeatureKey
    │   ├── filter.ts                   # FilterSelections, FilterResult ('clear'|'verification_required'|'dangerous_match'|'no_match'), CriticalCheck
    │   ├── predictor.ts                # GeoCoordinates, LocationState, DailyWeather, WeatherSnapshot, WeatherState, FlushPrediction
    │   ├── places.ts                   # SavedPlaceId, SavedPlace, MAX_SAVED_PLACES=20, MAX_PLACE_NAME_LENGTH=40
    │   ├── validateDatabase.ts         # Walidator spójności bazy (poza barrelem domain/index.ts, by nie trafiał do bundle'a)
    │   └── vocabulary/                 # Słowniki wartości: morphology.ts, critical.ts, edibility.ts, ecology.ts, procedures.ts
    ├── features/                       # Moduły funkcjonalne (ekrany + dedykowane komponenty + lokalne silniki)
    │   ├── atlas/                      # AtlasScreen, useAtlasState, swatches, copy.pl, ui/* (FilterPanel, PresetBar, SeasonFilter, itp.), engine/*
    │   ├── filter/                     # selections.ts + engine/: featureBits, filterIndex, matching, safetyGate, nextFeature, evaluateFilter
    │   ├── location/                   # LocationPicker, usePlaceSearch, coordinates, components/*, map/{MapPicker, mapPage}.ts
    │   ├── predictor/                  # PredictorScreen, ForecastDetailsScreen, predictFlush, weatherMetrics, weatherFilter, predictionCache, store/*, components/*
    │   ├── quiz/                       # QuizScreen, copy.pl, engine/{quizEngine, quizState, similarity, nearValues}, ui/* (QuestionView, ResultsView, GateBanner, resultRows, itp.)
    │   └── species/                    # SpeciesDetailsScreen + components/{FeatureGroupsCard, LookalikesCard, SeasonStrip}
    ├── hooks/
    │   └── useDarkStatusBar.ts         # Przełącza styl paska stanu na 'dark' w Atlasie i Kluczu
    ├── i18n/
    │   ├── pl.ts                       # Etykiety PL wymuszane przez Record<Union, string>
    │   └── featureValues.pl.ts         # Etykiety PL dla wszystkich wartości z FEATURE_VOCABULARIES
    └── theme/                          # System projektowy: colors.ts (COLORS, FILLS, FLUSH_LEVEL_COLORS), tokens.ts, typography.ts
```

---

## 4. Architektura i przepływ danych (Data Flow)

### 4.1. Dane gatunków: build-time → runtime SQLite

1. **Źródło prawdy (`src/data/species/*.ts`):** Każdy gatunek to osobny plik eksportujący dokładnie jeden obiekt `Mushroom`. Skrypt `scripts/generate-species-index.mjs` generuje listę `ALL_SPECIES` w `src/data/species/index.ts`, a `src/data/index.ts` buduje `MUSHROOM_DB` z `dataVersion`.
2. **Kompilacja bazy (`scripts/build-species-db.ts`, uruchamiane przez `npm run build:db`):**
   - Sprawdza zgodność `MUSHROOM_DB.dataVersion === DB_DATA_VERSION` (`src/db/schema.ts`).
   - Uruchamia `validateDatabase(MUSHROOM_DB)` (błędy `duplicate_id` lub flaga `--strict` przerywają build).
   - Sortuje gatunki wg `Intl.Collator('pl', { sensitivity: 'base' })`, nadając kolumnę `sort_key`.
   - Koduje cechy morfologiczne (`MORPHOLOGY_COLUMNS`, 26 kolumn `m_*`), miesiące (`months_mask`), siedliska (`habitats_mask`), grupy podłoży (`substrates_mask`) i drzewa (`trees_mask`) jako 32-bitowe maski bitowe (`1 << index`).
   - Serializuje `dangerousLookalikes` do `lookalikes_json` oraz cały rekord `Mushroom` do `details_json`.
   - Buduje tabelę wirtualną FTS5 `species_fts` z znormalizowanym tekstem (`normalizeSearchText`: usunięcie polskich znaków diakrytycznych i `ł -> l`) dla nazw polskich, łacińskich, synonimów i nazw ludowych.
   - Zapisuje `version_tag` (`${DB_SCHEMA_VERSION}:${DB_DATA_VERSION}`), `schema_version`, `data_version`, `species_count` w tabeli `db_meta` i zapisuje `assets/db/myco.db`.
3. **Inicjalizacja runtime (`src/db/client.ts`):**
   - `app/_layout.tsx` blokuje render nawigacji do zakończenia `initDatabase()`.
   - `bootstrapDatabase()` porównuje `db_meta.version_tag` w lokalnym pliku `Paths.document/SQLite/myco.db` z `DB_VERSION_TAG`. Przy braku pliku lub niezgodności usuwa stary plik wraz z sidecarami (`-wal`, `-shm`) i kopiuje zbundlowany zasób `assets/db/myco.db` przez `expo-asset` + `expo-file-system`.
   - Otwiera bazę z `PRAGMA query_only = ON; PRAGMA mmap_size = 30000000;`. Wszystkie późniejsze odczyty w `speciesRepository.ts` są synchroniczne (`getAllSync`, `getFirstSync`).

### 4.2. Główne schematy i encje danych

- **Tabele SQLite (`src/db/schema.ts`):**
  - `db_meta (key TEXT PK, value TEXT)`
  - `species (id TEXT PK, polish_name, sort_key, scientific_name, vernacular_short, edibility_category, edibility_rank, dangerous, deadly, legally_protected, months_mask, months_label, habitats_mask, substrates_mask, trees_mask, only_mycorrhizal, m_hymenophore ... m_taste [26 kolumn INT], opt_temp_min, opt_temp_max, min_precip_mm, lag_min, lag_max, frost_sensitive, lookalikes_json, details_json)` + indeksy `idx_species_sort`, `idx_species_edibility`.
  - `species_fts USING fts5(id UNINDEXED, search_text, tokenize = 'unicode61')`.
- **Kluczowe typy domenowe:**
  - `Mushroom` (`src/domain/mushroom.ts`): `id: MushroomId`, `features: SpeciesFeatureProfile` (wymagane niepuste tablice dla wszystkich 26 `FeatureKey`), `edibility: Edibility` (unia dyskryminowana), `ecology: Ecology`, `fruiting: FruitingProfile`, `dangerousLookalikes: readonly DangerousLookalike[]`.
  - `FilterSelections` (`src/domain/filter.ts`): mapa obserwacji cech (`{ value, certainty: 'certain' | 'uncertain' }`) + opcjonalne `trees`, `substrate`, `habitat` (bez `certainty`).
  - `WeatherSnapshot` (`src/domain/predictor.ts`): zaokrąglone `coords`, `timezone`, niepusta tablica pełnych dni `DailyWeather[]` (rosnąco po dacie; dzień bieżący jest odcinany w `openMeteo.ts`), `fetchedAt`.
  - `FlushPrediction` (`src/domain/predictor.ts`): `index` (`0–100`), `level` (`FlushLevel`), `confidence`, `factors: PredictionFactor[]`, `candidates: SpeciesCandidate[]`, `modelVersion`.

### 4.3. Silniki obliczeniowe i przepływ w modułach

- **Atlas (`src/features/atlas/` + `src/db/repositories/speciesRepository.ts`):**
  - `AtlasScreen` utrzymuje stan filtrów/sortowania/presetów w `useAtlasState` (persystencja z debouncem `400 ms` pod kluczem `myco.atlas` w `AsyncStorage`, walidacja dekodowania przez `atlasStorage.ts`).
  - Zapytanie listy delegowane jest do SQLite: `queryAtlasSpecies(queryParams, sort)` łączy `species_fts MATCH` (przez `buildFtsMatchQuery`), maskę miesięcy, filtr `favorableIds` (z `useWeatherFilter`) oraz operacje bitowe `&` na kolumnach faset.
  - Gdy modal filtrów jest otwarty (`filtersOpen === true`), `computeAtlasFacets(queryParams)` w jednym przebiegu po wierszach SQLite liczy liczebności opcji z semantyką „jak w sklepie” (pozwala wybrać inne opcje w tej samej fasecie przy `failedCount === 1`).
  - *Uwaga:* `src/features/atlas/engine/atlasEngine.ts` zawiera równoległą implementację w pamięci (`buildAtlasIndex`, `queryAtlas`), utrzymywaną dla testów jednostkowych; runtime UI używa repozytorium SQLite.
- **Klucz / Quiz i Bramka Bezpieczeństwa (`src/features/filter/engine/` + `src/features/quiz/engine/`):**
  - `QuizScreen` jednorazowo w `useMemo` ładuje z SQLite `loadQuizIndexBundle()` → `{ filterIndex, speciesById }`.
  - **Asymetria dowodowa (`matching.ts`):** Niegroźny gatunek jest eliminowany przez każdą sprzeczną obserwację (cechę i środowisko). Gatunek niebezpieczny (`poisonous | deadly | unknown`) może zostać wykluczony **wyłącznie** przez obserwację spełniającą `excludesDangerous === true` (tj. `certainty === 'certain'` AND `isGateFeatureKey(key)`). Z `GateFeatureKey` (`src/domain/features.ts`) wykluczone są na poziomie typów TS `taste` (zakazane przy niebezpiecznych) oraz `SUBJECTIVE_FEATURES` (`capColor`, `capShape`, `capFleshColor`, `stipeColor`, `stipeFleshColor`, `smell`, `growthHabit`, `capPeelability`).
  - **Bramka (`evaluateFilter.ts`, `safetyGate.ts`):** Zwraca `FilterResult` o 4 statusach: `'no_match'`, `'clear'` (brak niebezpiecznych w puli + `suggestNextFeature`), `'dangerous_match'` (brak nierozstrzygniętych sprawdzeń, w puli pozostały niebezpieczne), `'verification_required'` (wylicza `CriticalCheck[]` z różnic masek bitowych między niegroźnymi i niebezpiecznymi w puli, sortując wg: rozłączność par > 0 → koszt procedury `procedureCost` → liczba rozstrzygniętych par → relacje `DangerousLookalike` w danych → liczba gatunków śmiertelnych).
  - **Ranking podobieństwa (`similarity.ts`, `nearValues.ts`):** Niezależna od Bramki warstwa prezentacji. `rankBySimilarity` twardo usuwa gatunki niezgodne z `excludesDangerous`, a pozostałe ocenia wagowo (`objective: 1`, `subjective: 0.5`, `environment: 0.5`, mnożnik `uncertainFactor: 0.6`, sąsiednie barwy z `COLOR_NEIGHBOURS` liczone jako `nearCredit: 0.5`). Dzieli wynik na `exact` (100%), `partial` (`>= threshold`), `dangerous` (`>= threshold`) oraz ukryte progiem (`hiddenHarmlessCount`, `hiddenDangerous`).
  - **Kolejność pytań (`quizEngine.ts`, `quizState.ts`):** Przebiega po etapach `STAGE_ORDER`: `place → look → touch → dig_base → cut → smell → spore_print`. Etapy inwazyjne (`touch`, `dig_base`, `cut`, `smell`, `spore_print`) można pominąć w całości (`skip_stage`); pominięcie `dig_base` ukrywa `cut` i `spore_print` (`STAGE_HIDES`). Wybór „brak trzonu” (`stipeColor === 'not_applicable'`) lub brak blaszek ukrywa powiązane pytania (`CONDITIONS`). Pytania wymagające późniejszej weryfikacji przechodzą mechanizmem `CARRY_OVER` / `REVIEW_IN`. Cofanie (`undo`) przywraca migawki `history` w `quizReducer`.
- **Predyktor wysypu i pogoda (`src/features/predictor/`, `src/api/`):**
  - `forecastStore` (`createForecastStore` w `store/forecastStore.ts`, singleton w `store/instance.ts`) zarządza kluczami `'device'`, `'custom'` oraz `SavedPlaceId` i zapisuje stan pod kluczem `myco.forecast` w `AsyncStorage` (walidacja przy odczycie w `persistence.ts`).
  - `getPastDays()` w `store/instance.ts` pobiera `MAX(lag_max)` z SQLite (`getMaxFruitingLagDays()`), wyliczając liczbę dni historii (ograniczoną przez `OPEN_METEO_MAX_PAST_DAYS = 92`).
  - `fetchWeatherSnapshot` zaokrągla współrzędne do 2 miejsc po przecinku (`~1.1 km`, klucz komórki pogody `sameWeatherCell`), pobiera `daily` + `hourly` z Open-Meteo Forecast API (`timezone=auto`, `forecast_days=1`) i w `openMeteo.ts` agreguje dane godzinowe (temperatura średnia i ważona grubością warstw wilgotność gleby `0–1`, `1–3`, `3–9 cm` przy min. 75% pokryciu godzin) wyłącznie dla dni sprzed lokalnego `todayLocal`.
  - `predictFlush` (`FLUSH_MODEL_VERSION = 'heuristic-1'`):
    - Indeks globalny `0–100`: średnia ważona wkładów w `[-1, 1]` dla `precipitation` (0.40, okno 10 dni, neutral 20 mm), `temperature` (0.25, okno 7 dni, opt 10–20 °C), `season` (0.20, udział gatunków owocnikujących w `targetMonth` względem `totalSpeciesCount`) i `soil_moisture` (0.15, okno 3 dni, neutral 0.25), skalowana przez karę przymrozkową `frost` (okno 5 dni, `tempMinC < 0`).
    - Ocena gatunków (`rankCandidates`): filtruje po miesiącu, łączy opady z okna `[lagMin, lagMax]` dni wstecz (`daysInAgeWindow`, waga 0.6) i temperaturę z 7 dni (waga 0.4), z mnożnikiem `0.2` przy przymrozku w ostatnich 3 dniach dla `frostSensitive`.
  - Wyniki na listach są memoizowane per obiekt `WeatherSnapshot` w `WeakMap` (`predictionCache.ts`) oraz używane przez `useWeatherFilter` (`FAVORABLE_WEATHER_MIN_SCORE = 50`) do filtrowania w Atlasie i wynikach Quizu.

---

## 5. Nawigacja i główne ekrany (UI Flow)

Routing opiera się na Expo Router w katalogu **`app/`**:

- `app/_layout.tsx` (`RootLayout`): Inicjalizuje bazę SQLite (`initDatabase()`), po czym renderuje `GestureHandlerRootView` + główny `Stack` z trzema trasami:
  1. **`(tabs)` (`app/(tabs)/_layout.tsx`, `headerShown: false`):**
     - `index` (`/`): Tytuł zakładki „Wysyp”, nagłówek „Prognoza wysypu” → `PredictorScreen` (`src/features/predictor/PredictorScreen.tsx`). Składa `DeviceSection`, `CustomPlaceSection` (z `LocationPicker`: wyszukiwarka nazw / `MapPicker` WebView / współrzędne), `SavedPlacesSection` (gest usuwania `ReanimatedSwipeable`). Korzysta z `useAutoRefresh()` (odświeża przeterminowane wpisy > 1 h co 10 min przy focusie i powrocie `AppState`).
     - `database` (`/database`): Tytuł zakładki „Atlas”, własny nagłówek → `AtlasScreen` (`src/features/atlas/AtlasScreen.tsx`). Lista `FlashList` (`AtlasSpeciesRow`), wyszukiwarka i sortowanie (`AtlasHeader`), pigułki aktywnych filtrów (`ActivePills`), pełnoekranowy `Modal` z `FilterPanel` (`FilterGroup`, `FilterChip`, `SeasonFilter`, `PresetBar`, wybór lokalizacji pogodowej). Linkuje do `/filter` oraz `/species/[id]`.
     - `filter` (`/filter`): Tytuł zakładki „Klucz”, własny nagłówek → `QuizScreen` (`src/features/quiz/QuizScreen.tsx`). Przepływ faz: `'intro'` (`SafetyIntro`) → `'questions'` (`QuizHeader` + `QuestionView`: `EnvironmentQuestion` / `FeatureQuestion` z `CertaintyStep`, `BottomPanel`, `StageSkipPanel`) → `'results'` (`ResultsView`: `GateBanner`, `ThresholdControl`, `SpeciesResultRow`, sekcje pominiętych etapów/pytań z `resultRows.ts`, opcjonalny filtr korzystnej pogody). Obsługuje sprzętowy przycisk Wstecz na Androidzie (`BackHandler`).
  2. **`forecast/[key]` (`app/forecast/[key].tsx`):** Szczegóły prognozy → `ForecastDetailsScreen` (`src/features/predictor/ForecastDetailsScreen.tsx`). Parametr `key` przyjmuje `'device'`, `'custom'` lub `SavedPlaceId`. Wyświetla `FlushIndexCard` (`FlushGaugeSvg`), przełącznik zakładek `SegmentedControl`: `Czynniki` (`FactorList`), `Gatunki` (`CandidateRow` → `/species/[id]`), `Pogoda` (`WeatherDataTable`), plus przycisk usuwania zapisanego miejsca.
  3. **`species/[id]` (`app/species/[id].tsx`):** Karta gatunku → `SpeciesDetailsScreen` (`src/features/species/SpeciesDetailsScreen.tsx`). Pobiera pełny rekord przez `getSpeciesDetailsById(speciesId)`. Wyświetla kartę nagłówkową (`EdibilityBadge`, odznaka ochrony), ostrzeżenia `EdibilityNotice`, `SegmentedControl` (`Przegląd` / `Cechy morfologiczne`): `SeasonStrip`, `EcologyCard`, `LookalikesCard` (linkuje do kolejnych `/species/[id]`), `FeatureGroupsCard`.

---

## 6. Konwencje, reguły i pułapki (Gotchas)

1. **Rozbieżność `AGENTS.md` vs stan faktyczny routingu:** `AGENTS.md` wspomina `src/app/`, ale w tym repozytorium trasy Expo Router znajdują się w katalogu głównym **`app/`**. Pliki w `app/` są cienkimi re-eksportami ekranów żyjących w `src/features/`.
2. **Pipeline aktualizacji bazy gatunków (Build-time Sync):**
   - Każdy nowy gatunek dodany do `src/data/species/<id>.ts` wymaga uruchomienia `node scripts/generate-species-index.mjs` (aktualizuje `src/data/species/index.ts`).
   - Każda zmiana danych gatunków lub schematu wymaga podbicia `dataVersion` w `src/data/index.ts` i `DB_DATA_VERSION` w `src/db/schema.ts` na identyczną wartość (w przeciwnym razie `build:db` rzuci błąd, a aplikacja nie nadpisze starej bazy na urządzeniu z powodu dopasowania `version_tag`), a następnie wygenerowania `assets/db/myco.db` przez `npm run build:db`.
   - Przed buildem uruchamiany jest `validateDatabase`: m.in. pilnuje spójności `id` z `scientificName`/`scientificSynonyms`, wymaga `'none'` przy `ring`, `'smooth'` przy `warts`, `not_applicable` dla cech trzonu przy `stipeShape: ['absent']`, kierunkowości `dangerousLookalikes` (tylko od niegroźnego do niebezpiecznego) oraz istnienia wartości różnicującej (`E \ D != ∅`) dla każdego `distinguishingFeatures`.
3. **Ograniczenie 32-bitowych masek bitowych:** `scripts/build-species-db.ts`, `src/db/repositories/speciesRepository.ts` i `src/features/filter/engine/featureBits.ts` używają JS-owych przesunięć `1 << index` i `Math.clz32(bit)`. Żaden ze słowników (`FEATURE_VOCABULARIES[k]`, `HABITATS`, `TREE_GENERA`, `SUBSTRATE_GROUPS`, `EDIBILITY_CATEGORIES`) nie może przekroczyć **31 elementów** (lub 32 z uwzględnieniem znaku), w przeciwnym razie dojdzie do przepełnienia bitu znaku / błędnego dopasowania masek.
4. **Bezpieczeństwo typów Bramki (Compile-time Safety):**
   - `Taste` i `SUBJECTIVE_FEATURES` są wykluczone z `GateFeatureKey` (`src/domain/features.ts`), a `QuizKey` wyklucza `'taste'`. Nigdy nie obchodź tych unii rzutowaniami `as`. Zmiany w `GateFeatureKey` muszą przechodzić `npm run typecheck` (weryfikowane przez `src/__typetests__/gate.typetest.ts`).
   - Wykluczanie gatunków niebezpiecznych w `matching.ts` i `similarity.ts` opiera się wyłącznie na `excludesDangerous` (`certain && isGateFeatureKey(key)`).
5. **Izolacja cyklów w `src/domain/` i `validateDatabase`:**
   - Pliki wewnątrz `src/domain/` importują się bezpośrednio (nie przez `src/domain/index.ts`), aby uniknąć cykli w bundlerze Metro.
   - `src/domain/validateDatabase.ts` nie jest eksportowany z `src/domain/index.ts`, żeby nie trafiał do paczki produkcyjnej.
6. **Specyfika zapytań zewnętrznych i `WebView`:**
   - `MapPicker` ładuje kafelki OpenStreetMap i wymaga niestandardowego `APP_USER_AGENT` (`src/appInfo.ts`); domyślny User-Agent `WebView` jest blokowany przez serwery OSM. Skrypt Leaflet ma przypięte hashe SRI w `src/features/location/map/mapPage.ts`.
   - `openMeteo.ts` używa `/v1/forecast?past_days=...&forecast_days=1` zamiast Archive API (ERA5 ma opóźnienie kilku dni) i celowo nie używa zmiennej dobowej `temperature_2m_mean` (agreguje `temperature_2m` z danych godzinowych).
7. **Known Gotcha w `AtlasScreen.tsx` (`queryParams`):**
   - W `src/features/atlas/AtlasScreen.tsx` (linie 37–48) hook `useMemo` dla `queryParams` używa `state.filters.favorableWeather`, `weather.available` oraz `weather.favorableIds`, ale tablica zależności `useMemo` pomija te trzy pola — przy modyfikacji filtrowania pogodowego w Atlasie należy zaktualizować zależności `useMemo`.
8. **Presety animacji Reanimated (`src/components/motion.ts`) i i18n (`src/i18n/`):**
   - Builderów animacji eksportowanych jako stałe (`APPEAR`, `RISE`, itp.) nie wolno mutować przez `.delay()` bezpośrednio — należy tworzyć nowe instancje jak w `staggeredList` / `staggeredRise`.
   - Mapy etykiet w `src/i18n/pl.ts` i `src/i18n/featureValues.pl.ts` używają `Record<TypUnii, string>` — dodanie wartości do słownika w `src/domain/vocabulary/` wymusi jej przetłumaczenie błędem kompilacji `tsc --noEmit`.
9. **Testy i weryfikacja:** Po zmianach w logice, typach lub danych należy uruchomić `npm run typecheck` oraz `npm test` (obejmujące m.in. `realDatabase.test.ts`, `realDatabase.quiz.test.ts` i `database.test.ts` testujące całą 146-gatunkową bazę).
