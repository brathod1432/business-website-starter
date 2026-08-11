import { expect, test } from '@playwright/test';

/**
 * Per-page metadata: each route composes a distinct <title>, a self-referential
 * canonical, and (for detail pages) a title-specific OG image via /og.
 */
const PAGES = [
  { path: '/services', title: /Services \|/, canonical: '/services' },
  { path: '/case-studies', title: /Case Studies \|/, canonical: '/case-studies' },
  { path: '/pricing', title: /Pricing \|/, canonical: '/pricing' },
  { path: '/blog', title: /Blog \|/, canonical: '/blog' },
  { path: '/about', title: /About \|/, canonical: '/about' },
  { path: '/contact', title: /Contact \|/, canonical: '/contact' },
  { path: '/privacy-policy', title: /Privacy Policy \|/, canonical: '/privacy-policy' },
  { path: '/terms', title: /Terms of Service \|/, canonical: '/terms' },
];

for (const p of PAGES) {
  test(`metadata: ${p.path} has a distinct title + canonical`, async ({ page }) => {
    await page.goto(p.path);
    await expect(page).toHaveTitle(p.title);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain(p.canonical);
  });
}

test('detail pages use a title-specific dynamic OG image', async ({ page }) => {
  await page.goto('/blog/designing-forms-people-finish');
  const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute('content');
  expect(ogImage).toContain('/og');
  expect(decodeURIComponent(ogImage ?? '')).toMatch(/title=/i);
});

test('blog post exposes Breadcrumb + Article structured data', async ({ page }) => {
  await page.goto('/blog/headless-cms-migration-without-downtime');
  const raw = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(
    ' ',
  );
  expect(raw).toContain('BreadcrumbList');
  expect(raw).toContain('Article');
});

test('article OpenGraph type is set on blog posts', async ({ page }) => {
  await page.goto('/blog/measuring-marketing-that-matters');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
});
