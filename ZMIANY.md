# ElewacjaPro — zmiany w tej wersji

## Pliki do podmiany na hostingu

- **`index.html`** — główna aplikacja
- **`sw.js`** — service worker (bump do `elewacja-v4` — wymusi odświeżenie cache u użytkowników)
- **`pdf-font.js`** — **NOWY plik**, osadzony font DejaVu Sans (subset PL) do PDF
- `library.js`, `manifest.json` — bez zmian

## ⚠ Po wgraniu — wymuś przeładowanie

Service worker zmienił wersję cache (v3 → v4). Użytkownicy z zainstalowanym PWA:
- na Androidzie odświeży się sam przy następnym otwarciu (skipWaiting)
- na iOS może potrzebować zamknięcia/otwarcia aplikacji

## A. Błędy obliczeniowe (naprawione)

| | Co było | Co jest |
|---|---|---|
| A1 | `calcU` dodawał Rsi+Rse (0,17 m²K/W) dwa razy → U zaniżone o ~2–3% | Poprawny wzór `1/(1/U₀ + t/λ)` — wallU0 już zawiera opory przejmowania |
| A2 | Opcja „Brak" gruntu (wartość 0) wracała do 0,15 l/m² | Helper `gsn`/`gvn` zachowuje 0 jako poprawną wartość |
| A3 | Robocizna w pasku live ≠ robocizna w wycenie (mnożnik hurtowni) | Robocizna i rusztowanie nie są mnożone przez cennik (flaga `noShop:true`) |
| A4 | Auto-łączniki 15/m² łamały `max=14` → błąd walidacji | Górny limit podniesiony do 16, auto cap |
| A5 | Pola z `\|\| fallback ≠ 0` nie akceptowały zera (perim, taśmy, rusztowanie itd.) | Wszystkie pola liczbowe przez `gvn`/`gsn` |

## B. Błędy funkcjonalne

- **B1.** CSV cennika jest teraz **stosowany** — pozycje dopasowywane do pól po słowach kluczowych (styropian, klej, siatka, tynk, grunt, łącznik, zaślepka, listwa startowa, narożnik, farba), z auto-przeliczeniem opakowań (worki 25 kg → zł/kg, m² → zł/cm dla EPS). Komunikat informuje ile cen zaktualizowano.
- **B2.** Selektor cennika w wierszu wyceny zawiera **pełną listę** (styro24, mega1000, Castorama/LM, średnia, pośrednia, ceny ręczne). Etykiety przyjazne. Per-wiersz nadpisanie cennika zapamiętywane w `wycenaManualEdits[key].rowShop`.
- **B3.** Stan kalkulatora łączników (ancEps, ancSubst, ancTynk, ancWarst, kolekType, kolekLen, kolekPrice) zapisywany w projekcie. Po wczytaniu projektu opcje `kolekLen` są generowane zanim ustawiana jest zapisana wartość.
- **B4.** `addParapet(d)` przyjmuje argument poprawnie, brakujące pola uzupełnia z `PARAPET_DEFAULTS`. Migracja v1→v2 dopisuje pola arkusza dla starych projektów.
- **B5.** Stabilny `rowKey(r)` = `section|key||name`. Każda pozycja parapetu/własna/pianka/dodatek ma własny klucz (`par0_blacha`, `cm_<id>`, `foam0_<typ>`, `ex_<id>` itd.) — dwie pozycje o tej samej nazwie nie kolidują przy edycji.

## C. PWA / offline / PDF

- **C1.** Polskie znaki w PDF — osadzony font DejaVu Sans (subset 29 KB regular + 26 KB bold). Pełne ą, ę, ł, ń, ó, ś, ź, ż + symbole `· — ² × → ✓ €`. Działa offline.
- **C2.** `sw.js` v4 — pełna lista CORE wszystkich plików aplikacji + wszystkie ikony. `INSTALACJA.html` dodane. Każdy plik dodawany osobno (brak jednego nie wywala całej instalacji).
- **C3.** `idbSaveProjects` — jedna nieprzerwana transakcja IndexedDB, brak `TransactionInactiveError`. localStorage backup zawsze.
- **C4.** `max_tokens` AI 1100 → 2200 — pełne odpowiedzi z `web_search`.
- **C5.** Martwy `FONT_URLS` w starym sw.js — usunięty.

