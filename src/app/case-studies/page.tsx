import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CTA } from '@/components/sections/cta';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { getCaseStudies } from '@/content/case-studies';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Case Studies',
  description:
    'Real results for real businesses. Explore how we’ve helped clients across industries grow with strategy, design, and engineering.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Results that speak for themselves"
        description="A selection of engagements where thoughtful strategy and execution moved the metrics that matter."
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Case Studies', href: '/case-studies' },
        ]}
      />

      <Section spacing="lg">
        <div className="grid gap-8 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <Card key={study.slug} className="group relative flex flex-col hover:shadow-elevated">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary">{study.industry}</Badge>
                  <span className="text-sm text-muted-foreground">{study.client}</span>
                </div>
                <CardTitle className="text-2xl">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    {study.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-muted-foreground">{study.summary}</p>
                <dl className="mt-6 grid grid-cols-3 gap-4 border-t pt-6">
                  {study.results.map((result) => (
                    <div key={result.label}>
                      <dt className="text-xs text-muted-foreground">{result.label}</dt>
                      <dd className="text-2xl font-bold text-primary">{result.value}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
