import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against a production build served on port 3100.
 *
 * We drive the locally installed Google Chrome via `channel: 'chrome'`, so no
 * Playwright browser download is required (works offline / behind proxies).
 *
 * Workers are limited to 1: the in-memory rate limiter is shared per server
 * process, so serial execution keeps rate-limit assertions deterministic.
 */
const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
    env: { NEXT_PUBLIC_SITE_URL: baseURL },
  },
});
