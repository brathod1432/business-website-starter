'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useConsent } from '@/components/consent/consent-context';
import { env } from '@/lib/env';

/**
 * GDPR-style cookie consent banner. Only shown when analytics is configured and
 * the visitor has not yet made a choice. Analytics scripts load only after the
 * visitor accepts (see `Analytics`).
 */
export function CookieBanner() {
  const { consent, setConsent, ready } = useConsent();

  if (!env.isAnalyticsConfigured) return null;
  if (!ready || consent !== 'unset') return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[90] p-4"
    >
      <div className="container flex max-w-3xl flex-col gap-4 rounded-lg border bg-card p-5 shadow-elevated sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We use privacy-friendly analytics to improve your experience. See our{' '}
          <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => setConsent('declined')}>
            Decline
          </Button>
          <Button size="sm" onClick={() => setConsent('accepted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
