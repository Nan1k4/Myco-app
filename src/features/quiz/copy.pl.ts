/**
 * @file Teksty quizu: pytania, karty etapów (instrukcje czynności i bezpieczeństwa), opisy progu.
 * `Record<QuizKey, …>` - brak tekstu dla nowej cechy to błąd kompilacji; smaku nie ma w typie.
 */
import type { QuizKey, QuizStage } from './engine';

export interface QuestionCopy {
  readonly title: string;
  readonly hint: string;
  readonly hintIn?: { readonly [S in QuizStage]?: string };
  readonly hintNoStipe?: string;
  readonly details?: readonly string[];
}

const LATEX_CUT_HINT =
  'Patrz na krawędź cięcia blaszek od razu po przekrojeniu. Jeśli nic nie widać, naciśnij ostrzem blaszki przy brzegu połówki, której nie użyjesz do wysypu. Zapamiętaj kolor mleczka, bo może się zmienić po kilku minutach.';

export const QUESTION_COPY_PL: Readonly<Record<QuizKey, QuestionCopy>> = {
  /* -------------------------------- Miejsce -------------------------------- */
  habitat: {
    title: 'Gdzie rośnie grzyb?',
    hint: 'Oceń najbliższe otoczenie grzyba, nie cały teren. Trawa pod koronami drzew na skraju lasu to las. Trawnik z pojedynczymi drzewami w mieście to park.',
  },
  substrate: {
    title: 'Z czego wyrasta grzyb?',
    hint: 'Delikatnie odgarnij ściółkę przy podstawie, nie ruszając grzyba. Grzyb z zakopanego korzenia lub próchna wygląda, jakby rósł z ziemi. Jeśli obok jest pniak albo pod mchem wyczuwasz drewno, traktuj to jako drewno.',
  },
  trees: {
    title: 'Jakie drzewa rosną w promieniu ok. 20 m od grzyba?',
    hint: 'Zaznacz wszystkie, także młode i pojedyncze. Grzyb może być związany z drzewem stojącym kilkanaście metrów dalej.',
  },

  /* -------------------------------- Wygląd --------------------------------- */
  growthHabit: {
    title: 'Jak rosną grzyby w tym miejscu?',
    hint: 'Kępa to kilka owocników ze wspólnej podstawy, z trzonami zrośniętymi u dołu. Kilka osobnych grzybów obok siebie to grupa.',
  },
  capColor: {
    title: 'Jaki kolor ma kapelusz?',
    hint: 'Wybierz kolor dominujący na środku kapelusza. Kolor blednie w słońcu i ciemnieje po deszczu. Muchomor zielonawy bywa oliwkowy, żółtawy, a nawet prawie biały.',
  },
  capShape: {
    title: 'Jaki kształt ma kapelusz, gdy patrzysz z boku?',
    hint: 'Wybierz kształt, który widzisz teraz. Ten sam gatunek młody bywa jajowaty lub półkulisty, a stary płaski albo wklęsły.',
  },
  capSize: {
    title: 'Jaką średnicę ma kapelusz?',
    hint: 'Zmierz najszerszy wymiar, przykładając obok coś znanego. Typowy telefon ma ok. 7 cm szerokości. Młode owocniki są małe, także trujące.',
  },
  capMargin: {
    title: 'Jak wygląda brzeg kapelusza?',
    hint: 'Spójrz z boku na sam brzeg. Szukaj prążków biegnących od brzegu ku środkowi, brzegu podwiniętego pod spód albo zwisających strzępków błonki.',
  },
  hymenophore: {
    title: 'Co jest pod kapeluszem?',
    hint: 'Pochyl się i zajrzyj pod spód, nie zrywaj grzyba.',
    details: [
      'Blaszki są cienkie jak kartki.',
      'Rurki z dołu wyglądają jak gąbka z drobnymi otworkami.',
      'Kolce przypominają drobne sopelki.',
      'Listewki są niskie, tępe, rozwidlone i zbiegają na trzon.',
    ],
  },
  hymenophoreColor: {
    title: 'Jaki kolor ma spód kapelusza?',
    hint: 'Patrz na blaszki, rurki, kolce lub listewki, nie na kapelusz. Kolor zmienia się z wiekiem, np. u pieczarek blaszki są najpierw różowe, potem brązowe. Przy białych blaszkach koniecznie wykonaj później krok „Wykop”, bo takie blaszki mają zazwyczaj muchomory.',
  },
  stipeColor: {
    title: 'Jaki kolor ma trzon z zewnątrz?',
    hint: 'Wybierz kolor dominujący w środkowej części trzonu. Pomiń łuski, siateczkę i ziemię przy podstawie, bo opisujesz je osobno. Brak trzonu zaznacz tylko wtedy, gdy kapelusz przyrasta wprost do podłoża. Trzon krótki, boczny lub schowany w ściółce to nadal trzon.',
  },
  stipeShape: {
    title: 'Jaki kształt ma trzon?',
    hint: 'Porównaj grubość tuż pod kapeluszem i tuż nad ziemią. Trzon wyrastający z boku kapelusza to trzon boczny.',
  },
  stipeSurface: {
    title: 'Jak wygląda powierzchnia trzonu?',
    hint: 'Obejrzyj trzon na całej długości. Szukaj siateczki (wzór jak sieć), ciemnych łusek (jak u koźlarzy) albo zygzakowatego, wężowego wzoru.',
  },
  ring: {
    title: 'Czy na trzonie jest pierścień lub zasnówka?',
    hint: 'Pierścień to błoniasty kołnierzyk na trzonie, zwisający lub przylegający. Zasnówka to pajęczynowata osłonka między brzegiem kapelusza a trzonem; u starszych grzybów zostają po niej rdzawe włókienka. Pierścień łatwo się zrywa, więc jego brak niczego nie wyklucza.',
  },

  /* --------------------------------- Dotyk --------------------------------- */
  capSurface: {
    title: 'Jaka jest powierzchnia kapelusza?',
    hint: 'Przesuń palcem po środku kapelusza. Czy jest lepka lub śliska, sucha i gładka, zamszowa, z łuskami albo z białymi łatkami? Łatki zmywa deszcz, więc ich brak niczego nie wyklucza.',
  },
  capPeelability: {
    title: 'Czy skórkę kapelusza łatwo zdjąć?',
    hint: 'Chwyć skórkę przy brzegu i pociągnij ku środkowi. Łatwo schodząca skórka nie świadczy o jadalności, schodzi też u muchomora zielonawego.',
  },
  latex: {
    title: 'Czy z blaszek wycieka mleczko?',
    hint: 'Zarysuj paznokciem kilka blaszek przy brzegu kapelusza i patrz od razu, zanim kropelki zaschną. Mleczko bywa skąpe. Zapamiętaj jego kolor, bo może się zmienić po kilku minutach.',
    hintIn: { cut: LATEX_CUT_HINT },
  },
  bruising: {
    title: 'Czy uciśnięte miejsca zmieniły kolor?',
    hint: 'Sprawdź miejsca uciśnięte i potarte na początku etapu. Zwróć uwagę na niebieski, czerwony, brązowy lub żółty. Żółknięcie bywa też u jadalnych pieczarek. Na trującą pieczarkę karbolową wskazuje dopiero intensywnie żółta podstawa trzonu na przekroju i zapach atramentu.',
  },

  /* --------------------------------- Wykop --------------------------------- */
  volva: {
    title: 'Czy u podstawy trzonu jest pochwa?',
    hint: 'Ostrożnie strzep ziemię, nie zdrapuj. Pochwa to błoniasta osłonka otulająca dół trzonu, jak rozerwana skorupka jajka. U części muchomorów zamiast worka zostają tylko wałeczki, obrączki lub brodawki na bulwie; to też resztki pochwy. Bywa krucha, brudna od ziemi i łatwa do przeoczenia.',
    hintNoStipe:
      'Ostrożnie strzep ziemię. Młody muchomor wygląda jak białe jajko lub kulka w błoniastej skorupce, a u podstawy często ma resztki tej osłonki. Purchawka nie ma osobnej skorupki, jej skórka jest zwarta i jednolita.',
  },
  stipeBase: {
    title: 'Jak wygląda podstawa trzonu?',
    hint: 'Czy dół trzonu jest wyraźnie zgrubiały (bulwa)? Jeśli tak, czy bulwa ma ostry, odstający brzeg jak obrzeże? Taką bulwę mają m.in. muchomor cytrynowy i plamisty. Ten sam element możesz zaznaczyć i tutaj, i w pytaniu o pochwę.',
  },
  gillAttachment: {
    title: 'Jak blaszki dochodzą do trzonu?',
    hint: 'Spójrz w miejsce, gdzie blaszki spotykają trzon. Blaszki mogą kończyć się przed trzonem i zostawiać wąską szczelinę (wolne), dochodzić do niego albo zbiegać po nim w dół. Wolne blaszki mają m.in. muchomory i pieczarki.',
    hintIn: {
      cut: 'Spójrz na przekrój z boku. Blaszki mogą kończyć się przed trzonem (wolne), dochodzić do niego albo zbiegać po nim w dół. Wolne blaszki mają m.in. muchomory i pieczarki.',
    },
  },

  /* ------------------------------- Przekrój -------------------------------- */
  capFleshColor: {
    title: 'Jaki kolor ma miąższ kapelusza zaraz po przecięciu?',
    hint: 'Spójrz w pierwszych sekundach po cięciu na środek kapelusza, między skórką a spodem. U części grzybów kolor zmienia się na twoich oczach. Wybierz ten sprzed zmiany i zapamiętaj, co się stało, bo zapytamy o to za chwilę.',
  },
  stipeFleshColor: {
    title: 'Jaki kolor ma miąższ trzonu zaraz po przecięciu?',
    hint: 'Oceń od razu, w środkowej części trzonu, i wybierz kolor dominujący. Jeśli kolor zmienia się na twoich oczach, wybierz ten sprzed zmiany.',
  },
  stipeInterior: {
    title: 'Jakie jest wnętrze trzonu?',
    hint: 'Sprawdź na przekroju, czy trzon jest pełny i jednolity, ma miękki, watowaty rdzeń, jest pusty jak rurka czy podzielony przegrodami na komory.',
  },
  capFleshColorChange: {
    title: 'Czy miąższ kapelusza zmienił kolor?',
    hint: 'Porównaj z kolorem z pierwszych sekund. Jeśli od przecięcia minęło mniej niż 5 minut, odczekaj. Uwzględnij też zmianę, która pojawiła się od razu i już zbladła. Zmiana bywa tylko w części miąższu, np. tuż nad rurkami.',
  },
  stipeFleshColorChange: {
    title: 'Czy miąższ trzonu zmienił kolor?',
    hint: 'Porównaj z kolorem z pierwszych sekund i obejrzyj osobno samą podstawę. Uwzględnij zmianę natychmiastową, nawet jeśli już zbladła: u trującej pieczarki karbolowej podstawa żółknie od razu i po chwili blednie. Jeśli minęło mniej niż 5 minut, odczekaj.',
  },

  /* -------------------------------- Zapach --------------------------------- */
  smell: {
    title: 'Jak pachnie grzyb?',
    hint: 'Zapach jest subiektywny i słabnie z wiekiem grzyba, więc nigdy nie wyklucza gatunku trującego.',
  },

  /* --------------------------------- Wysyp --------------------------------- */
  sporePrint: {
    title: 'Jaki kolor ma wysyp zarodników?',
    hint: 'Oglądaj w dziennym świetle. Biały wysyp widać tylko na czarnej połówce, ciemny tylko na białej. Jeśli nalot jest słaby, zgarnij go ostrzem na kupkę, wtedy kolor będzie wyraźniejszy.',
  },
};

