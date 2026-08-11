# Testing

## Strategy

Testing is layered to match risk while keeping the suite fast:

| Layer          | What it verifies                                 | Location                               |
| -------------- | ------------------------------------------------ | -------------------------------------- |
| Unit           | Pure helpers (`cn`, `formatDate`, `readingTime`) | `tests/lib/utils.test.ts`              |
| Validation     | Zod contact schema (valid, invalid, honeypot)    | `tests/lib/contact-validation.test.ts` |
| SEO            | `buildMetadata` / `absoluteUrl` output           | `tests/lib/seo.test.ts`                |
| Content        | Repository functions + icon integrity            | `tests/content/content.test.ts`        |
| Component      | Button, cards, FAQ, ContactForm behavior         | `tests/components/*`                   |
| Page rendering | Pages render, single `h1`, dynamic params        | `tests/pages/*`                        |
| Accessibility  | `jest-axe` on form, footer, pricing card         | `tests/a11y/accessibility.test.tsx`    |
| End-to-end     | Full user journeys in a real browser             | `e2e/*.spec.ts`                        |

## Tooling

- **Jest** with `next/jest` for Next-aware transforms (unit/component/integration).
- **React Testing Library** for user-centric component/page tests.
- **@testing-library/user-event** for realistic interactions.
- **jest-axe** for automated accessibility assertions.
- **Playwright** for end-to-end tests, driving the **locally installed Chrome**
  (`channel: 'chrome'` in `playwright.config.ts`) against a production build — no browser
  download required.
- jsdom polyfills for `matchMedia` and `IntersectionObserver` live in `jest.setup.ts`
  (required by Framer Motion).

## Running

```bash
npm test              # Jest: unit / component / a11y
npm run test:watch    # Jest watch mode
npm run coverage      # Jest with coverage (text + lcov)
npm run test:e2e      # Playwright: builds, serves on :3100, runs e2e/
npm run test:e2e:ui   # Playwright interactive UI mode
```

Coverage output is written to `coverage/` (lcov) and printed to the console.

## End-to-end coverage

The Playwright suite (`e2e/`) exercises the app the way a real visitor and an operator would:

| Spec                         | Covers                                                                                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `navigation.spec.ts`         | Header nav + active state, logo, footer links, skip-to-content focus                                                                                      |
| `theme-and-mobile.spec.ts`   | Dark-mode toggle + persistence, mobile menu open/close/navigate                                                                                           |
| `home.spec.ts`               | Hero + all sections, single `h1`, FAQ accordion, service links                                                                                            |
| `pages.spec.ts`              | Services + detail + breadcrumb, case studies + detail, pricing, about, legal                                                                              |
| `blog.spec.ts`               | Index, topics cloud, post detail, related posts, clickable tags, tag pages, 404                                                                           |
| `forms.spec.ts`              | Contact validation + success, newsletter validation + success                                                                                             |
| `not-found.spec.ts`          | Unknown routes return a real 404                                                                                                                          |
| `seo.spec.ts`                | Title/canonical/OG/Twitter, JSON-LD (Org/WebSite/LocalBusiness+rating/Service/Breadcrumb/Article), sitemap, robots, RSS, manifest, OG image, security.txt |
| `metadata.spec.ts`           | Per-page distinct titles + canonicals, per-post OG image, `og:type=article`, Breadcrumb/Article JSON-LD                                                   |
| `dynamic-routes.spec.ts`     | Every sitemap URL → 200 + single `h1`; unknown slug → 404 for each dynamic family                                                                         |
| `keyboard.spec.ts`           | Keyboard-operable nav (focus + Enter), FAQ toggle, mobile menu                                                                                            |
| `runtime-health.spec.ts`     | No console errors / no failed same-origin requests on every key page                                                                                      |
| `consent-and-motion.spec.ts` | Consent banner hidden by default, reduced-motion renders content, system light/dark scheme                                                                |
| `accessibility.spec.ts`      | **axe-core** WCAG 2.0/2.1 A+AA scans on 14 pages, dark mode, and the contact form with errors                                                             |
| `security-and-api.spec.ts`   | Hardened headers, CSRF 403, rate-limit headers + 429, invalid-payload 422, health, CSP report 204                                                         |

Accessibility scans use **@axe-core/playwright** and fail on any serious/critical violation.
Because the in-memory rate limiter is per server process, E2E runs with a single worker and
isolates API scenarios with distinct `X-Forwarded-For` values so rate-limit assertions are
deterministic.

## Current status

- **Jest:** 21 suites · 95 tests passing
- **Playwright (e2e):** 99 tests passing (Chrome), including axe-core a11y scans
- **Coverage:** ~78% statements · ~82% lines (Jest)

Coverage intentionally excludes the root `layout.tsx` and pure-presentational config. The
`app/og` image route and analytics loaders are validated via build rather than jsdom (canvas /
edge runtime aren't available in the test environment).

## What each test protects against

- **Validation tests** guard the contact form contract shared by client and server.
- **SEO tests** ensure canonical URLs and titles never silently regress.
- **Content tests** catch broken slugs and icon references before runtime.
- **Component/page tests** assert accessible roles/labels and correct links.
- **a11y tests** catch missing labels, invalid ARIA, and contrast-independent issues.

## Extending

- Co-locate new tests under `tests/**` using the `*.test.ts(x)` pattern.
- Prefer role/label queries (`getByRole`, `getByLabelText`) over test IDs.
- Add a `jest-axe` assertion whenever you add an interactive component.
- Consider Playwright for end-to-end and visual regression as the app grows.
