import { expect, test } from '@playwright/test';

test.describe('blog', () => {
  test('index shows a featured post and a topics cloud', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/insights to help you grow/i);
    await expect(page.getByLabel('Browse by topic')).toBeVisible();
    await expect(page.getByRole('link', { name: /#seo/i }).first()).toBeVisible();
  });

  test('opens a post, shows tags and related articles, and tags are clickable', async ({
    page,
  }) => {
    await page.goto('/blog');
    await page.getByRole('link', { name: /core web vitals that actually move revenue/i }).click();
    await expect(page).toHaveURL(/\/blog\/core-web-vitals-that-actually-move-revenue$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/core web vitals/i);

    // Reading-time / meta line.
    await expect(page.getByText(/min read/i)).toBeVisible();

    // Related posts section.
    await expect(page.getByRole('heading', { name: /related articles/i })).toBeVisible();

    // Clickable tag navigates to the tag page.
    await page.getByRole('link', { name: '#seo' }).first().click();
    await expect(page).toHaveURL(/\/blog\/tag\/seo$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/tagged: seo/i);
  });

  test('tag page lists only matching posts and links back to the blog', async ({ page }) => {
    await page.goto('/blog/tag/performance');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/tagged: performance/i);
    await page.getByRole('link', { name: /all articles/i }).click();
    await expect(page).toHaveURL(/\/blog$/);
  });

  test('unknown tag returns 404', async ({ page }) => {
    const res = await page.goto('/blog/tag/does-not-exist');
    expect(res?.status()).toBe(404);
  });
});
