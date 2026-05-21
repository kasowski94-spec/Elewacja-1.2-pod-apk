# Jak zrobić APK na Androida z ElewacjaPro

Cały proces: ~15 minut. Plik APK ~5–8 MB, instalujesz przez "Otwórz" w przeglądarce telefonu albo wysyłasz przez Bluetooth/Telegram/email.

## Etap 1 — Wgraj PWA na hosting (jednorazowo)

Potrzebujesz **publicznego HTTPS URL** z aplikacją (PWABuilder tego wymaga, nie da się z lokalnego pliku).

### Najszybciej: GitHub Pages (za darmo)

1. Zaloguj się na github.com → przycisk **+ New repository** w prawym górnym rogu
2. Nazwa: `elewacjapro` (lub inna, krótka)
3. Ustaw **Public** (musi być publiczne dla darmowego GitHub Pages)
4. Zaznacz **Add a README file** → **Create repository**
5. Kliknij **Add file** → **Upload files** → przeciągnij **wszystkie pliki** z paczki:
   - `index.html`, `sw.js`, `manifest.json`, `pdf-font.js`
   - Cały katalog `icons/` (przeciągnij folder)
   - Cały katalog `screenshots/`
   - (opcjonalnie) `INSTALACJA.html`
6. Na dole — **Commit changes**
7. Repo Settings (zakładka u góry) → **Pages** (lewe menu)
8. **Source: Deploy from a branch** → **Branch: main** → **/(root)** → **Save**
9. Czekaj 1-2 minuty, odśwież stronę. U góry pojawi się: **"Your site is live at `https://twoj-login.github.io/elewacjapro/`"**
10. Otwórz ten adres na telefonie — aplikacja powinna działać.

### Alternatywa: Netlify Drop

Jeśli wolisz bez GitHub-a:
1. Wejdź na **app.netlify.com/drop**
2. Przeciągnij cały folder z plikami w obszar "Drag and drop your site folder here"
3. Po 30 sek dostajesz URL typu `https://swieta-pawlowa-abc123.netlify.app`
4. Aplikacja gotowa.

## Etap 2 — Sprawdź gotowość PWA

1. Otwórz **pwabuilder.com** w przeglądarce na komputerze
2. Wklej URL z Etapu 1 → **Start**
3. Po chwili dostaniesz raport z 3 sekcjami: Manifest, Service Worker, App Capabilities
4. Wszystkie powinny być **zielone** lub **żółte** (czerwone = problem do naprawienia)

**Jeśli coś jest czerwone:**
- Najczęstszy problem: ikony nie ładują się (zły URL). Sprawdź czy katalog `icons/` jest na hostingu.
- Service Worker — sprawdź czy `sw.js` jest dostępny pod `https://twoja-domena/sw.js` (otwórz w przeglądarce, powinien pokazać kod)

## Etap 3 — Wygeneruj APK

1. Na pwabuilder.com (z otwartym raportem aplikacji), kliknij **Package For Stores** w prawym górnym rogu
2. Wybierz **Android** → **Generate Package**
3. Otworzy się okno z opcjami pakietu. **Ustaw:**
   - **Package ID**: `com.twojanazwa.elewacjapro` (musi być unikalny — odwrócona domena, lowercase, kropki). Np. `com.przemek.elewacjapro` albo `pl.spec.elewacjapro`
   - **App name**: `ElewacjaPro`
   - **Launcher name**: `ElewacjaPro`
   - **App version**: `1.0.0`
   - **App version code**: `1`
   - **Host**: zostaw automatycznie
   - **Start URL**: `/` lub `/index.html`
   - **Display mode**: `standalone`
   - **Status bar color**: `#0b0d14`
   - **Splash background color**: `#0b0d14`
   - **Splash foreground color**: `#e8541a`
   - **Icon URL** i **Maskable icon URL**: zostaw automatycznie wykryte
   - **Signing key**: pierwszy raz wybierz **"Create new"** (PWABuilder wygeneruje klucz dewelopera za Ciebie). **Pobierz i ZACHOWAJ** plik `.keystore` i hasło — bez niego nie zaktualizujesz aplikacji w przyszłości.

4. Kliknij **Download** → dostaniesz ZIP zawierający:
   - `app-release-signed.apk` ← **to instalujesz na telefonie**
   - `app-release-bundle.aab` ← to dla Google Play Store (gdyby kiedyś chciał)
   - `signing.keystore` + `key-info.json` ← **zachowaj na pendrive!**
   - `next-steps.html` ← instrukcja od PWABuilder

