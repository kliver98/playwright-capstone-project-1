# GitHub Copilot Instructions for Playwright TypeScript Framework

When generating, extending, or maintaining test automation code in this project, adhere strictly to the following architectural conventions:

## 1. Directory Structure & Architecture
- **Page Objects**: Place all page classes in `pages/` extending `BasePage`.
- **Fixtures**: Extend `@playwright/test` in `fixtures/test.fixture.ts` for dependency injection.
- **Tests**: Place all test specifications in `tests/` with the `.spec.ts` suffix.
- **Test Data**: Store externalized test input in `testdata/*.json`.
- **Utilities**: Place shared helper methods in `utils/`.
- **Configuration**: Use centralized settings from `config/environment.ts`.

## 2. Page Object Model (POM) Standards
- Encapsulate locators as `readonly` class properties initialized in the constructor.
- Prefer resilient locators in this priority:
  1. `[data-test="..."]` attributes.
  2. Semantic locators: `getByRole(...)`, `getByLabel(...)`, `getByPlaceholder(...)`.
  3. CSS/XPath selectors only when semantic or data attributes are unavailable.
- Do not assert inside Page Object methods; return primitives or Locators and assert within `tests/*.spec.ts`.

## 3. Test Creation Conventions
- Always import `test` and `expect` from `../fixtures/test.fixture` instead of the base `@playwright/test`.
- Drive test execution using data imported from `../testdata/*.json` whenever testing parameterized scenarios.
- Keep tests isolated, independent, and stateless.

## 4. Modern Testing Practices
- **Accessibility Testing**: Use the `makeAxeBuilder` fixture or `AccessibilityUtils.scanPage()` to run automated WCAG 2.1 AA scans.
- **Visual Regression Testing**: Use `expect(page).toHaveScreenshot()` with appropriate masking for dynamic data.
- **Tracing & Debugging**: Ensure trace recordings are captured and inspectable via `reports/html-report`.
