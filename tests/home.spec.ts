import { test, expect } from '../fixtures/test.fixture';
import homeData from '../testdata/home.data.json';

test.describe('Home Page - Verification Tests', () => {
  for (const data of homeData) {
    test(`should load ${data.description} and verify title`, async ({ homePage, page }) => {
      await homePage.navigateTo(data.path);

      await expect(page).toHaveTitle(new RegExp(data.expectedTitle));
      await expect(homePage.headerLogo).toBeVisible();
    });
  }
});
