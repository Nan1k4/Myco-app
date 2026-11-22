# TOFIX — Raport z audytu kodu `myco-app`

## Podsumowanie
- Krytyczne: 2 | Wysokie: 6 | Średnie: 11 | Niskie: 2

---

## 1. Klucz i Bramka Bezpieczeństwa

### [KRYTYCZNY] Gatunki trujące poniżej progu 50% są trwale ukryte bez możliwości odsłonięcia ani identyfikacji w banerze
- **Lokalizacja:** `src/features/quiz/ui/GateBanner.tsx` (linie `39–40`, `58–70`, `84–87`, funkcje `GateBanner`, `thresholdToReveal`) oraz `src/features/quiz/engine/similarity.ts` (linie `43`, `106`, `rankBySimilarity`)
- **Co błąd powoduje:** Minimalny próg dopasowania (`THRESHOLD.min`) wynosi `0.5` (50%). Każdy niewykluczony przez Bramkę gatunek niebezpieczny o wyniku `< 50%` trafia do `hiddenDangerous`. Funkcja `thresholdToReveal` przycina wartość docelową do `THRESHOLD.min` (`0.5`), więc gdy próg wynosi już 50%, `GateBanner` nadal wyświetla przycisk „Pokaż ukryte — obniż próg do 50%”, którego kliknięcie nie przynosi żadnego efektu. Gatunek trujący pozostaje trwale niewidoczny na liście i nie jest nazwany w banerze (wbrew założeniom z `similarity.ts`), co stwarza bezpośrednie ryzyko toksykologiczne.
- **Kierunek naprawy (wskazówka dla LLM):** Rozdzielić ukrywanie progiem dla gatunków niegroźnych od prezentacji niewykluczonych gatunków trujących: gdy `lowest < THRESHOLD.min`, nie polegać na suwaku progu, lecz albo wyświetlać listę nazw z `hiddenDangerous` bezpośrednio w `GateBanner` (z nawigacją do karty gatunku), albo dodać stan/akcję „Pokaż wszystkie niewykluczone trujące”, która przenosi `hiddenDangerous` na widoczną listę niezależnie od `THRESHOLD.min`.

### [WYSOKI] Ignorowanie `VALUE_PROCEDURE_OVERRIDES` w `canConfirmIn` i `REVIEW_IN`
- **Lokalizacja:** `src/features/quiz/engine/quizEngine.ts` (linie `71–79`, `184–186`, stała `REVIEW_IN`, funkcja `canConfirmIn`) oraz `src/features/quiz/ui/FeatureQuestion.tsx` (linie `51`, `61–72`)
- **Co błąd powoduje:** Zarówno `canConfirmIn`, jak i statyczna mapa `REVIEW_IN` sprawdzają wyłącznie domyślną procedurę `FEATURE_PROCEDURES[key]`, pomijając wyjątki dla konkretnych wartości z `VALUE_PROCEDURE_OVERRIDES` (np. `volva: 'absent'` wymaga `['dig_base', 'cut']`, `hymenophore: 'gleba'` wymaga `['cut']`, `stipeShape: 'absent'` wymaga `['cut']`). Powoduje to dwa błędy logiczne: (1) w bezinwazyjnym etapie `look` (dla `hymenophore: 'gleba'`) lub przed przekrojem w `dig_base` (dla `volva: 'absent'`) UI pokazuje `CertaintyStep` pytający o wykonanie przekroju; (2) odpowiedź `volva: 'absent'` oznaczona jako „Tylko na oko” w `dig_base` nigdy nie zostanie zaproponowana do potwierdzenia w etapie `cut`, mimo że rozstrzyga obecność pochwy u śmiertelnych muchomorów.
- **Kierunek naprawy (wskazówka dla LLM):** Uzależnić możliwość potwierdzenia (`canConfirmIn`) i wyznaczanie etapu ponownej weryfikacji (`reviewableIn`, `confirmStage`) od konkretnej wybranej wartości poprzez `requiredProcedures(key, value)` — porównywać `stageRank(stage)` z `Math.max(...requiredProcedures(key, value).map(stageRank))`.

