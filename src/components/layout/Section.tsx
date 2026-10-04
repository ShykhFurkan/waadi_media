import React from 'react';
import { siteConfig } from '@/config/site';

export type SectionTone = 'light' | 'pearl' | 'anchor';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  as?: React.ElementType;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Section({
  tone = 'light',
  as: Component = 'section',
  children,
  id,
  className = '',
  ...props
}: SectionProps) {
  // If anchor tone is requested but globally disabled, fall back to pearl
  const effectiveTone: SectionTone =
    tone === 'anchor' && !siteConfig.ui?.anchorSections ? 'pearl' : tone;

  const toneClasses: Record<SectionTone, string> = {
    light: 'bg-snow text-graphite',
    pearl: 'bg-pearl text-graphite border-y border-line/60',
    anchor: 'bg-navy text-paper border-y border-navy/40',
  };

  return (
    <Component
      id={id}
      className={`relative w-full section-padding ${toneClasses[effectiveTone]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
