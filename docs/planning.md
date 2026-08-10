# Business Website Starter — Planning (Phase 1)

## Discovery Summary

- **Project root:** `business-website-starter`
- **Initial state:** Empty directory (fresh project, no existing code).
- **Toolchain verified:** Node `v22.23.2`, npm `10.9.8`, git `2.45.1`.
- **Environment note:** On this Windows host, `npm.ps1` is blocked by PowerShell execution
  policy. The `npm.cmd` shim works and is used for all package operations.
- **Decision:** Greenfield build. No migration or legacy concerns.

## Goals

1. A **production-grade, reusable** marketing website foundation for future client sites.
2. Premium, conversion-focused UI/UX suitable as a portfolio piece.
3. Strong SEO, accessibility (WCAG 2.1 AA target), and performance baselines.
4. Clean, typed, documented architecture that is trivial to re-brand and extend.
5. CMS-ready content layer (mock data now, headless CMS later without rewrites).

## Functional Requirements

- Pages: Home, About, Services, Service detail (`/service/[slug]`), Case Studies,
  Pricing, Blog listing, Blog detail (`/blog/[slug]`), Contact, Privacy Policy, Terms.
- Homepage sections: Hero, Client Logos, Services Overview, Why Choose Us, Process,
  Results, Testimonials, FAQ, Contact CTA, Footer, plus "Industries We Can Serve".
- Reusable component library (Header, Footer, Hero, Section, Button, Card, FeatureCard,
  ServiceCard, TestimonialCard, PricingCard, FAQ, CTA, ContactForm).
- Contact form with validation, spam-prevention hook, success/error states, mock API.
- Typed content model for services, blog posts, case studies.

## Non-Functional Requirements

| Category                    | Target                                                 |
| --------------------------- | ------------------------------------------------------ |
| Performance (Lighthouse)    | ≥ 90                                                   |
| Accessibility (Lighthouse)  | ≥ 95                                                   |
| SEO (Lighthouse)            | ≥ 95                                                   |
| Best Practices (Lighthouse) | ≥ 95                                                   |
| Type safety                 | TypeScript strict mode                                 |
| Test coverage               | Meaningful unit/component/validation/SEO/a11y coverage |
| Responsiveness              | Mobile-first, fluid to desktop                         |

## Technical Architecture

- **Framework:** Next.js (App Router) + React + TypeScript (strict).
- **Styling:** Tailwind CSS with CSS-variable design tokens; ShadCN-style UI primitives.
- **Forms:** React Hook Form + Zod (shared schema for client + mock API).
- **Animation:** Framer Motion (reduced-motion aware).
- **Icons:** lucide-react.
- **Content:** Local typed modules under `content/` exposing a repository-style API
  (`getServices`, `getServiceBySlug`, etc.) so a CMS adapter can be swapped in later.
- **SEO:** Central metadata helper, `sitemap.ts`, `robots.ts`, JSON-LD components
  (Organization, Article, Breadcrumb, Service, FAQ).
- **Analytics:** Deferred GA4 + Microsoft Clarity loaders gated on env vars.
- **Testing:** Jest + React Testing Library + jest-axe.

### Proposed Folder Structure

```
business-website-starter/
├─ src/
│  ├─ app/                # App Router routes + route-level metadata
│  ├─ components/
│  │  ├─ ui/              # ShadCN-style primitives (button, card, ...)
│  │  ├─ layout/          # Header, Footer
│  │  ├─ sections/        # Homepage + shared page sections
│  │  └─ seo/             # JSON-LD components
│  ├─ content/            # Typed mock data + repository API (CMS-ready)
│  ├─ lib/                # utils, seo config, site config, analytics
│  └─ styles/             # globals.css (tokens)
├─ content/               # (re-exported) markdown-free typed sources
├─ docs/                  # planning, architecture, design-system, seo, testing, audit
├─ tests/                 # jest tests
├─ public/                # static assets, og images
└─ config files (eslint, prettier, tailwind, tsconfig, jest)
```

> Note: to keep imports clean under the App Router, the canonical content lives in
> `src/content/`. A top-level `content/` folder mirrors the required structure and
> documents the CMS mapping.

## Scalability Considerations

- Repository-pattern content API isolates data source; CMS swap touches one layer.
- Design tokens as CSS variables → global re-theme by editing one file.
- Section components are data-driven and composable for new page types.
- Route segments are statically generated where possible for cheap horizontal scaling.

## SEO Strategy

- Per-route `metadata` via a typed `buildMetadata()` helper (title, description,
  canonical, OpenGraph, Twitter).
- `sitemap.xml` and `robots.txt` generated from the content API + route map.
- JSON-LD: Organization/LocalBusiness on layout, Article on blog posts, Service on
  service pages, BreadcrumbList on nested pages, FAQPage on FAQ.
- Semantic headings, descriptive alt text, canonical URLs from a single `siteConfig`.

## Accessibility Strategy

- Semantic landmarks (`header`, `nav`, `main`, `footer`), single `h1` per page.
- Visible focus rings, skip-to-content link, keyboard-operable menus/accordions.
- Labeled form fields with error association (`aria-describedby`, `aria-invalid`).
- Color tokens chosen for AA contrast; motion respects `prefers-reduced-motion`.
- Automated checks with `jest-axe`.

## Deployment Strategy

- Optimized for Vercel (zero-config Next.js) with static generation + ISR-ready.
- Portable to any Node host (`next build` / `next start`) or static export where viable.
- Env-driven config (`.env.example`) for site URL, analytics IDs, contact endpoint.

## Risks

| Risk                                       | Mitigation                                    |
| ------------------------------------------ | --------------------------------------------- |
| PowerShell blocks `npm.ps1`                | Use `npm.cmd`; document in README/setup.      |
| Bleeding-edge dependency versions          | Use create-next-app stable + vetted versions. |
| Lighthouse targets not testable in CI here | Provide estimates + a manual checklist.       |
| Scope creep across 16 phases               | Iterative build tracked via todo list.        |

## Improvements Over a Basic Starter

- CMS-ready repository layer instead of scattered inline data.
- Shared Zod schema between UI and mock API.
- Centralized SEO + JSON-LD utilities.
- Built-in a11y testing.

## Assumptions

- Generic brand ("Acme Solutions") placeholder content; easily re-branded via config.
- English-only for v1 (i18n is a documented future enhancement).
- Mock contact API acceptable for the starter; real email/provider wired later.