## D. Drobne / jakość

- **D1.** `user-scalable=no` usunięte z `viewport` — zoom działa (dostępność).
- **D2.** Chipy paska górnego pokazują czytelne etykiety (`SHOP_LABELS`).
- **D3.** `validateInputs()` pomija pola dynamiczne (wiersze parapetu, wyceny, własnych pozycji).
- **D4.** Kalkulator łączników auto-synchronizuje grubość EPS przy zmianie wariantu (`setVariant`). Długość kołka (`kolekLen`) auto-dobierana z listy biblioteki na podstawie obliczonej długości minimalnej.
- **D5.** Schemat projektu wersjonowany (`schemaVer=2`). Funkcja `migrateState(st)` uzupełnia pola dla starych projektów. Import JSON sanityzuje strukturę i wymusza migrację.
- **D6.** Pasek live i podsumowanie spójne — `syncLiveBarFromWycena()` aktualizuje chipy z aktualnej wyceny bez przebudowy DOM.

## Twoje uwagi — wykonane

### 1. Znikająca klawiatura przy wpisywaniu

Przyczyna: każda edycja pola w wierszu (parapet, własna pozycja, pianka, wiersz wyceny) wywoływała pełny `renderX()` → `innerHTML` przebudowywał DOM → input tracił fokus → klawiatura znikała.

Naprawa:
- `updParapet` → wywołuje `recalcParapet(i)` zamiast `renderParapets()` — odświeża tylko wewnętrzny box wyników (`<div id="parcalc-${i}">`).
- `updCustom` → przy zmianie nazwy/ilości/ceny aktualizuje tylko `<span id="custtot-...">`. Tylko zmiana jednostki/checkbox przebudowuje wiersz (tam fokus i tak nie ma znaczenia).
- `updFoam` → przy zmianie liczby aktualizuje tylko `<div id="foamcost-...">`.
- `editWycenaRow` → przebudowano: nie wywołuje `buildWycenaRows()`. Aktualizuje tylko: wartość w wierszu (`refreshRowTotals`), sumy sekcji (`refreshSectionTotals`), pasek górny (`syncLiveBarFromWycena`).
- Pola Dane (oninput="calc()") — `calc()` nie niszczy ich inputów, ale dla wydajności wszystkie `oninput="calc()"` zamieniono na `oninput="debCalc()"` (debounce 160 ms, nie rwie wpisywania).

### 2. Spójność danych — wybór EPS i łączników propagowany

`setVariant(t)` — **jedno źródło prawdy** dla grubości EPS. Wywoływane przez:
- nowy selektor „Grubość styropianu EPS" w zakładce Dane (15 wariantów, 5–30 cm)
- kliknięcie karty wariantu (zakładka EPS)
- zmianę pola „Grubość styropianu" w zakładce Łączniki (ancEps)

Synchronizuje natychmiast:
- `selectedVariant` (zmienna globalna używana w `calc` i `buildWycenaRows`)
- pole `epsThick` (Dane)
- pole `ancEps` (Łączniki)
- przelicza długość kołka (`calcAnchor` → `autoPickKolek`) i cenę (`p_anchor`)
- przelicza wycenę i pasek live

### 3. Generowanie zamówienia i zapytania materiałowego

Nowy blok w zakładce **Wycena** (zielone tło) z czterema przyciskami:
- 🧾 **PDF — zamówienie** — pełny dokument z cenami i wartościami, nr dokumentu `ZAM/YYYY/XXXX`, VAT 23% (zakup materiałów przez wykonawcę), pola na termin/adres dostawy/sposób płatności, miejsce na podpis zamawiającego.
- ⬇ **CSV — zamówienie** — eksport tabelaryczny dla hurtowni przyjmujących pliki.
- ✉ **PDF — zapytanie ofertowe** — bez cen, puste pola „Oferta dostawcy" i „Dostępność" do uzupełnienia przez sprzedawcę. Nr `ZAP/YYYY/XXXX`. Pola na termin ważności oferty i termin dostawy.
- ⬇ **CSV — zapytanie** — to samo w formacie tabeli.

