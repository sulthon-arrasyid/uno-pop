# Milestones

## v1.0 Visual-UX Polish (Shipped: 2026-10-22)

**Phases completed:** 5 phases, 10 plans, 18 tasks

**Key accomplishments:**

- Self-hosted subset Fredoka/Nunito woff2 fonts (~12-15KB each) vendored locally, display font preloaded, and precached in the service worker (cache v3) with no CDN dependency.
- Soft neo-brutalist foundation in css/style.css: :root token system, cream + dot background, self-hosted Fredoka/Nunito typography, three shared panels unified into one thin rounded outlined-surface look, and a skewed hand-drawn yellow title highlight — flip animation untouched.
- Hybrid outlined card (ink outline + 6px offset shadow) with flat green/red accents, a metallic-gold UNO! card with glow + animated shine sweep, and an inviting dashed idle state — both new motion effects guarded by prefers-reduced-motion, flip animation untouched.
- Neo-brutalist pill buttons with a push-down press (brand-yellow primary, outlined-cream secondary) and outlined mini-card history chips — completing the core-surface restyle to match the Plan 01 card language.
- Grouped 2-column deck-builder with +/− steppers (existing input IDs kept) and a collapsible slide-down + fade panel driven by an .is-open class, reduced-motion guarded.
- Class-based panel toggle with a stateful label, clamped +/− steppers that drive the existing inputs (deck logic untouched), and a service-worker cache bump so installed users get the new JS/HTML.
- Shake and chip-entrance keyframes plus the consolidated reduced-motion policy — all decorative motion (shake, chip, shine, idle pulse, panel) disabled under prefers-reduced-motion, with the 3D flip intentionally preserved.
- Inline hand-rolled canvas confetti on UNO! (gated by prefers-reduced-motion, torn down after ~1.6s), an app-container shake on POP!, and a newest-only history-chip entrance — no new asset, deck logic and flip untouched.

---
