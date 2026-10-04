import React from 'react';
import { cn } from '@/lib/utils';

interface RiverRibbonProps {
  className?: string;
  variant?: 'vertical' | 'horizontal';
}

export function RiverRibbon({ className, variant = 'vertical' }: RiverRibbonProps) {
  if (variant === 'horizontal') {
    return (
      <div className={cn('w-full overflow-hidden pointer-events-none select-none py-2', className)} aria-hidden="true">
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          className="w-full h-12 block"
        >
          {/* River ribbon ribbon body */}
          <path
            d="M0,24 Q150,4 300,24 T600,24 T900,24 T1200,24 L1200,38 Q1050,38 900,38 T600,38 T300,38 L0,38 Z"
            fill="#9FD0FF"
            stroke="#0B0B0B"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Inner flow line */}
          <path
            d="M0,28 Q150,14 300,28 T600,28 T900,28 T1200,28"
            stroke="#0057FF"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  // Vertical winding ribbon for Process section
  return (
    <div className={cn('absolute inset-y-0 pointer-events-none select-none', className)} aria-hidden="true">
      <svg
        viewBox="0 0 80 800"
        preserveAspectRatio="none"
        className="w-20 h-full block"
      >
        <path
          d="M40,0 Q65,100 40,200 T40,400 T40,600 T40,800"
          stroke="#0057FF"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M40,0 Q65,100 40,200 T40,400 T40,600 T40,800"
          stroke="#0B0B0B"
          strokeWidth="24"
          fill="none"
          className="-z-10"
        />
        <path
          d="M40,0 Q65,100 40,200 T40,400 T40,600 T40,800"
          stroke="#9FD0FF"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M40,0 Q65,100 40,200 T40,400 T40,600 T40,800"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="10 8"
          fill="none"
        />
      </svg>
    </div>
  );
}
