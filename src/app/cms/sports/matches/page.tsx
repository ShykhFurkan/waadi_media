'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Play, Trash2, Calendar, Radio, CheckCircle2 } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getMatches, deleteMatch } from '@/lib/sports/repositories/matches';
import { getCompetitions, Competition } from '@/lib/sports/repositories/competitions';
import { getTeams } from '@/lib/sports/repositories/teams';
import { SportMatch, SportTeam } from '@/lib/sports/types';
import { CreateMatchModal } from '@/components/sports/CreateMatchModal';

export default function CMSMatchesPage() {
  const [matches, setMatches] = useState<SportMatch[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [teams, setTeams] = useState<SportTeam[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'live' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [mList, cList, tList] = await Promise.all([
      getMatches(),
      getCompetitions(),
      getTeams(),
    ]);
    setMatches(mList);
    setCompetitions(cList);
    setTeams(tList);
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (confirm(`Are you sure you want to delete match "${name}"?`)) {
      await deleteMatch(id);
      loadData();
    }
  }

  const filteredMatches = matches.filter((m) => {
    if (filter === 'upcoming') return m.status === 'scheduled' || m.status === 'postponed';
    if (filter === 'live') return m.status === 'live' || m.status === 'halftime';
    if (filter === 'completed') return m.status === 'finished';
    return true;
  });

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[#111827]">MATCHES MANAGEMENT</h2>
              <p className="text-xs text-[#64748B] font-medium">
                Schedule fixtures, record live match scores/events, and launch broadcast console.
              </p>
            </div>
            <button
              onClick={() => setIsMatchModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors flex items-center gap-2 shadow-xs"
            >
              <Plus size={16} />
              <span>+ Schedule Match</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 border-b border-[#E5EAF2] pb-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                filter === 'all' ? 'bg-[#0757E8] text-white' : 'bg-white border border-[#E5EAF2] text-[#64748B]'
              }`}
            >
              All Matches ({matches.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                filter === 'upcoming' ? 'bg-[#0757E8] text-white' : 'bg-white border border-[#E5EAF2] text-[#64748B]'
              }`}
            >
              Upcoming ({matches.filter((m) => m.status === 'scheduled' || m.status === 'postponed').length})
            </button>
            <button
              onClick={() => setFilter('live')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                filter === 'live' ? 'bg-[#EF233C] text-white' : 'bg-white border border-[#E5EAF2] text-[#64748B]'
              }`}
            >
              Live ({matches.filter((m) => m.status === 'live' || m.status === 'halftime').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                filter === 'completed' ? 'bg-[#0757E8] text-white' : 'bg-white border border-[#E5EAF2] text-[#64748B]'
              }`}
            >
              Completed ({matches.filter((m) => m.status === 'finished').length})
            </button>
          </div>

          {/* Matches Table */}
          <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-xs overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F1F4F8] border-b border-[#E5EAF2] font-mono text-xs uppercase text-[#64748B]">
                <tr>
                  <th className="p-4">Match / Venue</th>
                  <th className="p-4">Competition</th>
                  <th className="p-4">Date / Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Score</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF2]">
                {filteredMatches.map((m) => {
                  const matchName = `${m.homeTeam.name} vs ${m.awayTeam.name}`;
                  return (
                    <tr key={m.id} className="hover:bg-[#F7F9FC] transition-colors">
                      <td className="p-4 font-bold text-[#111827]">
                        {matchName}
                        <div className="text-xs font-normal text-[#64748B]">{m.venue?.name || 'Local Stadium'}</div>
                      </td>
                      <td className="p-4 text-xs font-semibold text-[#0757E8]">
                        {m.competition.name}
                      </td>
                      <td className="p-4 text-xs font-mono text-[#64748B]">
                        {new Date(m.scheduledAt).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="p-4 text-xs">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full font-mono font-bold uppercase ${
                            m.status === 'live' || m.status === 'halftime'
                              ? 'bg-[#EF233C] text-white animate-pulse'
                              : m.status === 'finished'
                              ? 'bg-[#F1F4F8] text-[#64748B]'
                              : m.status === 'cancelled' || m.status === 'abandoned'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-[#FEF3C7] text-[#92400E]'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-extrabold text-[#111827]">
                        {m.homeScore.sport === 'football' ? m.homeScore.goals : 0} - {m.awayScore.sport === 'football' ? m.awayScore.goals : 0}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/cms/sports/matches/${m.id}`}
                            className="px-3 py-1.5 rounded-xl bg-[#F1F4F8] text-[#111827] font-display font-bold text-xs hover:bg-[#E5EAF2] transition-colors"
                          >
                            Manage
                          </Link>

                          {/* IMMUTABLE BROADCAST CONSOLE LINK */}
                          <Link
                            href={`/cms/sports/broadcast/${m.id}`}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-display text-xs font-bold transition-all shadow-xs ${
                              m.status === 'live'
                                ? 'bg-[#EF233C] text-white hover:bg-red-700'
                                : 'bg-[#0757E8] text-white hover:bg-[#004ED0]'
                            }`}
                          >
                            <Play size={13} className="fill-current" />
                            <span>Broadcast Console</span>
                          </Link>

                          <button
                            onClick={() => handleDelete(m.id, matchName)}
                            className="p-1.5 rounded-lg text-[#EF233C] hover:bg-red-50 transition-colors"
                            title="Delete Match"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>

        <CreateMatchModal
          tournaments={competitions.map((c) => ({ id: c.id, sport_id: 'football', name: c.name, slug: c.slug, season: c.season }))}
          teams={teams.map((t) => ({ id: t.id, sport_id: 'football', name: t.name, short_name: t.shortName, slug: t.name.toLowerCase() }))}
          sponsors={[]}
          isOpen={isMatchModalOpen}
          onClose={() => setIsMatchModalOpen(false)}
          onSuccess={loadData}
        />
      </div>
    </CMSPinGuard>
  );
}
