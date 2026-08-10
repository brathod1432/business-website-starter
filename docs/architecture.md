# Architecture

## Overview

The starter is a Next.js **App Router** application in TypeScript. It is organized around three
ideas: a **token-driven design system**, a **composable section-based UI**, and a
**repository-pattern content layer** that is ready to swap for a headless CMS.

## Folder structure

```
business-website-starter/
├─ src/
│  ├─ app/                       # Routes (App Router) + route-level metadata
│  │  ├─ layout.tsx              # Root layout: header, footer, JSON-LD, analytics
│  │  ├─ page.tsx                # Homepage
│  │  ├─ about/ services/ ...    # Static routes
│  │  ├─ service/[slug]/         # Dynamic service detail (SSG)
│  │  ├─ blog/[slug]/            # Dynamic blog detail (SSG)
│  │  ├─ case-studies/[slug]/    # Dynamic case study detail (SSG)
│  │  ├─ api/contact/route.ts    # Mock contact endpoint
│  │  ├─ og/route.tsx            # Dynamic OpenGraph image
│  │  ├─ sitemap.ts  robots.ts   # SEO route handlers
│  │  └─ not-found.tsx           # 404
│  ├─ components/
│  │  ├─ ui/                     # ShadCN-style primitives
│  │  ├─ layout/                 # Header, Footer, Logo
│  │  ├─ sections/               # Page sections + cards + forms
│  │  ├─ seo/                    # JSON-LD components
│  │  ├─ motion/                 # Reveal (framer-motion)
│  │  └─ analytics.tsx           # GA4 + Clarity loaders
│  ├─ content/                   # Typed data + repository API (CMS-ready)
│  ├─ lib/                       # utils, seo, site-config, icons, validations
│  └─ styles/globals.css         # Design tokens + base styles
├─ content/                      # Mirrored CMS content structure + mapping docs
├─ tests/                        # Jest tests (unit, component, a11y, pages, seo)
├─ types/                        # Local type declarations
└─ docs/                         # Documentation
```

## Rendering strategy

- Static pages are prerendered at build time (`○ Static`).
- Dynamic routes use `generateStaticParams()` for full SSG (`● SSG`) — every service,
  blog post, and case study is a static HTML file.
- `api/contact` and `og` are server-rendered on demand (`ƒ Dynamic`).

This maximizes performance and CDN cacheability while keeping the option to move to ISR or
on-demand rendering when a CMS is introduced.

## Content layer (repository pattern)

UI never imports raw data arrays; it calls repository functions:

```
src/content/services.ts    → getServices(), getServiceBySlug(), getServiceSlugs()
src/content/blog.ts        → getBlogPosts(), getBlogPostBySlug(), getFeaturedPosts()
src/content/case-studies.ts→ getCaseStudies(), getCaseStudyBySlug()
src/content/site-data.ts   → testimonials, pricing, faqs, industries, process, metrics
src/content/types.ts       → shared content model
```

To integrate a CMS (Contentful/Sanity/Strapi/headless WordPress), change only these files to
`async` fetchers that return the same shapes. See [`content/README.md`](../content/README.md).

## Design system

CSS variables in `globals.css` are the single source of truth for color, radius, and fonts;
`tailwind.config.ts` maps them to utilities. See [`design-system.md`](design-system.md).

## Data flow (example: a service page)

```
/service/web-development
  → generateStaticParams()      (build: enumerate slugs)
  → generateMetadata()          (buildMetadata → title/canonical/OG)
  → getServiceBySlug(slug)      (repository)
  → <PageHeader> (+ BreadcrumbJsonLd)
  → section components render service fields
  → <ServiceJsonLd> emits structured data
```

## Cross-cutting concerns

- **SEO:** `src/lib/seo.ts` (`buildMetadata`, `absoluteUrl`) + `src/components/seo/json-ld.tsx`.
- **Config:** `src/lib/site-config.ts` centralizes brand, nav, and contact info.
- **Icons:** `src/lib/icons.tsx` registry lets content reference icons by string name.
- **Validation:** `src/lib/validations/contact.ts` shared by the form and the API route.
- **Security headers:** set in `next.config.mjs`.

## Key dependencies

Next.js, React, Tailwind CSS, Radix UI, class-variance-authority, clsx + tailwind-merge,
React Hook Form, Zod, Framer Motion, lucide-react.
