# INTEGRATIONS

External services, APIs, and browser platform integrations.

## Summary

Standalone, offline-first client app. **No backend, no database server, no authentication, no external APIs.** All integrations are with browser platform capabilities and the GitHub Pages hosting/deploy pipeline.

## External APIs

**None.** No `fetch` calls to third-party endpoints. The only `fetch` usage is inside `sw.js` for cache-fallback of same-origin assets.

## Persistence

### Browser localStorage — `js/app.js`
- **Key:** `unoPopSaveData`
- **What:** The entire `state` object (deck, drawnCards, accumulation, activeCard, isGameOver, statusText, statusType), serialized with `JSON.stringify`.
- **When saved:** After every `initGame()` setup and every `drawCard()` (`saveState()`).
- **When loaded:** On startup via `loadState()` → `Object.assign(state, JSON.parse(...))`; if no save exists, a fresh game is built.
- No IndexedDB, no server-side storage.

## Authentication / Authorization

**None.** No login, users, sessions, or auth providers.

## Browser Platform Integrations

### Service Worker — `sw.js`
Registered from `js/app.js` on `window.load`. Offline support via Cache Storage API.
- **Cache name:** `unopop-cache-v2`
- **Precache list:** `./`, `./index.html`, `./css/style.css`, `./js/app.js`, `./manifest.json`, `./assets/icon.svg`
- **Strategy:** Cache-first with network fallback.
- **Lifecycle:** `skipWaiting()` on install, `clients.claim()` on activate, deletes stale caches on `activate`.

### Audio — `js/app.js`
Three `Audio` objects (`assets/audio/draw.mpeg`, `pop.mpeg`, `uno.mpeg`) played via `playAudioSafe()`, which resets `currentTime` and swallows play errors with `.catch` (handles autoplay restrictions / missing files gracefully).

### Haptics — `js/app.js`
`navigator.vibrate(...)` on draw: 50ms for safe cards, 200ms for pop/uno. Guarded by feature check.

### Web App Manifest — `manifest.json`
Installable PWA: `display: standalone`, `start_url: ./index.html`, single SVG icon (`purpose: "any maskable"`). Apple PWA meta tags in `index.html`.

## Hosting & CI/CD

### GitHub Pages — `.github/workflows/static.yml`
- Triggers: push to `main`, or manual `workflow_dispatch`.
- Permissions: `pages: write`, `id-token: write`, `contents: read`.
- Actions: `actions/checkout@v4`, `actions/configure-pages@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`.
- Uploads entire repo root (`path: '.'`) as the Pages artifact.
- Concurrency group `pages` prevents overlapping deploys.

## Webhooks / Messaging / Analytics

**None.** No webhooks, push notifications, analytics, or telemetry.
