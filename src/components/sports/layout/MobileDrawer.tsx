'use client';

import React from 'react';
import Link from 'next/link';
import { X, Home, Radio, Calendar, Trophy, Newspaper, BookOpen, Shield, Video, Settings } from 'lucide-react';
import { SECONDARY_NAV_ITEMS } from '@/lib/sports/constants';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-right">
        {/* Drawer Header */}
        <div className="p-4 bg-[#0757E8] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white text-[#0757E8] font-display font-extrabold flex items-center justify-center">
              FP
            </div>
            <span className="font-display font-bold text-lg">FOOTBALL PULSE</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10 text-white">
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {SECONDARY_NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#111827] hover:bg-[#F1F4F8] hover:text-[#0757E8] transition-colors"
            >
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="border-t border-[#E5EAF2] my-3 pt-3">
            <Link
              href="/cms/sports"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#64748B] hover:bg-[#F1F4F8] hover:text-[#0757E8]"
            >
              <Settings size={18} />
              <span>CMS Console</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
