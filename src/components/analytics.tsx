'use client';

import Script from 'next/script';

import { useConsent } from '@/components/consent/consent-context';
import { env } from '@/lib/env';

/**
 * Consent-gated analytics loaders (GA4 + Microsoft Clarity).
 *
 * Nothing loads unless (a) the corresponding env var is set and (b) the visitor
 * has accepted cookies. Scripts use `afterInteractive` so they never block
 * first paint. This keeps the starter privacy-friendly and GDPR-conscious by
 * default.
 */
export function Analytics() {
  const { consent } = useConsent();
  if (consent !== 'accepted') return null;

  return (
    <>
      {env.gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${env.gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${env.gaMeasurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {env.clarityProjectId ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${env.clarityProjectId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
