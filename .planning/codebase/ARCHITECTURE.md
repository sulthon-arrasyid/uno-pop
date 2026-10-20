# ARCHITECTURE

System design and patterns for the UNO Pop Deck Simulator.

## Pattern

**Single-page vanilla PWA** following a lightweight **unidirectional state → render** pattern, with *Separation of Concerns* across HTML (structure), CSS (presentation), and JS (behavior). No framework, no component system, no virtual DOM. All logic lives in `js/app.js`.

## Layers

`js/app.js` is organized into numbered comment sections:
1. **Audio init** — three `Audio` objects + `playAudioSafe()` guard
2. **State & globals** — `STORAGE_KEY`, the `state` object, the `DOM` reference cache
3. **localStorage system** — `saveState()`, `loadState()`
4. **Deck building** — `buildCustomDeck()` (reads number inputs), `shuffleArray()` (Fisher–Yates)
5. **Game logic** — `initGame(forceReset)`, `drawCard()`
6. **UI renderer** — `render()`
7. **Event listeners & bootstrapping** — wiring + initial `initGame()` + SW registration

Supporting layers:
- **Presentation** — `css/style.css` (theme variables, layout, `@keyframes flipCard` animation, state-driven classes)
- **Structure** — `index.html` (app shell with fixed element IDs)
- **Offline** — `sw.js` (cache-first service worker)

## Data Flow

Unidirectional, now with persistence:

```
User action (draw / reset / save-deck)
      │
      ▼
Handler (drawCard / initGame)
      │  mutates
      ▼
state object  ◄── single source of truth
      │
      ├─► saveState()  → localStorage ('unoPopSaveData')
      │
      ▼
render()  → reads state, writes all dynamic DOM
      │
      ▼
(drawCard only) re-trigger .animate-flip via forced reflow
```

- **Single source of truth:** the `state` object (`deck`, `drawnCards`, `accumulation`, `activeCard`, `isGameOver`, `statusText`, `statusType`).
- **Persistence:** every state-changing path calls `saveState()`; startup calls `loadState()` and resumes the saved game if present.
- **Full re-render:** every change calls `render()`, which rewrites status fields, the active card, and rebuilds `#history-list`.
- **Animation trigger:** after `render()`, `drawCard()` removes and re-adds `.animate-flip`, forcing a reflow with `void DOM.activeCard.offsetWidth` so the CSS keyframe animation replays each draw.

## Core Game Logic

Defined in `js/app.js`:
- **Deck:** built dynamically by `buildCustomDeck()` from number inputs in the deck-builder panel. Always seeds one `+0` safe card, then appends user-configured counts of `+1/+2/+3` (safe), `POP! +1/+2` (pop), and `UNO!` (uno). Defaults: 5×+1, 2×+2, 1×+3, 1×POP1, 1×POP2, 1×UNO.
- **Shuffle:** Fisher–Yates (`shuffleArray`) on a copy.
- **Draw:** `state.deck.pop()` from the end of the shuffled array; plays SFX + haptic by card type.
- **Terminal conditions** (`isGameOver = true`): drawing a `pop`, drawing a `uno`, or exhausting the deck on a `safe` draw.

## Side Effects

Concentrated in `drawCard()`:
- Audio (`playAudioSafe`)
- Haptics (`navigator.vibrate`)
- Persistence (`saveState`)
- Animation replay

`render()` is the only function that writes display DOM.

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
