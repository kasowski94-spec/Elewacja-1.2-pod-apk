# ElewacjaPro — Dokumentacja projektu i przekazanie do Claude Code

> Kompletny pakiet: podsumowanie, stan techniczny, polecenia optymalizacji i instrukcja kontynuacji w Claude Code.

---

## 1. CZYM JEST PROJEKT

**ElewacjaPro** to mobilny kalkulator materiałów i wyceny dla systemów ociepleń elewacji (ETICS / „system lekki mokry" ze styropianem EPS). Aplikacja w języku polskim, działająca jako:

- **PWA** (Progressive Web App) — instalowalna na Androidzie przez Chrome, działa offline
- **Projekt Capacitor** — gotowy do skompilowania natywnego pliku APK

Aplikacja oblicza zapotrzebowanie materiałowe dla 11 wariantów grubości styropianu (5–30 cm), wartości U wg WT2021, generuje pełną wycenę podzieloną na sekcje i eksportuje ją do PDF.

---

## 2. STRUKTURA PLIKÓW

```
elewacja-pwa/                    ← APLIKACJA PWA (główny produkt)
├── index.html        (~2780 linii) — cała aplikacja: HTML + CSS + JS
├── library.js        (~180 linii)  — baza materiałów i robocizny
├── manifest.json                   — manifest PWA
├── sw.js                           — Service Worker v3 (offline cache)
├── INSTALACJA.html                 — instrukcja instalacji na Android
└── icons/                          — 9 ikon PNG (72–512px) + splash

elewacja-pwa-android.zip            — spakowane PWA do hostingu
elewacja-apk-project.zip            — projekt Capacitor do budowy APK
```

Plik `elewacja-apk-project.zip` zawiera projekt Capacitor 6 z folderem `android/` (Gradle, MainActivity.java, AndroidManifest, ikony, build.sh/build.bat) — wymaga komputera z Node.js + JDK 17 + Android SDK do skompilowania APK.

---

## 3. FUNKCJONALNOŚĆ — STAN OBECNY

### Zakładki aplikacji
1. **⚙ Dane** — powierzchnia, typ EPS, ściana nośna, podłoże, tynk, łączniki, taśmy, folie, narożniki, pianka, własne pozycje
2. **📦 EPS** — 11 wariantów grubości, karty z U-value, tabela zbiorcza
3. **🧱 Materiały** — pełne zestawienie ilościowo-kosztowe
4. **📚 Biblioteka** — katalog ~60 materiałów + ~30 pozycji robocizny, wyszukiwarka, kategorie, ulubione
5. **🪟 Parapety** — wiele typów, arkusze blachy, gięcia/cięcia, robocizna
6. **🔧 Prace** — prace dodatkowe (skucie, odgrzybianie, wywóz itp.)
7. **🔩 Łączniki** — dobór długości kołka, typ/długość→cena, zaślepki
8. **💰 Ceny** — edytowalne ceny jednostkowe
9. **📊 Porównanie** — porównanie cen z 3 źródeł + AI refresh
10. **📄 Wycena** — 12 sekcji (A–H materiały, I–L robocizna), eksport PDF
11. **🏗 Rusztowanie** — kalkulacja z możliwością wyłączenia

### Kluczowe mechanizmy
- **Projekty** — zapis/odczyt w IndexedDB + localStorage backup, eksport/import JSON
- **Globalna opcja cenowa** — hurtownie / średnia rynkowa / pośrednia / ręczna
- **Wycena PDF** — pełna lub tylko materiały, jsPDF
- **Aktualizacja cen** — wywołanie Claude API (web_search) z fallbackiem
- **PWA** — Service Worker, offline, instalacja A2HS, gesty swipe, dolny pasek nawigacji, IndexedDB

### Stałe i struktury danych (w index.html)
- `THICK` — grubości EPS, `WALL_LAMBDA` — λ ścian
- `EXTRAS_DEF`, `FOAM_TYPES`, `PRICE_DEFS`, `CORNER_MULT`, `SHOP_MULT`, `SHEET_TYPES`
- `MATERIAL_LIBRARY`, `LABOR_LIBRARY`, `MAT_CATEGORIES`, `LABOR_CATEGORIES`, `COMMON_ITEMS` (w library.js)
- Stan: `selectedVariant`, `parapets[]`, `foamItems[]`, `customItems{}`, `projects{}`, `wycenaRows[]`, `favorites[]`

---

## 4. ZNANE OGRANICZENIA I DŁUG TECHNICZNY

| # | Problem | Priorytet |
|---|---------|-----------|
| 1 | Cała aplikacja w jednym pliku 2780 linii — trudna w utrzymaniu | wysoki |
| 2 | 77 inline `onclick` — brak separacji logiki od widoku | średni |
| 3 | Brak testów automatycznych | średni |
| 4 | Funkcja `calc()` przelicza cały interfejs przy każdej zmianie pola | średni |
| 5 | Klucz API Claude wywoływany z frontu — w APK działa, ale brak rate-limitingu | niski |
| 6 | Ceny w bibliotece zapisane na sztywno (maj 2026) — wymagają ręcznej aktualizacji | niski |
| 7 | Brak walidacji pól liczbowych (ujemne wartości możliwe) | niski |
| 8 | Powtórzony kod renderujący sekcje wyceny | niski |

---

## 5. POLECENIA OPTYMALIZACJI (dla Claude Code)

### Priorytet 1 — Architektura
```
1. Rozdziel index.html na moduły:
   - index.html (tylko struktura HTML)
   - css/styles.css (wszystkie style)
   - js/calc.js (logika obliczeń)
   - js/ui.js (renderowanie)
   - js/library.js (już istnieje — biblioteka)
   - js/storage.js (IndexedDB, projekty, JSON)
   - js/pdf.js (eksport PDF)
   Zachowaj działanie offline — zaktualizuj listę CORE w sw.js.

2. Zamień inline onclick na addEventListener z delegacją zdarzeń.
   Użyj data-action atrybutów zamiast onclick="...".
```

### Priorytet 2 — Wydajność
```
3. Wprowadź debounce (150ms) na input handlerach wywołujących calc().
4. Rozbij calc() na mniejsze funkcje renderujące tylko aktywną zakładkę.
   Przelicz dane raz, renderuj widok leniwie przy zmianie zakładki.
5. Zmemoizuj parapetCalc() i obliczenia wariantów EPS.
```

### Priorytet 3 — Jakość i bezpieczeństwo
```
6. Dodaj walidację: min=0 na wszystkich polach liczbowych,
   sanityzacja przy imporcie JSON i CSV.
7. Dodaj testy jednostkowe dla funkcji obliczeniowych:
   calcU(), parapetCalc(), buildWycenaRows(), getParapetsCost().
   Użyj Vitest lub prostego runnera bez zależności.
8. Wynieś wywołanie Claude API do warstwy z obsługą błędów i timeoutem.
```

### Priorytet 4 — Funkcje
```
9. Dodaj eksport całej bazy projektów (backup zbiorczy).
10. Dodaj tryb ciemny/jasny (obecnie tylko ciemny).
11. Dodaj wersjonowanie schematu danych projektu (migracje przy aktualizacji).
12. Rozważ wydzielenie cen do osobnego pliku JSON aktualizowanego niezależnie.
```

### Weryfikacja po każdej zmianie
```
- node --check na każdym pliku .js
- Otwórz w przeglądarce, sprawdź konsolę (zero błędów)
- Przetestuj: nowy projekt → zmiana wariantu → wycena → eksport PDF
- Sprawdź działanie offline (DevTools → Network → Offline)
```

---

## 6. JAK PRZEKAZAĆ DO CLAUDE CODE

### Krok 1 — Pobierz i rozpakuj
Pobierz `elewacja-pwa-android.zip`, rozpakuj do folderu roboczego, np. `~/projekty/elewacja-pro/`.

### Krok 2 — Zainicjuj projekt
```bash
cd ~/projekty/elewacja-pro
git init
git add .
git commit -m "ElewacjaPro v1 — stan wyjściowy (PWA)"
```

### Krok 3 — Uruchom Claude Code
```bash
claude
```

### Krok 4 — Pierwszy prompt do Claude Code
Wklej Claude Code ten tekst:

```
To jest ElewacjaPro — kalkulator ETICS jako PWA. Cała aplikacja jest
w jednym pliku index.html (~2780 linii). Plik HANDOFF.md zawiera pełną
dokumentację, znany dług techniczny i listę zadań optymalizacyjnych.

Zacznij od:
1. Przeczytaj HANDOFF.md i index.html.
2. Wykonaj Priorytet 1 punkt 1 — rozdziel index.html na moduły
   (css/, js/), zachowując pełne działanie offline (zaktualizuj sw.js).
3. Po rozdzieleniu sprawdź: node --check na plikach JS, otwórz w
   przeglądarce, potwierdź zero błędów w konsoli i działający przepływ
   nowy projekt → wycena → eksport PDF.
Nie zmieniaj funkcjonalności — to ma być refaktoryzacja 1:1.
```

### Krok 5 — Kolejne iteracje
Po każdym ukończonym priorytecie commituj zmiany i przechodź do następnego.
Claude Code może budować APK lokalnie — w `elewacja-apk-project.zip`
jest gotowy projekt Capacitor (instrukcja w jego README.md).

---

## 7. KONTEKST BIZNESOWY (dla zachowania spójności)

- Użytkownik docelowy: wykonawca elewacji / kosztorysant w Polsce
- Wszystkie teksty interfejsu po polsku
- Ceny orientacyjne, rynek polski, stan maj 2026
- Motyw kolorystyczny: ciemny, akcent pomarańczowy `#e8541a`, złoty `#f5a623`, zielony `#3ecf8e`
- Czcionki: Syne (nagłówki), Inter (tekst)
- VAT 8% (budownictwo mieszkaniowe) w wycenach
- Norma U-value: WT2021 (ściana ≤ 0,20 W/m²K)

---

*Dokument wygenerowany jako handoff dla Claude Code. Po rozpoczęciu pracy
Claude Code powinien aktualizować ten plik o postęp realizacji zadań.*
