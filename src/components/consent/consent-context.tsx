'use client';

import * as React from 'react';

export type ConsentState = 'accepted' | 'declined' | 'unset';

const STORAGE_KEY = 'cookie-consent';

type ConsentContextValue = {
  consent: ConsentState;
  setConsent: (value: Exclude<ConsentState, 'unset'>) => void;
  /** True once the persisted value has been read on the client (avoids flashes). */
  ready: boolean;
};

const ConsentContext = React.createContext<ConsentContextValue | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = React.useState<ConsentState>('unset');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'accepted' || stored === 'declined') setConsentState(stored);
    } catch {
      // localStorage may be unavailable (private mode); default to 'unset'.
    }
    setReady(true);
  }, []);

  const setConsent = React.useCallback((value: Exclude<ConsentState, 'unset'>) => {
    setConsentState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore persistence failures
    }
  }, []);

  const value = React.useMemo(() => ({ consent, setConsent, ready }), [consent, setConsent, ready]);

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = React.useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within a ConsentProvider');
  return ctx;
}
