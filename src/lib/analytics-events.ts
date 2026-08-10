/**
 * Lightweight, consent-aware analytics event helper (client-only).
 *
 * These calls are no-ops unless the analytics scripts have actually loaded —
 * which only happens after the visitor accepts cookies (see `Analytics`). So
 * tracking conversions here stays privacy-compliant automatically.
 */
type EventParams = Record<string, string | number | boolean | undefined>;

type Gtag = (command: string, action: string, params?: EventParams) => void;
type Clarity = (command: string, ...args: unknown[]) => void;

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;

  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === 'function') gtag('event', name, params);

  const clarity = (window as unknown as { clarity?: Clarity }).clarity;
  if (typeof clarity === 'function') clarity('event', name);
}
