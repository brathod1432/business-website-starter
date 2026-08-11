import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { CTA } from '@/components/sections/cta';
import { Metrics } from '@/components/sections/metrics';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { getCaseStudies, getCaseStudyBySlug } from '@/content/case-studies';
import { buildMetadata } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

// All slugs are known at build time; unknown slugs return a real 404 (not a soft 200).
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return buildMetadata({ title: 'Case study not found', noIndex: true });
  return buildMetadata({
    title: study.title,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    image: `/og?title=${encodeURIComponent(study.title)}`,
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${study.industry} · ${study.client}`}
        title={study.title}
        description={study.summary}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Case Studies', href: '/case-studies' },
          { name: study.client, href: `/case-studies/${study.slug}` },
        ]}
      />

      <Section spacing="lg" muted>
        <Metrics items={study.results.map((r) => ({ ...r, description: '' }))} />
      </Section>

      <Section spacing="lg">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="prose-content max-w-none">
            <h2>The challenge</h2>
            <p>{study.challenge}</p>
            <h2>Our solution</h2>
            <p>{study.solution}</p>
          </div>

          {study.quote ? (
            <figure className="rounded-lg border-l-4 border-primary bg-secondary/40 p-6">
              <blockquote className="text-lg font-medium leading-relaxed">
                &ldquo;{study.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                {study.quote.author}, {study.quote.role}
              </figcaption>
            </figure>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
