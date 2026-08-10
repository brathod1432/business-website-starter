import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

type Crumb = { name: string; href: string };

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <section className="border-b bg-secondary/40">
      <div className="container py-14 sm:py-16">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <>
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.href} className="flex items-center gap-1">
                      {isLast ? (
                        <span aria-current="page" className="font-medium text-foreground">
                          {crumb.name}
                        </span>
                      ) : (
                        <Link href={crumb.href} className="hover:text-primary">
                          {crumb.name}
                        </Link>
                      )}
                      {!isLast ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : null}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <BreadcrumbJsonLd items={breadcrumbs} />
          </>
        ) : null}
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
