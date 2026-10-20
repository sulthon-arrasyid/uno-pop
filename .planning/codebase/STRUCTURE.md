# STRUCTURE

Directory layout, key file locations, and naming conventions.

## Directory Layout

```text
uno-pop/
├── index.html                  # App shell / entry point, PWA meta tags
├── manifest.json               # PWA manifest (name, icon, theme, display)
├── sw.js                       # Service worker (offline caching)
├── README.md                   # Project overview (Indonesian)
├── css/
│   └── style.css               # Theme variables, layout, component styling
├── js/
│   └── app.js                  # Game logic, state, rendering, SW registration
├── assets/
│   └── icon.svg                # Vector app icon (512x512)
├── .github/
│   └── workflows/
│       └── static.yml          # GitHub Pages deploy workflow
├── .kiro/                       # Kiro IDE config (skills, steering, GSD tooling)
└── .planning/
    └── codebase/                # This codebase map
```

## Key Locations

| Concern | Location |
|---------|----------|
| App entry / markup | `index.html` |
| Game logic & state | `js/app.js` |
| Deck definition | `DECK_COMPOSITION` in `js/app.js` |
| Game state object | `state` in `js/app.js` |
| DOM element cache | `DOM` in `js/app.js` |
| Rendering | `render()` in `js/app.js` |
| Styling & theme | `css/style.css` (`:root` variables) |
| Offline caching | `sw.js` (`CACHE_NAME`, `urlsToCache`) |
| PWA config | `manifest.json` |
| App icon | `assets/icon.svg` |
| Deployment | `.github/workflows/static.yml` |

## Naming Conventions

### Files & folders
- Lowercase filenames; assets grouped by type into `css/`, `js/`, `assets/`.
- Standard PWA filenames: `manifest.json`, `sw.js`.

### HTML IDs (render targets)
- kebab-case: `deck-count`, `accum-count`, `game-status`, `active-card`, `active-card-value`, `btn-draw`, `btn-reset`, `history-list`, `history-count`.
- Button IDs prefixed with `btn-`.

### CSS classes
- kebab-case, semantic block names: `.app-container`, `.status-panel`, `.status-row`, `.status-message`, `.card-display`, `.history-panel`, `.history-list`, `.history-item`.
- State/variant modifiers share a base class: `.status-message.safe`, `.card.green`, `.history-item.gold`.
- CSS variables namespaced by role: `--bg-*`, `--card-*`, `--btn-*`, `--text-*`.

### JavaScript
- `UPPER_SNAKE_CASE` for constants: `DECK_COMPOSITION`.
- `camelCase` for functions and variables: `shuffleArray`, `initGame`, `drawCard`, `render`, `accumulation`.
- Grouped singletons as objects: `state`, `DOM`.
- Card objects use a consistent shape: `{ type, value, label, color }` where `type` ∈ `safe|pop|uno` and `color` ∈ `green|red|gold`.

## Conventions for Adding Code

- New UI element: add markup + ID in `index.html`, add a reference in the `DOM` object, style in `css/style.css`, and update `render()` in `js/app.js`.
- New asset to cache offline: add its path to both the served files and the `urlsToCache` array in `sw.js`, then bump `CACHE_NAME`.
- Language: UI text and comments are primarily in Indonesian.
