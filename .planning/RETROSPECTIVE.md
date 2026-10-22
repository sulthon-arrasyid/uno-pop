# Project Retrospective — UNO Pop Deck Simulator

---

## Milestone: v1.0 — Visual/UX Polish

**Shipped:** 2026-10-22
**Phases:** 5 | **Plans:** 10 | **Tasks:** ~40

### What Was Built

1. **Phase 1 — Visual Foundation:** `:root` CSS token system, cream (#F4ECD8) + dot-pattern background, self-hosted Fredoka/Nunito woff2 fonts, thin rounded ink outlines, outlined shared panels, skewed yellow title highlight. SW cache bumped to v3 for font precache.
2. **Phase 2 — Core Surfaces Restyle:** Hybrid outlined card with flip intact, metallic UNO! gold with animated shine sweep, inviting dashed idle state, pill buttons with push-down press, outlined mini-card history chips.
3. **Phase 3 — Deck Builder Restyle:** Grouped 2-column grid with −/+ steppers, class-based `.is-open` animated slide-down panel (replaced inline `style.display`), stateful label. SW cache bumped to v4 for JS/HTML changes.
4. **Phase 4 — Big Moments & Motion:** Hand-rolled inline canvas confetti on UNO! (no asset, no CDN), app-container screen shake on POP!, newest-chip entrance animation. Comprehensive `prefers-reduced-motion` policy — all decorative motion off, 3D flip intentionally preserved.
5. **Phase 5 — Responsive QA & Housekeeping:** Stepper buttons 34→44px (QA-01), audio files added to SW precache (PRES-01, v5 bump), manifest/meta theme synced to cream, README fully rewritten in Indonesian (11 features documented).

### What Worked

- **Foundation-first sequencing** — establishing the token system in Phase 1 before touching any component made every subsequent phase straightforward. No re-theming debt.
- **Inline sub-agent pattern** — since sub-agents can't do file I/O in this runtime, executing research/plan/execute inline kept everything fast with no context-transfer overhead.
- **Handoff document** — the structured `HANDOFF.json` from the pause-before-Phase-5 captured exactly what was needed for a clean resume.
- **Research phase for Phase 5** — catching the stepper 34px bug and missing audio precache *before* planning (vs. discovering them during UAT) meant the plans were fix-first, not discover-then-fix.
- **Confetti hand-rolled** — avoiding a library preserved vanilla purity, avoided a cache bump, and kept the offline guarantee intact. The inline approach was the right call.

### What Was Inefficient

- **REQUIREMENTS.md traceability never updated during execution** — all 27 requirements stayed "Pending" through the whole milestone; had to bulk-update at close. Traceability should update as each phase completes.
- **Key Decisions table had all "Pending" outcomes** — same issue; decisions were made and executed but outcomes weren't recorded until milestone close.
- **`manifest.json` theme_color was stale from the original dark theme** — this was noted in CONCERNS.md from the start but wasn't addressed until Phase 5. Could have been fixed in Phase 1 as part of the theme system.

### Patterns Established

- **`CACHE_NAME` bump discipline:** any change to cached files requires bumping. Phase 1: v3 (fonts). Phase 3: v4 (JS/HTML). Phase 5: v5 (audio). No stale cache incidents.
- **`prefers-reduced-motion` as a first-class concern:** gate every new animation at the keyframe level, not as an afterthought. Flip is intentionally exempt (essential feedback).
- **`display: inline-flex; align-items: center; justify-content: center` pattern** for fixed-size touch targets — keeps visual size distinct from hit area.
- **Class-based toggle over inline `style.display`** — `.is-open` / `aria-expanded` + max-height transition is the established pattern for collapsible panels in this project.

### Key Lessons

- Audit CONCERNS.md before planning each phase — several fixes (audio precache, `style.display` toggle) were already documented as tech debt and could have been planned earlier.
- For a brownfield visual polish milestone, the flip animation and element IDs are the hardcoded preservation invariants — make these explicit in every plan's `read_first` and `acceptance_criteria`.
- Hand-rolling small effects (confetti, shake) inline is the right default for this vanilla PWA. Any library addition requires the full precache + CACHE_NAME bump cycle.

### Cost Observations

- Model: Auto (server-selected, mix of sonnet/haiku)
- Sessions: ~4 sessions across 3 days (Oct 20–22)
- Notable: All 5 phases planned and executed without gaps or re-plans needed. Single UAT iteration per phase. Clean close with 0 blockers.

---

## Cross-Milestone Trends

| Milestone | Phases | Plans | Gaps in UAT | Re-plans | Days |
|-----------|--------|-------|-------------|---------|------|
| v1.0 Visual/UX Polish | 5 | 10 | 0 | 0 | 3 |
