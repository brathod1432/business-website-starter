import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Service } from '@/content/types';
import { Icon } from '@/lib/icons';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group relative h-full transition-all hover:-translate-y-1 hover:shadow-elevated">
      <CardHeader>
        <span
          className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
          aria-hidden="true"
        >
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
        <CardTitle>
          <Link
            href={`/service/${service.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {service.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <CardDescription className="mb-4 text-base leading-relaxed">
          {service.summary}
        </CardDescription>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </CardContent>
    </Card>
  );
}
