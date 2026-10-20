# INTEGRATIONS

External services, APIs, and browser platform integrations for UNO Pop Deck Simulator.

## Summary

This is a **standalone, offline-first client app**. It has **no backend, no database, no authentication, and no external APIs**. All integrations are with browser platform capabilities and the GitHub Pages hosting/deploy pipeline.

## External APIs

**None.** No `fetch` calls to third-party endpoints. The only `fetch` usage is inside the service worker (`sw.js`) for cache-fallback of same-origin assets.

## Databases / Persistence

**None.** Game state lives only in the in-memory `state` object in `js/app.js`. There is:
- No `localStorage` / `sessionStorage`
- No IndexedDB
- No server-side storage

State is lost on page reload (except cached static assets served by the service worker).

## Authentication / Authorization

**None.** No login, no users, no sessions, no auth providers.

## Browser Platform Integrations

### Service Worker — `sw.js`
Registered from `js/app.js` on `window.load`:

```js
navigator.serviceWorker.register('./sw.js')
```

Provides offline support via the Cache Storage API.

- **Cache name:** `unopop-cache-v1`
- **Precache list** (`install` event): `./`, `./index.html`, `./css/style.css`, `./js/app.js`, `./manifest.json`, `./assets/icon.svg`
- **Strategy:** Cache-first with network fallback (`fetch` handler returns `caches.match(request) || fetch(request)`)
- **Lifecycle:** `skipWaiting()` on install, `clients.claim()` on activate, deletes old caches on `activate`.

### Web App Manifest — `manifest.json`
Enables "Add to Home Screen" / installable PWA:
- `display: standalone`, `start_url: ./index.html`
- Single SVG icon (`assets/icon.svg`, 512x512, `purpose: "any maskable"`)
- Apple PWA meta tags in `index.html` (`apple-mobile-web-app-capable`, status bar style, title)

## Hosting & CI/CD

### GitHub Pages — `.github/workflows/static.yml`
- Triggers: push to `main`, or manual `workflow_dispatch`
- Permissions: `pages: write`, `id-token: write`, `contents: read`
- Actions used: `actions/checkout@v4`, `actions/configure-pages@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`
- Uploads the entire repo root (`path: '.'`) as the Pages artifact
- Concurrency group `pages` prevents overlapping deploys

## Webhooks / Messaging / Analytics

**None.** No webhooks, push notifications, analytics, or telemetry.
