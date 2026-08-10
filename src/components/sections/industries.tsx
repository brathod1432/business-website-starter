import { Card, CardContent } from '@/components/ui/card';
import { industries } from '@/content/site-data';
import { Icon } from '@/lib/icons';

/** Phase 12 — "Industries We Can Serve" portfolio demonstration section. */
export function Industries() {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4" role="list">
      {industries.map((industry) => (
        <li key={industry.name}>
          <Card className="h-full text-center transition-all hover:-translate-y-1 hover:shadow-elevated">
            <CardContent className="flex flex-col items-center gap-3 p-6">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent"
                aria-hidden="true"
              >
                <Icon name={industry.icon} className="h-6 w-6" />
              </span>
              <h3 className="font-semibold">{industry.name}</h3>
              <p className="text-sm text-muted-foreground">{industry.description}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