## Etap 4 — Zainstaluj APK na telefonie

### Metoda 1: bezpośrednio z telefonu

1. Skopiuj plik `.apk` na telefon (Bluetooth, kabel USB, Google Drive, Telegram do siebie)
2. Otwórz menedżer plików na telefonie → znajdź plik → kliknij
3. Android zapyta: **"Zainstalować nieznaną aplikację?"** — pierwsze instalowanie z tej przeglądarki/menedżera wymaga zezwolenia w ustawieniach (Android Ci to podpowie)
4. **Zainstaluj** → gotowe, aplikacja jest na ekranie głównym

### Metoda 2: przez QR

1. Wrzuć `.apk` na własny serwer/Dropbox/Drive z linkiem publicznym
2. Wygeneruj QR z tym linkiem (np. qr-code-generator.com)
3. Zeskanuj telefonem → pobierz → zainstaluj

## Etap 5 — Aktualizacje aplikacji

Tu jest fajna część PWA-APK: **nie musisz robić nowego APK przy każdej zmianie aplikacji**.

Wewnątrz APK siedzi tzw. **Trusted Web Activity** (TWA) — to mini-przeglądarka pełnoekranowa wskazująca na Twój URL z Etapu 1. Czyli:

- Wgrywasz nowy `index.html` na GitHub/Netlify
- Service Worker u użytkownika wykrywa zmianę → pobiera nową wersję
- Następne otwarcie aplikacji = nowa wersja

**Nowy APK musisz robić tylko gdy:**
- Zmieniasz ikonę aplikacji
- Zmieniasz nazwę / Package ID
- Chcesz wymienić wersję w Play Store

## Etap 6 — Opcjonalnie: Google Play Store

Jeśli chcesz publikować dla wielu osób (klienci, ekipa):

1. Konto **Google Play Console** = jednorazowo $25 (przelew kartą)
2. Wgrywasz `.aab` (nie APK) z paczki PWABuilder
3. Uzupełniasz opis, screenshots (te z `screenshots/` są ok), ikona, polityka prywatności (PWABuilder generuje wzór)
4. Po ~2-3 dniach Google zatwierdza → aplikacja w sklepie

Dla użytku własnego nie potrzebujesz Play Store — instaluj APK przez "nieznane źródła".

---

## Najczęstsze problemy

**"Failed to fetch icons"**

Sprawdź czy w manifest URL-e ikon są względne (`icons/icon-192.png`) a nie absolutne (`https://...`). Aktualny manifest.json ma to dobrze.

**"Aplikacja po instalacji pokazuje białą stronę"**

Service Worker nie działa lub `start_url` w manifest wskazuje na zły adres. Sprawdź w PWABuilder Score Card czy SW jest zielony.

**"Nie mogę zainstalować APK — uszkodzony plik"**

Pobierz ZIP ponownie, sprawdź czy plik `.apk` ma >2 MB. Niektóre antywirusy blokują niepodpisane APK — wyłącz na czas instalacji.

**"Aplikacja wygląda inaczej niż w przeglądarce"**

TWA używa Chrome WebView. Jeśli na telefonie masz Chrome zaktualizowany, wygląd będzie identyczny. Jeśli stary Android (< 8.0), niektóre style CSS mogą się zachowywać inaczej.

**"Brak polskich znaków w PDF"**

Sprawdź czy `pdf-font.js` jest na hostingu i ładuje się (Network tab w DevTools). Plik ma ~75 KB.

---

## Co masz w paczce

| Plik | Po co |
|---|---|
| `index.html` | Aplikacja (z biblioteką cen inline) |
| `sw.js` | Service Worker — offline cache |
| `manifest.json` | **Zoptymalizowany pod PWABuilder** — ID, scope, screenshots, maskable, shortcuts |
| `pdf-font.js` | Font DejaVu do PDF z polskimi znakami |
| `icons/` | **9 ikon PNG** + 2 maskable + favicon |
| `screenshots/` | **3 zrzuty 390×844** wymagane przez PWABuilder dla wysokiej oceny |
| `INSTALACJA.html` | Strona instrukcji instalacji PWA (dla użytkowników bez APK) |

## Co dalej

Po zrobieniu pierwszego APK:
1. Zapisz `signing.keystore` i hasła w bezpiecznym miejscu (np. pendrive + chmura)
2. Jeśli zmienisz nazwę paczki / klucz w przyszłości → użytkownicy muszą odinstalować starą aplikację
3. Każdy nowy APK z tym samym `Package ID` i tym samym kluczem **aktualizuje** istniejącą instalację (bez utraty danych projektów)
