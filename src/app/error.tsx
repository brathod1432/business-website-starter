'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';

/** Route error boundary. Catches render/runtime errors within the segment. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Report to your monitoring service (Sentry, etc.) here.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-destructive">Error</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Something went wrong</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        An unexpected error occurred. You can try again, or head back home.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          Back home
        </Button>
      </div>
    </div>
  );
}
