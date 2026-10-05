import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  href = '/',
  priority = false,
}: {
  className?: string;
  href?: string;
  priority?: boolean;
}) {
  const content = (
    <div className={cn('inline-flex flex-col leading-none select-none group', className)}>
      <span className="font-sans font-extrabold text-[26px] tracking-tight text-blue">
        waadi
      </span>
      <span className="font-sans font-semibold text-[13px] tracking-normal text-ink -mt-1">
        media.com
      </span>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center min-h-[44px] min-w-[44px] focus-visible:rounded-lg"
      prefetch={priority ? true : undefined}
    >
      {content}
    </Link>
  );
}
