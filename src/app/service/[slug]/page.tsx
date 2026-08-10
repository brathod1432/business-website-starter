import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CTA } from '@/components/sections/cta';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { ServiceJsonLd } from '@/components/seo/json-ld';
import { getServiceBySlug, getServiceSlugs } from '@/content/services';
import { Icon } from '@/lib/icons';
import { buildMetadata } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return buildMetadata({ title: 'Service not found', noIndex: true });
  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/service/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.title}
        description={service.description}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: service.title, href: `/service/${service.slug}` },
        ]}
      />

      <Section spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="prose-content max-w-none">
            <span
              className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary"
              aria-hidden="true"
            >
              <Icon name={service.icon} className="h-7 w-7" />
            </span>
            {service.body.map((block) => (
              <div key={block.heading}>
                <h2>{block.heading}</h2>
                <p>{block.content}</p>
              </div>
            ))}

            <h2>What&rsquo;s included</h2>
            <ul>
              {service.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border bg-card p-6 shadow-soft">
              <h2 className="text-lg font-semibold">Outcomes you can expect</h2>
              <ul className="mt-4 space-y-3" role="list">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full">
                <Link href="/contact">
                  Discuss your project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      <CTA />
      <ServiceJsonLd name={service.title} description={service.summary} slug={service.slug} />
    </>
  );
}
