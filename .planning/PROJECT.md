# UNO Pop Deck Simulator

## What This Is

A single-player web app (PWA) that simulates drawing from a configurable "UNO Pop" card deck — you draw cards one at a time, accumulate safe points, and the round ends when you hit a POP! or UNO! card. It runs fully offline after first load, installs to a phone's home screen, and is built with 100% vanilla HTML/CSS/JS (no framework, no build step). This milestone is a **visual/UX polish pass** to replace the current generic "Bootstrap-basic" look with a cohesive, designed identity.

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
- ✓ Big moments & motion: hand-rolled canvas confetti on UNO!, screen shake on POP!, newest-chip entrance, and comprehensive prefers-reduced-motion (decorative motion off, flip kept) — Phase 4 (FX-01, FX-02, FX-03, FX-04, A11Y-01)

### Active

<!-- Current scope: visual/UX polish. Building toward these. -->

- ✓ Mobile QA (stepper tap targets 44px, 360px layout holds), SW audio precache (v5), manifest theme sync, localStorage/haptics/PWA preservation confirmed, README fully rewritten — Phase 5 (QA-01, QA-02, PRES-01, PRES-02, PRES-03, PRES-04)

### Out of Scope

<!-- Explicit boundaries with reasoning. -->

- Multiplayer / multiple players at a table — user explicitly deferred; this milestone is single-player polish only
- New gameplay rules, scoring systems, or card types — this is a visual/UX pass, not a gameplay change
- Light/dark theme toggle — user chose a single theme only
- Backend, accounts, cloud sync, or online features — app is intentionally standalone/offline-first
- Build tooling / framework migration (React, bundlers, npm build step) — must stay runnable on mobile with no extra install; vanilla static architecture preserved
- CDN-dependent runtime libraries — would break offline PWA guarantee; any library must be vendored locally and precached

## Context

- **Brownfield.** The app already works and has evolved well beyond its original version. Current state is mapped accurately in `.planning/codebase/` (STACK, ARCHITECTURE, STRUCTURE, CONVENTIONS, TESTING, INTEGRATIONS, CONCERNS).
- **Current look:** dark theme (#121212), flat solid-color cards (green/red/gold), yellow title accent (#FFD700). User's complaint: it feels like generic Bootstrap, lacking character.
- **Design direction:** "soft/friendly neo-brutalist" based on a user-provided reference — cream/off-white background with a subtle dot pattern, **thin** (not heavy) rounded black outlines, rounded playful display font, yellow as the primary brand color, sparing bright accents, and highlight-marker ("stabilo") touches on active elements. Light geometric decoration as seasoning, not clutter.
- **UI language:** Indonesian (`lang="id"`); all UI copy stays Indonesian.
- **Architecture to respect:** single `state` object → `render()` pattern in `js/app.js`; styling centralized in `css/style.css`; element IDs in `index.html`. Polish should work within this structure.
- **Known issues worth folding in during polish** (from CONCERNS.md): deck-builder toggled via inline `style.display` (consider class-based for smooth transitions); audio files not yet precached in `sw.js`; outdated README; unguarded `JSON.parse` in `loadState()`; no `prefers-reduced-motion` handling. Any `sw.js` asset change requires bumping `CACHE_NAME`.

## Constraints

- **Tech stack**: Stay 100% vanilla HTML/CSS/JS, no build step — so the app runs on mobile browsers with no extra installation.
- **Compatibility**: Must remain a working offline PWA after first load — any added library must be self-hosted/vendored and added to the service-worker precache (no runtime CDN dependency).
- **Preservation**: Existing flip animation, audio SFX, haptics, deck builder, persistence, and offline/install behavior must all keep working — this is polish, not a rewrite.
- **Accessibility**: Honor `prefers-reduced-motion` for new animations/effects.
- **Mobile-first**: Primary target is mobile; layout and tap targets must stay mobile-friendly.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Visual direction = soft/friendly neo-brutalist (cream + dots + thin rounded outlines + rounded font) | User picked neo-brutalist from mockups but asked for a lighter, friendlier take matching a reference image | — Pending |
| Single theme only (no light/dark toggle) | User decision — keep it focused | — Pending |
| 3 functional accents: Aman=green, POP!=red, UNO!=yellow/gold | Preserve established card-color meaning so players aren't confused; refresh the exact hues to fit the new theme | — Pending |
| UNO! = gold with special treatment (glow/shine) to distinguish from brand yellow | User wants UNO! to stay yellow/gold, but brand is also yellow — needs differentiation | — Pending |
| Keep the 3D flip animation as-is | User explicitly likes it | — Pending |
| Any new library must be vendored locally + precached, never runtime CDN | Protects the offline PWA guarantee and no-install constraint | — Pending |

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
*Last updated: October 22, 2026 after Phase 5 (Responsive QA & Housekeeping) completion — milestone v1.0 all 5 phases complete*
