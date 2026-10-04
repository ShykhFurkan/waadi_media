'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'saffron' | 'blue' | 'outline' | 'primary' | 'secondary' | 'text' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'saffron',
  href,
  external = false,
  className,
  children,
  ...props
}: ButtonProps) {
  // Base neo-brutalist button: 3px ink border, 999px pill radius, 4px hard shadow
  const baseClasses =
    'inline-flex items-center justify-center font-sans font-semibold text-[16px] px-8 h-[52px] rounded-full border-[3px] border-ink select-none cursor-pointer transition-transform duration-100 ease-out active:translate-x-1 active:translate-y-1 active:shadow-none hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none shadow-hard-sm hover:shadow-hard-md';

  // Variant color mapping adhering strictly to contrast rules:
  // - saffron: bg-saffron text-ink
  // - blue / primary: bg-blue text-white (WHITE text on blue only)
  // - outline / secondary / paper: bg-paper text-ink
  const variantClasses: Record<string, string> = {
    saffron: 'bg-saffron text-ink',
    blue: 'bg-blue text-white',
    primary: 'bg-saffron text-ink', // default primary action in Kashmir Pop
    secondary: 'bg-paper text-ink hover:bg-paper-2',
    outline: 'bg-paper text-ink hover:bg-paper-2',
    ghost: 'bg-transparent text-ink hover:bg-paper-2 shadow-none border-transparent hover:border-ink hover:shadow-hard-sm',
    text: 'bg-transparent text-ink hover:underline p-0 h-auto border-none shadow-none hover:translate-x-0 hover:translate-y-0',
  };

  const selectedClass = variantClasses[variant] || variantClasses.saffron;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseClasses, selectedClass, className)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cn(baseClasses, selectedClass, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(baseClasses, selectedClass, className)} {...props}>
      {children}
    </button>
  );
}
