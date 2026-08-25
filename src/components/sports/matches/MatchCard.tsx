'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Tv } from 'lucide-react';
import { SportMatch } from '@/lib/sports/types';
import { SportScoreRenderer } from '../scores/SportScoreRenderer';

interface MatchCardProps {
  match: SportMatch;
  className?: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, className = '' }) => {
  const isLive = match.status === 'live';

  return (
    <div
      className={`rounded-2xl border border-[#E5EAF2] bg-white p-4 sm:p-5 flex flex-col justify-between gap-4 transition-all duration-200 hover:border-[#0757E8]/40 hover:shadow-md ${className}`}
    >
      {/* Header: Status & Competition & Clock */}
      <div className="flex items-center justify-between gap-2 border-b border-[#E5EAF2] pb-3 text-xs">
        <div className="flex items-center gap-2 truncate">
          {isLive ? (
            <span className="px-2 py-0.5 rounded-full bg-[#EF233C] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-[#F1F4F8] text-[#64748B] text-[10px] font-bold uppercase">
              {match.status}
            </span>
          )}
          <span className="font-semibold text-[#64748B] truncate">
            {match.competition.name}
          </span>
        </div>

        <span className="font-mono text-xs font-bold text-[#111827]">
          {match.statusDetail || '72:45'}
        </span>
      </div>

      {/* Main Teams & Scores Grid */}
      <div className="grid grid-cols-12 items-center gap-3 py-1">
        {/* Home Team */}
        <div className="col-span-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#F1F4F8] border border-[#E5EAF2] flex items-center justify-center overflow-hidden shrink-0">
            {match.homeTeam.logoUrl ? (
              <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} className="w-6 h-6 object-contain" />
            ) : (
              <span className="font-display font-bold text-xs text-[#0757E8]">
                {match.homeTeam.shortName}
              </span>
            )}
          </div>
          <span className="font-display font-bold text-xs sm:text-sm text-[#111827] line-clamp-1">
            {match.homeTeam.name}
          </span>
        </div>

        {/* Score Renderer */}
        <div className="col-span-4 flex justify-center">
          <SportScoreRenderer
            sport={match.sport}
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            size="lg"
          />
        </div>

        {/* Away Team */}
        <div className="col-span-4 flex items-center justify-end gap-3 text-right">
          <span className="font-display font-bold text-xs sm:text-sm text-[#111827] line-clamp-1">
            {match.awayTeam.name}
          </span>
          <div className="w-9 h-9 rounded-full bg-[#F1F4F8] border border-[#E5EAF2] flex items-center justify-center overflow-hidden shrink-0">
            {match.awayTeam.logoUrl ? (
              <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} className="w-6 h-6 object-contain" />
            ) : (
              <span className="font-display font-bold text-xs text-[#0757E8]">
                {match.awayTeam.shortName}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between border-t border-[#E5EAF2] pt-3 text-xs">
        <span className="text-[#64748B] font-medium truncate max-w-[200px]">
          {match.events.length > 0 ? match.events[0].description : (match.venue?.name || 'National Arena')}
        </span>

        {isLive ? (
          <Link
            href={`/sports/matches/${match.id}`}
            className="px-4 py-1.5 rounded-xl bg-[#0757E8] text-white font-bold hover:bg-[#004ED0] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Play size={12} className="fill-current" />
            <span>Watch Live</span>
          </Link>
        ) : (
          <Link
            href={`/sports/matches/${match.id}`}
            className="px-4 py-1.5 rounded-xl border border-[#0757E8] text-[#0757E8] font-bold hover:bg-[#EAF2FF] transition-colors"
          >
            Scorecard
          </Link>
        )}
      </div>
    </div>
  );
};