### [ŚREDNI] Akcja `revisit` nie tworzy punktu kontrolnego historii (`withCheckpoint`) i przedwcześnie usuwa pytanie ze `skipped`
- **Lokalizacja:** `src/features/quiz/engine/quizState.ts` (linie `28–40`, `124–131`, `quizReducer`, akcja `'revisit'`)
- **Co błąd powoduje:** Powrót do pominiętego pytania (`revisit`) modyfikuje `skipped` (usuwając klucz) i ustawia `pinned`, ale nie dopisuje poprzedniego stanu do `history`. Jeśli użytkownik zrezygnuje i wróci do wyników (`show_results`), pytanie znika z listy pominiętych; jeśli użyje „Wstecz” (`undo`), cofnie wcześniejszą odpowiedź sprzed `revisit`. Ponadto `singleSkipStages` nie jest częścią `QuizProgress`, więc cofnięcie po `skip_single` nie przywraca propozycji pominięcia całego etapu.
- **Kierunek naprawy (wskazówka dla LLM):** Zapisać checkpoint przed `revisit` (albo usuwać klucz ze `skipped` dopiero w akcji `answer`, a nie już w `revisit`) oraz przenieść `singleSkipStages` do `QuizProgress`, aby `undo` przywracało go spójnie.

### [ŚREDNI] Sprzętowy przycisk Wstecz na Androidzie w fazie `'results'` cofa ostatnią odpowiedź zamiast wracać do pytań
- **Lokalizacja:** `src/features/quiz/QuizScreen.tsx` (linie `38–39`, `90–101`, komponent `QuizScreen`, `useHardwareBack`)
- **Co błąd powoduje:** `useHardwareBack` zawsze wywołuje `undo`, także gdy użytkownik jest w fazie `'results'` (po kliknięciu „Wyniki” w trakcie odpowiadania). Naciśnięcie systemowego przycisku Wstecz na Androidzie bez ostrzeżenia kasuje ostatnią udzieloną odpowiedź zamiast przywrócić bieżące pytanie (`resume`).
- **Kierunek naprawy (wskazówka dla LLM):** W handlerze `useHardwareBack` sprawdzić `phase === 'results' && question !== null` — w tym przypadku wysłać `dispatch({ type: 'resume' })`, a `undo` wywoływać wyłącznie w fazie `'questions'` (lub gdy nie ma już dalszych pytań).

### [ŚREDNI] Filtr korzystnej pogody w wynikach Quizu powoduje niespójność liczników w `summarizeVisibility`
- **Lokalizacja:** `src/features/quiz/ui/ResultsView.tsx` (linie `55–63`, `122`) oraz `src/features/quiz/ui/resultRows.ts` (linie `68–78`, `summarizeVisibility`)
- **Co błąd powoduje:** `effectiveRanking` filtruje tablice `exact` i `partial` według `weather.favorableIds`, ale pozostawia niezmienione `total`, `hiddenHarmlessCount` oraz `excludedIds`. Pasek podsumowania wyświetla sumę, która nie bilansuje się z `total`, nie wyjaśniając, ile gatunków ukrył filtr pogodowy.
- **Kierunek naprawy (wskazówka dla LLM):** Wyliczyć liczbę gatunków odfiltrowanych wyłącznie przez pogodę i przekazać ją jako opcjonalny parametr do `summarizeVisibility` (np. dopisać segment „poza pogodą: N”), aby bilans gatunków pozostał przejrzysty.

