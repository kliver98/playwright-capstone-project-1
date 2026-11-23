import { test, expect } from '../fixtures/test.fixture';
import { AccessibilityUtils } from '../utils/accessibility.utils';

test.describe('Accessibility Suite - Axe Core', () => {
  test('TC08 - should verify login page has no critical or serious accessibility violations', async ({
    loginPage,
    page,
  }) => {
    await loginPage.navigateTo('/');

    const violations = await AccessibilityUtils.scanPage(page, {
      includeImpacts: ['critical', 'serious'],
    });

    expect(violations).toEqual([]);
  });

  test('TC09 - should verify inventory page accessibility with axe builder fixture', async ({
    loginPage,
    inventoryPage,
    makeAxeBuilder,
  }) => {
    await loginPage.navigateTo('/');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.titleHeader).toBeVisible();

    const results = await makeAxeBuilder().analyze();
    const criticalViolations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(criticalViolations).toEqual([]);
  });
});
