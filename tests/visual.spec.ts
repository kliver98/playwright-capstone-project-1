import { test, expect } from '../fixtures/test.fixture';
import authData from '../testdata/auth.data.json';

test.describe('Visual Regression Suite', () => {
  test('TC10 - should match login page visual snapshot', async ({ loginPage, page }) => {
    await loginPage.navigateTo('/');

    await expect(page).toHaveScreenshot('login-page.png', {
      mask: [loginPage.errorMessage],
    });
  });

  test('TC11 - should match inventory header visual snapshot after login', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.navigateTo('/');
    await loginPage.login(authData.validUser.username, authData.validUser.password);

    await expect(inventoryPage.titleHeader).toBeVisible();

    const headerContainer = page.locator('.header_secondary_container');
    await expect(headerContainer).toHaveScreenshot('inventory-header.png');
  });
});
