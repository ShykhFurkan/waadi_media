import React from 'react';
import Link from 'next/link';
import { Trophy, Tv, Settings } from 'lucide-react';
import { LiveBadge } from './LiveBadge';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#0F2A1E] border-b border-[#22302B] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/sports" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-[#E8A33D] flex items-center justify-center text-[#0F2A1E] shadow-md">
            <Trophy size={20} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg tracking-tight text-[#F7F5F0] group-hover:text-[#E8A33D] transition-colors">
              WAADI <span className="text-[#E8A33D]">SPORTS</span>
            </span>
            <span className="text-[10px] font-mono text-[#A8B8AF] -mt-1 tracking-widest uppercase">
              Broadcast Network
            </span>
          </div>
        </Link>

        {/* Right Navigation & Tools */}
        <div className="flex items-center gap-4">
          <Link
            href="/sports/tv"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#22302B] bg-[#0A1712] hover:border-[#E8A33D] transition-colors"
          >
            <Tv size={16} className="text-[#E8A33D]" />
            <span className="font-display text-xs text-[#F7F5F0]">Waadi TV</span>
            <LiveBadge size="sm" />
          </Link>

          <Link
            href="/cms/sports"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#A8B8AF] border border-[#22302B] hover:text-[#F7F5F0] hover:border-[#A8B8AF] transition-colors"
          >
            <Settings size={14} />
            <span>CMS Console</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
