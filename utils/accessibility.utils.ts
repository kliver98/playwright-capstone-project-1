import AxeBuilder from '@axe-core/playwright';
import { Page } from '@playwright/test';

export interface AccessibilityScanOptions {
  tags?: string[];
  rules?: string[];
  includeImpacts?: ('minor' | 'moderate' | 'serious' | 'critical')[];
}

export class AccessibilityUtils {
  static async scanPage(page: Page, options: AccessibilityScanOptions = {}) {
    let builder = new AxeBuilder({ page });

    if (options.tags && options.tags.length > 0) {
      builder = builder.withTags(options.tags);
    } else {
      builder = builder.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    }

    const results = await builder.analyze();

    if (options.includeImpacts && options.includeImpacts.length > 0) {
      return results.violations.filter((v) =>
        options.includeImpacts!.includes(v.impact as any)
      );
    }

    return results.violations;
  }
}
