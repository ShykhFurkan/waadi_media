'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, User, Menu, X, Shield, Activity } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { SearchModal } from '../navigation/SearchModal';

export const SportsHeader: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-[#0757E8] text-white sticky top-0 z-40 shadow-sm border-b border-[#004ED0]">
        <div className="max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Left: Hamburger & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 -ml-2 rounded-lg hover:bg-white/10 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>

            <Link href="/sports" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-white text-[#0757E8] flex items-center justify-center font-display font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
                FP
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg tracking-tight text-white leading-none">
                  FOOTBALL<span className="text-white/90">PULSE</span>
                </span>
                <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase -mt-0.5">
                  LIVE FOOTBALL MEDIA
                </span>
              </div>
            </Link>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors focus:outline-none"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors relative focus:outline-none"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF233C] ring-2 ring-[#0757E8]" />
            </button>

            <Link
              href="/cms/sports"
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors flex items-center justify-center ml-1"
              aria-label="Profile"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white">
                <User size={18} />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Drawer & Search Modals */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
