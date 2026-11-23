import { Page, Locator } from '@playwright/test';

export class WebUtils {
  static async waitForElementVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  static async safeClick(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  }

  static async getTrimmedText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    const text = await locator.textContent();
    return text ? text.trim() : '';
  }
}
