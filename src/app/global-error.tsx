'use client';

import * as React from 'react';

/**
 * Global error boundary — replaces the root layout when a top-level error
 * occurs, so it must render its own <html>/<body>.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ marginTop: '1rem', color: '#475569', maxWidth: '32rem' }}>
          A critical error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: '2rem',
            borderRadius: '0.5rem',
            background: '#1e5fd6',
            color: '#fff',
            padding: '0.625rem 1.25rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
