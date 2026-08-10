import type { Metadata } from 'next';

import { CTA } from '@/components/sections/cta';
import { FAQ } from '@/components/sections/faq';
import { PageHeader } from '@/components/sections/page-header';
import { PricingCard } from '@/components/sections/pricing-card';
import { Section, SectionHeader } from '@/components/sections/section';
import { FaqJsonLd } from '@/components/seo/json-ld';
import { faqs, pricingPlans } from '@/content/site-data';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Transparent, flexible pricing for projects of every size — from a fast-launch starter to a fully managed partnership.',
  path: '/pricing',
});

export default function PricingPage() {
  const pricingFaqs = faqs.slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="No surprises. Choose a package that fits where you are today — and scale as you grow."
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Pricing', href: '/pricing' },
        ]}
      />

      <Section spacing="lg">
        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          All prices in USD. Need something custom?{' '}
          <a href="/contact" className="font-medium text-primary hover:underline">
            Let&rsquo;s talk
          </a>
          .
        </p>
      </Section>

      <Section spacing="lg" muted>
        <SectionHeader
          eyebrow="FAQ"
          title="Pricing questions, answered"
          description="Still unsure which plan is right? Reach out and we’ll point you in the right direction."
        />
        <FAQ items={pricingFaqs} />
      </Section>

      <CTA />
      <FaqJsonLd items={pricingFaqs} />
    </>
  );
}
