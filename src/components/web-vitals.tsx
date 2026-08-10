'use client';

import { useReportWebVitals } from 'next/web-vitals';

import { trackEvent } from '@/lib/analytics-events';

/**
 * Reports Core Web Vitals (LCP, INP, CLS, FCP, TTFB) as consent-gated analytics
 * events, giving clients real-user performance data — not just lab scores.
 * `trackEvent` is a no-op until analytics loads (i.e. after cookie consent), so
 * this stays privacy-compliant automatically.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    trackEvent('web_vitals', {
      metric_name: metric.name,
      // GA4 expects integers for most metrics; CLS is scaled to preserve precision.
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_rating: metric.rating,
    });
  });

  return null;
}
