import { test, expect } from '../fixtures/test.fixture';
import authData from '../testdata/auth.data.json';
import checkoutData from '../testdata/checkout.data.json';

test.describe('Checkout & Order Fulfillment Suite', () => {
  test('TC07 - should complete end-to-end checkout flow successfully', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    // 1. Authenticate
    await loginPage.navigateTo('/');
    await loginPage.login(authData.validUser.username, authData.validUser.password);
    await expect(inventoryPage.titleHeader).toBeVisible();

    // 2. Add product and proceed to cart
    await inventoryPage.addItemToCartByIndex(0);
    await inventoryPage.goToCart();

    // 3. Verify cart and proceed to checkout
    await expect(cartPage.titleHeader).toHaveText('Your Cart');
    expect(await cartPage.getCartItemCount()).toBe(1);
    await cartPage.proceedToCheckout();

    // 4. Enter customer checkout information
    await expect(checkoutPage.titleHeader).toHaveText('Checkout: Your Information');
    await checkoutPage.fillCustomerInformation(
      checkoutData.customer.firstName,
      checkoutData.customer.lastName,
      checkoutData.customer.postalCode
    );

    // 5. Overview and finish
    await expect(checkoutPage.titleHeader).toHaveText('Checkout: Overview');
    await checkoutPage.finishCheckout();

    // 6. Verify order confirmation
    await expect(checkoutPage.titleHeader).toHaveText('Checkout: Complete!');
    const confirmation = await checkoutPage.getConfirmationMessage();
    expect(confirmation).toBe(checkoutData.expectedConfirmation);
    await expect(checkoutPage.completeHeader).toBeVisible();
  });
});
