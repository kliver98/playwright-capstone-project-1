import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

type CustomFixtures = {
  homePage: HomePage;
  mockNetwork: void;
};

export const test = base.extend<CustomFixtures>({
  // Network interception fixture to abort third-party trackers/ads and mock sample endpoints
  mockNetwork: [
    async ({ page }, use) => {
      // Abort third-party tracking and advertisement scripts
      await page.route(/(googleads|doubleclick|google-analytics|clarity)/, (route) => {
        route.abort();
      });

      // Sample mock response interception for API demonstration
      await page.route('**/api/brandsList', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            responseCode: 200,
            brands: [
              { id: 1, brand: 'Mocked Brand Polo' },
              { id: 2, brand: 'Mocked Brand H&M' }
            ]
          }),
        });
      });

      await use();
    },
    { auto: true },
  ],

  // Custom Page Object fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect };
