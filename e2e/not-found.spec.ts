import { expect, test } from '@playwright/test';

test.describe('not found', () => {
  test('unknown route returns 404 with a helpful page', async ({ page }) => {
    const res = await page.goto('/this-page-does-not-exist');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: /page not found/i })).toBeVisible();
    await page.getByRole('link', { name: /back home/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
