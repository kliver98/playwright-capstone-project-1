# playwright-capstone-project-1

End-to-end test automation framework built with [Playwright](https://playwright.dev/) and TypeScript for the [Swag Labs (SauceDemo)](https://www.saucedemo.com/) web application. The other https://automationexercise.com/  has CLoudfare protection that blocks the automated test execution.

---

## Architecture & Directory Structure

The framework follows standard industry test automation design patterns, organized as follows:

```
├── config/             # Centralized environment configuration and timeouts
│   └── environment.ts
├── fixtures/           # Custom Playwright fixtures (dependency injection)
│   └── test.fixture.ts
├── pages/              # Page Object Model (POM) classes and base abstractions
│   ├── base.page.ts
│   ├── login.page.ts
│   └── inventory.page.ts
├── reports/            # Test execution artifacts, HTML reports, and traces
│   └── .gitkeep
├── testdata/           # Externalized data for Data-Driven Testing (JSON/TS)
│   └── login.data.json
├── tests/              # Test specifications and suites
│   └── login.spec.ts
├── utils/              # Reusable browser, element, and assertion utility helpers
│   └── web.utils.ts
├── playwright.config.ts # Global Playwright test runner configuration
├── package.json        # Project scripts and dependencies
├── tsconfig.json       # TypeScript compiler settings
└── .gitignore          # Version control ignore rules
```

---

## Core Framework Features

- **Page Object Model (POM)**: UI elements and user interactions are encapsulated within reusable page classes (`LoginPage`, `InventoryPage`) extending `BasePage`.
- **Custom Fixtures**: Provides fixture-injected page instances (`loginPage`, `inventoryPage`) extending Playwright's test base.
- **Data-Driven Testing (DDT)**: Decouples credentials, assertions, and test scenarios from test logic via externalized JSON data (`testdata/login.data.json`).
- **Configuration Management**: Centralizes application URLs, API timeouts, and browser execution parameters in `config/environment.ts`.
- **Reusable Utilities**: Common actions, synchronization helpers, and element handlers located in `utils/web.utils.ts`.
- **Cross-Browser Execution**: Preconfigured for Desktop Chromium, Firefox, and WebKit (Safari).
- **Sequential Execution**: Tests run sequentially (`workers: 1`, `fullyParallel: false`) to ensure deterministic test runs.
- **Comprehensive Reporting**: Generates HTML reports, failure screenshots, failure videos, and detailed trace recordings for debugging.

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

### Run tests across all configured browsers
```bash
npm test
```

### Run explicitly with 1 worker (sequential)
```bash
npm run test:serial
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
