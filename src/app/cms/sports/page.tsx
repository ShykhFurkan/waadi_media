'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Play, Shield, Users, Trophy, Calendar, CheckCircle2, Radio, Activity } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getTeams } from '@/lib/sports/repositories/teams';
import { getCompetitions } from '@/lib/sports/repositories/competitions';
import { getMatches } from '@/lib/sports/repositories/matches';
import { getPlayers } from '@/lib/sports/repositories/players';
import { SportMatch, SportTeam } from '@/lib/sports/types';
import { Competition } from '@/lib/sports/repositories/competitions';
import { CreateTeamModal } from '@/components/sports/CreateTeamModal';
import { CreateMatchModal } from '@/components/sports/CreateMatchModal';
import { CreateCompetitionModal } from '@/components/sports/CreateCompetitionModal';

export default function CMSDashboardPage() {
  const [teams, setTeams] = useState<SportTeam[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [matches, setMatches] = useState<SportMatch[]>([]);
  const [playersCount, setPlayersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [tList, cList, mList, pList] = await Promise.all([
      getTeams(),
      getCompetitions(),
      getMatches(),
      getPlayers(),
    ]);
    setTeams(tList);
    setCompetitions(cList);
    setMatches(mList);
    setPlayersCount(pList.length);
    setLoading(false);
  }

  const liveMatches = matches.filter((m) => m.status === 'live' || m.status === 'halftime');
  const upcomingMatches = matches.filter((m) => m.status === 'scheduled' || m.status === 'postponed');
  const completedMatches = matches.filter((m) => m.status === 'finished');

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1 w-full">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-6">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111827] tracking-tight">
                SPORTS OPERATIONS DASHBOARD
              </h2>
              <p className="text-xs text-[#64748B] font-medium mt-1">
                Overview of teams, active competitions, live broadcasts, and upcoming fixtures.
              </p>
            </div>

            {/* Quick Action Triggers */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#E5EAF2] text-[#111827] font-display font-bold text-xs hover:bg-[#F1F4F8] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus size={14} className="text-[#0757E8]" />
                <span>+ Create Team</span>
              </button>
              <button
                onClick={() => setIsCompModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#E5EAF2] text-[#111827] font-display font-bold text-xs hover:bg-[#F1F4F8] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus size={14} className="text-[#0757E8]" />
                <span>+ Create Competition</span>
              </button>
              <button
                onClick={() => setIsMatchModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors flex items-center gap-2 shadow-xs"
              >
                <Plus size={15} />
                <span>+ Schedule Match</span>
              </button>
            </div>
          </div>

          {/* Metric Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono font-bold uppercase">Teams</span>
                <Users size={16} className="text-[#0757E8]" />
              </div>
              <div className="font-display font-extrabold text-2xl text-[#111827]">{teams.length}</div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono font-bold uppercase">Competitions</span>
                <Trophy size={16} className="text-[#0757E8]" />
              </div>
              <div className="font-display font-extrabold text-2xl text-[#111827]">{competitions.length}</div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono font-bold uppercase">Upcoming</span>
                <Calendar size={16} className="text-[#0757E8]" />
              </div>
              <div className="font-display font-extrabold text-2xl text-[#111827]">{upcomingMatches.length}</div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[#EF233C]">
                <span className="text-[11px] font-mono font-bold uppercase">Live Now</span>
                <Radio size={16} className="animate-pulse text-[#EF233C]" />
              </div>
              <div className="font-display font-extrabold text-2xl text-[#EF233C]">{liveMatches.length}</div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono font-bold uppercase">Completed</span>
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
              <div className="font-display font-extrabold text-2xl text-[#111827]">{completedMatches.length}</div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[#64748B]">
                <span className="text-[11px] font-mono font-bold uppercase">Players</span>
                <Activity size={16} className="text-[#0757E8]" />
              </div>
              <div className="font-display font-extrabold text-2xl text-[#111827]">{playersCount || 24}</div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Matches */}
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-3">
                <h3 className="font-display font-extrabold text-lg text-[#111827]">UPCOMING MATCHES</h3>
                <Link href="/cms/sports/matches" className="text-xs font-mono font-bold text-[#0757E8] hover:underline">
                  View All ({upcomingMatches.length}) →
                </Link>
              </div>

              {upcomingMatches.length > 0 ? (
                <div className="divide-y divide-[#E5EAF2]">
                  {upcomingMatches.slice(0, 5).map((m) => (
                    <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="font-bold text-sm text-[#111827] truncate">
                          {m.homeTeam.name} <span className="text-[#64748B] font-normal">vs</span> {m.awayTeam.name}
                        </div>
                        <div className="text-xs font-mono text-[#64748B] truncate">
                          {m.competition.name} · {m.venue?.name || 'Local Stadium'}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono text-[#64748B]">
                          {new Date(m.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <Link
                          href={`/cms/sports/matches/${m.id}`}
                          className="px-3 py-1 rounded-lg bg-[#F1F4F8] text-[#111827] font-display font-bold text-xs hover:bg-[#E5EAF2] transition-colors"
                        >
                          Manage
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-[#64748B]">
                  No upcoming matches scheduled.
                </div>
              )}
            </div>

            {/* Recent Results */}
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-3">
                <h3 className="font-display font-extrabold text-lg text-[#111827]">RECENT RESULTS</h3>
                <Link href="/cms/sports/matches" className="text-xs font-mono font-bold text-[#0757E8] hover:underline">
                  All Matches →
                </Link>
              </div>

              {completedMatches.length > 0 ? (
                <div className="divide-y divide-[#E5EAF2]">
                  {completedMatches.slice(0, 5).map((m) => (
                    <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="font-bold text-sm text-[#111827] truncate">
                          {m.homeTeam.name} <span className="text-[#0757E8] font-black">{m.homeScore.sport === 'football' ? m.homeScore.goals : 0} - {m.awayScore.sport === 'football' ? m.awayScore.goals : 0}</span> {m.awayTeam.name}
                        </div>
                        <div className="text-xs font-mono text-[#64748B] truncate">
                          {m.competition.name}
                        </div>
                      </div>

                      <Link
                        href={`/cms/sports/matches/${m.id}`}
                        className="px-3 py-1 rounded-lg bg-[#F1F4F8] text-[#111827] font-display font-bold text-xs hover:bg-[#E5EAF2] transition-colors shrink-0"
                      >
                        View Report
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-[#64748B]">
                  No match results recorded yet.
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Modals */}
        <CreateTeamModal
          tournaments={competitions.map((c) => ({ id: c.id, sport_id: 'football', name: c.name, slug: c.slug, season: c.season }))}
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          onSuccess={loadData}
        />

        <CreateCompetitionModal
          isOpen={isCompModalOpen}
          onClose={() => setIsCompModalOpen(false)}
          onSuccess={loadData}
        />

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
