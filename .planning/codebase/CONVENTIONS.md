# CONVENTIONS

Code style, naming, and patterns observed in the codebase.

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
  - Audio: `playAudioSafe()` catches and warns, never throws into gameplay.
  - Service worker registration `.catch` logs an info message.
  - Deck-builder inputs: `parseInt(...) || 0` guards NaN/empty.
  - `drawCard()` early-returns when `isGameOver` or deck empty.
- No try/catch around `JSON.parse(loadState)` (a corrupted save could throw — see CONCERNS.md).
- No user-facing error UI.

## Comments & Documentation

- Numbered banner comments structure `js/app.js`.
- Indonesian comments throughout JS/CSS/HTML and UI copy.
- `README.md` documents purpose, features, and structure (Indonesian).

## Language

- UI text and most comments are in **Indonesian**; identifiers and keywords are English.