export function questionHint(key: QuizKey, stage: QuizStage, stipe: boolean): string {
  const copy = QUESTION_COPY_PL[key];
  if (!stipe && copy.hintNoStipe) return copy.hintNoStipe;
  return copy.hintIn?.[stage] ?? copy.hint;
}

export const DEFER_COPY_PL: { readonly [K in QuizKey]?: { readonly note: string; readonly action: string } } = {
  gillAttachment: {
    note: 'Dokładniejsze sprawdzenie tej cechy lepiej zrobić przy przekroju, czyli w następnym etapie.',
    action: 'Sprawdź przy przekroju',
  },
};

export const REVIEW_COPY_PL: { readonly [K in QuizKey]?: { readonly text: string; readonly action: string } } = {
  gillAttachment: {
    text: 'Jeśli nie byłeś pewien, jak blaszki dochodzą do trzonu, sprawdź to teraz na przekroju i popraw odpowiedź.',
    action: 'Popraw: przyczep blaszek',
  },
};

export interface StageCard {
  readonly title: string;
  readonly lead?: string;
  readonly how: string;
  readonly howAfterCut?: string;
  readonly meta?: string;
}

export interface StageCopy {
  readonly name: string;
  readonly eyebrow: string;
  readonly card: StageCard | null;
  readonly info?: string;
  readonly skipEffect?: string;
}