### [NISKI] Brak potwierdzenia resetu w stopce `ResultsView` oraz niezamykający się `SkippedPanel` po `revisit_stage`
- **Lokalizacja:** `src/features/quiz/ui/ResultsView.tsx` (linia `189`) oraz `src/features/quiz/ui/QuestionLayout.tsx` (linie `144–146`)
- **Co błąd powoduje:** (1) Przycisk „Zacznij od nowa” w `ResultsView` natychmiast resetuje cały quiz bez okna potwierdzenia `Alert.alert`, w przeciwieństwie do przycisku w `QuizHeader`. (2) W `QuestionLayout` wywołanie `onRevisitStage` z `SkippedPanel` nie wywołuje `close()`, więc gdy przywrócony etap jest późniejszy w `STAGE_ORDER` niż aktywne pytanie (`current.key` się nie zmienia i komponent nie przemontowuje), panel pominiętych pozostaje otwarty.
- **Kierunek naprawy (wskazówka dla LLM):** Przekazać `confirmReset` z `QuizScreen` do `ResultsView` zamiast bezpośredniego `dispatch({ type: 'reset' })`; w `QuestionLayout` zamknąć `overlay` (`close()`) przed/po wywołaniu `onRevisit` i `onRevisitStage`.

---

## 2. Baza SQLite i Pipeline Danych

### [KRYTYCZNY] 68 naruszeń integralności w `MUSHROOM_DB` (nieistniejące trujące sobowtóry i nieskuteczne cechy różnicujące) kompilowanych bez błędu do `myco.db`
- **Lokalizacja:** `src/data/__tests__/database.test.ts` (linia `6`), `scripts/build-species-db.ts` (linie `70–93`, `assertDatabaseValid`), `src/data/species/*.ts` oraz `src/features/species/components/LookalikesCard.tsx` (linie `34–57`)
- **Co błąd powoduje:** Test `database.test.ts` nie przechodzi z powodu 68 błędów walidacji w bazie danych, w tym:
  - `lookalike_unknown` (m.in. `lepiota-brunneoincarnata`, `chlorophyllum-brunneum`, `entoloma-sinuatum`, `inocybe-geophylla`, `hebeloma-crustuliniforme`, `cortinarius-violaceus`, `cortinarius-traganus`, `tricholoma-equestre`, `tricholoma-pardinum`, `sarcodon-scabrosus`) — brak tych trujących gatunków w bazie sprawia, że Bramka Bezpieczeństwa w ogóle ich nie uwzględnia, a kliknięcie takiego wpisu w `LookalikesCard` pokazuje surowe ID i przenosi na ekran błędu „Nie znaleziono gatunku w bazie”.
  - `lookalike_feature_indistinct` (kilkadziesiąt par z `amanita-phalloides`, `amanita-virosa`, `amanita-pantherina`, `rubroboletus-satanas`, `galerina-marginata`) — zadeklarowana cecha `distinguishingFeatures` nie rozróżnia gatunku jadalnego od sobowtóra.
  - `gill_attachment` (np. `hydnum-repandum`, `schizophyllum-commune`) — sprzeczność między typem hymenoforu a `gillAttachment`.
  - `scripts/build-species-db.ts` bez flagi `--strict` ignoruje wszystkie te błędy poza `duplicate_id` i generuje wadliwy plik `assets/db/myco.db`.
- **Kierunek naprawy (wskazówka dla LLM):** Doprowadzić `MUSHROOM_DB` do pełnej zgodności z `validateDatabase` (dodać brakujące gatunki sobowtórów lub poprawić relacje, skorygować `distinguishingFeatures` i `gillAttachment`), zaostrzyć `assertDatabaseValid` w `build-species-db.ts` dla reguł integralności, a w `LookalikesCard` zablokować kliknięcie i ukryć ikonę strzałki, gdy `target` jest `undefined`.

