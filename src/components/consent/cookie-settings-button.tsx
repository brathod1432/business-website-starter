'use client';

import { useConsent } from '@/components/consent/consent-context';
import { env } from '@/lib/env';

/**
 * Lets visitors reopen the consent banner to change or withdraw their choice —
 * a GDPR requirement. Hidden when analytics isn't configured (nothing to consent
 * to). Place in the footer legal row.
 */
export function CookieSettingsButton() {
  const { reset } = useConsent();
  if (!env.isAnalyticsConfigured) return null;

  return (
    <button
      type="button"
      onClick={reset}
      className="text-sm text-muted-foreground hover:text-primary"
    >
      Cookie settings
    </button>
  );
}
