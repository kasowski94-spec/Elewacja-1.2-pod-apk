# ElewacjaPro — paczka wdrożeniowa

## Co jest w archiwum

| Plik | Opis | Wymagany? |
|---|---|---|
| `index.html` | Aplikacja — wszystko inline (biblioteka cen, kod, style). 234 KB | **TAK** |
| `sw.js` | Service Worker v4 — cache offline + skipWaiting | **TAK** |
| `manifest.json` | Manifest PWA — ikony, nazwa, kolory | **TAK** |
| `pdf-font.js` | Osadzony font DejaVu (subset PL) — polskie znaki w PDF, 75 KB | **TAK** |
| `library.js` | Biblioteka materiałów/robocizny — kopia. Aplikacja **NIE używa** już tego pliku (jest inline w `index.html`). Możesz usunąć. | nie |
| `INSTALACJA.html` | Instrukcja instalacji PWA — wyświetla się gdy SW nie jest zainstalowany | zalecane |
| `icons/icon-*.png` | Ikony PWA — **musisz dograć osobno** (nie ma ich w paczce) | TAK |
| `CLAUDE.md` | Brief projektu dla AI | nie |
| `HANDOFF.md` | Dokumentacja techniczna projektu | nie |
| `ZMIANY.md` | Lista zmian z ostatniej iteracji | nie |

## Wdrożenie

1. Wgraj **wszystkie pliki z paczki** do katalogu głównego hostingu (np. GitHub Pages).
2. Upewnij się że masz katalog `icons/` z ikonami w rozmiarach: 72, 96, 128, 144, 152, 192, 256, 384, 512 px (PNG). Te są **niezbędne** dla PWA — bez nich instalacja na ekranie głównym nie działa.
3. Hosting musi być po HTTPS (wymaganie Service Workera). GitHub Pages / Cloudflare Pages / Netlify spełniają to.
4. Po wgraniu otwórz stronę w przeglądarce mobilnej → menu "Dodaj do ekranu głównego" → masz aplikację działającą offline.

## Wymuszenie aktualizacji u użytkowników

Bump wersji cache w `sw.js` (`const CACHE = 'elewacja-v4'`) wymusi pobranie świeżych plików. Użytkownicy z zainstalowaną wersją starszą:
- Android: aktualizacja automatyczna przy następnym otwarciu (skipWaiting)
- iOS: może wymagać zamknięcia/otwarcia aplikacji raz

## Test po wdrożeniu

1. Otwórz stronę → DevTools → Application → Service Workers → status: "activated"
2. Application → Cache Storage → powinno być `elewacja-v4` i `elewacja-fonts-v4`
3. Wyłącz internet w DevTools → przeładuj → aplikacja działa offline
4. Wygeneruj PDF z polskimi znakami w danych klienta — sprawdź czy ą, ę, ł są widoczne
5. Wycenę → klik na pozycję wyceny → wpisz w pole "Ilość" długą wartość → klawiatura nie znika

## Pliki, których NIE wgrywać

- `CLAUDE.md` — to brief dla LLM, użytkownicy nie powinni go widzieć
- `HANDOFF.md` — dokumentacja techniczna, opcjonalnie

## Zmiany w ostatniej iteracji

Patrz `ZMIANY.md` — pełna lista poprawek (A1–A5, B1–B5, C1–C5, D1–D6 + funkcje zamówienia/zapytania, biblioteka, podsekcje).
