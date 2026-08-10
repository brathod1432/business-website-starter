import Link from 'next/link';

import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2 font-display text-lg font-bold', className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
        aria-hidden="true"
      >
        {siteConfig.shortName.charAt(0)}
      </span>
      <span>{siteConfig.name}</span>
    </Link>
  );
}
