import React from 'react';
import { cn } from '@/lib/utils';

interface HighlighterSwashProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  swashClassName?: string;
}

export function HighlighterSwash({
  children,
  color = '#FFC72C',
  className,
  swashClassName,
}: HighlighterSwashProps) {
  return (
    <span className={cn('relative inline-block whitespace-nowrap mx-1', className)}>
      {/* Hand-drawn organic SVG highlighter swash behind text */}
      <svg
        viewBox="0 0 280 44"
        preserveAspectRatio="none"
        className={cn(
          'absolute -inset-x-2.5 -inset-y-1 w-[calc(100%+20px)] h-[calc(100%+8px)] -z-10 pointer-events-none -rotate-1',
          swashClassName
        )}
        aria-hidden="true"
      >
        <path
          d="M 5,28 Q 70,22 140,24 T 275,22 Q 278,35 272,39 Q 200,42 120,40 T 8,38 Z"
          fill={color}
          opacity="0.9"
        />
        <path
          d="M 12,18 Q 80,12 160,15 T 268,14 Q 272,26 265,30 Q 180,34 90,32 T 14,29 Z"
          fill={color}
          opacity="0.6"
        />
      </svg>
      <span className="relative z-10 font-accent font-normal italic text-ink">
        {children}
      </span>
    </span>
  );
}
