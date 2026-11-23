import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  readonly titleHeader: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartLink: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    super(page);
    this.titleHeader = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
  }

  async getHeaderTitle(): Promise<string> {
    return (await this.titleHeader.textContent()) || '';
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }
}
