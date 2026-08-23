import React from 'react';
import Link from 'next/link';
import { Match } from '@/lib/supabase';
import { LiveBadge } from './LiveBadge';
import { ScoreDisplay } from './ScoreDisplay';

interface MatchCardProps {
  match: Match;
  className?: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, className = '' }) => {
  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';

  const formattedTime = new Date(match.scheduled_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = new Date(match.scheduled_at).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`rounded-lg border border-[#22302B] bg-[#0A1712] p-5 flex flex-col justify-between gap-4 transition-colors duration-200 hover:border-[#E8A33D]/50 ${className}`}
    >
      {/* Top Header: Tournament & Status */}
      <div className="flex items-center justify-between gap-2 border-b border-[#22302B] pb-3">
        <span className="text-xs font-medium text-[#A8B8AF] truncate">
          {match.tournaments?.name || 'Tournament Match'}
        </span>
        {isLive ? (
          <LiveBadge size="sm" />
        ) : (
          <span className="text-xs font-mono text-[#A8B8AF]">
            {isCompleted ? 'FINAL' : `${formattedDate} · ${formattedTime}`}
          </span>
        )}
      </div>

      {/* Main Teams & Score Section */}
      <div className="grid grid-cols-12 items-center gap-2 py-2">
        {/* Home Team */}
        <div className="col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
          <div className="w-10 h-10 rounded-full bg-[#0F2A1E] border border-[#22302B] flex items-center justify-center overflow-hidden">
            {match.home_team?.logo_url ? (
              <img src={match.home_team.logo_url} alt={match.home_team.name} className="w-7 h-7 object-contain" />
            ) : (
              <span className="font-display text-sm text-[#E8A33D]">{match.home_team?.short_name || 'HT'}</span>
            )}
          </div>
          <span className="font-display text-sm text-[#F7F5F0] leading-tight line-clamp-1">
            {match.home_team?.name || 'Home Team'}
          </span>
        </div>

        {/* Score / VS Center */}
        <div className="col-span-2 flex flex-col items-center justify-center">
          {isLive || isCompleted ? (
            <ScoreDisplay
              homeScore={match.home_score}
              awayScore={match.away_score}
              isLive={isLive}
              isCompleted={isCompleted}
              size="md"
            />
          ) : (
            <span className="font-display text-sm text-[#A8B8AF] px-2 py-1 rounded bg-[#0F2A1E]">
              VS
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="col-span-5 flex flex-col items-center sm:items-end text-center sm:text-right gap-1">
          <div className="w-10 h-10 rounded-full bg-[#0F2A1E] border border-[#22302B] flex items-center justify-center overflow-hidden">
            {match.away_team?.logo_url ? (
              <img src={match.away_team.logo_url} alt={match.away_team.name} className="w-7 h-7 object-contain" />
            ) : (
              <span className="font-display text-sm text-[#E8A33D]">{match.away_team?.short_name || 'AT'}</span>
            )}
          </div>
          <span className="font-display text-sm text-[#F7F5F0] leading-tight line-clamp-1">
            {match.away_team?.name || 'Away Team'}
          </span>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#22302B] text-xs">
        <span className="text-[#A8B8AF] truncate">{match.venue}</span>
        {isLive ? (
          <Link
            href={`/sports/tv/${match.id}`}
            className="rounded px-3 py-1.5 font-semibold text-xs bg-[#E8A33D] text-[#0F2A1E] hover:bg-[#F2C878] transition-colors"
          >
            Watch Live
          </Link>
        ) : (
          <Link
            href={`/sports/match/${match.id}`}
            className="rounded px-3 py-1.5 font-medium text-xs border border-[#22302B] text-[#F7F5F0] hover:border-[#E8A33D] transition-colors"
          >
            Match Details
          </Link>
        )}
      </div>
    </div>
  );
};
