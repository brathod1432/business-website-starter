import { clientLogos } from '@/content/site-data';

export function ClientLogos() {
  return (
    <section className="border-y bg-secondary/30 py-10" aria-label="Trusted by leading companies">
      <div className="container">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Trusted by teams at
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {clientLogos.map((name) => (
            <li key={name} className="font-display text-xl font-semibold text-muted-foreground/70">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