### [WYSOKI] Błędna etykieta sezonu (`months_label`) dla gatunków zimowych owocnikujących na przełomie roku
- **Lokalizacja:** `scripts/build-species-db.ts` (linie `48–53`, funkcja `buildMonthsLabel`)
- **Co błąd powoduje:** Funkcja sortuje miesiące rosnąco i formatuje przedział `[first, last]`. Dla gatunków zimowych w bazie — `flammulina-velutipes` (`[1, 2, 3, 10, 11, 12]`) i `pleurotus-ostreatus` (`[9, 10, 11, 12, 1, 2, 3, 4]`) — generuje etykietę `I–XII` (cały rok), mylnie sugerując owocnikowanie w lecie.
- **Kierunek naprawy (wskazówka dla LLM):** Wyznaczać przedziały na 12-miesięcznym cyklu: wykryć najdłuższą przerwę między miesiącami (lub rozbić na ciągłe bloki z uwzględnieniem zawinięcia `XII → I`), aby uzyskać etykiety typu `X–III` i `IX–IV`.

### [WYSOKI] Nieatomowe kopiowanie bazy SQLite (usunięcie działającej bazy przed pobraniem zasobu) i brak dekodowania URI ścieżki
- **Lokalizacja:** `src/db/client.ts` (linie `16–20`, `40–64`, funkcje `resolveDbFiles`, `copyBundledDatabase`)
- **Co błąd powoduje:** `copyBundledDatabase` usuwa istniejące `myco.db` wraz z sidecarami `-wal`/`-shm` jeszcze przed `await asset.downloadAsync()` i `copy(dbFile)`. Awaria pobrania lub brak miejsca na dysku pozostawia aplikację bez bazy lub z niekompletnym plikiem. Dodatkowo `sqliteDir` w `resolveDbFiles` usuwa prefiks `file://` bez `decodeURIComponent`, co psuje ścieżki zawierające znaki zakodowane procentowo.
- **Kierunek naprawy (wskazówka dla LLM):** Najpierw wykonać `asset.downloadAsync()` i skopiować zasób do pliku tymczasowego (np. `myco.db.tmp`), a dopiero po powodzeniu usunąć stare pliki i atomowo przemianować plik tymczasowy na `myco.db`. Zdekodować `sqliteDir` przez `decodeURIComponent`.

---

## 3. Atlas i Filtrowanie

### [WYSOKI] Brak zależności pogodowych w `useMemo` dla `queryParams` — filtr „Sprzyjająca pogoda” nie odświeża listy w Atlasie
- **Lokalizacja:** `src/features/atlas/AtlasScreen.tsx` (linie `37–48`, komponent `AtlasScreen`)
- **Co błąd powoduje:** `useMemo` tworzący `queryParams` używa `state.filters.favorableWeather`, `weather.available` i `weather.favorableIds`, ale pomija te trzy wartości w tablicy zależności. Przełączenie filtra „Sprzyjająca pogoda”, zmiana lokalizacji pogodowej lub aktualizacja danych pogodowych w tle nie powoduje ponownego zapytania SQLite ani przeliczenia faset, dopóki użytkownik nie zmieni innego filtra.
- **Kierunek naprawy (wskazówka dla LLM):** Dodać `state.filters.favorableWeather`, `weather.available` i `weather.favorableIds` do tablicy zależności `useMemo` dla `queryParams`.

### [ŚREDNI] `PresetBar` waliduje nazwę presetu, ale nigdy nie wyświetla komunikatu błędu (`FieldError`)
- **Lokalizacja:** `src/features/atlas/ui/PresetBar.tsx` (linie `8`, `28`, `33`, `82–101`, komponent `PresetBar`)
- **Co błąd powoduje:** `FieldError` jest zaimportowany, a stan `error` ustawiany przy błędach (`empty`, `too_long`, `duplicate`, `limit`), lecz komponent nigdy nie renderuje `<FieldError message={error} />`. Użytkownik widzi wyłącznie czerwoną ramkę pola tekstowego bez wyjaśnienia przyczyny odrzucenia zapisu.
- **Kierunek naprawy (wskazówka dla LLM):** Wyrenderować `<FieldError message={error} />` bezpośrednio pod `TextInput` w bloku `naming ? (...)`.

