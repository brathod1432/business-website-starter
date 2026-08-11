import { expect, test } from '@playwright/test';

test.describe('dark mode', () => {
  test('toggles theme and persists across reload', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggle = page
      .getByRole('banner')
      .getByRole('button', { name: /Switch to (dark|light) mode/ })
      .first();

    const startedDark = await html.evaluate((el) => el.classList.contains('dark'));

    await toggle.click();
    if (startedDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    // Force dark, then confirm it survives a reload (persisted via next-themes).
    if (!(await html.evaluate((el) => el.classList.contains('dark')))) {
      await toggle.click();
    }
    await expect(html).toHaveClass(/dark/);
    await page.reload();
    await expect(html).toHaveClass(/dark/);
  });
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens and closes the mobile menu and navigates', async ({ page }) => {
    await page.goto('/');
    const openBtn = page.getByRole('button', { name: 'Open menu' });
    await expect(openBtn).toBeVisible();
    await expect(openBtn).toHaveAttribute('aria-expanded', 'false');

    await openBtn.click();
    const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' });
    await expect(mobileNav).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    await mobileNav.getByRole('link', { name: 'Pricing', exact: true }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    // Menu closes after navigation.
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
  });
});
