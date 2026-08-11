import { expect, test } from '@playwright/test';

test.describe('consent', () => {
  test('cookie banner is hidden by default (no analytics configured)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog', { name: /cookie consent/i })).toHaveCount(0);
    // The "Cookie settings" control is only shown when analytics is configured.
    await expect(page.getByRole('contentinfo').getByText('Cookie settings')).toHaveCount(0);
  });
});

test.describe('reduced motion', () => {
  test('scroll-reveal content is fully visible when motion is reduced', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    // Hero content is inside a Reveal; under reduced motion it renders statically.
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /explore services/i })).toBeVisible();
  });
});

test.describe('system theme', () => {
  test('respects prefers-color-scheme: dark on first load', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('respects prefers-color-scheme: light on first load', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
