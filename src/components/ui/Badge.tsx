import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-[8px] bg-blue-tint text-blue text-xs font-semibold tracking-wide font-sans select-none',
        className
      )}
    >
      {children}
    </span>
  );
}
