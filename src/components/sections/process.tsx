import { processSteps } from '@/content/site-data';
import { Icon } from '@/lib/icons';

export function Process() {
  return (
    <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" role="list">
      {processSteps.map((step) => (
        <li key={step.step} className="relative">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground"
              aria-hidden="true"
            >
              {step.step}
            </span>
            <Icon name={step.icon} className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