const SPORE_COVER = 'Przykryj miską lub kubkiem. Wynik po 2-12 h, do pytania możesz wrócić później.';

export const STAGE_COPY_PL: Readonly<Record<QuizStage, StageCopy>> = {
  place: {
    name: 'Miejsce',
    eyebrow: 'Bez dotykania · miejsce',
    card: null,
    info: 'Te odpowiedzi zawężają wyniki, ale żadna nie wyklucza gatunku trującego.',
  },
  look: {
    name: 'Wygląd',
    eyebrow: 'Bez dotykania · wygląd',
    card: {
      title: 'Obejrzyj',
      how: 'Nie zrywaj. W dziennym świetle obejrzyj najpierw grupę z daleka, potem kapelusz z góry i z boku, spód kapelusza (pochyl się) i trzon na całej długości.',
    },
  },
  touch: {
    name: 'Dotyk',
    eyebrow: 'Bez zrywania · dotyk',
    card: {
      title: 'Dotknij',
      how: 'Najpierw mocno uciśnij palcem spód kapelusza i trzon, potrzyj też brzeg kapelusza. Zmiana koloru pojawia się po kilku minutach, sprawdzisz ją na końcu etapu. Po zakończeniu całego badania umyj ręce, zanim dotkniesz ust lub oczu.',
    },
  },
  dig_base: {
    name: 'Wykop',
    eyebrow: 'Zbiór · wykopanie',
    card: {
      title: 'Wykop z podstawą',
      how: 'Wbij nóż lub patyk obok trzonu i podważ grzyb razem z ziemią. Nie wyrywaj i nie ucinaj: pochwa i bulwa zostaną w ziemi, a to najważniejsze cechy muchomorów.',
      meta: 'niszczy owocnik',
    },
    skipEffect: 'Bez wykopania nie zbierasz grzyba, więc znikną też etapy Przekrój i Wysyp.',
  },
  cut: {
    name: 'Przekrój',
    eyebrow: 'Po zebraniu · przekrój',
    card: {
      title: 'Przekrój wzdłuż',
      how: 'Połóż grzyb na płaskim i przetnij czystym nożem przez środek kapelusza i trzonu, do samej podstawy. Na pytania o kolor miąższu odpowiedz od razu, zanim zdąży się zmienić. Jedną połówkę zostaw nienaruszoną do wysypu zarodników.',
      meta: 'niszczy owocnik · pełny wynik po 5 min',
    },
    skipEffect: 'Zapach i wysyp dostaną instrukcje bez przekroju.',
  },
  smell: {
    name: 'Zapach',
    eyebrow: 'Zapach',
    card: {
      title: 'Powąchaj',
      how: 'Rozetrzyj w palcach kawałek brzegu kapelusza i powąchaj.',
      howAfterCut: 'Powąchaj świeży przekrój z bliska.',
    },
  },
  spore_print: {
    name: 'Wysyp',
    eyebrow: 'Po zebraniu · wysyp',
    card: {
      title: 'Zrób wysyp zarodników',
      lead: 'Krok opcjonalny i zaawansowany. Wykonaj go tylko, gdy zależy ci na bardzo wysokiej dokładności.',
      how: `Odetnij trzon tuż pod kapeluszem i połóż kapelusz spodem na kartce pół białej, pół czarnej. ${SPORE_COVER}`,
      howAfterCut: `Weź nienaruszoną połówkę, odetnij z niej resztę trzonu i połóż kapelusz spodem na kartce pół białej, pół czarnej. ${SPORE_COVER}`,
      meta: 'niszczy owocnik · wynik po 2-12 h',
    },
  },
};

