import type { Metadata } from 'next';

import { CTA } from '@/components/sections/cta';
import { PageHeader } from '@/components/sections/page-header';
import { Process } from '@/components/sections/process';
import { Section, SectionHeader } from '@/components/sections/section';
import { ServiceCard } from '@/components/sections/service-card';
import { getServices } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'End-to-end services — strategy, design, development, growth, cloud, and support — for businesses that want measurable results.',
  path: '/services',
});

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to grow online"
        description="Engage us for a single project or as your long-term digital partner. Every service is built around measurable business outcomes."
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ]}
      />

      <Section spacing="lg">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section spacing="lg" muted>
        <SectionHeader
          eyebrow="How we work"
          title="A proven, four-step process"
          description="Clear milestones and steady momentum from first workshop to ongoing growth."
        />
        <Process />
      </Section>

      <CTA />
    </>
  );
}
