import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ClientLogos } from '@/components/sections/client-logos';
import { CTA } from '@/components/sections/cta';
import { FAQ } from '@/components/sections/faq';
import { FeatureCard } from '@/components/sections/feature-card';
import { Hero } from '@/components/sections/hero';
import { Industries } from '@/components/sections/industries';
import { Metrics } from '@/components/sections/metrics';
import { Process } from '@/components/sections/process';
import { Section, SectionHeader } from '@/components/sections/section';
import { ServiceCard } from '@/components/sections/service-card';
import { TestimonialCard } from '@/components/sections/testimonial-card';
import { FaqJsonLd } from '@/components/seo/json-ld';
import { getFeaturedServices } from '@/content/services';
import { faqs, testimonials, whyChooseUs } from '@/content/site-data';

export default function HomePage() {
  const services = getFeaturedServices();
  const homeFaqs = faqs.slice(0, 5);

  return (
    <>
      <Hero />
      <ClientLogos />

      <Section spacing="lg" aria-labelledby="services-heading">
        <SectionHeader
          eyebrow="What we do"
          title="Services built to drive results"
          description="From strategy to launch and beyond, we cover every layer of your digital presence."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/services">
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section spacing="lg" muted aria-labelledby="why-heading">
        <SectionHeader
          eyebrow="Why choose us"
          title="A partner invested in your outcomes"
          description="We combine senior expertise, transparent process, and a relentless focus on measurable results."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Section>

      <Section spacing="lg" aria-labelledby="process-heading">
        <SectionHeader
          eyebrow="How we work"
          title="A proven, four-step process"
          description="Clear milestones and steady momentum from first workshop to ongoing growth."
        />
        <Process />
      </Section>

      <Section spacing="lg" muted aria-labelledby="results-heading">
        <SectionHeader
          eyebrow="Results"
          title="Numbers that speak for themselves"
          description="We measure success the way you do — in outcomes, not deliverables."
        />
        <Metrics />
      </Section>

      <Section spacing="lg" aria-labelledby="testimonials-heading">
        <SectionHeader
          eyebrow="Testimonials"
          title="What our clients say"
          description="Long-term partnerships built on trust and repeatable results."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
      </Section>

      <Section spacing="lg" muted aria-labelledby="industries-heading">
        <SectionHeader
          eyebrow="Industries"
          title="Industries we can serve"
          description="This starter adapts to any sector. Here are just a few we’re built to support."
        />
        <Industries />
      </Section>

      <Section spacing="lg" aria-labelledby="faq-heading">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know before we get started."
        />
        <FAQ items={homeFaqs} />
      </Section>

      <CTA />
      <FaqJsonLd items={homeFaqs} />
    </>
  );
}