Dodatkowo skróty w arkuszu „Więcej": 🧾 Zamówienie / ✉ Zapytanie.

Generator (`exportOrderPDF`) używa tego samego osadzonego fontu PL, własnego nagłówka, dwóch kolumn stron (Zamawiający / Dostawca) i numeracji stron `n/N`.

### 4. Wygląd i przejrzystość wyceny

**Wiersze wyceny — nowy układ:**
- Siatka CSS Grid `24px 1fr 64px 44px 70px 108px 84px` zamiast flex-fallback.
- Nagłówek tabeli z etykietami kolumn (Lp · Pozycja/opis · Ilość · Jedn. · Cena · Cennik · Wartość).
- Naprzemienne tło wierszy (zebra).
- Edytowane pozycje: pomarańczowy pasek z lewej + plakietka „edytowano" przy nazwie.
- Robocizna i rusztowanie: w kolumnie cennika `—` z dymkiem „Robocizna / rusztowanie — niezależne od cennika hurtowni".
- Cienie i hover na inputach.

**Mobile — karty zamiast wąskich kolumn:**
Przy szerokości ≤ 560 px wiersze przełączają się w układ kafelka: nazwa na całą szerokość, pod nią dwa pola obok siebie (Ilość | Cena jedn.), pod nimi cennik na całą szerokość, na końcu wartość. Etykiety pól automatyczne (`::before`/`::after`).

**Podsumowanie (`#wycena-summary`) — przeprojektowane:**
- Dwie sekcje — Materiały (A–H) i Robocizna (I–L) — z rozbiciem na podsekcje, każda z subtotalem.
- Sekcja końcowa „Brutto" z gradientem pomarańczowym, ceną za 1 m² i wyróżnioną kwotą brutto (1,7 rem).
- Liczba ręcznie edytowanych pozycji wyświetlana jako ostrzeżenie z sugestią użycia „Reset edycji".

**PDF wyceny — przeprojektowany:**
- Polskie znaki natywnie (osadzony font).
- Dwukolumnowa szpalta z danymi (Zamawiający / Wykonawca).
- Tabela z dynamiczną wysokością wiersza (zawijanie nazwy + opisu).
- Suma sekcji po każdej grupie pozycji.
- Pudełko podsumowania (`roundedRect`) z kolumną etykiet i kwotami wyrównanymi do prawej.
- Numeracja stron na każdej stronie (`Strona n / N`).
- Stopka z datą i typem dokumentu.

## Co przetestować po wgraniu

1. **Klawiatura nie znika** — wpisz długą wartość w polu „Cena arkusza" parapetu, w „Ilość" wiersza wyceny, w „Liczba pianek" — kursor pozostaje, klawiatura nie znika.
2. **Spójność grubości EPS** — zmień wariant w zakładce Dane → otwórz Łączniki: `ancEps` ten sam; długość kołka przeliczona; otwórz Wycenę: pozycja EPS pokazuje nową grubość.
3. **U-value** — EPS 15 cm grafit (λ=0,033) na ścianie U₀=0,45 → U ≈ 0,148 W/m²K (wcześniej źle ~0,144).
4. **Opcja „Brak" gruntu** — wybierz w „Grunt podłoża" wartość Brak → koszt gruntu = 0, pozycja znika z wyceny.
5. **PDF** — wygeneruj zamówienie z polskimi znakami w danych klienta (np. „Tomaszów Mazowiecki, ul. Łąkowa") — wszystkie znaki widoczne.
6. **Wycena offline** — odłącz internet → otwórz aplikację → wszystko działa, PDF generuje się.
