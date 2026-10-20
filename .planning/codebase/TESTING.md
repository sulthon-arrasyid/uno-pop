# TESTING

Test framework, structure, and coverage for the UNO Pop Deck Simulator.

## Summary

**There are no automated tests in this codebase.** No test framework, no test files, no test runner, and no CI test step.

## Framework

**None.** No `package.json`, so no Jest/Vitest/Mocha/Playwright/Cypress, and nothing in `devDependencies`.

## Test Files

**None found.** There are no `*.test.js`, `*.spec.js`, `__tests__/`, or `test/`/`tests/` directories anywhere in the repository.

## CI / Pipeline Testing

The only workflow, `.github/workflows/static.yml`, is a **deploy-only** pipeline (checkout → configure Pages → upload artifact → deploy). It runs **no tests, linting, or type checks** before deploying to GitHub Pages.

## Mocking / Fixtures

**None.** Not applicable without a test suite.

## Coverage

**0% automated coverage.** Verification today is entirely manual (loading the page in a browser and clicking "Ambil Kartu" / "Reset Tumpukan").

## Testability Notes (for future test work)

The code is reasonably testable if a runner is added:
- **Pure, easily unit-testable:** `shuffleArray(array)` in `js/app.js` (deterministic given a seeded `Math.random`, returns a new array).
- **State logic:** `drawCard()` and `initGame()` mutate the shared `state` object and depend on the `DOM` cache being populated. To unit-test logic in isolation, the state/logic layer would need decoupling from `document.getElementById` (currently `DOM` is resolved at module load, which requires a DOM — e.g. jsdom).
- **Rendering:** `render()` is DOM-coupled; would need jsdom or a browser-based runner.
- **Service worker (`sw.js`):** would require a service-worker test harness or integration/E2E test.

### Suggested approach if tests are introduced
- Add a `package.json` and a lightweight runner (Vitest with jsdom environment fits a vanilla project well).
- Extract deck/draw logic into a module that does not read the DOM at import time, to enable fast unit tests.
- Add a smoke/E2E test (Playwright) for the draw/reset flow and PWA/offline behavior.
- Add a lint/test job to `.github/workflows/` before the deploy step.
