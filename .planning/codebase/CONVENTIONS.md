# CONVENTIONS

Code style, naming, and patterns observed in the codebase.

## Code Style

### JavaScript (`js/app.js`, `sw.js`)
- ES6+ syntax: `const`/`let` (no `var`), arrow functions, template literals, spread, destructuring.
- 4-space indentation in `js/app.js`; 2-space indentation in `sw.js`.
- Semicolons used consistently.
- Single quotes for strings.
- File organized into labelled comment sections, e.g. `// --- Core Functions ---`, `// --- DOM References ---`.
- Immutability leaning: `shuffleArray` copies with `[...array]` rather than mutating the input.
- Side effects concentrated in `render()`; game logic functions mutate `state` then call `render()`.

### CSS (`css/style.css`)
- CSS custom properties in `:root` for all theme colors.
- Global reset (`* { box-sizing; margin; padding; user-select: none }`).
- BEM-ish modifier pattern: base class + variant (`.card.green`, `.status-message.danger`).
- Mobile-first touches: `-webkit-tap-highlight-color: transparent`, `user-select: none`, single responsive breakpoint `@media (max-width: 400px)`.
- Mobile tap targets: buttons have `min-height: 60px`.

### HTML (`index.html`)
- Semantic sectioning: `header`, `section` with role-conveying classes.
- `lang="id"` (Indonesian).
- Script loaded with `defer`.
- PWA + Apple meta tags grouped at the top of `<head>`.

## Naming

- JS constants: `UPPER_SNAKE_CASE` (`DECK_COMPOSITION`).
- JS functions/vars: `camelCase` (`drawCard`, `accumulation`).
- HTML IDs: kebab-case (`active-card-value`); buttons prefixed `btn-`.
- CSS classes: kebab-case; CSS vars grouped by role prefix (`--card-*`, `--btn-*`).
- Card status types are a fixed vocabulary: `safe` / `pop` / `uno` (logic), mapped to colors `green` / `red` / `gold` and status types `ready|safe|danger|warning`.

## State Management Pattern

- Single source of truth: the `state` object.
- Mutate state in event handlers, then call `render()` once.
- `render()` reads the whole `state` and writes all dynamic DOM (`textContent`, `className`, rebuilt `#history-list`).
- DOM references cached once in the `DOM` object at startup.

## Error Handling

- Minimal. The only explicit handling is the service worker registration `.then()/.catch()` logging success/failure to the console.
- Defensive guard in `drawCard()`: early-returns when `state.isGameOver || state.deck.length === 0`.
- No try/catch, no user-facing error UI, no input validation (there is no user text input to validate).

## Comments & Documentation

- Inline section-header comments in JS.
- Indonesian comments in `.github/workflows/static.yml` and UI copy.
- `README.md` documents purpose, features, and structure (in Indonesian).

## Language

- UI text and most comments are in **Indonesian**; identifiers and keywords are English.
