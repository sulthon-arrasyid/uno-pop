# STRUCTURE

Directory layout, key file locations, and naming conventions.

## Directory Layout

```text
uno-pop/
├── index.html                  # App shell / entry point, PWA meta, deck-builder + game UI
├── manifest.json               # PWA manifest (name, icon, theme, display)
├── sw.js                       # Service worker (offline caching, cache v2)
├── README.md                   # Project overview (Indonesian)
├── css/
│   └── style.css               # Theme variables, layout, flip animation, component styling
├── js/
│   └── app.js                  # Audio, state, persistence, deck building, game logic, render, SW reg
├── assets/
│   ├── icon.svg                # Vector app icon (512x512)
│   └── audio/
│       ├── draw.mpeg           # Safe-draw sound
│       ├── pop.mpeg            # POP! sound
│       └── uno.mpeg            # UNO! sound
├── .github/
│   └── workflows/
│       └── static.yml          # GitHub Pages deploy workflow
├── .kiro/                       # Kiro IDE config (skills, steering, GSD tooling)
└── .planning/                   # GSD planning docs
    └── codebase/                # This codebase map
```

## Key Locations

| Concern | Location |
|---------|----------|
| App entry / markup | `index.html` |
| Game logic & state | `js/app.js` |
| Deck construction | `buildCustomDeck()` in `js/app.js` |
| Game state object | `state` in `js/app.js` |
| Persistence | `saveState()` / `loadState()` in `js/app.js` (key `unoPopSaveData`) |
| DOM element cache | `DOM` in `js/app.js` |
| Audio | top of `js/app.js` + `assets/audio/` |
| Haptics | `drawCard()` in `js/app.js` |
| Rendering | `render()` in `js/app.js` |
| Styling & theme | `css/style.css` (`:root` variables) |
| Card flip animation | `@keyframes flipCard` + `.card.animate-flip` in `css/style.css` |
| Offline caching | `sw.js` (`CACHE_NAME`, `urlsToCache`) |
| PWA config | `manifest.json` |
| Deployment | `.github/workflows/static.yml` |

## Naming Conventions

### Files & folders
- Lowercase filenames; assets grouped by type into `css/`, `js/`, `assets/`, `assets/audio/`.
- Standard PWA filenames: `manifest.json`, `sw.js`.

### HTML IDs (render targets & inputs)
- kebab-case: `deck-count`, `accum-count`, `game-status`, `active-card`, `active-card-value`, `btn-draw`, `btn-reset`, `btn-toggle-settings`, `btn-save-deck`, `deck-builder-panel`, `history-list`, `history-count`.
- Buttons prefixed `btn-`; deck-builder number inputs prefixed `input-` (`input-plus1`, `input-pop1`, `input-uno`, …).

### CSS classes
- kebab-case, semantic block names: `.app-container`, `.deck-builder`, `.input-group`, `.status-panel`, `.status-row`, `.status-message`, `.card-display`, `.history-panel`, `.history-list`, `.history-item`.
- Variant modifiers share a base class: `.status-message.safe`, `.card.green`, `.history-item.gold`.
- Button style classes: `.btn-primary`, `.btn-secondary`.
- Animation class: `.animate-flip`.
- CSS variables namespaced by role: `--bg-*`, `--card-*`, `--btn-*`, `--text-*`.

### JavaScript
- `UPPER_SNAKE_CASE` for constants: `STORAGE_KEY`.
- `camelCase` for functions/variables: `buildCustomDeck`, `shuffleArray`, `initGame`, `drawCard`, `render`, `playAudioSafe`, `saveState`, `loadState`.
- Grouped singletons as objects: `state`, `DOM`.
- Card object shape: `{ type, value, label, color }` where `type` ∈ `safe|pop|uno`, `color` ∈ `green|red|gold`.
- File divided by numbered banner comments (`// 1. ...`, `// 2. ...`).

## Conventions for Adding Code

- New UI element: add markup + ID in `index.html`, add a reference in the `DOM` object, style in `css/style.css`, update `render()` in `js/app.js`.
- New card type: extend `buildCustomDeck()` (and its inputs), plus color classes in CSS, plus draw-handling branch in `drawCard()`.
- New cached asset: add its path to `urlsToCache` in `sw.js` and bump `CACHE_NAME`.
- Language: UI text and comments are primarily in Indonesian.
