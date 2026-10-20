# CONCERNS

Technical debt, bugs, security, performance, and fragile areas.

Severity legend: 🔴 High · 🟡 Medium · 🟢 Low / minor

## Testing & Quality

- 🟡 **No automated tests and no CI checks.** `.github/workflows/static.yml` deploys straight to GitHub Pages with no lint/test gate. See `TESTING.md`.
- 🟢 **No linter/formatter config** (no ESLint/Prettier). Indentation differs between files (4 spaces in `js/app.js`, 2 in `sw.js`).

## Persistence — Bugs & Fragile Areas

- 🟡 **Unguarded `JSON.parse` on load.** `loadState()` in `js/app.js` does `Object.assign(state, JSON.parse(savedData))` with no try/catch. A corrupted or tampered `unoPopSaveData` value throws on startup and can leave the app in a broken state (nothing renders). Wrap in try/catch and fall back to a fresh game.
- 🟡 **No schema/version validation on loaded save.** The entire `state` is trusted as-is. If the save shape changes in a future version (e.g. new card fields), old saves may render incorrectly. Consider a `schemaVersion` and migration/fallback.
- 🟢 **Save persists `isGameOver: true` states.** Reloading mid-"game over" restores the finished state (draw button disabled). Intended-ish, but worth confirming it matches desired UX.

## Game Logic — Fragile Areas

- 🟡 **`.replace(' ', '<br>')` for card label line breaks is implicit.** In `render()`, `"POP! +1"` wraps because it has a space; `"UNO!"` and `"+1"` do not. Changing a label's spacing silently changes layout.
- 🟢 **`innerHTML` used for the active card label.** Labels are hardcoded constants in `buildCustomDeck()`, so not an injection vector today, but fragile if labels ever become dynamic/user-supplied.
- 🟢 **Deck-builder has no upper bound / no total validation.** Number inputs accept any non-negative integer; a user could enter huge values. Only a single `+0` safe card is guaranteed. No warning if a deck is all-POP or has zero safe cards beyond the seeded `+0`.
- 🟢 **Deck count denominator is derived at render time** (`deck.length + drawnCards.length`), which is correct now — but note the initial HTML shows a hardcoded `12/12` placeholder in `index.html` before first render.

## PWA / Service Worker — `sw.js`

- 🟡 **Cache-first with manual versioning.** `fetch` returns cached responses first; app-shell updates only reach users when `CACHE_NAME` is bumped (currently `unopop-cache-v2`). **Deploying new code requires incrementing `CACHE_NAME`**, otherwise returning users keep stale assets. No network-first or stale-while-revalidate for navigations.
- 🟡 **Audio files are NOT precached.** `urlsToCache` lists `icon.svg` but omits `assets/audio/draw.mpeg`, `pop.mpeg`, `uno.mpeg`. Offline users (or first POP! before the file is fetched) may get no sound. Add them to the precache list (and bump `CACHE_NAME`).
- 🟢 **`.mpeg` audio extension is unusual.** Files are named `*.mpeg`; MP3 audio is conventionally `.mp3`. Verify the actual codec/MIME is served correctly by GitHub Pages, as some hosts map `.mpeg` to video MIME types which can block `<audio>` playback.
- 🟢 **`urlsToCache` must be kept in sync manually.** Adding assets without updating this array breaks offline availability.
- 🟢 **No fetch error fallback** if both cache and network miss.

## Manifest / Icons

- 🟡 **Single SVG icon only.** `manifest.json` declares one `assets/icon.svg` (512x512, `purpose: "any maskable"`). SVG manifest icons have inconsistent install support (some Android/Chrome flows prefer PNG). Consider adding PNG 192 & 512.
- 🟢 **Theme color mismatch.** `index.html` `theme-color` is `#121212` while `manifest.json` `theme_color` is `#1e1e1e`.
- 🟢 **`index.html` dropped `apple-mobile-web-app-capable` / status-bar-style tags** that an earlier version had (only `mobile-web-app-capable` and `apple-mobile-web-app-title` remain). Minor iOS standalone polish regression.

## UI / Polish (relevant to the current milestone)

- 🟢 **Deck-builder toggled via inline `style.display`.** Works, but mixing inline style state with CSS makes transitions/animations on the panel harder; consider a class-based toggle.
- 🟢 **Status panel & deck-builder lean "form-like"** (dashed border, plain number inputs) versus the playful card area — visual inconsistency to address during polish.
- 🟢 **No reduced-motion handling.** The flip animation and (future) effects don't respect `prefers-reduced-motion`; add a media-query guard for accessibility.

## Security

- 🟢 **Low overall risk.** Static client-only app: no backend, no auth, no secrets, no external API calls. No secrets found in the repository.
- 🟢 **`localStorage` data is user-controlled** and parsed without validation — not a classic security hole (same-origin, self-inflicted), but see the unguarded-`JSON.parse` note above.
- 🟢 **GitHub Pages workflow uploads the entire repo root** (`path: '.'`). Low risk (no secrets), but every committed file is published publicly.
- 🟢 **No Content-Security-Policy** meta tag.

## Performance

- 🟢 **Full re-render on every action** (`render()` rebuilds `#history-list` each draw). DOM is small, so negligible; noted for scaling only.
- 🟢 **Three `Audio` objects constructed at load.** Fine, but if more SFX are added consider pooling / preloading strategy.

## Documentation / Housekeeping

- 🟡 **README is outdated vs. current features.** `README.md` still describes the original simple simulator and does not mention localStorage persistence, custom deck builder, audio SFX, haptics, or the flip animation. Update it.
- 🟢 **README live URL caveat** — verify `https://sulthon-arrasyid.github.io/uno-pop/` matches the actual deployment.
