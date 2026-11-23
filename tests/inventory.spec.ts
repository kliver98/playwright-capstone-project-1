import { test, expect } from '../fixtures/test.fixture';
import authData from '../testdata/auth.data.json';

test.describe('Product Catalog & Inventory Suite', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigateTo('/');
    await loginPage.login(authData.validUser.username, authData.validUser.password);
    await expect(inventoryPage.titleHeader).toBeVisible();
  });

  test('TC04 - should sort products by price from low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('lohi');

    const prices = await inventoryPage.getAllItemPrices();
    expect(prices.length).toBeGreaterThan(0);

    // Verify prices are sorted in ascending order
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('TC05 - should add item to cart and increment badge counter', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByIndex(0);

    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe('1');
  });

  test('TC06 - should remove item from cart and clear badge counter', async ({ inventoryPage }) => {
    // Add item first
    await inventoryPage.addItemToCartByIndex(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');

    // Remove item and assert badge is removed
    await inventoryPage.removeItemFromCartByIndex(0);
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });
});
