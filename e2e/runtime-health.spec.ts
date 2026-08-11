import { expect, test } from '@playwright/test';

/**
 * Every key page should load without console errors or failed network requests
 * — a broad smoke net that catches hydration errors, missing assets, and
 * broken client code that feature tests might miss.
 */
const PATHS = [
  '/',
  '/services',
  '/service/digital-strategy',
  '/case-studies',
  '/case-studies/meridian-health-booking',
  '/pricing',
  '/blog',
  '/blog/measuring-marketing-that-matters',
  '/blog/tag/growth',
  '/contact',
  '/about',
  '/privacy-policy',
  '/terms',
];

for (const path of PATHS) {
  test(`no console errors or failed requests on ${path}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('response', (res) => {
      // Same-origin resources should not 4xx/5xx.
      if (res.status() >= 400 && res.url().includes('localhost')) {
        failedRequests.push(`${res.status()} ${res.url()}`);
      }
    });

    await page.goto(path, { waitUntil: 'networkidle' });

    expect(consoleErrors, consoleErrors.join('\n')).toEqual([]);
    expect(failedRequests, failedRequests.join('\n')).toEqual([]);
  });
}