### [ŚREDNI] `FilterPanel` w pełnoekranowym `Modal` ignoruje Safe Area Insets i nie blokuje przewijania podczas obsługi suwaka miesięcy
- **Lokalizacja:** `src/features/atlas/AtlasScreen.tsx` (linia `154`) oraz `src/features/atlas/ui/FilterPanel.tsx` (linie `80–101`, `164–166`)
- **Co błąd powoduje:** (1) `FilterPanel` nie używa `useSafeAreaInsets()`, przez co w pełnoekranowym `Modal` nagłówek zachodzi na pasek stanu, a stopka na pasek gestów (Android edge-to-edge / iOS notch). (2) `AtlasScreen` przekazuje pusty callback `onSliderDragging={() => undefined}`, a `ScrollView` w `FilterPanel` nie ustawia `scrollEnabled={!sliderDragging}`, więc przeciąganie suwaka w `SeasonFilter` na Androidzie jest przerywane przez przewijanie listy.
- **Kierunek naprawy (wskazówka dla LLM):** Dodać `useSafeAreaInsets()` do `FilterPanel` (`paddingTop: insets.top` na nagłówku, `paddingBottom: SPACE.l + insets.bottom` na stopce) oraz lokalny stan `sliderDragging` sterujący `scrollEnabled={!sliderDragging}` na `ScrollView`.

### [ŚREDNI] Rozbieżność licznika aktywnych filtrów bez pogody oraz ryzyko utraty/nadpisania zapisu w `useAtlasState`
- **Lokalizacja:** `src/features/atlas/AtlasScreen.tsx` (linia `61`), `src/features/atlas/engine/atlasEngine.ts` (linie `98–101`, `activeFilterCount`), `src/features/atlas/useAtlasState.ts` (linie `16–35`)
- **Co błąd powoduje:** (1) `activeFilterCount` dolicza `favorableWeather`, nawet gdy `weather.available === false`, podczas gdy `ActivePills` i `FilterPanel` ukrywają ten filtr — przycisk w nagłówku pokazuje wówczas `Filtry · 1` bez żadnej widocznej pigułki. (2) W `useAtlasState` szybkie odmontowanie przed upływem `400 ms` anuluje `setTimeout` bez zapisu, a opóźnione zakończenie `hydrate` nadpisuje filtry zmienione przez użytkownika zaraz po starcie.
- **Kierunek naprawy (wskazówka dla LLM):** Uwzględnić `weather.available` przy liczeniu `activeCount` (np. opcjonalny parametr `weatherAvailable` w `activeFilterCount`). W `useAtlasState` dodać flagę chroniącą zmiany użytkownika przed nadpisaniem przez `hydrate` oraz zapewnić zapis oczekującego stanu przy odmontowaniu / przejściu aplikacji w tło.

---

## 4. Predyktor Wysypu, Pogoda i Lokalizacja

### [WYSOKI] Wyścig (race condition) między `hydrate()` a mutacjami `forecastStore` oraz blokowanie `refreshAll()` przez `refreshStale()`
- **Lokalizacja:** `src/features/predictor/store/forecastStore.ts` (linie `135–149`, `207–215`, `238–286`, funkcje `hydrate`, `refreshBatch`, `checkPlace`, `addPlace`, `removePlace`)
- **Co błąd powoduje:** (1) `checkPlace`, `clearCustomPlace`, `addPlace` i `removePlace` nie czekają na zakończenie `hydrate()` i natychmiast wywołują `persist()`. Jeśli zostaną wywołane przed odczytem `AsyncStorage`, zapiszą pustą tablicę `places: []` (utrata zapisanych miejsc), a późniejsze zakończenie `hydrate()` nadpisze stan w pamięci starymi danymi. (2) `refreshAll()` (ręczny pull-to-refresh) i `refreshStale()` (automatyczne odświeżanie) współdzielą jedną flagę `staleRunActive` w `refreshBatch` — ręczne odświeżenie uruchomione podczas trwającego `refreshStale` natychmiast zwraca bez odświeżenia GPS (`DEVICE_KEY`) ani miejsc.
- **Kierunek naprawy (wskazówka dla LLM):** Nie wywoływać `persist()` przed zakończeniem hydracji (albo kolejkować mutacje po `await hydrate()` / scalać w `hydrate` wyłącznie niemodyfikowane pola). Ograniczyć flagę `staleRunActive` tylko do `refreshStale`, a w `refreshAll` polegać na istniejącym zbiorze `inFlight` do deduplikacji pojedynczych kluczy.

