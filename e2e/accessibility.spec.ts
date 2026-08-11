import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * Real-browser accessibility scans with axe-core across every key page and both
 * color themes. We fail on serious/critical WCAG 2.0/2.1 A & AA violations.
 */
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'service detail', path: '/service/web-development' },
  { name: 'case studies', path: '/case-studies' },
  { name: 'case study detail', path: '/case-studies/northwind-logistics-portal' },
  { name: 'pricing', path: '/pricing' },
  { name: 'blog', path: '/blog' },
  { name: 'blog post', path: '/blog/core-web-vitals-that-actually-move-revenue' },
  { name: 'blog tag', path: '/blog/tag/seo' },
  { name: 'contact', path: '/contact' },
  { name: 'about', path: '/about' },
  { name: 'privacy', path: '/privacy-policy' },
  { name: 'terms', path: '/terms' },
];

async function scan(page: import('@playwright/test').Page) {
  return new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
}

for (const p of PAGES) {
  test(`a11y: ${p.name} has no serious/critical violations`, async ({ page }) => {
    await page.goto(p.path);
    const results = await scan(page);
    const seriousOrWorse = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      seriousOrWorse,
      seriousOrWorse.map((v) => `${v.id} (${v.impact}): ${v.help}`).join('\n'),
    ).toEqual([]);
  });
}

test('a11y: homepage is clean in dark mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const results = await scan(page);
  const seriousOrWorse = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  expect(
    seriousOrWorse,
    seriousOrWorse.map((v) => `${v.id} (${v.impact}): ${v.help}`).join('\n'),
  ).toEqual([]);
});

test('a11y: contact form with visible validation errors stays accessible', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: /send message/i }).click();
  await expect(page.getByRole('alert').first()).toBeVisible();
  const results = await scan(page);
  const seriousOrWorse = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  expect(
    seriousOrWorse,
    seriousOrWorse.map((v) => `${v.id} (${v.impact}): ${v.help}`).join('\n'),
  ).toEqual([]);
});
