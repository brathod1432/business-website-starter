import { expect, test } from '@playwright/test';

async function jsonLdTypes(page: import('@playwright/test').Page): Promise<string[]> {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types: string[] = [];
  for (const raw of blocks) {
    try {
      const data = JSON.parse(raw);
      if (data['@type']) types.push(String(data['@type']));
    } catch {
      // ignore
    }
  }
  return types;
}

test.describe('metadata', () => {
  test('home has title, canonical, OpenGraph, and Twitter tags', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Acme Solutions/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
  });

  test('service page sets a canonical to its own path', async ({ page }) => {
    await page.goto('/service/brand-design');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/service/brand-design');
  });

  test('blog index links the RSS feed in the head', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('link[type="application/rss+xml"]')).toHaveAttribute(
      'href',
      /\/feed\.xml$/,
    );
  });
});

test.describe('structured data (JSON-LD)', () => {
  test('home emits Organization, WebSite, and LocalBusiness with a rating', async ({ page }) => {
    await page.goto('/');
    const types = await jsonLdTypes(page);
    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');
    expect(types).toContain('ProfessionalService'); // LocalBusiness subtype
    // FAQ structured data present on the homepage.
    expect(types).toContain('FAQPage');

    const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(raw.join(' ')).toContain('AggregateRating');
  });

  test('service page emits Service + Breadcrumb', async ({ page }) => {
    await page.goto('/service/cloud-devops');
    const types = await jsonLdTypes(page);
    expect(types).toContain('Service');
    expect(types).toContain('BreadcrumbList');
  });

  test('blog post emits Article', async ({ page }) => {
    await page.goto('/blog/designing-forms-people-finish');
    const types = await jsonLdTypes(page);
    expect(types).toContain('Article');
  });
});

test.describe('SEO + PWA endpoints', () => {
  test('sitemap includes core + dynamic routes', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain('<urlset');
    expect(xml).toContain('/services');
    expect(xml).toContain('/service/web-development');
    expect(xml).toContain('/blog/tag/seo');
  });

  test('robots.txt allows crawling and links the sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/Allow: \//);
    expect(body).toMatch(/Sitemap:/);
  });

  test('RSS feed is valid and served with the right content type', async ({ request }) => {
    const res = await request.get('/feed.xml');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/rss+xml');
    expect(await res.text()).toContain('<rss');
  });

  test('web manifest is served', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.status()).toBe(200);
    const json = JSON.parse(await res.text());
    expect(json.name).toBeTruthy();
    expect(Array.isArray(json.icons)).toBe(true);
  });

  test('dynamic OG image renders a PNG', async ({ request }) => {
    const res = await request.get('/og?title=Hello');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/png');
  });

  test('security.txt is served', async ({ request }) => {
    const res = await request.get('/.well-known/security.txt');
    expect(res.status()).toBe(200);
    expect(await res.text()).toMatch(/Contact:/);
  });
});
