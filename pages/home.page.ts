import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly headerLogo: Locator;
  readonly homeNavButton: Locator;
  readonly featuresItemsHeading: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.headerLogo = page.locator('.logo img');
    this.homeNavButton = page.locator('.nav.navbar-nav a', { hasText: 'Home' });
    this.featuresItemsHeading = page.locator('.features_items .title');
    this.contactUsLink = page.locator('a[href="/contact_us"]');
  }

  async isLogoVisible(): Promise<boolean> {
    return this.headerLogo.isVisible();
  }
}
