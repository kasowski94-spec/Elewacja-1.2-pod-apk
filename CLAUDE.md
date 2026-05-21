# CLAUDE.md — ElewacjaPro

Plik kontekstu dla Claude Code. Czytany automatycznie przy starcie sesji.

## Projekt
ElewacjaPro — mobilny kalkulator materiałów i wyceny dla ociepleń elewacji
(system ETICS, styropian EPS). PWA w języku polskim, instalowalna na Androidzie.

## Pliki
- `index.html` — cała aplikacja (HTML + CSS + JS, ~2780 linii)
- `library.js` — baza materiałów (MATERIAL_LIBRARY) i robocizny (LABOR_LIBRARY)
- `manifest.json`, `sw.js` — konfiguracja PWA i Service Worker (offline)
- `HANDOFF.md` — pełna dokumentacja, dług techniczny, lista zadań
- `icons/` — ikony aplikacji

## Zasady pracy
- Wszystkie teksty interfejsu PO POLSKU.
- Zachowuj motyw: ciemny, akcent #e8541a, #f5a623, #3ecf8e.
- Czcionki: Syne (nagłówki), Inter (tekst).
- Po KAŻDEJ zmianie w JS: uruchom `node --check` na pliku.
- Aplikacja MUSI działać offline — przy zmianie plików aktualizuj
  listę CORE w sw.js i podnoś numer wersji cache.
- Nie używaj localStorage/sessionStorage do nowych danych — IndexedDB.
- Testuj przepływ: nowy projekt → wariant EPS → wycena → eksport PDF.

## Architektura docelowa (cel refaktoryzacji)
Rozdzielić index.html na: index.html + css/styles.css + js/{calc,ui,storage,pdf}.js
Szczegóły i pełna lista zadań optymalizacyjnych — w HANDOFF.md sekcja 5.

## Komendy
- Podgląd lokalny: `python3 -m http.server 8080` → http://localhost:8080
- Sprawdzenie składni: `node --check js/*.js`
- Build APK: osobny projekt Capacitor (patrz elewacja-apk-project.zip)
