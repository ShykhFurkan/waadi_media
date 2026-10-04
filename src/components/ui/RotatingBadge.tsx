import React from 'react';
import { cn } from '@/lib/utils';

interface RotatingBadgeProps {
  className?: string;
  size?: number;
}

export function RotatingBadge({ className, size = 110 }: RotatingBadgeProps) {
  return (
    <div
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer SVG rotating text path */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-rotate-badge motion-reduce:animate-none"
      >
        <path
          id="badge-circle-path"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text
          className="font-display font-black text-[9px] uppercase tracking-[0.2em] fill-ink"
        >
          <textPath href="#badge-circle-path" startOffset="0%">
            MADE IN KASHMIR • WAADI MEDIA •
          </textPath>
        </text>
      </svg>

      {/* Center Saffron Disc with Chinar Leaf */}
      <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-saffron border-[3px] border-ink shadow-hard-sm flex items-center justify-center">
        {/* Chinar leaf icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-chinar stroke-ink stroke-[2]"
        >
          <path d="M12 2L13.5 7L18 6L16 10L21 12L17 14L18 19L13.5 17L12 22L10.5 17L6 19L7 14L3 12L8 10L6 6L10.5 7L12 2Z" />
        </svg>
      </div>
    </div>
  );
}
