'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * Standard easing per Section 6.8: cubic-bezier(0.22, 1, 0.36, 1)
 */
export const easeCustom = [0.22, 1, 0.36, 1] as const;

/**
 * Masked Line Reveal:
 * Text rises from a clipped baseline (overflow-hidden line container)
 */
export function MaskedReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn('overflow-hidden leading-tight', className)}>
      <motion.div
        initial={{ y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          duration,
          delay,
          ease: easeCustom,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Divider Draw-in:
 * Horizontal rule that draws across (scaleX from 0 to 1) when entering view
 */
export function DrawDivider({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <hr className={cn('border-t border-line', className)} />;
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: easeCustom }}
      style={{ transformOrigin: 'left center' }}
      className={cn('h-px w-full bg-line', className)}
    />
  );
}

/**
 * Clip-path Image Wipe:
 * Wipe reveal from bottom to top or left to right
 */
export function ImageWipe({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay, ease: easeCustom }}
      className={cn('overflow-hidden', className)}
    >
      {children}
    </motion.div>
  );
}
