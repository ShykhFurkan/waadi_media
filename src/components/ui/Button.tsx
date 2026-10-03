'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  href,
  external = false,
  magnetic = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isMagnetic = magnetic && variant === 'primary' && !shouldReduceMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMagnetic || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Max 8px pull per Section 6.7
    const pullX = ((clientX - centerX) / (width / 2)) * 8;
    const pullY = ((clientY - centerY) / (height / 2)) * 8;

    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    if (!isMagnetic) return;
    setPosition({ x: 0, y: 0 });
  };

  // Base styles
  const baseClasses =
    'inline-flex items-center justify-center font-sans font-medium text-[16px] transition-colors duration-200 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

  // Variant styles per Section 6.6 & 6.7
  const variantClasses = {
    primary:
      'h-[52px] px-7 rounded-full bg-blue text-white hover:bg-blue-deep focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-3',
    secondary:
      'h-[52px] px-7 rounded-full border-[1.5px] border-ink text-ink bg-transparent hover:bg-paper focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-3',
    ghost:
      'h-[44px] px-4 rounded-full text-graphite hover:text-ink hover:bg-paper focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-3',
    text:
      'relative text-blue hover:text-blue-deep font-medium py-1 group focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-3',
  }[variant];

  const content = (
    <>
      <span>{children}</span>
      {variant === 'text' && (
        <span
          className="absolute bottom-0 left-0 h-[1.5px] w-full bg-blue origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          aria-hidden="true"
        />
      )}
    </>
  );

  const wrapper = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {isMagnetic ? (
        <motion.div
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', damping: 15, stiffness: 150 }}
        >
          {href ? (
            external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(baseClasses, variantClasses, className)}
              >
                {content}
              </a>
            ) : (
              <Link href={href} className={cn(baseClasses, variantClasses, className)}>
                {content}
              </Link>
            )
          ) : (
            <button className={cn(baseClasses, variantClasses, className)} {...props}>
              {content}
            </button>
          )}
        </motion.div>
      ) : href ? (
        external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(baseClasses, variantClasses, className)}
          >
            {content}
          </a>
        ) : (
          <Link href={href} className={cn(baseClasses, variantClasses, className)}>
            {content}
          </Link>
        )
      ) : (
        <button className={cn(baseClasses, variantClasses, className)} {...props}>
          {content}
        </button>
      )}
    </div>
  );

  return wrapper;
}