### [WYSOKI] Bezterminowy cache `WeakMap` w `predictionCache.ts` zamraża `confidence` i `computedAt`
- **Lokalizacja:** `src/features/predictor/predictionCache.ts` (linie `10–24`, funkcja `cachedPrediction`)
- **Co błąd powoduje:** `predictFlush` wyznacza pewność prognozy (`confidence`: `'high'` ≤ 6 h, `'medium'` ≤ 24 h, `'low'` > 24 h) na podstawie wieku danych względem `now`. Ponieważ `cachedPrediction` memoizuje wynik bezterminowo po referencji obiektu `WeatherSnapshot`, po kilku lub kilkudziesięciu godzinach działania aplikacji (szczególnie offline) prognoza nadal raportuje nieaktualne `confidence: 'high'` oraz stary znacznik `computedAt`.
- **Kierunek naprawy (wskazówka dla LLM):** Przechowywać w cache strukturę `{ prediction, computedAtMs }` z ograniczeniem czasu życia (TTL, np. 15–30 min) albo przeliczać `confidence` względem bieżącego `Date.now()` przy każdym odczycie.

### [ŚREDNI] Brak `useSafeAreaInsets` w pełnoekranowym modalu `MapPicker`
- **Lokalizacja:** `src/features/location/map/MapPicker.tsx` (linie `77–160`, komponent `MapPickerContent`)
- **Co błąd powoduje:** `MapPicker` wewnątrz pełnoekranowego `<Modal>` nie stosuje `useSafeAreaInsets()`. Na Androidzie edge-to-edge i iOS z notchem nagłówek z przyciskiem zamknięcia nakłada się na pasek stanu, a dolny przycisk „Wybierz ten punkt” na pasek nawigacji systemowej.
- **Kierunek naprawy (wskazówka dla LLM):** Dodać `useSafeAreaInsets()` w `MapPickerContent` i uzupełnić `styles.header` o `paddingTop: insets.top + SPACE.xs`, a `styles.footer` o `paddingBottom: SPACE.l + insets.bottom`.

### [ŚREDNI] `CoordinatesPanel` bezwarunkowo blokuje współrzędne uznane za `looksSwapped`
- **Lokalizacja:** `src/features/location/components/CoordinatesPanel.tsx` (linie `30–35`, `58–64`, komponent `CoordinatesPanel`)
- **Co błąd powoduje:** Wbrew dokumentacji w `coordinates.ts` („nigdy do odrzucania punktu”), wykrycie `looksSwapped(parsed.coords)` przerywa `submit()` i udostępnia wyłącznie przycisk zamiany szerokości z długością. Użytkownik nie ma możliwości zatwierdzenia oryginalnych współrzędnych, jeśli świadomie sprawdza punkt spoza Polski o zamienionych zakresach liczbowych.
- **Kierunek naprawy (wskazówka dla LLM):** Obok akcji zamiany współrzędnych udostępnić drugą akcję („Użyj mimo to”) zatwierdzającą oryginalne `parsed.coords`.

