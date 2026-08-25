import React from 'react';
import Link from 'next/link';
import { SportMatch } from '@/lib/sports/types';

interface UpcomingMatchCardProps {
  match: SportMatch;
}

export const UpcomingMatchCard: React.FC<UpcomingMatchCardProps> = ({ match }) => {
  const dateObj = new Date(match.scheduledAt);
  const formattedDate = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
  const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Link
      href={`/sports/matches/${match.id}`}
      className="block rounded-2xl border border-[#E5EAF2] bg-white p-4 hover:border-[#0757E8]/40 hover:shadow-md transition-all space-y-3 group"
    >
      <div className="text-xs font-semibold text-[#64748B] truncate border-b border-[#E5EAF2] pb-2">
        {match.competition.name}
      </div>

      <div className="flex items-center justify-between gap-2 py-1">
        {/* Home */}
        <div className="flex items-center gap-2 font-display font-bold text-xs sm:text-sm text-[#111827]">
          <span>{match.homeTeam.name}</span>
        </div>

        <span className="font-mono text-xs font-bold text-[#94A3B8] px-2 py-1 rounded bg-[#F1F4F8]">
          VS
        </span>

        {/* Away */}
        <div className="flex items-center gap-2 font-display font-bold text-xs sm:text-sm text-[#111827]">
          <span>{match.awayTeam.name}</span>
        </div>
      </div>

      <div className="text-center font-mono text-xs font-semibold text-[#0757E8] bg-[#EAF2FF] py-1.5 rounded-lg">
        {formattedDate} • {formattedTime}
      </div>
    </Link>
  );
};
