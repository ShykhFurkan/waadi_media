'use client';

import React from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is requested, render clean wrapped list
  if (shouldReduceMotion) {
    return (
      <div className={cn('py-8 border-y border-line overflow-hidden', className)}>
        <div className="flex flex-wrap items-center justify-center gap-6 px-4">
          {items.map((item, idx) => (
            <span key={idx} className="text-h2 font-display text-ink whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Infinite marquee row duplicated for seamless looping
  const content = items.map((item, idx) => (
    <span key={idx} className="inline-flex items-center mx-6">
      <span className="text-h2 font-display text-ink whitespace-nowrap">
        {item}
      </span>
      <span className="w-2 h-2 rounded-full bg-blue ml-12 opacity-60" aria-hidden="true" />
    </span>
  ));

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden py-6 border-y border-line bg-paper select-none',
        className
      )}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center">{content}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {content}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
