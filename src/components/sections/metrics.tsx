import { metrics as defaultMetrics } from '@/content/site-data';
import type { Metric } from '@/content/types';

export function Metrics({ items = defaultMetrics }: { items?: Metric[] }) {
  return (
    <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {items.map((metric) => (
        <div key={metric.label} className="text-center">
          <dt className="sr-only">{metric.label}</dt>
          <dd>
            <span className="block text-4xl font-bold text-primary sm:text-5xl">
              {metric.value}
            </span>
            <span className="mt-2 block font-medium text-foreground">{metric.label}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{metric.description}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
