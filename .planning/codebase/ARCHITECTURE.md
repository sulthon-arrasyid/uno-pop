# ARCHITECTURE

System design and patterns for the UNO Pop Deck Simulator.

## Pattern

**Single-page vanilla PWA** following a lightweight **unidirectional state → render** pattern (a hand-rolled approximation of the Elm/Redux "single source of truth" idea), with explicit *Separation of Concerns* across HTML (structure), CSS (presentation), and JS (behavior).

There is no framework, no component system, and no virtual DOM. All logic lives in a single script, `js/app.js`.

## Layers

The app separates concerns by file type and by sections within `js/app.js`:

1. **Structure layer** — `index.html`
   - Static app shell with semantic sections: `header`, `.status-panel`, `.card-display`, `.actions`, `.history-panel`
   - Elements carry fixed IDs (`deck-count`, `active-card`, `btn-draw`, etc.) used as render targets

2. **Presentation layer** — `css/style.css`
   - Theme via CSS variables in `:root`
   - State-driven styling via class names (`.status-message.safe/.danger/.warning`, `.card.green/.red/.gold/.empty`)

3. **Logic layer** — `js/app.js`, organized into labelled sections:
   - `Game Data & State` — `DECK_COMPOSITION` constant + `state` object
   - `DOM References` — cached `getElementById` lookups in `DOM`
   - `Core Functions` — `shuffleArray`, `initGame`, `drawCard`, `render`
   - `Event Listeners & Init`
   - `PWA Service Worker Registration`

4. **Offline/caching layer** — `sw.js` (cache-first service worker)

## Data Flow

Unidirectional:

```
User click (btn-draw / btn-reset)
      │
      ▼
Event handler (drawCard / initGame)
      │  mutates
      ▼
state object  ◄── single source of truth
      │
      ▼
render()  ── reads state, writes to DOM (full re-paint of dynamic parts)
```

- **Single source of truth:** the `state` object holds `deck`, `drawnCards`, `accumulation`, `activeCard`, `isGameOver`, `statusText`, `statusType`.
- **No partial/diff updates:** every state change calls `render()`, which rewrites `textContent`/`innerHTML`/`className` for all dynamic elements and fully rebuilds `#history-list` each time.
- **Derived values** (e.g. POP penalty `accumulation + card.value`) are computed inside handlers, not stored.

## Core Game Logic

Defined in `js/app.js`:
- **Deck:** 12 cards in `DECK_COMPOSITION` — 9 `safe` (green, +0..+3), 2 `pop` (red), 1 `uno` (gold).
- **Shuffle:** Fisher–Yates in `shuffleArray` (copies the array, does not mutate the source).
- **Draw:** `state.deck.pop()` takes from the end of the shuffled array.
- **Terminal conditions** (set `isGameOver = true`): drawing a `pop` card, drawing the `uno` card, or exhausting the deck on a `safe` draw.

## Key Abstractions

- **`DOM` lookup cache** — avoids repeated `getElementById` calls; all references resolved once at load.
- **`state` object** — centralizes mutable game data.
- **`render()`** — the sole function allowed to touch the DOM for display updates; keeps side effects in one place.
- **Status "type" strings** (`ready`/`safe`/`danger`/`warning`) — a small state→CSS-class mapping convention.

## Entry Points

- **App bootstrap:** `js/app.js` is loaded with `defer` in `index.html`; at the bottom of the file, event listeners are attached and `initGame()` runs immediately to set up a shuffled deck and initial render.
- **Service worker bootstrap:** registered on `window.load` (`navigator.serviceWorker.register('./sw.js')`), separate from app init to avoid blocking first paint.
- **PWA install entry:** `manifest.json` + `start_url: ./index.html`.

## Notable Design Choices

- Full re-render on every change is acceptable here because the DOM is tiny (fixed status fields + a small history list).
- No router — single view.
- Rendering uses `innerHTML` for the active card label (`label.replace(' ', '<br>')`) and `textContent` for history item labels.
