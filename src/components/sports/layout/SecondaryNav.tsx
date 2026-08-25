'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SECONDARY_NAV_ITEMS } from '@/lib/sports/constants';

export const SecondaryNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-[#0757E8] border-b border-[#004ED0] text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-6 h-11 text-sm font-semibold whitespace-nowrap min-w-max">
          {SECONDARY_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/sports'
                ? pathname === '/sports'
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative py-2.5 transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
