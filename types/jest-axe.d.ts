/**
 * Minimal type declarations for jest-axe v9 (which ships without bundled types
 * and has no matching @types package for this major version).
 */
declare module 'jest-axe' {
  import type { AxeResults, RunOptions, ElementContext } from 'axe-core';

  export function axe(
    html: Element | Document | string,
    options?: RunOptions & { elementContext?: ElementContext },
  ): Promise<AxeResults>;

  export const toHaveNoViolations: {
    toHaveNoViolations(results: AxeResults): { pass: boolean; message: () => string };
  };

  export function configureAxe(options?: Record<string, unknown>): typeof axe;
}

declare namespace jest {
  interface Matchers<R> {
    toHaveNoViolations(): R;
  }
}
