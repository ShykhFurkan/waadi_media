'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics';

interface OutboundLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label?: string;
  children: React.ReactNode;
}

export function OutboundLink({
  href,
  label,
  children,
  onClick,
  className,
  ...props
}: OutboundLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        trackEvent({
          name: 'outbound_click',
          params: { url: href, label: label || (typeof children === 'string' ? children : href) },
        });
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
