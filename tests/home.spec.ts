import { test, expect } from '../src/fixtures/test.fixture';
import pagesData from '../src/data/pages.data.json';

test.describe('Home Page - Title & Verification', () => {
  // Data-Driven Testing across configured paths
  for (const data of pagesData) {
    test(`should open ${data.description} and verify page title`, async ({ homePage, page }) => {
      await homePage.navigate(data.path);

      // Verify page title
      await expect(page).toHaveTitle(new RegExp(data.expectedTitle));

      // Verify header logo visibility via Page Object Model
      await expect(homePage.headerLogo).toBeVisible();
    });
  }

  // Network Interception and Mocking verification
  test('should verify network interception and mocked API response', async ({ homePage, page }) => {
    await homePage.navigate();

    const result = await page.evaluate(async () => {
      const response = await fetch('/api/brandsList');
      return response.json();
    });

    expect(result.brands).toBeDefined();
    expect(result.brands[0].brand).toBe('Mocked Brand Polo');
  });
});
