import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  readonly titleHeader: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    super(page);
    this.titleHeader = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
  }

  async getHeaderTitle(): Promise<string> {
    return (await this.titleHeader.textContent()) || '';
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async addItemToCartByIndex(index: number = 0): Promise<void> {
    const item = this.inventoryItems.nth(index);
    await item.locator('button[data-test^="add-to-cart"]').click();
  }

  async removeItemFromCartByIndex(index: number = 0): Promise<void> {
    const item = this.inventoryItems.nth(index);
    await item.locator('button[data-test^="remove"]').click();
  }

  async getCartBadgeCount(): Promise<string> {
    if (await this.shoppingCartBadge.isVisible()) {
      return (await this.shoppingCartBadge.textContent()) || '0';
    }
    return '0';
  }

  async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getAllItemPrices(): Promise<number[]> {
    const priceElements = await this.itemPrices.allTextContents();
    return priceElements.map((price) => parseFloat(price.replace('$', '')));
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
