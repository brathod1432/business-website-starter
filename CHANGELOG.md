# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.7.0] - 2026-08-11

### Added

- **Expanded E2E suite (48 → 97 tests)**: real-browser **axe-core accessibility scans** (WCAG
  2.0/2.1 A+AA) across 13 pages + dark mode + the contact form with errors; exhaustive
  sitemap-driven dynamic-route coverage; keyboard-operability tests; per-page metadata + OG image
  - Breadcrumb/Article JSON-LD checks; no-console-error / no-failed-request smoke net; and
    consent/reduced-motion/system-theme behavior. Added `@axe-core/playwright`.

### Fixed

- **Accessibility (WCAG AA) issues caught by the axe scans:**
  - Star-rating element used `aria-label` without a role → added `role="img"`.
  - Client-logo text (`text-muted-foreground/70`) failed color contrast → use full
    `text-muted-foreground`.
  - Accent color darkened (`174 84% 26%`) so white button text meets 4.5:1.
  - Dark-mode primary retuned to a light blue with dark foreground so it passes both as a button
    background and as `text-primary` on dark surfaces.

## [1.6.0] - 2026-08-11

### Added

- **End-to-end test suite (Playwright)** covering navigation, dark mode, mobile menu, all pages,
  the blog taxonomy, forms, SEO/PWA endpoints, structured data, and the security/API contract —
  48 tests driving the locally installed Chrome (no browser download). Scripts: `test:e2e`,
  `test:e2e:ui`; CI runs it on every push/PR.

### Fixed

- **Soft 404s**: unknown dynamic URLs (`/service/*`, `/blog/*`, `/case-studies/*`, `/blog/tag/*`)
  returned HTTP 200 while rendering the not-found UI. Added `dynamicParams = false` so unknown
  slugs now return a real **404** — correct for SEO. (Caught by the new E2E suite.)

## [1.5.0] - 2026-08-10

### Added

- **Real-user Core Web Vitals** reporting (`WebVitals`) via `useReportWebVitals`, sent as
  consent-gated analytics events (LCP, INP, CLS, FCP, TTFB).
- **AI-crawler control**: `siteConfig.seo.blockAiCrawlers` disallows known AI training bots
  (GPTBot, ClaudeBot, CCBot, Google-Extended, …) in `robots.txt`; testable `buildRobotsRules`.
- **Modern security reporting**: `Reporting-Endpoints` header + CSP `report-to` directive.
- **Rate-limit headers** (`X-RateLimit-Limit` / `X-RateLimit-Remaining`) on API responses.
- Tests for robots rules (95 tests total).

## [1.4.0] - 2026-08-10

### Added

- **SPA analytics + accessibility**: `RouteAnalytics` fires a consent-gated `page_view` on
  client-side navigation and moves focus to `#main-content` with an `aria-live` announcement.
- **Star rich snippets**: `AggregateRating` + `Review` structured data in the LocalBusiness
  JSON-LD, derived from testimonials (`getAggregateRating`).
- **GDPR consent withdrawal**: `reset()` in the consent context and a "Cookie settings" footer
  control to reopen/change consent.
- **CSP violation reporting**: `report-uri` directive + `/api/csp-report` collector endpoint.
- Tests for aggregate rating and consent reset (92 tests total).

## [1.3.0] - 2026-08-10

### Added

- **Blog tag taxonomy**: statically generated tag pages at `/blog/tag/[slug]`, a topics cloud on
  the blog index, clickable tags, and **related posts** on each article (`getAllTags`,
  `getPostsByTag`, `getRelatedPosts`, `tagToSlug`). Tag pages included in the sitemap.
- **LocalBusiness structured data** (`LocalBusinessJsonLd`) configurable via `siteConfig.business`
  (Schema.org type, price range, area served, geo, opening hours).
- **CSRF/origin guard** (`isSameOrigin`) on the contact and newsletter API routes.
- Extra hardening headers: `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`,
  `X-Permitted-Cross-Domain-Policies`.
- CI **dependency audit** step (`npm audit`, advisory).
- Reusable `BlogPostCard` component; tests for tags and the origin guard (89 tests total).

## [1.2.0] - 2026-08-10

### Added

- **Real email delivery** via Resend (`fetch`-based, no SDK dependency) with an automatic
  simulated fallback — wired into the contact and newsletter routes (`src/lib/email.ts`).
- **Cloudflare Turnstile** CAPTCHA (optional, env-gated) with client widget and server-side
  verification (`src/lib/turnstile.ts`, `src/components/security/turnstile.tsx`).
- **Per-page dynamic OG images** for blog posts, services, and case studies (`/og?title=…`).
- **RSS feed** at `/feed.xml`, linked from the blog `<head>`.
- **Health check** endpoint at `/api/health` and **`/.well-known/security.txt`** (RFC 9116).
- **Consent-aware conversion tracking** (`trackEvent`) on contact and newsletter submissions.
- **Deploy to Vercel** button and expanded environment documentation.

### Changed

- CSP extended to allow Cloudflare Turnstile origins.
- `.env.example` documents email + Turnstile variables.

## [1.1.0] - 2026-08-10

### Added

- **Dark mode** with a system-aware theme toggle (`next-themes`).
- **Cookie consent** banner with **consent-gated analytics** (GDPR-conscious).
- **Newsletter** signup with a mock API route and shared Zod validation.
- **Security hardening:** Content Security Policy + HSTS and additional headers,
  IP-based **rate limiting** on API routes, and startup **environment
  validation** (`src/lib/env.ts`).
- **PWA:** web app manifest and app icons (192/512 + maskable).
- **Resilience:** route `error`, `global-error`, and `loading` boundaries.
- **Project screenshots** in `public/screenshots/` plus a generator script.
- **OSS/DX setup:** MIT license, security policy, contributing guide, code of
  conduct, CI workflow, Dependabot, issue/PR templates, EditorConfig, `.nvmrc`,
  and VS Code recommendations.
- Improvement report at `docs/improvements.md`.

## [1.0.0] - 2026-08-10

### Added

- Initial production-grade starter: Next.js App Router + TypeScript + Tailwind +
  ShadCN-style UI.
- Full information architecture (home, about, services + detail, case studies +
  detail, pricing, blog + detail, contact, privacy, terms).
- Reusable component library, CMS-ready content layer, contact form with mock
  API, SEO (metadata, sitemap, robots, JSON-LD), accessibility, and a Jest +
  RTL + jest-axe test suite.
