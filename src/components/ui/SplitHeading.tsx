import React from 'react';

interface SplitHeadingProps {
  children?: React.ReactNode;
  as?: React.ElementType;
  by?: 'lines' | 'words';
  className?: string;
  itemClassName?: string;
  staggerMs?: number;
  initialDelayMs?: number;
}

export function SplitHeading({
  children,
  as: Component = 'h2',
  by = 'lines',
  className = '',
  itemClassName = '',
  staggerMs = 100,
  initialDelayMs = 0,
}: SplitHeadingProps) {
  // If children is a string, we can split it
  if (typeof children === 'string') {
    const items = by === 'lines' ? children.split('\n') : children.split(' ');

    return (
      <Component className={`${className}`}>
        {items.map((item, idx) => {
          const delay = initialDelayMs + idx * staggerMs;
          if (by === 'lines') {
            return (
              <span key={idx} className="block overflow-hidden">
                <span
                  className={`block transform-gpu animate-hero-reveal ${itemClassName}`}
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {item}
                </span>
              </span>
            );
          }

          return (
            <span key={idx} className="inline-block overflow-hidden mr-[0.28em] align-top">
              <span
                className={`inline-block transform-gpu animate-hero-reveal ${itemClassName}`}
                style={{ animationDelay: `${delay}ms` }}
              >
                {item}
              </span>
            </span>
          );
        })}
      </Component>
    );
  }

  // Fallback for complex React children
  return (
    <Component className={className}>
      <span className="block overflow-hidden">
        <span
          className={`block transform-gpu animate-hero-reveal ${itemClassName}`}
          style={{ animationDelay: `${initialDelayMs}ms` }}
        >
          {children}
        </span>
      </span>
    </Component>
  );
}
