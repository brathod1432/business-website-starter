import { expect, test } from '@playwright/test';

const NAV = [
  { name: 'Services', path: '/services' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
];

test.describe('primary navigation', () => {
  test('header links route to the correct pages and set active state', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });

    for (const item of NAV) {
      await nav.getByRole('link', { name: item.name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${item.path.replace('/', '\\/')}$`));
      // Active link exposes aria-current="page".
      await expect(nav.getByRole('link', { name: item.name, exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      );
    }
  });

  test('logo returns to the homepage', async ({ page }) => {
    await page.goto('/about');
    await page
      .getByRole('banner')
      .getByRole('link', { name: /Acme Solutions home/i })
      .click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('header "Get started" leads to contact', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('banner').getByRole('link', { name: 'Get started' }).first().click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('footer exposes company, resources, and legal links', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Terms' })).toBeVisible();
    await footer.getByRole('link', { name: 'Privacy Policy' }).click();
    await expect(page).toHaveURL(/\/privacy-policy$/);
  });

  test('skip-to-content link is the first focusable element', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: /skip to content/i });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#main-content');
  });
});
