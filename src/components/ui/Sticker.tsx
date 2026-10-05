import React from 'react';
import { cn } from '@/lib/utils';

export type StickerColor =
  | 'saffron'
  | 'chinar'
  | 'almond'
  | 'mint'
  | 'sky'
  | 'white'
  | 'paper';

export interface StickerProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: StickerColor;
  rotate?: number;
  shape?: 'pill' | 'circle';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Sticker({
  color = 'saffron',
  rotate = 0,
  shape = 'pill',
  icon,
  children,
  className,
  ...props
}: StickerProps) {
  const colorClasses: Record<StickerColor, string> = {
    saffron: 'bg-saffron text-ink',
    chinar: 'bg-chinar text-ink',
    almond: 'bg-almond text-ink',
    mint: 'bg-mint text-ink',
    sky: 'bg-sky text-ink',
    white: 'bg-white text-ink',
    paper: 'bg-paper text-ink',
  };

  // Clamped rotation between -3 and 3 degrees
  const clampedRotate = Math.max(-3, Math.min(3, rotate));

  return (
    <div
      style={{ '--sticker-rotate': `${clampedRotate}deg` } as React.CSSProperties}
      className={cn(
        'sticker-neo inline-flex items-center justify-center font-display text-xs tracking-wider select-none border-[3px] border-ink ring-2 ring-white shadow-hard-sm cursor-default transition-transform hover:scale-105 rotate-0 sm:[transform:rotate(var(--sticker-rotate))]',
        shape === 'pill' ? 'rounded-full px-3.5 py-1.5' : 'rounded-full w-12 h-12 p-1 text-center',
        colorClasses[color],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 mr-1.5">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
