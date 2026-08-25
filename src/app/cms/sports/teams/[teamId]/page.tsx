'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Trophy, Calendar, Shield, Settings, Plus } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getTeamById } from '@/lib/sports/repositories/teams';
import { getPlayers } from '@/lib/sports/repositories/players';
import { getMatches } from '@/lib/sports/repositories/matches';
import { SportTeam, SportPlayer, SportMatch } from '@/lib/sports/types';

export default function TeamDetailPage({ params }: { params: Promise<{ teamId: string }> }) {
  const resolvedParams = use(params);
  const teamId = resolvedParams.teamId;

  const [team, setTeam] = useState<SportTeam | null>(null);
  const [players, setPlayers] = useState<SportPlayer[]>([]);
  const [matches, setMatches] = useState<SportMatch[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'matches' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [teamId]);

  async function loadData() {
    setLoading(true);
    const [t, pList, mList] = await Promise.all([
      getTeamById(teamId),
      getPlayers(),
      getMatches(),
    ]);

    setTeam(t);
    setPlayers(pList.filter((p) => p.teamName === t?.name || p.id === teamId));
    setMatches(mList.filter((m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId));
    setLoading(false);
  }

  if (loading) {
    return (
      <CMSPinGuard>
        <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center font-mono text-xs text-[#64748B]">
          Loading team profile...
        </div>
      </CMSPinGuard>
    );
  }

  if (!team) {
    return (
      <CMSPinGuard>
        <div className="min-h-screen bg-[#F7F9FC] p-8 text-center space-y-4">
          <h2 className="font-display font-extrabold text-xl">Team Not Found</h2>
          <Link href="/cms/sports/teams" className="text-xs font-mono text-[#0757E8]">
            ← Back to Teams
          </Link>
        </div>
      </CMSPinGuard>
    );
  }

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 w-full">
          {/* Back link */}
          <Link href="/cms/sports/teams" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0757E8] hover:underline">
            <ArrowLeft size={14} />
            <span>Back to Teams Registry</span>
          </Link>

          {/* Team Header Card */}
          <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#0757E8] text-white font-display flex items-center justify-center font-black text-2xl shadow-xs overflow-hidden">
                {team.logoUrl ? (
                  <img src={team.logoUrl} alt={team.name} className="w-12 h-12 object-contain" />
                ) : (
                  team.shortName
                )}
              </div>
              <div>
                <h1 className="font-display font-extrabold text-2xl text-[#111827]">{team.name}</h1>
                <div className="flex items-center gap-3 text-xs font-mono text-[#64748B] mt-1">
                  <span className="font-bold text-[#0757E8] bg-[#EAF2FF] px-2 py-0.5 rounded">Code: {team.shortName}</span>
                  <span>Franchise ID: {team.id.slice(0, 8)}</span>
                </div>
              </div>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1 bg-[#F1F4F8] p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  activeTab === 'overview' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('players')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  activeTab === 'players' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                Players Roster ({players.length})
              </button>
              <button
                onClick={() => setActiveTab('matches')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  activeTab === 'matches' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                Matches ({matches.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs md:col-span-2">
                <h3 className="font-display font-extrabold text-lg text-[#111827]">SQUAD PROFILE & INFORMATION</h3>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[#64748B]">Club Name</span>
                    <p className="font-bold text-[#111827] text-sm">{team.name}</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Short Name</span>
                    <p className="font-bold text-[#0757E8] text-sm">{team.shortName}</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Registered Players</span>
                    <p className="font-bold text-[#111827] text-sm">{players.length} Players</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Matches Played</span>
                    <p className="font-bold text-[#111827] text-sm">{matches.length} Matches</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
                <h3 className="font-display font-extrabold text-base text-[#111827]">QUICK STATS</h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-[#E5EAF2]">
                    <span className="text-[#64748B]">Status</span>
                    <span className="font-bold text-emerald-600">Active Franchise</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#E5EAF2]">
                    <span className="text-[#64748B]">Sport</span>
                    <span className="font-bold text-[#111827]">Football</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'players' && (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-lg text-[#111827]">REGISTERED PLAYERS ROSTER</h3>
              </div>

              {players.length > 0 ? (
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F1F4F8] font-mono text-[#64748B] font-bold">
                    <tr>
                      <th className="p-3">PLAYER</th>
                      <th className="p-3">POSITION</th>
                      <th className="p-3 text-right">GOALS SCORED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5EAF2]">
                    {players.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F7F9FC]">
                        <td className="p-3 font-bold text-[#111827]">{p.name}</td>
                        <td className="p-3 font-mono text-[#64748B]">{p.position || 'Forward'}</td>
                        <td className="p-3 text-right font-mono font-extrabold text-[#0757E8]">{p.goals || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-[#64748B]">
                  No players registered for this team yet.
                </div>
              )}
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <h3 className="font-display font-extrabold text-lg text-[#111827]">MATCH SCHEDULE & RESULTS</h3>
              {matches.length > 0 ? (
                <div className="divide-y divide-[#E5EAF2]">
                  {matches.map((m) => (
                    <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="font-bold text-sm text-[#111827]">
                          {m.homeTeam.name} <span className="text-[#0757E8] font-black">{m.homeScore.sport === 'football' ? m.homeScore.goals : 0} - {m.awayScore.sport === 'football' ? m.awayScore.goals : 0}</span> {m.awayTeam.name}
                        </div>
                        <div className="text-xs font-mono text-[#64748B]">
                          {m.competition.name} · {m.status.toUpperCase()}
                        </div>
                      </div>
                      <Link
                        href={`/cms/sports/matches/${m.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#F1F4F8] text-[#111827] font-display font-bold text-xs hover:bg-[#E5EAF2]"
                      >
                        Manage Match
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-[#64748B]">
                  No matches recorded for this team yet.
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </CMSPinGuard>
  );
}
