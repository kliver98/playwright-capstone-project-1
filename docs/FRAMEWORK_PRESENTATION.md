# Framework Architecture & Technical Decisions Presentation

## Executive Summary
This document provides a concise presentation and architecture review of the Playwright TypeScript test automation framework developed for Swag Labs ([SauceDemo](https://www.saucedemo.com/)). The framework delivers production-grade end-to-end automation incorporating modern quality engineering practices: Page Object Model (POM), custom dependency-injection fixtures, data-driven testing (DDT), automated accessibility audits (axe-core), visual regression testing, and AI-assisted workflows (Copilot/MCP).

---

## 1. High-Level Architecture Overview

```
+--------------------------------------------------------------------------+
|                            Execution Layer                               |
|        npm test | npm run test:serial | npm run test:accessibility      |
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                     Playwright Runner & Config                           |
|       playwright.config.ts  <--->  config/environment.ts                 |
|       (workers: 1, trace: 'on', screenshots, failure videos, html-report)|
+--------------------------------------------------------------------------+
                                     |
                                     v
+--------------------------------------------------------------------------+
|                           Test Specifications                            |
|    tests/login.spec.ts        tests/inventory.spec.ts                    |
|    tests/checkout.spec.ts     tests/accessibility.spec.ts                |
|    tests/visual.spec.ts                                                  |
+--------------------------------------------------------------------------+
                 |                                      |
                 v                                      v
+----------------------------------+   +-----------------------------------+
|         Custom Fixtures          |   |        External Test Data         |
|      fixtures/test.fixture.ts    |   |     testdata/auth.data.json       |
|  (loginPage, inventoryPage,      |   |     testdata/checkout.data.json   |
|   cartPage, checkoutPage, axe)   |   |                                   |
+----------------------------------+   +-----------------------------------+
                 |
                 v
+--------------------------------------------------------------------------+
|                      Page Object Model (POM) Layer                       |
|   pages/base.page.ts                                                     |
|      ^-- pages/login.page.ts                                             |
|      ^-- pages/inventory.page.ts                                         |
|      ^-- pages/cart.page.ts                                              |
|      ^-- pages/checkout.page.ts                                          |
+--------------------------------------------------------------------------+
                 |
                 v
+--------------------------------------------------------------------------+
|                       Utilities & Modern Practices                       |
|   utils/web.utils.ts           utils/accessibility.utils.ts (axe-core)   |
|   .github/copilot-instructions .vscode/mcp.json (Playwright MCP)         |
+--------------------------------------------------------------------------+
```

---

## 2. Key Architectural Decisions & Rationale

| Architecture Decision | Selection | Rationale & Trade-offs |
|---|---|---|
| **Language & Tooling** | TypeScript + Playwright | Strong static typing, native async/await, auto-waiting, robust multi-browser engine (Chromium, Firefox, WebKit) without external driver binaries. |
| **Design Pattern** | Page Object Model (POM) with `BasePage` | Strict separation of concerns: element locators and page interactions reside solely in Page classes, while validations reside in test specifications. |
| **Dependency Injection** | Playwright Custom Fixtures (`test.extend`) | Eliminates boilerplate `beforeEach` instantiation, ensures clean browser isolation per test, and enables automatic teardown. |
| **Data Separation** | JSON Data-Driven Testing (DDT) | Decouples test data (credentials, addresses, validation messages) from test logic, allowing non-technical updates without touching code. |
| **Accessibility Auditing** | `@axe-core/playwright` | Enables "Shift-Left" accessibility testing by validating WCAG 2.1 AA rules directly in the automated test cycle before deployment. |
| **Visual Testing** | Playwright Native Snapshots (`toHaveScreenshot`) | Eliminates third-party visual SaaS costs. Uses pixel-level comparison with masking on volatile dynamic UI components. |
| **AI Integration** | GitHub Copilot Workspace Rules + MCP | Establishes `.github/copilot-instructions.md` and `.vscode/mcp.json` to guide AI agents to generate code matching project patterns. |
| **Execution Strategy** | Sequential (`workers: 1`, `fullyParallel: false`) | Ensures deterministic, race-condition-free execution against public demo endpoints. |

---

## 3. Test Cases Coverage Matrix

| Test ID | Suite | Description | Primary Verification |
|---|---|---|---|
| **TC01** | Authentication | Valid Login Flow | Redirects to `/inventory.html`, displays "Products" title and shopping cart. |
| **TC02** | Authentication | Locked-Out User | Traps error message: *"Sorry, this user has been locked out."* |
| **TC03** | Authentication | Invalid Credentials | Traps error message: *"Username and password do not match..."* |
| **TC04** | Inventory | Price Sorting (Low to High) | Selects `lohi` filter; asserts prices array is in strictly ascending order. |
| **TC05** | Inventory | Add to Cart | Adds item to cart; verifies shopping cart badge updates to `"1"`. |
| **TC06** | Inventory | Remove from Cart | Removes item from cart; asserts cart badge is completely hidden. |
| **TC07** | Checkout | End-to-End Order Flow | Adds item, opens cart, completes customer info form, finishes checkout, verifies *"Thank you for your order!"*. |
| **TC08** | Accessibility | Login Page WCAG Scan | Evaluates WCAG 2.1 AA compliance; asserts 0 critical or serious violations. |
| **TC09** | Accessibility | Inventory Page WCAG Scan | Authenticates and scans inventory UI; asserts 0 critical or serious violations. |
| **TC10** | Visual | Login Page Snapshot | Pixel-by-pixel visual snapshot comparison of the login screen. |
| **TC11** | Visual | Inventory Header Snapshot | Pixel-by-pixel visual snapshot comparison of the secondary header container. |

---

## 4. Execution & Artifacts Generation

- **HTML Reports**: Written to `reports/html-report/index.html` with step-by-step logs, failure screenshots, and execution timing.
- **Trace Viewer**: Tracing enabled on test execution, providing DOM snapshots, action logs, network timelines, and console output.
- **CI/CD Integration**: Zero-configuration headless execution ready for GitHub Actions, GitLab CI, or Jenkins.
