# STACK

Technology stack for the UNO Pop Deck Simulator.

## Overview

A **100% vanilla** Progressive Web App (PWA). No frameworks, no libraries, no build step, no package manager. Source files are served directly as static assets.

## Languages

| Language | Usage | Files |
|----------|-------|-------|
| HTML5 | Markup / app shell | `index.html` |
| CSS3 | Styling, theming, responsive layout, animations | `css/style.css` |
| JavaScript (ES6+) | Game logic, state, rendering, persistence, audio, SW registration | `js/app.js`, `sw.js` |
| SVG | Vector app icon | `assets/icon.svg` |
| JSON | PWA manifest | `manifest.json` |
| YAML | CI/CD deploy config | `.github/workflows/static.yml` |

**JS features in use:** `const`/`let`, arrow functions, spread (`[...array]`), destructuring swap, template literals, Promises (`.then`/`.catch`), `async` audio `play()` promise handling, `Object.assign`, `JSON.parse`/`stringify`, `addEventListener`.

**Browser Web APIs in use:**
- `localStorage` — game state persistence (key `unoPopSaveData`)
- `Audio` — sound effects
- `navigator.vibrate` — haptic feedback
- `navigator.serviceWorker` — offline caching
- CSS `@keyframes` + `animation` — 3D card flip

## Runtime

- **Target:** Modern browsers (desktop + mobile). No transpilation, so runtime must support ES6+ natively.
- **No Node runtime** required for the app itself — pure client-side static content.
- Node is only present via the GSD tooling (`.kiro/get-shit-done/bin/gsd-tools.cjs`), not the application.

## Frameworks & Libraries

**None.** Intentionally vanilla: HTML5 semantics, pure CSS3, and Vanilla JavaScript with no external framework or library.

- No React/Vue/Svelte, no CSS framework, no jQuery, no bundler.
- No fonts/CDN dependencies (system font stack: `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`).

## Dependencies

No `package.json`, no lockfile, no `node_modules`. Zero third-party runtime dependencies.

## Assets

| Asset | Path | Notes |
|-------|------|-------|
| App icon | `assets/icon.svg` | 512x512 vector, red "POP!" card on dark bg |
| Draw SFX | `assets/audio/draw.mpeg` | Played on safe draw |
| Pop SFX | `assets/audio/pop.mpeg` | Played on POP! card |
| Uno SFX | `assets/audio/uno.mpeg` | Played on UNO! card |

## Configuration Files

| File | Purpose |
|------|---------|
| `manifest.json` | PWA metadata: name, icons, theme/background color, `display: standalone`, `start_url: ./index.html` |
| `sw.js` | Service worker — cache name `unopop-cache-v2` and precache list |
| `.github/workflows/static.yml` | GitHub Actions workflow deploying the repo root to GitHub Pages |

## Theming

CSS custom properties define the dark theme in `css/style.css` (`:root`):
- `--bg-dark: #121212`, `--panel-bg: #1e1e1e`
- Card colors: `--card-green: #28a745`, `--card-red: #dc3545`, `--card-gold: #ffc107`
- Accent: `--yellow-title: #FFD700`
- Button colors: `--btn-primary-color: #0f52ba`, `--btn-secondary-color: #4a4a4a`

Theme color `#121212` is declared in `index.html`; `manifest.json` declares `theme_color: #1e1e1e` (minor mismatch).

## Build & Deploy

- **Build:** None. Files shipped as-is.
- **Deploy:** GitHub Pages via GitHub Actions on push to `main` (uploads entire repo root as the artifact).
- **Live URL:** `https://sulthon-arrasyid.github.io/uno-pop/` (per README).
