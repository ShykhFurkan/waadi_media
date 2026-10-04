import React from 'react';
import { cn } from '@/lib/utils';

export type StickerIconName =
  | 'star'
  | 'sparkle'
  | 'chinar'
  | 'crocus'
  | 'blossom'
  | 'apple'
  | 'cloud'
  | 'bird'
  | 'bolt';

interface StickerIconProps extends React.SVGProps<SVGSVGElement> {
  name: StickerIconName;
  size?: number;
  className?: string;
}

export function StickerIcon({ name, size = 28, className, ...props }: StickerIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    className: cn('shrink-0 select-none pointer-events-none inline-block', className),
    'aria-hidden': true,
    ...props,
  };

  switch (name) {
    case 'star':
      return (
        <svg {...common}>
          <polygon
            points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12"
            fill="#FFC72C"
            stroke="#0B0B0B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...common}>
          <path
            d="M16 2 C16 9, 23 16, 30 16 C23 16, 16 23, 16 30 C16 23, 9 16, 2 16 C9 16, 16 9, 16 2 Z"
            fill="#FF9EC4"
            stroke="#0B0B0B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'chinar':
      return (
        <svg {...common}>
          <path
            d="M16 3 L18 10 L24 8 L21 14 L28 17 L22 20 L24 27 L18 24 L16 30 L14 24 L8 27 L10 20 L4 17 L11 14 L8 8 L14 10 Z"
            fill="#FF5A36"
            stroke="#0B0B0B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'crocus':
      return (
        <svg {...common}>
          {/* Saffron flower petals */}
          <ellipse cx="16" cy="14" rx="7" ry="11" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2.5" />
          <ellipse cx="10" cy="16" rx="5" ry="9" transform="rotate(-20 10 16)" fill="#9FD0FF" stroke="#0B0B0B" strokeWidth="2.5" />
          <ellipse cx="22" cy="16" rx="5" ry="9" transform="rotate(20 22 16)" fill="#9FD0FF" stroke="#0B0B0B" strokeWidth="2.5" />
          {/* Golden saffron stigmas */}
          <path d="M16 12 L16 6 M14 12 L11 7 M18 12 L21 7" stroke="#FFC72C" strokeWidth="2.5" strokeLinecap="round" />
          {/* Stem */}
          <path d="M16 24 L16 30" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'blossom':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="4" fill="#FFC72C" stroke="#0B0B0B" strokeWidth="2.5" />
          <circle cx="16" cy="7" r="5" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2.5" />
          <circle cx="24" cy="12" r="5" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2.5" />
          <circle cx="22" cy="22" r="5" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2.5" />
          <circle cx="10" cy="22" r="5" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2.5" />
          <circle cx="8" cy="12" r="5" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2.5" />
        </svg>
      );
    case 'apple':
      return (
        <svg {...common}>
          <path
            d="M16 10 C12 5, 4 7, 5 17 C6 26, 12 28, 16 27 C20 28, 26 26, 27 17 C28 7, 20 5, 16 10 Z"
            fill="#FF5A36"
            stroke="#0B0B0B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M16 10 C17 6, 20 4, 22 4" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="21" cy="5" rx="3" ry="1.5" transform="rotate(-30 21 5)" fill="#6FE3C1" stroke="#0B0B0B" strokeWidth="2" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...common}>
          <path
            d="M8 24 A6 6 0 0 1 7 12 A8 8 0 0 1 21 10 A6 6 0 0 1 27 20 A5 5 0 0 1 24 24 Z"
            fill="#FFFFFF"
            stroke="#0B0B0B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'bird':
      return (
        <svg {...common}>
          <path
            d="M4 18 Q 10 10, 16 18 Q 22 10, 28 18"
            stroke="#0B0B0B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...common}>
          <polygon
            points="18,2 6,18 15,18 13,30 26,14 17,14"
            fill="#FFC72C"
            stroke="#0B0B0B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
