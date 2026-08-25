'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const CMSNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/cms/sports' },
    { label: 'Teams', href: '/cms/sports/teams' },
    { label: 'Competitions', href: '/cms/sports/competitions' },
    { label: 'Matches', href: '/cms/sports/matches' },
    { label: 'Players', href: '/cms/sports/players' },
    { label: 'Content', href: '/cms/sports/content' },
    { label: 'Media', href: '/cms/sports/media' },
    { label: 'Sponsors', href: '/cms/sports/sponsors' },
    { label: 'Settings', href: '/cms/sports/settings' },
  ];

  function isActive(href: string) {
    if (href === '/cms/sports') {
      return pathname === '/cms/sports';
    }
    return pathname.startsWith(href);
  }

  return (
    <header className="w-full bg-[#0757E8] text-white border-b border-[#004ED0] px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-white text-[#0757E8] font-display flex items-center justify-center font-black text-xl shadow-xs">
          CMS
        </div>
        <div>
          <h1 className="font-display font-extrabold text-base leading-tight text-white tracking-tight">
            FOOTBALL CMS CONTROL ROOM
          </h1>
          <p className="text-[11px] text-white/80 font-mono">
            Database Operations & Live Switcher
          </p>
        </div>
      </div>

      {/* Navigation Routes */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                active
                  ? 'bg-white text-[#0757E8] font-bold shadow-xs'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Public Site Shortcut */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/sports"
          className="px-4 py-1.5 rounded-xl bg-white text-[#0757E8] hover:bg-white/90 text-xs font-display font-bold shadow-xs transition-colors"
        >
          Public Site →
        </Link>
      </div>
    </header>
  );
};
