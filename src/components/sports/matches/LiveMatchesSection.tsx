'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SportMatch } from '@/lib/sports/types';
import { SportFilter } from './SportFilter';
import { MatchCard } from './MatchCard';

interface LiveMatchesSectionProps {
  matches: SportMatch[];
}

export const LiveMatchesSection: React.FC<LiveMatchesSectionProps> = ({ matches }) => {
  const [activeSport, setActiveSport] = useState<string>('all');

  const filteredMatches = activeSport === 'all'
    ? matches
    : matches.filter((m) => m.sport === activeSport);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827]">
          Live Matches
        </h2>
        <Link
          href="/sports/live"
          className="text-xs font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Filters */}
      <SportFilter activeSport={activeSport} onSelectSport={setActiveSport} />

      {/* Match Cards List */}
      <div className="space-y-3">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => <MatchCard key={match.id} match={match} />)
        ) : (
          <div className="p-6 rounded-2xl bg-white border border-[#E5EAF2] text-center text-sm text-[#64748B]">
            No live {activeSport !== 'all' ? activeSport : ''} matches right now. Check upcoming fixtures.
          </div>
        )}
      </div>
    </section>
  );
};
