import React from 'react';
import { cn } from '@/lib/utils';

export type TileColor =
  | 'paper'
  | 'paper-2'
  | 'saffron'
  | 'chinar'
  | 'almond'
  | 'mint'
  | 'sky'
  | 'white'
  | 'blue';

export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: TileColor;
  rotate?: -3 | -2 | -1.5 | -1 | 0 | 1 | 1.5 | 2 | 3;
  shadow?: 'sm' | 'md' | 'lg';
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export function Tile({
  color = 'paper',
  rotate = 0,
  shadow = 'md',
  as: Component = 'div',
  className,
  children,
  ...props
}: TileProps) {
  const colorClasses: Record<TileColor, string> = {
    paper: 'bg-paper text-ink',
    'paper-2': 'bg-paper-2 text-ink',
    saffron: 'bg-saffron text-ink',
    chinar: 'bg-chinar text-ink',
    almond: 'bg-almond text-ink',
    mint: 'bg-mint text-ink',
    sky: 'bg-sky text-ink',
    white: 'bg-white text-ink',
    blue: 'bg-blue text-white',
  };

  const shadowClasses = {
    sm: 'shadow-hard-sm',
    md: 'shadow-hard-md',
    lg: 'shadow-hard-lg',
  }[shadow];

  const rotationStyle = rotate !== 0 ? { transform: `rotate(${rotate}deg)` } : undefined;

  return (
    <Component
      style={rotationStyle}
      className={cn(
        'tile-neo p-7 sm:p-9 rounded-[20px] border-[3px] border-ink',
        colorClasses[color],
        shadowClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
