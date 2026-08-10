# Content Layer (CMS-Ready)

This starter uses a **repository pattern** for content so you can swap the local
mock data for a headless CMS without touching any UI code.

## Where the content lives

The canonical, typed content sources live in [`../src/content`](../src/content):

| File              | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `types.ts`        | Shared content model (Service, BlogPost, CaseStudy, …)   |
| `services.ts`     | Service catalog + `getServices`, `getServiceBySlug`, …   |
| `blog.ts`         | Blog posts + `getBlogPosts`, `getBlogPostBySlug`, …      |
| `case-studies.ts` | Case studies + `getCaseStudies`, `getCaseStudyBySlug`    |
| `site-data.ts`    | Testimonials, pricing, FAQ, industries, process, metrics |

The folders below (`services/`, `blog/`, `case-studies/`) mirror the required
content structure and are the natural place to keep future markdown/MDX or
exported CMS entries.

## Swapping in a real CMS

Because every page imports through the repository functions (never the raw
arrays), integration is a one-file change per content type. For example, to move
services to Sanity/Contentful/Strapi/headless WordPress:

```ts
// src/content/services.ts
export async function getServices(): Promise<Service[]> {
  const entries = await cmsClient.fetch(/* query */);
  return entries.map(mapCmsEntryToService); // returns the same Service shape
}
```

Update the calling pages to `await` the now-async functions and everything else
— components, SEO, sitemap — keeps working unchanged.

### Recommended field mapping

| Content type | CMS content model  | Key fields                                                              |
| ------------ | ------------------ | ----------------------------------------------------------------------- |
| Service      | `service`          | slug, title, summary, description, icon, features[], body[], outcomes[] |
| BlogPost     | `post` / `article` | slug, title, excerpt, content (rich text), author, publishedAt, tags[]  |
| CaseStudy    | `caseStudy`        | slug, title, client, industry, challenge, solution, results[], quote    |
