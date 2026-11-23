import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly headerLogo: Locator;
  readonly homeNavButton: Locator;
  readonly featuresItemsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerLogo = page.locator('.logo img');
    this.homeNavButton = page.locator('.nav.navbar-nav a', { hasText: 'Home' });
    this.featuresItemsHeading = page.locator('.features_items .title');
  }

  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async isLogoVisible(): Promise<boolean> {
    return this.headerLogo.isVisible();
  }
}
