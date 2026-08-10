import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Section } from '@/components/sections/section';

type CTAProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTA({
  title = 'Ready to grow your business?',
  description = 'Book a free 30-minute strategy call. We’ll map out where the biggest opportunities are — no obligation.',
  primaryLabel = 'Book a strategy call',
  primaryHref = '/contact',
  secondaryLabel = 'View our work',
  secondaryHref = '/case-studies',
}: CTAProps) {
  return (
    <Section spacing="lg">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
        <div
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
