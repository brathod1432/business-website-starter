import { expect, test } from '@playwright/test';

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the hero with headline and CTAs', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/loyal customers/i);
    await expect(page.getByRole('link', { name: /book a strategy call/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /explore services/i })).toBeVisible();
  });

  test('renders every major section', async ({ page }) => {
    const headings = [
      /services built to drive results/i,
      /a partner invested in your outcomes/i,
      /a proven, four-step process/i,
      /numbers that speak for themselves/i,
      /what our clients say/i,
      /industries we can serve/i,
      /frequently asked questions/i,
      /ready to grow your business/i,
    ];
    for (const h of headings) {
      await expect(page.getByRole('heading', { name: h })).toBeVisible();
    }
    await expect(page.getByText(/trusted by teams at/i)).toBeVisible();
  });

  test('has exactly one h1', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });

  test('FAQ accordion expands an answer on click', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /how long does a typical project take/i });
    await trigger.scrollIntoViewIfNeeded();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText(/most marketing sites launch/i)).toBeVisible();
  });

  test('featured services link through to detail pages', async ({ page }) => {
    const servicesSection = page.getByRole('heading', { name: /services built to drive results/i });
    await servicesSection.scrollIntoViewIfNeeded();
    await page.getByRole('link', { name: 'Web & App Development' }).click();
    await expect(page).toHaveURL(/\/service\/web-development$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Web & App Development');
  });
});
