'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trophy, Shield, Calendar, ArrowRight } from 'lucide-react';
import { SportTournament } from '@/lib/sports/types';

interface TournamentsSectionProps {
  tournaments: SportTournament[];
}

export const TournamentsSection: React.FC<TournamentsSectionProps> = ({ tournaments }) => {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'upcoming' | 'completed'>('all');

  const filtered = tournaments.filter((t) => {
    if (filter === 'all') return true;
    const status = (t as any).status || (t as any).is_active ? 'ongoing' : 'upcoming';
    return status === filter;
  });

  return (
    <section className="space-y-4 font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight">
          COMPETITIONS
        </h2>
        <Link
          href="/sports/tournaments"
          className="text-xs font-mono font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Lightweight Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {(['all', 'ongoing', 'upcoming', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              filter === f
                ? 'bg-[#0757E8] text-white shadow-xs'
                : 'bg-white border border-[#E5EAF2] text-[#64748B] hover:text-[#111827] hover:border-[#0757E8]/40'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Competition Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.slice(0, 6).map((tournament) => {
            const rawStatus = (tournament as any).status || 'ongoing';
            const statusLabel = rawStatus.toUpperCase();

            return (
              <div
                key={tournament.id}
                className="bg-white rounded-2xl border border-[#E5EAF2] p-5 flex flex-col justify-between space-y-4 hover:border-[#0757E8]/40 hover:shadow-md transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EAF2FF] text-[#0757E8] text-[10px] font-mono font-bold uppercase tracking-wider">
                      {statusLabel}
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B]">
                      {(tournament as any).season || '2026 Season'}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-base text-[#111827] group-hover:text-[#0757E8] transition-colors line-clamp-1">
                    {tournament.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#64748B] pt-1">
                    <div className="flex items-center gap-1">
                      <Shield size={14} className="text-[#0757E8]" />
                      <span>{(tournament as any).registered_teams?.length || 12} Teams</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy size={14} className="text-[#0757E8]" />
                      <span>{(tournament as any).format || 'Tournament'}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E5EAF2] pt-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#64748B]">
                    {(tournament as any).location || 'Kashmir Arena'}
                  </span>
                  <Link
                    href={`/sports/tournaments/${tournament.slug || tournament.id}`}
                    className="text-xs font-mono font-bold text-[#0757E8] hover:underline flex items-center gap-1"
                  >
                    <span>View Competition</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full p-8 rounded-2xl bg-white border border-[#E5EAF2] text-center space-y-1">
            <h4 className="font-display font-bold text-sm text-[#111827]">NO COMPETITIONS</h4>
            <p className="text-xs font-mono text-[#64748B]">Competitions will appear here when created.</p>
          </div>
        )}
      </div>
    </section>
  );
};
