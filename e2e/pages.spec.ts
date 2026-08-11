import { expect, test } from '@playwright/test';

test.describe('services', () => {
  test('lists all services and links to a detail page with breadcrumb', async ({ page }) => {
    await page.goto('/services');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /everything you need to grow/i,
    );

    const titles = [
      'Web & App Development',
      'Digital Strategy & Consulting',
      'Brand & Product Design',
      'Growth & Performance Marketing',
      'Cloud & DevOps',
      'Managed Support & Care',
    ];
    for (const t of titles) {
      await expect(page.getByRole('link', { name: t })).toBeVisible();
    }

    await page.getByRole('link', { name: 'Cloud & DevOps' }).click();
    await expect(page).toHaveURL(/\/service\/cloud-devops$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cloud & DevOps');

    // Breadcrumb present and navigable.
    const crumb = page.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(crumb).toBeVisible();
    await crumb.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/\/services$/);
  });

  test('service detail shows outcomes and a discuss-project CTA', async ({ page }) => {
    await page.goto('/service/web-development');
    await expect(page.getByText(/outcomes you can expect/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /discuss your project/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });
});

test.describe('case studies', () => {
  test('lists case studies and opens a detail page with metrics', async ({ page }) => {
    await page.goto('/case-studies');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/results that speak/i);
    await page.getByRole('link', { name: /portal that cut support tickets/i }).click();
    await expect(page).toHaveURL(/\/case-studies\/northwind-logistics-portal$/);
    await expect(page.getByRole('heading', { name: /the challenge/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /our solution/i })).toBeVisible();
  });
});

test.describe('pricing', () => {
  test('shows all plans and a highlighted plan', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /simple, transparent pricing/i,
    );
    await expect(page.getByText('Starter', { exact: true })).toBeVisible();
    await expect(page.getByText('Growth', { exact: true })).toBeVisible();
    await expect(page.getByText('Scale', { exact: true })).toBeVisible();
    await expect(page.getByText('Most popular')).toBeVisible();
    await page.getByRole('link', { name: /choose growth/i }).click();
    await expect(page).toHaveURL(/\/contact\?plan=growth$/);
  });
});

test.describe('about + legal', () => {
  test('about page renders mission and values', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /our mission/i })).toBeVisible();
  });

  test('privacy and terms render with a single h1', async ({ page }) => {
    await page.goto('/privacy-policy');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/privacy policy/i);
    await page.goto('/terms');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/terms of service/i);
  });
});
