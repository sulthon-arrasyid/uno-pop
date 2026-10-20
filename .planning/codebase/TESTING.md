# TESTING

Test framework, structure, and coverage for the UNO Pop Deck Simulator.

## Summary

**There are no automated tests in this codebase.** No test framework, no test files, no test runner, and no CI test step.

## Framework

**None.** No `package.json`, so no Jest/Vitest/Mocha/Playwright/Cypress and nothing in `devDependencies`.

## Test Files

**None found.** No `*.test.js`, `*.spec.js`, `__tests__/`, or `test/`/`tests/` directories anywhere in the repository.

## CI / Pipeline Testing

The only workflow, `.github/workflows/static.yml`, is a **deploy-only** pipeline (checkout → configure Pages → upload artifact → deploy). It runs **no tests, linting, or type checks** before deploying to GitHub Pages.

## Mocking / Fixtures

**None.** Not applicable without a test suite.

## Coverage

**0% automated coverage.** Verification is entirely manual: loading the page in a browser and exercising draw / reset / deck-builder flows, plus checking audio, haptics, flip animation, and persistence by hand.

## Testability Notes (for future test work)

- **Pure, easily unit-testable:** `shuffleArray(array)` and `buildCustomDeck()` logic in `js/app.js` — though `buildCustomDeck()` currently reads directly from `document.getElementById(...).value`, so it needs a DOM (jsdom) or refactoring to accept parameters.
- **State logic:** `drawCard()` / `initGame()` mutate the shared `state` and depend on the `DOM` cache, `localStorage`, `Audio`, and `navigator.vibrate`. Unit-testing in isolation would require decoupling logic from these browser dependencies (or mocking them).
- **Rendering:** `render()` is DOM-coupled; needs jsdom or a browser-based runner.
- **Service worker (`sw.js`):** needs a SW test harness or E2E test.

### Suggested approach if tests are introduced
- Add `package.json` + a lightweight runner (Vitest with jsdom suits a vanilla project).
- Extract deck/draw logic into a module that takes inputs as parameters and does not touch `localStorage`/`Audio` at import time, to enable fast unit tests.
- Add Playwright smoke/E2E for draw/reset, deck-builder save, persistence across reload, and offline/PWA behavior.
- Add a lint/test job to `.github/workflows/` before the deploy step.
