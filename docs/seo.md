# SEO

SEO is treated as a first-class, centralized concern so every route is consistent and hard to
get wrong.

## Metadata

All routes build metadata through `buildMetadata()` in
[`src/lib/seo.ts`](../src/lib/seo.ts), which produces:

- **Title** — page title composed with the site name (`Page | Acme Solutions`).
- **Description** — page-specific or the site default.
- **Canonical URL** — absolute, derived from `NEXT_PUBLIC_SITE_URL`.
- **Robots** — indexable by default; `noIndex: true` for not-found/private routes.
- **OpenGraph** — title, description, URL, site name, locale, type, and image.
- **Twitter** — `summary_large_image` card with creator handle.

`metadataBase` is set once in the root layout so relative image/canonical URLs resolve
correctly.

### Example

```ts
export const metadata = buildMetadata({
  title: 'Pricing',
  description: 'Transparent, flexible pricing…',
  path: '/pricing',
});
```

Dynamic routes use `generateMetadata()` with the content record (see
`app/service/[slug]/page.tsx`, `app/blog/[slug]/page.tsx`).

## Open Graph images

`app/og/route.tsx` generates a branded 1200×630 social card on the fly via `next/og`. It
accepts an optional `?title=` param, so links can render a custom card without any static image
assets. `siteConfig.ogImage` points at `/og`.

## Structured data (JSON-LD)

Reusable components in [`src/components/seo/json-ld.tsx`](../src/components/seo/json-ld.tsx):

| Component            | Schema                     | Used on                                  |
| -------------------- | -------------------------- | ---------------------------------------- |
| `OrganizationJsonLd` | `Organization`             | Every page (root layout)                 |
| `WebsiteJsonLd`      | `WebSite` + `SearchAction` | Every page (root layout)                 |
| `ServiceJsonLd`      | `Service`                  | Service detail pages                     |
| `ArticleJsonLd`      | `Article`                  | Blog post pages                          |
| `BreadcrumbJsonLd`   | `BreadcrumbList`           | All pages with a `PageHeader` breadcrumb |
| `FaqJsonLd`          | `FAQPage`                  | Homepage + Pricing FAQ                   |

Validate with Google's Rich Results Test and Schema.org validator after changing content.

## Sitemap & robots

- [`app/sitemap.ts`](../src/app/sitemap.ts) generates `sitemap.xml` from the route map **plus**
  every service, case study, and blog slug via the content repository — so new content is
  indexed automatically.
- [`app/robots.ts`](../src/app/robots.ts) allows crawling, disallows `/api/`, and links the
  sitemap.

## Best practices baked in

- One `<h1>` per page; logical heading hierarchy.
- Semantic landmarks (`header`, `nav`, `main`, `footer`).
- Descriptive link text and `aria-current` on active nav.
- Fast, statically generated pages (better crawl + Core Web Vitals).
- Security headers that also improve the Lighthouse Best Practices score.

## Launch checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
2. Verify `/sitemap.xml` and `/robots.txt` render correctly.
3. Test a few URLs in the Rich Results Test.
4. Confirm OG cards via a social debugger (`/og?title=...`).
5. Submit the sitemap in Google Search Console.
