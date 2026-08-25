'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Radio, Calendar, Trophy, MoreHorizontal } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', href: '/sports', icon: Home },
    { id: 'live', label: 'Live Scores', href: '/sports/live', icon: Radio },
    { id: 'matches', label: 'Matches', href: '/sports/matches', icon: Calendar },
    { id: 'leagues', label: 'Leagues', href: '/sports/leagues', icon: Trophy },
    { id: 'more', label: 'More', href: '/sports/stories', icon: MoreHorizontal },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5EAF2] md:hidden shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-14 items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/sports'
              ? pathname === '/sports'
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 text-[11px] font-medium transition-colors ${
                isActive
                  ? 'text-[#0757E8] font-bold'
                  : 'text-[#64748B] hover:text-[#111827]'
              }`}
            >
              <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
