import { test, expect } from '@playwright/test';

test.describe('Google Home Page', () => {
  test('should load Google home page and verify title', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
  });
});
