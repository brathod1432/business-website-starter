'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Render as a list item container with staggered children. */
  as?: 'div' | 'li' | 'ul';
};

/**
 * Accessible scroll reveal. Respects prefers-reduced-motion by rendering
 * content statically when the user opts out of animation.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
}
