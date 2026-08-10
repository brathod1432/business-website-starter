import { Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/content/types';
import { cn } from '@/lib/utils';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-4 p-6">
        <div className="flex gap-0.5" aria-label={`Rated ${testimonial.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-4 w-4',
                i < testimonial.rating ? 'fill-accent text-accent' : 'fill-muted text-muted',
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <blockquote className="flex-1 text-base leading-relaxed text-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="border-t pt-4">
          <p className="font-semibold">{testimonial.author}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </p>
        </figcaption>
      </CardContent>
    </Card>
  );
}
