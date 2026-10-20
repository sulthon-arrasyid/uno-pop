# STACK

Technology stack for the UNO Pop Deck Simulator.

## Overview

A **100% vanilla** Progressive Web App (PWA). No frameworks, no libraries, no build step, no package manager. Source files are served directly as static assets.

## Languages

| Language | Usage | Files |
|----------|-------|-------|
| HTML5 | Markup / app shell | `index.html` |
| CSS3 | Styling, theming, responsive layout | `css/style.css` |
| JavaScript (ES6+) | Game logic, state, DOM rendering, SW registration | `js/app.js`, `sw.js` |
| SVG | Vector app icon | `assets/icon.svg` |
| JSON | PWA manifest | `manifest.json` |
| YAML | CI/CD deploy config | `.github/workflows/static.yml` |

**JS features in use:** `const`/`let`, arrow functions, spread (`[...array]`), destructuring swap (`[a, b] = [b, a]`), template literals, Promises (`.then`/`.catch`), `addEventListener`.

## Runtime

- **Target:** Modern browsers (desktop + mobile). No transpilation, so runtime must support ES6+ natively.
- **No Node runtime** required for the app itself — it is pure client-side static content.
- Node is only present via the GSD tooling (`.kiro/get-shit-done/bin/gsd-tools.cjs`), not the application.

## Frameworks & Libraries

**None.** This is intentional per the README: HTML5 semantics, pure CSS3, and Vanilla JavaScript with no external framework or library.

- No React/Vue/Svelte
- No CSS framework (Tailwind/Bootstrap)
- No jQuery
- No bundler (Webpack/Vite/Rollup)
- No fonts/CDN dependencies (uses system font stack: `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`)

## Dependencies

No `package.json`, no lockfile, no `node_modules`. Zero third-party runtime dependencies.

## Configuration Files

| File | Purpose |
|------|---------|
| `manifest.json` | PWA metadata: name, icons, theme/background color, `display: standalone`, `start_url: ./index.html` |
| `sw.js` | Service worker — cache name `unopop-cache-v1` and precache list |
| `.github/workflows/static.yml` | GitHub Actions workflow deploying the repo root to GitHub Pages |

## Theming

CSS custom properties define the dark theme in `css/style.css` (`:root`):
- `--bg-dark: #121212`, `--panel-bg: #1e1e1e`
- Card colors: `--card-green: #28a745`, `--card-red: #dc3545`, `--card-gold: #ffc107`
- Button colors: `--btn-primary: #0f52ba`, `--btn-reset: #4a4a4a`

Theme color `#121212` is declared in both `index.html` (`<meta name="theme-color">`) and (slightly differently as `#1e1e1e`) in `manifest.json`.

## Build & Deploy

- **Build:** None. Files are shipped as-is.
- **Deploy:** GitHub Pages via GitHub Actions on push to `main` (uploads entire repo root as the artifact).
- **Live URL:** `https://sulthon-arrasyid.github.io/uno-pop/` (per README).
