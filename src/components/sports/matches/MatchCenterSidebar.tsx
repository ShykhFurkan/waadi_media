'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Radio } from 'lucide-react';
import { SportMatch } from '@/lib/sports/types';
import { SportScoreRenderer } from '../scores/SportScoreRenderer';

interface MatchCenterSidebarProps {
  liveMatches: SportMatch[];
}

export const MatchCenterSidebar: React.FC<MatchCenterSidebarProps> = ({ liveMatches }) => {
  const [filter, setFilter] = useState<'live' | 'results' | 'upcoming'>('live');

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E5EAF2] p-4 shadow-sm flex flex-col gap-4">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-3">
        <h3 className="font-display font-extrabold text-base text-[#111827]">Match Center</h3>
        <div className="flex items-center gap-1 bg-[#F1F4F8] p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setFilter('live')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              filter === 'live' ? 'bg-[#0757E8] text-white' : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            Live
          </button>
          <button
            onClick={() => setFilter('results')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              filter === 'results' ? 'bg-[#0757E8] text-white' : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            Results
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              filter === 'upcoming' ? 'bg-[#0757E8] text-white' : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Matches Feed */}
      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {liveMatches.map((match) => (
          <Link
            key={match.id}
            href={`/sports/matches/${match.id}`}
            className="block p-3 rounded-xl border border-[#E5EAF2] bg-[#F7F9FC] hover:border-[#0757E8]/50 hover:bg-white transition-all space-y-2 group"
          >
            {/* Meta */}
            <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B]">
              <span className="truncate max-w-[180px]">{match.competition.name}</span>
              <span className="text-[#EF233C] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF233C] animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Score Display */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[#111827]">
                <span>{match.homeTeam.shortName || match.homeTeam.name}</span>
              </div>
              <SportScoreRenderer
                sport={match.sport}
                homeScore={match.homeScore}
                awayScore={match.awayScore}
                size="sm"
              />
              <div className="flex items-center gap-2 font-bold text-xs text-[#111827]">
                <span>{match.awayTeam.shortName || match.awayTeam.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/sports/live"
        className="w-full py-2 text-center text-xs font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors border-t border-[#E5EAF2] pt-3"
      >
        View All Live Scores →
      </Link>
    </div>
  );
};
