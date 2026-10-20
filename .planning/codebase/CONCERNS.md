# CONCERNS

Technical debt, bugs, security, performance, and fragile areas.

Severity legend: 🔴 High · 🟡 Medium · 🟢 Low / minor

## Testing & Quality

- 🟡 **No automated tests and no CI checks.** `.github/workflows/static.yml` deploys straight to GitHub Pages with no lint/test gate. Regressions can only be caught manually. See `TESTING.md`.
- 🟢 **No linter/formatter config** (no ESLint/Prettier). Indentation is inconsistent between files (4 spaces in `js/app.js`, 2 spaces in `sw.js`).

## Game Logic — Bugs & Fragile Areas

- 🟡 **UNO card uses `.replace(' ', ...)` for line breaks, but its label has no space.** In `render()` (`js/app.js`): `DOM.activeCardValue.innerHTML = state.activeCard.label.replace(' ', '<br>')`. Labels like `"POP! +1"` break onto two lines as intended, but `"UNO!"` has no space so it renders on one line. Likely acceptable, but the formatting rule is implicit and brittle — changing a label's spacing silently changes layout.
- 🟢 **`innerHTML` used for card label rendering.** `label` values are hardcoded constants in `DECK_COMPOSITION`, so this is not currently an injection vector, but using `innerHTML` for display text is a fragile pattern if labels ever become dynamic/user-derived.
- 🟢 **No "deck empty" affordance beyond disabling the button.** When the deck is exhausted on a safe draw, status reads "Deck habis — Round selesai" and `btn-draw` is disabled; the only way forward is Reset. Intended, but worth noting as a UX dead-end if misread.
- 🟢 **Magic number `12`.** `render()` hardcodes the deck size in `` `${state.deck.length}/12` ``. If `DECK_COMPOSITION` changes length, this denominator won't update automatically. Prefer `DECK_COMPOSITION.length`.

## State & Persistence

- 🟡 **No persistence.** Game state is in-memory only (`state` in `js/app.js`); a reload or app restart resets everything. For a PWA that users "install," losing an in-progress round on refresh may be surprising. Consider `localStorage` if persistence is desired.

## PWA / Service Worker — `sw.js`

- 🟡 **Cache-first with no update path for the app shell.** The `fetch` handler returns cached responses first and only falls back to network on a miss. Once `index.html`/`app.js`/`style.css` are cached under `unopop-cache-v1`, users keep the old version until `CACHE_NAME` is bumped — there is no network-first or stale-while-revalidate strategy for navigations. **Deploying new code requires manually incrementing `CACHE_NAME`** (e.g. `v2`); otherwise returning users may not see updates.
- 🟡 **Precache list must be kept in sync manually.** `urlsToCache` in `sw.js` duplicates the asset list; adding a new asset (e.g. a second icon) without updating this array means it won't be available offline.
- 🟢 **No fetch error fallback.** If both cache and network fail (true offline + uncached request), the request rejects with no offline fallback page.
- 🟢 **`skipWaiting()` + `clients.claim()` activate new SWs immediately.** Combined with cache-first, this can cause a mix of old/new assets within a single session when a `CACHE_NAME` bump does happen.

## Manifest / Icons

- 🟡 **Single SVG icon only.** `manifest.json` declares one `assets/icon.svg` at `sizes: "512x512"` with `purpose: "any maskable"`. SVG manifest icons have inconsistent support across platforms (notably some Android/Chrome install flows prefer PNG). Maskable safe-zone is also not clearly respected by the current icon art. Consider adding PNG icons (192 & 512) for reliable installability.
- 🟢 **Theme color mismatch.** `index.html` `<meta name="theme-color">` is `#121212` while `manifest.json` `theme_color` is `#1e1e1e`. Minor cosmetic inconsistency.

## Security

- 🟢 **Low overall risk.** Static client-only app: no backend, no auth, no secrets, no user data, no external API calls. No secrets were found in the repository.
- 🟢 **GitHub Pages workflow uploads the entire repo root** (`path: '.'`). Low risk here since there are no secrets, but it means any file added to the repo (including stray config/docs) is published publicly. Be mindful not to commit anything sensitive.
- 🟢 **No Content-Security-Policy** meta tag. Not critical for this app, but a CSP would harden against future `innerHTML`-related risks.

## Performance

- 🟢 **Full re-render on every action.** `render()` rebuilds `#history-list` from scratch each draw. The DOM is tiny (≤12 history items), so impact is negligible; noted only as a scaling consideration.

## Documentation / Housekeeping

- 🟢 **README live URL caveat.** `README.md` notes the GitHub Pages URL (`https://sulthon-arrasyid.github.io/uno-pop/`) may need adjusting per repo name — verify it matches the actual deployment.
