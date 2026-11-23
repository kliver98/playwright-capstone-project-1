import { test, expect } from '../fixtures/test.fixture';
import loginData from '../testdata/login.data.json';

test.describe('Swag Labs - Authentication Tests', () => {
  for (const user of loginData) {
    test(`should log in successfully as ${user.description}`, async ({ loginPage, inventoryPage, page }) => {
      await loginPage.navigateTo('/');

      // Verify login page title
      await expect(page).toHaveTitle(new RegExp(user.expectedPageTitle));

      // Perform login using Page Object Model
      await loginPage.login(user.username, user.password);

      // Verify inventory page loaded
      await expect(page).toHaveURL(new RegExp(user.expectedUrl));
      await expect(inventoryPage.titleHeader).toBeVisible();
      await expect(inventoryPage.titleHeader).toHaveText(user.expectedHeaderTitle);
      await expect(inventoryPage.shoppingCartLink).toBeVisible();
    });
  }
});
