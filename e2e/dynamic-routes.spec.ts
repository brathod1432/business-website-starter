import { expect, test } from '@playwright/test';

/**
 * Exhaustive coverage: every URL advertised in the sitemap must return 200 and
 * render exactly one <h1>. Driven from /sitemap.xml so new content is covered
 * automatically without editing this file.
 */
async function sitemapPaths(request: import('@playwright/test').APIRequestContext) {
  const res = await request.get('/sitemap.xml');
  expect(res.status()).toBe(200);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .filter((u): u is string => Boolean(u));
  // Reduce to path-only (the build host may differ from the test host).
  return locs.map((u) => new URL(u).pathname);
}

test('sitemap advertises the expected route families', async ({ request }) => {
  const paths = await sitemapPaths(request);
  expect(paths).toContain('/');
  expect(paths.some((p) => p.startsWith('/service/'))).toBe(true);
  expect(paths.some((p) => p.startsWith('/case-studies/'))).toBe(true);
  expect(paths.some((p) => p.startsWith('/blog/'))).toBe(true);
  expect(paths.some((p) => p.startsWith('/blog/tag/'))).toBe(true);
  // A healthy content set: 9 static + 6 services + 3 case studies + 4 posts + tags.
  expect(paths.length).toBeGreaterThanOrEqual(25);
});

test('every sitemap URL renders 200 with a single h1', async ({ page, request }) => {
  const paths = await sitemapPaths(request);
  for (const path of paths) {
    const res = await page.goto(path);
    expect(res?.status(), `status for ${path}`).toBe(200);
    await expect(page.getByRole('heading', { level: 1 }), `h1 count for ${path}`).toHaveCount(1);
  }
});

test('unknown slugs return a real 404 for every dynamic route family', async ({ request }) => {
  for (const path of [
    '/service/does-not-exist',
    '/blog/does-not-exist',
    '/case-studies/does-not-exist',
    '/blog/tag/does-not-exist',
  ]) {
    const res = await request.get(path);
    expect(res.status(), `status for ${path}`).toBe(404);
  }
});
