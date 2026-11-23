import { defineConfig, devices } from '@playwright/test';
import { config } from './config/environment';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  outputDir: './reports/test-results',
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: config.baseUrl,
    actionTimeout: config.actionTimeout,
    navigationTimeout: config.navigationTimeout,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
