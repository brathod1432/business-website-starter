'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

import { ConsentProvider } from '@/components/consent/consent-context';

/** Client providers wrapping the app: theme (dark mode) + cookie consent. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ConsentProvider>{children}</ConsentProvider>
    </ThemeProvider>
  );
}
