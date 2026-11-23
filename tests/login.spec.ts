import { test, expect } from '../fixtures/test.fixture';
import authData from '../testdata/auth.data.json';

test.describe('Authentication & Authorization Suite', () => {
  test('TC01 - should log in successfully with valid credentials', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.navigateTo('/');

    // Assert initial login page state
    await expect(page).toHaveTitle(new RegExp(authData.validUser.expectedPageTitle));

    // Perform login
    await loginPage.login(authData.validUser.username, authData.validUser.password);

    // Verify redirection and post-login UI
    await expect(page).toHaveURL(new RegExp(authData.validUser.expectedUrl));
    await expect(inventoryPage.titleHeader).toBeVisible();
    await expect(inventoryPage.titleHeader).toHaveText(authData.validUser.expectedHeaderTitle);
  });

  test('TC02 - should display error message when user account is locked out', async ({ loginPage }) => {
    await loginPage.navigateTo('/');
    await loginPage.login(authData.lockedOutUser.username, authData.lockedOutUser.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(authData.lockedOutUser.expectedErrorMessage);
  });

  test('TC03 - should display error message with invalid credentials', async ({ loginPage }) => {
    await loginPage.navigateTo('/');
    await loginPage.login(authData.invalidUser.username, authData.invalidUser.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(authData.invalidUser.expectedErrorMessage);
  });
});
