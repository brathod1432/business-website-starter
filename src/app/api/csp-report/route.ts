import { NextResponse } from 'next/server';

/**
 * CSP violation report collector (referenced by `report-uri` in the CSP).
 *
 * Browsers POST JSON reports here when a resource is blocked — useful for
 * spotting injection attempts or misconfigured origins. In production, forward
 * these to your monitoring stack (Sentry, Datadog, a log drain, etc.) instead
 * of just logging. Always returns 204 so the browser doesn't retry.
 */
export async function POST(request: Request) {
  try {
    const report = await request.json();
    // eslint-disable-next-line no-console
    console.warn('[csp-report]', JSON.stringify(report));
  } catch {
    // Ignore malformed reports.
  }
  return new NextResponse(null, { status: 204 });
}
