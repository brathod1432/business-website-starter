import Link from 'next/link';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/reveal';

const benefits = [
  'Launch in weeks, not months',
  'SEO & accessibility built in',
  'Own your code and design system',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 to-background"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Badge variant="accent" className="mb-6">
              Trusted by 180+ growing businesses
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Digital experiences that turn visitors into{' '}
              <span className="text-primary">loyal customers</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              We design, build, and grow high-performing websites and products for ambitious
              businesses — combining strategy, premium design, and engineering that scales.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </span>
              <span>
                <strong className="text-foreground">4.9/5</strong> average client rating
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
