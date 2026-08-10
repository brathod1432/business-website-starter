import type { Metadata, Viewport } from 'next';

import '@/styles/globals.css';
import { Analytics } from '@/components/analytics';
import { CookieBanner } from '@/components/consent/cookie-banner';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Providers } from '@/components/providers';
import { LocalBusinessJsonLd, OrganizationJsonLd, WebsiteJsonLd } from '@/components/seo/json-ld';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

/*
 * Fonts are defined as a zero-dependency system stack via CSS variables in
 * `globals.css` (--font-sans / --font-display). This keeps builds offline-safe
 * and eliminates render-blocking font requests for a better Lighthouse score.
 * To use a custom webfont instead, add `next/font` here and set the same
 * CSS variables — see docs/design-system.md.
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <Providers>
          <a
            href="#main-content"
            className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <OrganizationJsonLd />
          <LocalBusinessJsonLd />
          <WebsiteJsonLd />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
