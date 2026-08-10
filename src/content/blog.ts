import type { BlogPost } from '@/content/types';

const posts: BlogPost[] = [
  {
    slug: 'core-web-vitals-that-actually-move-revenue',
    title: 'The Core Web Vitals that actually move revenue',
    excerpt:
      'Not every performance metric is worth chasing. Here is where to focus for real business impact.',
    author: 'Jordan Blake',
    authorRole: 'Principal Engineer',
    publishedAt: '2026-06-18',
    category: 'Performance',
    tags: ['performance', 'seo', 'core-web-vitals'],
    featured: true,
    content: `
## Speed is a feature, not a vanity metric

Every hundred milliseconds of latency costs conversions. But teams often optimize the wrong things — shaving bytes off assets nobody notices while ignoring the layout shift that makes users misclick.

## Focus on the three that matter

Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) map directly to how fast, responsive, and stable a page feels. Optimize these before anything else.

### Practical wins
- Serve images in modern formats with explicit dimensions to prevent layout shift.
- Defer non-critical JavaScript and hydrate interactive islands only where needed.
- Preload the hero image and critical fonts.

## Measure in the field, not just the lab

Lab tools like Lighthouse are great for catching regressions, but real-user monitoring tells you what customers actually experience. Instrument both and let field data drive your roadmap.
`,
  },
  {
    slug: 'designing-forms-people-finish',
    title: 'Designing forms people actually finish',
    excerpt:
      'Small friction points quietly kill conversion. A field-by-field guide to forms that convert.',
    author: 'Sofia Marchetti',
    authorRole: 'Lead Product Designer',
    publishedAt: '2026-05-02',
    category: 'Design',
    tags: ['ux', 'forms', 'conversion'],
    featured: true,
    content: `
## Every field is a tax

The best-performing forms ask for the minimum. Before adding a field, ask what it costs you if a user abandons because of it.

## Make errors impossible to miss — and easy to fix

Inline validation, clear labels, and error messages tied to the field with ARIA attributes turn frustration into a smooth recovery.

### A checklist
- One column, logical order, generous tap targets.
- Real labels, never placeholder-only fields.
- Validate on blur, summarize on submit.
- Show a clear success state so users know they are done.

## Accessibility is conversion

Forms that work with a keyboard and screen reader work better for everyone. Accessible forms are simply better forms.
`,
  },
  {
    slug: 'headless-cms-migration-without-downtime',
    title: 'How to migrate to a headless CMS without downtime',
    excerpt:
      'A pragmatic migration playbook that keeps SEO intact and the marketing team unblocked.',
    author: 'Marcus Lee',
    authorRole: 'Solutions Architect',
    publishedAt: '2026-03-27',
    category: 'Engineering',
    tags: ['cms', 'architecture', 'seo'],
    featured: false,
    content: `
## Start with the content model

Before choosing a vendor, model your content as reusable, structured types. A clean model outlives any single CMS and makes future migrations trivial.

## Keep URLs and redirects sacred

Preserve URL structure where possible and map every changed route to a 301 redirect. This protects the search equity you have earned.

### Migration in phases
- Model content types and validate with real editors.
- Migrate a low-risk section first behind a feature flag.
- Roll out section by section with monitoring on Core Web Vitals and rankings.

## Decouple presentation from content

A headless approach lets you redesign the front end without re-migrating content — the whole point of the exercise.
`,
  },
  {
    slug: 'measuring-marketing-that-matters',
    title: 'Measuring marketing that matters',
    excerpt: 'Ditch vanity metrics. Build an attribution model your CFO will actually trust.',
    author: 'Elena Costa',
    authorRole: 'Head of Growth',
    publishedAt: '2026-02-11',
    category: 'Growth',
    tags: ['analytics', 'attribution', 'growth'],
    featured: false,
    content: `
## Vanity metrics feel good and mean little

Impressions and raw traffic rarely correlate with revenue. Tie every channel to pipeline and you will quickly see where to invest.

## Build a model you can defend

A blended attribution model — combining first-touch, last-touch, and a simple multi-touch view — is usually enough to make confident decisions without over-engineering.

### The essentials
- Define one north-star metric and a handful of inputs.
- Instrument events consistently across the funnel.
- Review weekly, decide monthly, re-plan quarterly.

## Report in the language of the business

Translate marketing activity into pipeline and revenue. That is how marketing earns a bigger budget.
`,
  },
];

export function getBlogPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getFeaturedPosts(): BlogPost[] {
  return getBlogPosts().filter((post) => post.featured);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getBlogSlugs(): string[] {
  return posts.map((post) => post.slug);
}
