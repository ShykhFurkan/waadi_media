import React from 'react';
import { cn } from '@/lib/utils';

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
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
      <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center">{content}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  );
}

