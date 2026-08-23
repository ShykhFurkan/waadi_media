import React from 'react';
import Link from 'next/link';

interface CMSNavProps {
  activeTab: 'matches' | 'tournaments' | 'teams' | 'sponsors';
  onTabChange: (tab: 'matches' | 'tournaments' | 'teams' | 'sponsors') => void;
}

export const CMSNav: React.FC<CMSNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="w-full bg-[#0F2A1E] text-[#F7F5F0] border-b border-[#22302B] px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-lg bg-[#E8A33D] text-[#0F2A1E] font-display flex items-center justify-center font-black text-xl shadow">
          CMS
        </div>
        <div>
          <h1 className="font-display text-base leading-tight">WAADI SPORTS & TV CONTROL ROOM</h1>
          <p className="text-xs text-[#8A9A91] font-mono">Database Management & Live Broadcast Switcher</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b md:border-b-0 border-[#22302B] pb-2 md:pb-0 overflow-x-auto">
        <button
          onClick={() => onTabChange('matches')}
          className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold transition-colors ${
            activeTab === 'matches'
              ? 'bg-[#E8A33D] text-[#0F2A1E]'
              : 'text-[#8A9A91] hover:text-[#F7F5F0] hover:bg-[#1B4332]'
          }`}
        >
          Matches & Live
        </button>
        <button
          onClick={() => onTabChange('tournaments')}
          className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold transition-colors ${
            activeTab === 'tournaments'
              ? 'bg-[#E8A33D] text-[#0F2A1E]'
              : 'text-[#8A9A91] hover:text-[#F7F5F0] hover:bg-[#1B4332]'
          }`}
        >
          Tournaments
        </button>
        <button
          onClick={() => onTabChange('teams')}
          className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold transition-colors ${
            activeTab === 'teams'
              ? 'bg-[#E8A33D] text-[#0F2A1E]'
              : 'text-[#8A9A91] hover:text-[#F7F5F0] hover:bg-[#1B4332]'
          }`}
        >
          Teams & Players
        </button>
        <button
          onClick={() => onTabChange('sponsors')}
          className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold transition-colors ${
            activeTab === 'sponsors'
              ? 'bg-[#E8A33D] text-[#0F2A1E]'
              : 'text-[#8A9A91] hover:text-[#F7F5F0] hover:bg-[#1B4332]'
          }`}
        >
          Sponsors
        </button>
      </div>

      {/* Action Shortcuts */}
      <div className="flex items-center gap-3">
        <Link
          href="/sports"
          className="px-3.5 py-1.5 rounded bg-[#E8A33D] text-[#0F2A1E] text-xs font-display font-bold hover:bg-[#F2C878]"
        >
          Public Site →
        </Link>
      </div>
    </header>
  );
};