### [ŚREDNI] Ryzyko nieobsłużonego odrzucenia (`unhandledRejection`) w `withTimeout` po przekroczeniu limitu czasu GPS
- **Lokalizacja:** `src/api/locationService.ts` (linie `98`, `147–157`, funkcje `requestCurrentFix`, `withTimeout`)
- **Co błąd powoduje:** Gdy `timeout` wygra `Promise.race`, działające w tle `Location.getCurrentPositionAsync` pozostaje bez podpiętego handlera błędów. Jeśli odrzuci się po upływie timeoutu (np. z powodu wyłączenia GPS lub odebrania uprawnień), w środowisku Hermes/React Native pojawi się nieobsłużony błąd `unhandledRejection`.
- **Kierunek naprawy (wskazówka dla LLM):** W `withTimeout` podpiąć do przekazanego `promise` bezpieczne `.catch(() => undefined)` (np. na osobnym łańcuchu przed `Promise.race`), aby późniejsze odrzucenie nie było nieobsłużone.

---

## 5. Nawigacja, Karta Gatunku i UI Globalny

### [ŚREDNI] Brak możliwości ponowienia inicjalizacji bazy SQLite w `RootLayout`
- **Lokalizacja:** `app/_layout.tsx` (linie `13–37`, komponent `RootLayout`)
- **Co błąd powoduje:** Mimo że `initDatabase()` w `src/db/client.ts` czyści `initPromise` przy błędzie, aby umożliwić ponowienie, `RootLayout` w stanie `error` renderuje wyłącznie statyczny komunikat bez przycisku „Spróbuj ponownie”. Chwilowy błąd I/O przy starcie trwale blokuje aplikację do czasu jej ręcznego zamknięcia.
- **Kierunek naprawy (wskazówka dla LLM):** Dodać stan `attempt` (lub wyodrębnioną funkcję `retry`) w `RootLayout` i wyrenderować przycisk ponowienia wywołujący `initDatabase()` po wyczyszczeniu `error`.

### [ŚREDNI] Brak banera ostrzegawczego w `EdibilityNotice` dla gatunków o kategorii `'unknown'`
- **Lokalizacja:** `src/features/species/SpeciesDetailsScreen.tsx` (linie `87–112`, funkcja `EdibilityNotice`)
- **Co błąd powoduje:** Kategoria `'unknown'` należy w domenie do `DANGEROUS_CATEGORIES` (`isDangerousCategory('unknown') === true`), jednak `EdibilityNotice` renderuje baner wyłącznie dla `'poisonous'`, `'deadly'` i `'conditionally_edible'`, zwracając `null` dla `'unknown'`. Karta gatunku o nieznanej jadalności nie wyświetla więc wyraźnego ostrzeżenia o zakazie spożycia.
- **Kierunek naprawy (wskazówka dla LLM):** Dodać w `EdibilityNotice` obsługę `edibility.category === 'unknown'` renderującą `StatusBanner` (`tone="warning"` lub `"danger"`) z komunikatem, aby nie zbierać ani nie spożywać gatunku o nieustalonej jadalności.

### [NISKI] Niezmemoizowany gest `Gesture.Pan()` w `BottomPanel` oraz martwy hook `useDarkStatusBar`
- **Lokalizacja:** `src/features/quiz/ui/BottomPanel.tsx` (linie `49–73`) oraz `src/hooks/useDarkStatusBar.ts` (linie `9–16`)
- **Co błąd powoduje:** (1) `Gesture.Pan()` jest tworzony na nowo przy każdym renderze `BottomPanel`, co przy rerenderze rodzica podczas przeciągania może przerwać gest zamykania arkusza. (2) `useDarkStatusBar` nie jest nigdzie importowany (martwy kod), a aplikacja nigdzie nie deklaruje `<StatusBar style="dark" />`, przez co czytelność ikon paska stanu na jasnym tle zależy od domyślnych ustawień urządzenia na Androidzie.
- **Kierunek naprawy (wskazówka dla LLM):** Owinąć konfigurację `Gesture.Pan()` w `useMemo` w `BottomPanel`. Usunąć nieużywany `useDarkStatusBar.ts` i ustawić jawnie `<StatusBar style="dark" />` w `app/_layout.tsx` (ponieważ cała aplikacja korzysta z jasnego motywu `COLORS.background`), albo podpiąć hook w docelowych ekranach.
