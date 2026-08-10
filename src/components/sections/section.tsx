import * as React from 'react';

import { cn } from '@/lib/utils';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div';
  /** Adds vertical rhythm padding. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  muted?: boolean;
  containerClassName?: string;
};

const spacingMap = {
  none: '',
  sm: 'py-10 sm:py-12',
  md: 'py-16 sm:py-20',
  lg: 'py-20 sm:py-28',
} as const;

export function Section({
  as: Comp = 'section',
  spacing = 'md',
  muted = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp className={cn(spacingMap[spacing], muted && 'bg-secondary/50', className)} {...props}>
      <div className={cn('container', containerClassName)}>{children}</div>
    </Comp>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Heading level for correct document outline (defaults to h2). */
  as?: 'h1' | 'h2' | 'h3';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      ) : null}
      <Heading className="text-3xl font-bold sm:text-4xl">{title}</Heading>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
