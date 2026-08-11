# Business Website Starter

[![CI](https://github.com/brathod1432/business-website-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/brathod1432/business-website-starter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-grade, reusable marketing website starter built with **Next.js (App Router)**,
**TypeScript**, **Tailwind CSS**, and **ShadCN-style UI**. Designed to be re-branded and shipped
for any business — local services, consulting, IT, agencies, healthcare, legal, logistics, SaaS,
and more.

> Re-brand the entire site by editing two files: `src/lib/site-config.ts` (content) and
> `src/styles/globals.css` (design tokens).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/brathod1432/business-website-starter&env=NEXT_PUBLIC_SITE_URL&envDescription=Canonical%20site%20URL%20used%20for%20metadata%2C%20sitemap%2C%20and%20OG%20tags)

## Overview

- Conversion-focused homepage with 10+ composable sections.
- Full information architecture: Home, About, Services (+ dynamic detail), Case Studies
  (+ detail), Pricing, Blog (+ detail), Contact, Privacy Policy, Terms.
- CMS-ready content layer (typed mock data behind a repository API).
- Strong SEO: metadata helper, canonical URLs, OpenGraph/Twitter, dynamic OG images,
  `sitemap.xml`, `robots.txt`, and JSON-LD (Organization, Website, Article, Service,
  Breadcrumb, FAQ).
- Accessibility built in (semantic landmarks, skip link, keyboard nav, focus states,
  labeled forms) — verified with `jest-axe`.
- Performance-first: static generation, system font stack (zero font requests), security
  headers, lean ~103 kB shared JS.

## Features

| Area       | Highlights                                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| UI         | ShadCN-style primitives (Button, Card, Input, Textarea, Label, Accordion, Badge)                                             |
| Sections   | Hero, Client Logos, Services, Why Choose Us, Process, Metrics, Testimonials, Industries, FAQ, CTA, Contact                   |
| Dark mode  | System-aware theme with a header toggle (`next-themes`)                                                                      |
| Forms      | React Hook Form + Zod, shared client/server schema, honeypot + rate limiting, success/error states                           |
| Lead gen   | Contact form + newsletter signup with **real email delivery** (Resend) + simulated fallback                                  |
| Email      | Provider-agnostic `sendEmail` (no SDK dep); set `RESEND_API_KEY` + `EMAIL_FROM` to go live                                   |
| Anti-spam  | Honeypots + IP rate limiting + optional Cloudflare Turnstile CAPTCHA (env-gated)                                             |
| Feeds/Ops  | RSS at `/feed.xml`, `/api/health`, `/.well-known/security.txt`                                                               |
| Content    | Repository pattern (`getServices`, `getBlogPostBySlug`, …) ready for a headless CMS                                          |
| Blog       | Tag pages (`/blog/tag/[slug]`), topics cloud, clickable tags, related posts                                                  |
| SEO        | `buildMetadata()` helper, JSON-LD (Org, **LocalBusiness**, Article, Service, Breadcrumb, FAQ), sitemap/robots, dynamic OG    |
| Privacy    | Cookie consent banner + "Cookie settings" to withdraw; analytics load only after opt-in                                      |
| Security   | CSP + HSTS + CSP reporting (report-to), COOP/CORP, CSRF guard, rate limiting (+headers), env validation, honeypots, CI audit |
| Crawlers   | `robots.txt` with optional AI-bot blocking (`siteConfig.seo.blockAiCrawlers`)                                                |
| PWA        | Web app manifest + icons (192/512 + maskable)                                                                                |
| Resilience | `error`, `global-error`, and `loading` route boundaries                                                                      |
| Motion     | Framer Motion reveals that respect `prefers-reduced-motion`                                                                  |
| Analytics  | GA4 + Microsoft Clarity, consent-gated; SPA `page_view`, conversion events, real-user Core Web Vitals                        |
| Quality    | TypeScript strict, ESLint, Prettier, Jest + RTL + jest-axe, Playwright E2E, GitHub Actions CI                                |

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19
- **Language:** TypeScript (strict, `noUncheckedIndexedAccess`)
- **Styling:** Tailwind CSS 3 + CSS-variable design tokens
- **UI:** ShadCN-style components on Radix primitives
- **Forms:** React Hook Form + Zod
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Testing:** Jest, React Testing Library, jest-axe

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local

# 3. Start the dev server
npm run dev                  # http://localhost:3000
```

> **Windows note:** if `npm` is blocked by PowerShell execution policy, use `npm.cmd`.

See [`docs/setup.md`](docs/setup.md) for full setup and environment details.

## Scripts

| Script              | Description                      |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server             |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | ESLint                           |
| `npm run typecheck` | TypeScript, no emit              |
| `npm run format`    | Prettier write                   |
| `npm test`          | Run the Jest test suite          |
| `npm run coverage`  | Run tests with a coverage report |
| `npm run test:e2e`  | Build + run Playwright E2E tests |

## Screenshots

Captured from the running app at desktop (1440px) and mobile (390px) widths. Regenerate any
time with `node scripts/screenshots.mjs` (see [Regenerating screenshots](#regenerating-screenshots)).

### Homepage

![Homepage hero](public/screenshots/home-hero.png)

<details>
<summary>Full homepage (all sections)</summary>

![Full homepage](public/screenshots/home.png)

</details>

### Dark mode

![Homepage in dark mode](public/screenshots/home-dark.png)

### Services & service detail

| Services                                     | Service detail                                           |
| -------------------------------------------- | -------------------------------------------------------- |
| ![Services](public/screenshots/services.png) | ![Service detail](public/screenshots/service-detail.png) |

### Pricing & case studies

| Pricing                                    | Case studies                                         |
| ------------------------------------------ | ---------------------------------------------------- |
| ![Pricing](public/screenshots/pricing.png) | ![Case studies](public/screenshots/case-studies.png) |

### Blog, about & contact

| Blog                                 | About                                  | Contact                                    |
| ------------------------------------ | -------------------------------------- | ------------------------------------------ |
| ![Blog](public/screenshots/blog.png) | ![About](public/screenshots/about.png) | ![Contact](public/screenshots/contact.png) |

### Mobile

<img src="public/screenshots/home-mobile.png" alt="Homepage on mobile" width="320" />

### Regenerating screenshots

Screenshots are generated with a headless Chrome/Edge (already installed on most systems — no
browser download required):

```bash
npm i -D puppeteer-core        # one-time
npm run build && npm run start # serve on http://localhost:3200 (or pass your own URL)
node scripts/screenshots.mjs http://localhost:3200
```

Images are written to `public/screenshots/`.

## Customization Guide

1. **Brand & content:** edit `src/lib/site-config.ts` (name, contact, nav, social).
2. **Colors & fonts:** edit the design tokens in `src/styles/globals.css`.
3. **Services / posts / case studies:** edit the files in `src/content/`.
4. **Swap in a CMS:** replace the repository functions in `src/content/*` — see
   [`content/README.md`](content/README.md). No UI changes required.
5. **Analytics:** set `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_CLARITY_PROJECT_ID`.

More detail in [`docs/design-system.md`](docs/design-system.md) and
[`docs/architecture.md`](docs/architecture.md).

## Deployment Guide

- **Vercel (recommended):** import the repo, set `NEXT_PUBLIC_SITE_URL` (and optional
  analytics IDs), and deploy. Zero config.
- **Any Node host:** `npm run build && npm run start` (Node 18.18+; built on Node 22).
- Set environment variables from `.env.example` in your host's dashboard.

## Documentation

- [`docs/planning.md`](docs/planning.md) — goals, requirements, architecture, strategy
- [`docs/architecture.md`](docs/architecture.md) — structure, patterns, data flow
- [`docs/design-system.md`](docs/design-system.md) — tokens, typography, components
- [`docs/seo.md`](docs/seo.md) — metadata, structured data, sitemap/robots
- [`docs/accessibility.md`](docs/accessibility.md) — a11y decisions and checklist
- [`docs/setup.md`](docs/setup.md) — install, env, scripts
- [`docs/testing.md`](docs/testing.md) — test strategy and coverage
- [`docs/improvements.md`](docs/improvements.md) — user/client + security improvement report
- [`docs/final-audit.md`](docs/final-audit.md) — audit, Lighthouse estimates, readiness

Contributing guidelines are in [`CONTRIBUTING.md`](CONTRIBUTING.md); security reporting in
[`SECURITY.md`](SECURITY.md).

## Security

Security features (CSP + HSTS & hardened headers, IP rate limiting, input validation, honeypots,
consent-gated analytics, env validation) and the pre-production hardening checklist are documented
in [`SECURITY.md`](SECURITY.md) and [`docs/improvements.md`](docs/improvements.md).

## Future Enhancements

- Internationalization (i18n) and localized routing
- MDX-powered blog with syntax highlighting, categories/tags, and RSS
- Real email/CRM integration for the contact & newsletter forms
- Nonce-based strict CSP (via middleware)
- Storybook for the component library
- Visual regression + Playwright end-to-end tests

See [`docs/improvements.md`](docs/improvements.md) for the full prioritized backlog.

## License

Released under the [MIT License](LICENSE).
