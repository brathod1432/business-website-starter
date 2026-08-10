import type { Metadata } from 'next';

import { CTA } from '@/components/sections/cta';
import { FeatureCard } from '@/components/sections/feature-card';
import { Metrics } from '@/components/sections/metrics';
import { PageHeader } from '@/components/sections/page-header';
import { Section, SectionHeader } from '@/components/sections/section';
import { whyChooseUs } from '@/content/site-data';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `Learn about ${siteConfig.name} — our mission, values, and the team helping businesses grow since ${siteConfig.founded}.`,
  path: '/about',
});

const values = whyChooseUs.slice(0, 3);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We help ambitious businesses grow"
        description={`Since ${siteConfig.founded}, ${siteConfig.name} has partnered with organizations of every size to design, build, and scale digital experiences that deliver measurable results.`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ]}
      />

      <Section spacing="lg">
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Our mission</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We believe great digital work should pay for itself. Our mission is to give every
              client an unfair advantage — combining strategy, premium design, and engineering
              discipline to turn their website into their best-performing asset.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Our approach</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We stay small, senior, and accountable. You work directly with the people doing the
              work, in a transparent process with steady momentum — so you always know what shipped,
              what&rsquo;s next, and why it matters.
            </p>
          </div>
        </div>
      </Section>

      <Section spacing="lg" muted>
        <Metrics />
      </Section>

      <Section spacing="lg">
        <SectionHeader
          eyebrow="Our values"
          title="What we stand for"
          description="The principles that guide every engagement."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <FeatureCard key={value.title} {...value} />
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
