import Link from 'next/link';
import { Check } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PricingPlan } from '@/content/types';
import { cn } from '@/lib/utils';

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card
      className={cn(
        'relative flex h-full flex-col',
        plan.highlighted && 'border-primary shadow-elevated ring-1 ring-primary',
      )}
    >
      {plan.highlighted ? (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">
          Most popular
        </Badge>
      ) : null}
      <CardHeader>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold">{plan.price}</span>
          {plan.period ? (
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          ) : null}
        </div>
        <CardDescription className="mt-2 text-base">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <ul className="mb-6 space-y-3" role="list">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          asChild
          className="mt-auto w-full"
          variant={plan.highlighted ? 'default' : 'outline'}
        >
          <Link href={plan.href}>{plan.cta}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
