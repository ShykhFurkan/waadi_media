'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics';

export function OutboundLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent({
          name: 'outbound_click',
          params: { url: href, label },
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