export const STAGE_SKIP_PL = {
  title: (stage: QuizStage) => `Pominąć cały etap ${STAGE_COPY_PL[stage].name}?`,
  carried: (label: string, stage: QuizStage) => `Pytanie „${label}” padnie jeszcze w etapie ${STAGE_COPY_PL[stage].name}.`,
  skipStage: 'Pomiń etap',
  skipOne: 'Tylko to pytanie',
  cancel: 'Anuluj',
  revisitStage: 'Wróć do etapu',
  wholeStage: 'Cały etap pominięty',
  hides: (stages: readonly QuizStage[]) => `Ukrywa: ${stages.map((stage) => STAGE_COPY_PL[stage].name).join(', ')}`,
} as const;

/** Komunikat w etapie przekroju, gdy wykopanie pominięto, a grzyb ma trzon. */
export const DIG_NOTICE_PL = {
  text: 'Jeśli grzyb został urwany lub ucięty, pochwa została w ziemi. Wróć na miejsce, wykop resztę podstawy i uzupełnij etap Wykop.',
  action: 'Wróć do wykopania',
} as const;

export const SKIPPED_COPY_PL = {
  title: 'Pominięte',
  hint: 'Dotknij pytania lub etapu, aby do niego wrócić.',
  close: 'Zamknij',
} as const;

