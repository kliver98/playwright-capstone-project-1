# playwright-capstone-project-1

End-to-end test automation framework built with [Playwright](https://playwright.dev/) and TypeScript for the [Swag Labs (SauceDemo)](https://www.saucedemo.com/) web application.

---

## Final Deliverables Overview

1. **Complete Framework Source Code**: Production-grade Playwright TypeScript repository adhering to clean code standards and test automation design patterns.
2. **11 Automated Test Cases**: Covering authentication, product sorting, cart management, checkout fulfillment, accessibility, and visual regression.
3. **Execution Reports**: Integrated HTML reporting, failure screenshots, videos, and trace archives generated under `reports/`.
4. **README Document**: Comprehensive technical documentation explaining architecture, installation, execution, and debugging.
5. **Architecture Presentation**: Slide-deck style architectural documentation available in [docs/FRAMEWORK_PRESENTATION.md](docs/FRAMEWORK_PRESENTATION.md).

---

## Architecture & Directory Structure

The framework follows standard industry test automation design patterns, organized as follows:

```
├── .github/
│   └── copilot-instructions.md # AI-assisted test development guidelines
├── .vscode/
│   └── mcp.json                # Model Context Protocol (MCP) server configuration
├── config/                     # Centralized environment configuration and timeouts
│   └── environment.ts
├── docs/                       # Architecture presentations and documentation
│   └── FRAMEWORK_PRESENTATION.md
├── fixtures/                   # Custom Playwright fixtures (dependency injection)
│   └── test.fixture.ts
├── pages/                      # Page Object Model (POM) classes and base abstractions
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── inventory.page.ts
│   ├── cart.page.ts
│   └── checkout.page.ts
├── reports/                    # Test execution artifacts, HTML reports, and traces
│   └── .gitkeep
├── testdata/                   # Externalized data for Data-Driven Testing (JSON)
│   ├── auth.data.json
│   └── checkout.data.json
├── tests/                      # Automated test specifications
│   ├── accessibility.spec.ts   # WCAG accessibility scans (axe-core)
│   ├── checkout.spec.ts        # End-to-end checkout fulfillment flow
│   ├── inventory.spec.ts       # Product catalog, sorting, and cart actions
│   ├── login.spec.ts           # Authentication and authorization flows
│   └── visual.spec.ts          # Pixel-level visual regression snapshot tests
├── utils/                      # Reusable browser, element, and accessibility helpers
│   ├── accessibility.utils.ts
│   └── web.utils.ts
├── playwright.config.ts        # Global Playwright test runner configuration
├── package.json                # Project scripts and dependencies
├── tsconfig.json               # TypeScript compiler settings
└── .gitignore                  # Version control ignore rules
```

---

## Core Framework Features

- **Page Object Model (POM)**: UI elements and user interactions are encapsulated within reusable page classes (`LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`) extending `BasePage`.
- **Custom Fixtures**: Provides fixture-injected page instances extending Playwright's test base for clean dependency injection and state isolation.
- **Data-Driven Testing (DDT)**: Decouples credentials, customer data, and assertion messages from test logic via externalized JSON files (`testdata/`).
- **Configuration Management**: Centralizes application URLs, API timeouts, and browser execution parameters in `config/environment.ts`.
- **Reusable Utilities**: Common actions, synchronization helpers, and accessibility wrappers located in `utils/`.
- **Cross-Browser Execution**: Preconfigured for Desktop Chromium, Firefox, and WebKit (Safari).
- **Sequential Execution**: Tests run sequentially (`workers: 1`, `fullyParallel: false`) to ensure deterministic test runs.
- **Comprehensive Reporting**: Generates HTML reports, failure screenshots, failure videos, and detailed trace recordings for debugging.

---

## Automated Test Cases Matrix

The suite contains **11 automated test cases** organized across distinct feature domains:

| Test ID | Suite File | Test Scenario | Description & Key Assertions |
|---|---|---|---|
| **TC01** | `tests/login.spec.ts` | Valid User Login | Validates successful login redirect to `/inventory.html`, page title "Swag Labs", and header "Products". |
| **TC02** | `tests/login.spec.ts` | Locked-Out User | Validates error banner: *"Epic sadface: Sorry, this user has been locked out."* |
| **TC03** | `tests/login.spec.ts` | Invalid Credentials | Validates error banner: *"Epic sadface: Username and password do not match any user in this service"* |
| **TC04** | `tests/inventory.spec.ts` | Product Price Sorting | Selects `lohi` filter and verifies product prices are in strictly ascending numeric order. |
| **TC05** | `tests/inventory.spec.ts` | Add Item to Cart | Adds item to cart and asserts the shopping cart badge count updates to `"1"`. |
| **TC06** | `tests/inventory.spec.ts` | Remove Item from Cart | Removes item from cart and asserts shopping cart badge is hidden. |
| **TC07** | `tests/checkout.spec.ts` | End-to-End Checkout Flow | Full flow: Login -> Add Product -> Open Cart -> Enter Customer Info -> Finish -> Assert *"Thank you for your order!"*. |
| **TC08** | `tests/accessibility.spec.ts` | Login Page WCAG Audit | Scans login page with `axe-core`; asserts 0 critical or serious accessibility violations. |
| **TC09** | `tests/accessibility.spec.ts` | Inventory Page WCAG Audit | Scans authenticated inventory UI with `axe-core`; asserts 0 critical or serious accessibility violations. |
| **TC10** | `tests/visual.spec.ts` | Login Screen Visual Snapshot | Pixel-by-pixel visual snapshot comparison of the login screen against baseline. |
| **TC11** | `tests/visual.spec.ts` | Inventory Header Visual Snapshot | Pixel-by-pixel visual snapshot comparison of the secondary header container. |

---

## Modern Testing Practices

### 1. Accessibility Testing (axe-core)
Automated WCAG 2.1 AA accessibility checks are integrated using `@axe-core/playwright`.
- Scans pages for color contrast, ARIA landmarks, form labels, and element accessibility.
- Custom fixture `makeAxeBuilder` and utility `AccessibilityUtils.scanPage()` enable flexible scoping and filtering by severity.
- Run accessibility tests:
  ```bash
  npm run test:accessibility
  ```

### 2. Visual Regression Testing
Pixel-level visual comparison using Playwright's native snapshot engine.
- Compares visual appearance against baseline reference snapshots (`tests/visual.spec.ts-snapshots/`).
- Masks dynamic areas and accounts for rendering anti-aliasing variations.
- Run visual regression tests:
  ```bash
  npm run test:visual
  ```
- Generate or update baseline snapshots:
  ```bash
  npm run test:visual:update
  ```

### 3. AI-Assisted Test Creation (GitHub Copilot / MCP)
Accelerates test development while enforcing architectural conventions:
- **GitHub Copilot Workspace Rules**: Configured in `.github/copilot-instructions.md` with guidelines on POM structure, locator hierarchies, test isolation, and fixture usage.
- **Model Context Protocol (MCP)**: Configured in `.vscode/mcp.json` to integrate Playwright MCP servers for agentic browser exploration and automated test scaffolding.

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kliver98/playwright-capstone-project-1.git
   cd playwright-capstone-project-1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install required browser binaries:
   ```bash
   npx playwright install chromium firefox webkit
   ```

---

## Test Execution

### Run all 11 tests (sequential, 1 by 1)
```bash
npm test
```

### Run specific test suites
```bash
npm run test:accessibility
npm run test:visual
```

### Run on a specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run tests in headed mode (interactive browser)
```bash
npm run test:headed
```

### Run tests using Playwright UI Mode
```bash
npm run test:ui
```

---

## Test Reports & Debugging

### View HTML Report
After running tests, open the generated HTML report:
```bash
npm run report
```

### Trace Viewer
Traces are captured automatically on test execution. Inspect traces with:
```bash
npx playwright show-trace reports/html-report/data/<trace-file>.zip
```
