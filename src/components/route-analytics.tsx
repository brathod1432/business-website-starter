'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

import { trackEvent } from '@/lib/analytics-events';

/**
 * On client-side navigation this:
 *  1. sends a consent-gated `page_view` event (App Router SPA nav doesn't
 *     trigger GA's automatic pageview after the first load), and
 *  2. moves focus to the main landmark and announces the new page to screen
 *     readers — a commonly-missed accessibility requirement for SPAs.
 *
 * The initial page load is skipped (GA config already sends that pageview and
 * the first render shouldn't steal focus).
 */
export function RouteAnalytics() {
  const pathname = usePathname();
  const firstRender = React.useRef(true);
  const [announcement, setAnnouncement] = React.useState('');

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    trackEvent('page_view', { page_path: pathname });

    const main = document.getElementById('main-content');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }

    const title = document.title || pathname;
    setAnnouncement(`Navigated to ${title}`);
  }, [pathname]);

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
      {announcement}
    </div>
  );
}