export const INTRO_PL = {
  title: 'Zanim zaczniesz',
  points: [
    {
      icon: 'shovel',
      text: 'Najpierw pytania bez dotykania - o miejsce i wygląd, potem dotyk. Jeśli zbierzesz grzyba, wykop go z podstawą: urwany gubi pochwę, najważniejszą cechę muchomorów.',
    },
    { icon: 'tongue', text: 'Nie próbuj smaku. Quiz o to nie zapyta.' },
    { icon: 'list', text: 'Lokalna baza nie obejmuje wszystkich gatunków grzybów. Jeśli szukanego okazu w niej brakuje, nie pojawi się w wynikach.' },
  ],
  start: 'Rozumiem, zaczynamy',
} as const;

/** Opis progu pod suwakiem (wartość w punktach procentowych). */
export function thresholdCaption(percent: number): string {
  if (percent >= 100) return 'Tylko pełna zgodność. Ukrywa też gatunki trujące z niezgodnością.';
  if (percent >= 80) return 'Wybacza pojedynczą pomyłkę w ocenie „na oko”.';
  return 'Luźne podobieństwo - lista do porównania, nie rozpoznanie.';
}

/** Polska odmiana po liczebniku: 1 gatunek, 2-4 gatunki, 5+ gatunków (12-14 → gatunków). */
export function pluralPl(count: number, [one, few, many]: readonly [string, string, string]): string {
  if (count === 1) return one;
  const tens = count % 100;
  const units = count % 10;
  return units >= 2 && units <= 4 && (tens < 12 || tens > 14) ? few : many;
}

export const SPECIES_FORMS = ['gatunek', 'gatunki', 'gatunków'] as const;
export const QUESTION_FORMS = ['pytanie', 'pytania', 'pytań'] as const;
