// Capture screenshots of key pages for the README / portfolio reference.
// Usage: node scripts/screenshots.mjs [baseUrl]
// Requires a local Chrome/Edge and puppeteer-core (dev only):
//   npm i -D puppeteer-core
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const BASE = process.argv[2] ?? 'http://localhost:3200';
const OUT = path.resolve('public/screenshots');

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!executablePath) throw new Error('No Chrome/Edge executable found.');

const desktop = { width: 1440, height: 900, deviceScaleFactor: 2 };
const mobile = { width: 390, height: 844, deviceScaleFactor: 2 };

// [route, filename, viewport, fullPage, theme]
const shots = [
  ['/', 'home.png', desktop, true, 'light'],
  ['/', 'home-hero.png', desktop, false, 'light'],
  ['/', 'home-dark.png', desktop, true, 'dark'],
  ['/services', 'services.png', desktop, true, 'light'],
  ['/service/web-development', 'service-detail.png', desktop, true, 'light'],
  ['/case-studies', 'case-studies.png', desktop, true, 'light'],
  ['/pricing', 'pricing.png', desktop, true, 'light'],
  ['/blog', 'blog.png', desktop, true, 'light'],
  ['/contact', 'contact.png', desktop, true, 'light'],
  ['/about', 'about.png', desktop, true, 'light'],
  ['/', 'home-mobile.png', mobile, true, 'light'],
];

const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
});

await mkdir(OUT, { recursive: true });

for (const [route, file, viewport, fullPage, theme] of shots) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  // Drive next-themes ("system") via the emulated OS color scheme.
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: theme }]);
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
  // Settle scroll-reveal (framer-motion) elements to their final visible state so
  // screenshots never capture a mid-animation (opacity 0 / translated) frame.
  await page.evaluate(() => {
    document.querySelectorAll('[style]').forEach((el) => {
      const s = el.style;
      if (s.opacity && s.opacity !== '1') s.opacity = '1';
      if (s.transform && s.transform !== 'none') s.transform = 'none';
    });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, file), fullPage });
  console.log(`captured ${file}`);
  await page.close();
}

await browser.close();
console.log('done');
