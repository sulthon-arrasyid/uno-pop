<!-- GSD:project-start source:PROJECT.md -->
## Project

**UNO Pop Deck Simulator**

A single-player web app (PWA) that simulates drawing from a configurable "UNO Pop" card deck — you draw cards one at a time, accumulate safe points, and the round ends when you hit a POP! or UNO! card. It runs fully offline after first load, installs to a phone's home screen, and is built with 100% vanilla HTML/CSS/JS (no framework, no build step). This milestone is a **visual/UX polish pass** to replace the current generic "Bootstrap-basic" look with a cohesive, designed identity.

**Core Value:** The app must feel like a deliberately designed, playful-but-modern product — the moment of drawing a card should be satisfying and the whole UI should have a consistent visual character — **without breaking any existing gameplay, offline, or install behavior.**

### Constraints

- **Tech stack**: Stay 100% vanilla HTML/CSS/JS, no build step — so the app runs on mobile browsers with no extra installation.
- **Compatibility**: Must remain a working offline PWA after first load — any added library must be self-hosted/vendored and added to the service-worker precache (no runtime CDN dependency).
- **Preservation**: Existing flip animation, audio SFX, haptics, deck builder, persistence, and offline/install behavior must all keep working — this is polish, not a rewrite.
- **Accessibility**: Honor `prefers-reduced-motion` for new animations/effects.
- **Mobile-first**: Primary target is mobile; layout and tap targets must stay mobile-friendly.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Overview
## Languages
| Language | Usage | Files |
|----------|-------|-------|
| HTML5 | Markup / app shell | `index.html` |
| CSS3 | Styling, theming, responsive layout, animations | `css/style.css` |
| JavaScript (ES6+) | Game logic, state, rendering, persistence, audio, SW registration | `js/app.js`, `sw.js` |
| SVG | Vector app icon | `assets/icon.svg` |
| JSON | PWA manifest | `manifest.json` |
| YAML | CI/CD deploy config | `.github/workflows/static.yml` |
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
- No React/Vue/Svelte, no CSS framework, no jQuery, no bundler.
- No fonts/CDN dependencies (system font stack: `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`).
## Dependencies
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
- `--bg-dark: #121212`, `--panel-bg: #1e1e1e`
- Card colors: `--card-green: #28a745`, `--card-red: #dc3545`, `--card-gold: #ffc107`
- Accent: `--yellow-title: #FFD700`
- Button colors: `--btn-primary-color: #0f52ba`, `--btn-secondary-color: #4a4a4a`
## Build & Deploy
- **Build:** None. Files shipped as-is.
- **Deploy:** GitHub Pages via GitHub Actions on push to `main` (uploads entire repo root as the artifact).
- **Live URL:** `https://sulthon-arrasyid.github.io/uno-pop/` (per README).
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Code Style
### JavaScript (`js/app.js`, `sw.js`)
- ES6+ syntax: `const`/`let` (no `var`), arrow functions, template literals, spread, destructuring, `Object.assign`.
- 4-space indentation in `js/app.js`; 2-space indentation in `sw.js`.
- Semicolons used consistently; single quotes for strings.
- File organized into numbered banner comment sections (`// === N. Title ===`).
- Defensive patterns: `playAudioSafe()` wraps audio `.play()` in `.catch`; `navigator.vibrate` and `serviceWorker` guarded by feature checks; `parseInt(...) || 0` fallback for deck-builder inputs.
- Immutability leaning: `shuffleArray` copies with `[...array]` rather than mutating input.
- Side effects (audio, haptics, persistence, animation) concentrated in `drawCard()`; display writes concentrated in `render()`.
### CSS (`css/style.css`)
- CSS custom properties in `:root` for all theme colors.
- Global reset (`* { box-sizing; margin; padding; user-select: none }`).
- BEM-ish modifier pattern: base class + variant (`.card.green`, `.status-message.danger`, `.btn-primary`).
- Animation via `@keyframes` + a trigger class (`.animate-flip`) re-applied from JS using a forced reflow.
- Mobile-friendly: `-webkit-tap-highlight-color: transparent`, `user-select: none`, tap targets `min-height: 50px`, single responsive breakpoint `@media (max-width: 400px)`.
- Section comments in Indonesian (`/* Tampilan Kartu Utama */`).
### HTML (`index.html`)
- Semantic sectioning: `header`, `section` with role-conveying classes.
- `lang="id"` (Indonesian).
- Script loaded with `defer`.
- Panel visibility toggled via inline `style="display: none;"` manipulated from JS.
## Naming
- JS constants: `UPPER_SNAKE_CASE` (`STORAGE_KEY`).
- JS functions/vars: `camelCase` (`drawCard`, `buildCustomDeck`, `playAudioSafe`).
- HTML IDs: kebab-case; buttons prefixed `btn-`, number inputs prefixed `input-`.
- CSS classes: kebab-case; CSS vars grouped by role prefix (`--card-*`, `--btn-*`).
- Card vocabulary: types `safe` / `pop` / `uno`; colors `green` / `red` / `gold`; status types `ready|safe|danger|warning`.
## State & Persistence Pattern
- Single source of truth: the `state` object.
- Mutate state in handlers → `saveState()` → `render()`.
- `render()` reads the whole `state` and rewrites all dynamic DOM (`textContent`, `className`, rebuilt `#history-list`).
- Full `state` is persisted verbatim to `localStorage` (`JSON.stringify`) and restored with `Object.assign` on load.
- DOM references cached once in the `DOM` object at startup.
## Error Handling
- Pragmatic/defensive rather than exhaustive:
- No try/catch around `JSON.parse(loadState)` (a corrupted save could throw — see CONCERNS.md).
- No user-facing error UI.
## Comments & Documentation
- Numbered banner comments structure `js/app.js`.
- Indonesian comments throughout JS/CSS/HTML and UI copy.
- `README.md` documents purpose, features, and structure (Indonesian).
## Language
- UI text and most comments are in **Indonesian**; identifiers and keywords are English.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern
## Layers
- **Presentation** — `css/style.css` (theme variables, layout, `@keyframes flipCard` animation, state-driven classes)
- **Structure** — `index.html` (app shell with fixed element IDs)
- **Offline** — `sw.js` (cache-first service worker)
## Data Flow
```
```
- **Single source of truth:** the `state` object (`deck`, `drawnCards`, `accumulation`, `activeCard`, `isGameOver`, `statusText`, `statusType`).
- **Persistence:** every state-changing path calls `saveState()`; startup calls `loadState()` and resumes the saved game if present.
- **Full re-render:** every change calls `render()`, which rewrites status fields, the active card, and rebuilds `#history-list`.
- **Animation trigger:** after `render()`, `drawCard()` removes and re-adds `.animate-flip`, forcing a reflow with `void DOM.activeCard.offsetWidth` so the CSS keyframe animation replays each draw.
## Core Game Logic
- **Deck:** built dynamically by `buildCustomDeck()` from number inputs in the deck-builder panel. Always seeds one `+0` safe card, then appends user-configured counts of `+1/+2/+3` (safe), `POP! +1/+2` (pop), and `UNO!` (uno). Defaults: 5×+1, 2×+2, 1×+3, 1×POP1, 1×POP2, 1×UNO.
- **Shuffle:** Fisher–Yates (`shuffleArray`) on a copy.
- **Draw:** `state.deck.pop()` from the end of the shuffled array; plays SFX + haptic by card type.
- **Terminal conditions** (`isGameOver = true`): drawing a `pop`, drawing a `uno`, or exhausting the deck on a `safe` draw.
## Side Effects
- Audio (`playAudioSafe`)
- Haptics (`navigator.vibrate`)
- Persistence (`saveState`)
- Animation replay
## Key Abstractions
- **`DOM` lookup cache** — all `getElementById` resolved once at load.
- **`state` object** — centralized mutable game data, persisted verbatim.
- **`playAudioSafe(el)`** — defensive wrapper so missing/blocked audio never crashes gameplay.
- **`buildCustomDeck()`** — turns UI inputs into a deck array (config → data).
- **Status "type" strings** (`ready/safe/danger/warning`) — state→CSS-class mapping.
## Entry Points
- **App bootstrap:** `js/app.js` loaded with `defer`; at the bottom, listeners attach and `initGame()` runs (resumes saved game or builds a fresh one).
- **Service worker bootstrap:** registered on `window.load`, separate from app init.
- **PWA install entry:** `manifest.json` + `start_url: ./index.html`.
## Notable Design Choices
- Full re-render is fine because the DOM is small.
- No router — single view; deck-builder panel toggled via inline `style.display`.
- `innerHTML` used for the active card label (`label.replace(' ', '<br>')`); labels are hardcoded constants.
- Deck-builder inputs are read live at build time (not stored in `state`).
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
