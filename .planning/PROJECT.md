# UNO Pop Deck Simulator

## What This Is

A single-player web app (PWA) that simulates drawing from a configurable "UNO Pop" card deck — you draw cards one at a time, accumulate safe points, and the round ends when you hit a POP! or UNO! card. It runs fully offline after first load, installs to a phone's home screen, and is built with 100% vanilla HTML/CSS/JS (no framework, no build step). The app has a cohesive **soft neo-brutalist visual identity**: cream background with dot pattern, thin rounded outlines, Fredoka/Nunito self-hosted fonts, yellow brand, three functional accents, canvas confetti and screen-shake big-moment effects — all while preserving every original gameplay behavior.

## Core Value

The app must feel like a deliberately designed, playful-but-modern product — the moment of drawing a card should be satisfying and the whole UI should have a consistent visual character — **without breaking any existing gameplay, offline, or install behavior.**

## Requirements

### Validated

<!-- Shipped and confirmed valuable. Inferred from existing code (brownfield). -->

- ✓ Draw cards one at a time from a shuffled deck with safe/POP!/UNO! outcomes — existing
- ✓ Accumulation tracking and round-end logic (POP!/UNO!/deck-empty) — existing
- ✓ 3D card flip animation on draw — existing (**must be preserved**)
- ✓ Audio SFX for draw / POP! / UNO! — existing (**must be preserved**)
- ✓ Haptic feedback via `navigator.vibrate` — existing (**must be preserved**)
- ✓ Custom deck builder (configure counts per card type) — existing (**must be preserved**)
- ✓ Game state persistence via localStorage (resume on reload) — existing
- ✓ Draw history panel — existing
- ✓ Offline support + installable PWA (service worker + manifest) — existing
- ✓ Cohesive "soft neo-brutalist" visual foundation: cream+dot background, thin rounded outlines, self-hosted Fredoka/Nunito, yellow brand, skewed title highlight — Phase 1 (FND-01, FND-02, FND-03, TYP-01, TYP-02, TYP-03)
- ✓ New color palette defined as `:root` tokens with 3 functional accents (Aman=green, POP!=red, UNO!=gold) + brand yellow, AA-checked — Phase 1 (FND-04)
- ✓ Core surfaces restyled: hybrid outlined card (flip preserved), metallic UNO! gold with glow+shine, inviting idle state, pill buttons with push-down press, outlined history chips — Phase 2 (CARD-01, CARD-02, CARD-03, PANEL-01, BTN-01, HIST-01)
- ✓ Deck builder restyled: grouped grid + −/+ steppers, class-based animated slide-down toggle with stateful label, light validation; deck logic preserved — Phase 3 (DECK-01, DECK-02, DECK-03)
- ✓ Big moments & motion: hand-rolled canvas confetti on UNO!, screen shake on POP!, newest-chip entrance, and comprehensive prefers-reduced-motion (decorative motion off, flip kept) — v1.0 Phase 4 (FX-01, FX-02, FX-03, FX-04, A11Y-01)
- ✓ Mobile QA (stepper tap targets 44px, 360px layout holds), SW audio precache (v5), manifest theme sync (#F4ECD8), localStorage/haptics/PWA preservation confirmed, README fully rewritten in Indonesian — v1.0 Phase 5 (QA-01, QA-02, PRES-01, PRES-02, PRES-03, PRES-04)

### Active

<!-- Next milestone scope — not yet started. -->

*(none — all v1.0 requirements shipped. Start v1.1 with `/gsd-new-milestone`.)*

### Out of Scope

<!-- Explicit boundaries with reasoning. -->

- Multiplayer / multiple players at a table — user explicitly deferred; this milestone is single-player polish only
- New gameplay rules, scoring systems, or card types — this is a visual/UX pass, not a gameplay change
- Light/dark theme toggle — user chose a single theme only
- Backend, accounts, cloud sync, or online features — app is intentionally standalone/offline-first
- Build tooling / framework migration (React, bundlers, npm build step) — must stay runnable on mobile with no extra install; vanilla static architecture preserved
- CDN-dependent runtime libraries — would break offline PWA guarantee; any library must be vendored locally and precached

## Context

- **Shipped v1.0** (2026-10-22). The full soft neo-brutalist redesign is live — cream background with dot pattern, Fredoka/Nunito fonts, thin rounded outlines, yellow brand, confetti/shake big-moment effects, stepper deck builder, `prefers-reduced-motion` throughout.
- **Architecture:** Single `state` object → `render()` pattern in `js/app.js`; styling centralized in `css/style.css`; element IDs in `index.html`. 100% vanilla, no build step.
- **Service worker:** `CACHE_NAME = 'unopop-cache-v5'`. All 13 assets precached including audio files (added in v1.0 Phase 5).
- **UI language:** Indonesian (`lang="id"`); all UI copy stays Indonesian.
- **Remaining tech debt (from CONCERNS.md):** Unguarded `JSON.parse` in `loadState()` (V2-02, deferred); single SVG icon in manifest (PNG variants not yet added); theme_color now synced to cream (#F4ECD8); `.mpeg` audio extension (verify MIME type on GitHub Pages).

## Constraints

- **Tech stack**: Stay 100% vanilla HTML/CSS/JS, no build step — so the app runs on mobile browsers with no extra installation.
- **Compatibility**: Must remain a working offline PWA after first load — any added library must be self-hosted/vendored and added to the service-worker precache (no runtime CDN dependency).
- **Preservation**: Existing flip animation, audio SFX, haptics, deck builder, persistence, and offline/install behavior must all keep working — this is polish, not a rewrite.
- **Accessibility**: Honor `prefers-reduced-motion` for new animations/effects.
- **Mobile-first**: Primary target is mobile; layout and tap targets must stay mobile-friendly.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Visual direction = soft/friendly neo-brutalist (cream + dots + thin rounded outlines + rounded font) | User picked neo-brutalist from mockups but asked for a lighter, friendlier take matching a reference image | ✓ Shipped — cream (#F4ECD8) + dot BG, Fredoka/Nunito, ink outlines throughout |
| Single theme only (no light/dark toggle) | User decision — keep it focused | ✓ Shipped — one theme, no toggle |
| 3 functional accents: Aman=green, POP!=red, UNO!=yellow/gold | Preserve established card-color meaning so players aren't confused; refresh the exact hues to fit the new theme | ✓ Shipped — green/red/gold accents via CSS tokens |
| UNO! = gold with special treatment (glow/shine) to distinguish from brand yellow | User wants UNO! to stay yellow/gold, but brand is also yellow — needs differentiation | ✓ Shipped — metallic gold + animated shine sweep |
| Keep the 3D flip animation as-is | User explicitly likes it | ✓ Preserved — flip untouched in all phases |
| Any new library must be vendored locally + precached, never runtime CDN | Protects the offline PWA guarantee and no-install constraint | ✓ Enforced — hand-rolled confetti inline, no external deps added |
| Hand-rolled canvas confetti (no library) | Preserves vanilla purity and avoids cache bump for new asset | ✓ Shipped — inline in js/app.js, no new file |
| `prefers-reduced-motion` disables all decorative motion but keeps the flip | Flip is essential feedback that a card was drawn; decorative effects are optional | ✓ Shipped — comprehensive reduced-motion policy |
| Audio files added to SW precache (v5) | Offline users got no audio (cache miss); fixing PRES-01 | ✓ Shipped — 3 audio files in urlsToCache, CACHE_NAME bumped to v5 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: October 22, 2026 after v1.0 milestone completion — all 5 phases shipped, 27/27 requirements validated*
