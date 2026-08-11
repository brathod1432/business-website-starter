import { expect, test } from '@playwright/test';

test.describe('keyboard operability', () => {
  test('primary nav is reachable and activatable with the keyboard', async ({ page }) => {
    await page.goto('/');
    const servicesLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Services', exact: true });
    await servicesLink.focus();
    await expect(servicesLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/services$/);
  });

  test('FAQ accordion toggles via keyboard (Enter/Space)', async ({ page }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: /how long does a typical project take/i });
    await trigger.scrollIntoViewIfNeeded();
    await trigger.focus();
    await expect(trigger).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu can be opened and closed with the keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Open menu' });
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
    await page.getByRole('button', { name: 'Close menu' }).press('Enter');
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
  });
});
