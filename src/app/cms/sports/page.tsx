'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Play, Shield, Trash2 } from 'lucide-react';
import {
  supabase,
  Match,
  Tournament,
  Team,
  Sport,
  Sponsor,
  deleteMatch,
  deleteTournament,
  deleteTeam,
  deleteSponsor,
} from '@/lib/supabase';
import { CMSNav } from '@/components/sports/CMSNav';
import { CreateTournamentModal } from '@/components/sports/CreateTournamentModal';
import { CreateTeamModal } from '@/components/sports/CreateTeamModal';
import { CreateMatchModal } from '@/components/sports/CreateMatchModal';
import { CreateSponsorModal } from '@/components/sports/CreateSponsorModal';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';

export default function CMSDashboardPage() {
  const [activeTab, setActiveTab] = useState<'matches' | 'tournaments' | 'teams' | 'sponsors'>('matches');
  const [sports, setSports] = useState<Sport[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal Open States
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  useEffect(() => {
    fetchAllCMSData();
  }, []);

  async function fetchAllCMSData() {
    setLoading(true);

    const { data: sData } = await supabase.from('sports').select('*');
    if (sData) setSports(sData);

    const { data: tData } = await supabase.from('tournaments').select('*, sports(*)');
    if (tData) setTournaments(tData);

    const { data: tmData } = await supabase.from('teams').select('*, tournaments(*, sports(*))');
    if (tmData) setTeams(tmData);

    const { data: mData } = await supabase
      .from('matches')
      .select('*, tournaments(*, sports(*)), home_team:home_team_id(*), away_team:away_team_id(*)')
      .order('scheduled_at', { ascending: false });

    if (mData) setMatches(mData);

    const { data: spData } = await supabase.from('sponsors').select('*, tournaments(*)');
    if (spData) setSponsors(spData);

    setLoading(false);
  }

  // Delete Handlers
  async function handleDeleteMatch(id: string, name: string) {
    if (confirm(`Are you sure you want to delete match "${name}"?`)) {
      await deleteMatch(id);
      fetchAllCMSData();
    }
  }

  async function handleDeleteTournament(id: string, name: string) {
    if (confirm(`Are you sure you want to delete tournament "${name}"? This will unbind associated teams and matches.`)) {
      await deleteTournament(id);
      fetchAllCMSData();
    }
  }

  async function handleDeleteTeam(id: string, name: string) {
    if (confirm(`Are you sure you want to delete team "${name}"?`)) {
      await deleteTeam(id);
      fetchAllCMSData();
    }
  }

  async function handleDeleteSponsor(id: string, name: string) {
    if (confirm(`Are you sure you want to delete sponsor "${name}"?`)) {
      await deleteSponsor(id);
      fetchAllCMSData();
    }
  }

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F5F0] text-[#0F2A1E]">
      <CMSNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Tab 1: Matches & Live Control */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CBD5E1] pb-4">
              <div>
                <h2 className="font-display text-2xl text-[#0F2A1E]">MATCH SCHEDULER & BROADCASTS</h2>
                <p className="text-xs text-[#64748B] font-mono">
                  Schedule matches, launch live broadcast switcher, and log scores.
                </p>
              </div>
              <button
                onClick={() => setIsMatchModalOpen(true)}
                className="px-4 py-2.5 rounded bg-[#0F2A1E] text-white font-display text-xs hover:bg-[#1B4332] flex items-center gap-2 shadow"
              >
                <Plus size={16} />
                <span>Schedule New Match</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#CBD5E1] shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F1F5F9] border-b border-[#CBD5E1] font-mono text-xs uppercase text-[#475569]">
                  <tr>
                    <th className="p-4">Match / Venue</th>
                    <th className="p-4">Sport / Tournament</th>
                    <th className="p-4">Scheduled Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Score</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {matches.map((m) => {
                    const matchName = `${m.home_team?.name || 'Home'} vs ${m.away_team?.name || 'Away'}`;
                    return (
                      <tr key={m.id} className="hover:bg-[#F8FAFC]">
                        <td className="p-4 font-semibold text-[#0F2A1E]">
                          {matchName}
                          <div className="text-xs font-normal text-[#64748B]">{m.venue}</div>
                        </td>
                        <td className="p-4 text-xs font-mono">
                          <span className="font-bold">{m.tournaments?.sports?.name}</span> · {m.tournaments?.name}
                        </td>
                        <td className="p-4 text-xs font-mono text-[#64748B]">
                          {new Date(m.scheduled_at).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="p-4 text-xs">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full font-mono font-semibold uppercase ${
                              m.status === 'live'
                                ? 'bg-[#D62828] text-white animate-pulse'
                                : m.status === 'completed'
                                ? 'bg-[#E2E8F0] text-[#475569]'
                                : 'bg-[#FEF3C7] text-[#92400E]'
                            }`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold">
                          {m.home_score} - {m.away_score}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/cms/sports/broadcast/${m.id}`}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-display text-xs transition-colors shadow ${
                                m.status === 'live'
                                  ? 'bg-[#D62828] text-white hover:bg-red-700'
                                  : 'bg-[#0F2A1E] text-white hover:bg-[#1B4332]'
                              }`}
                            >
                              <Play size={13} />
                              <span>{m.status === 'live' ? 'Live Console' : 'Start Broadcast'}</span>
                            </Link>

                            <button
                              onClick={() => handleDeleteMatch(m.id, matchName)}
                              className="p-1.5 rounded text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border border-transparent hover:border-red-200"
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
          </div>
        )}

        {/* Tab 2: Tournaments */}
        {activeTab === 'tournaments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-4">
              <div>
                <h2 className="font-display text-2xl text-[#0F2A1E]">TOURNAMENTS & LEAGUES</h2>
                <p className="text-xs text-[#64748B] font-mono">
                  Create and manage Football and Cricket tournament seasons.
                </p>
              </div>
              <button
                onClick={() => setIsTourModalOpen(true)}
                className="px-4 py-2.5 rounded bg-[#0F2A1E] text-white font-display text-xs hover:bg-[#1B4332] flex items-center gap-2 shadow"
              >
                <Plus size={16} />
                <span>Create Tournament</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tournaments.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-xl border border-[#CBD5E1] p-6 space-y-3 shadow-sm relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#E8A33D] bg-[#0F2A1E] px-2.5 py-1 rounded">
                      {t.sports?.name} · {t.edition || '1st Edition'} · {t.season}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#64748B]">Slug: {t.slug}</span>
                      <button
                        onClick={() => handleDeleteTournament(t.id, t.name)}
                        className="p-1 rounded text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        title="Delete Tournament"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-display text-xl text-[#0F2A1E]">{t.name}</h3>
                  <p className="text-xs text-[#64748B] line-clamp-2">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Teams & Players */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-4">
              <div>
                <h2 className="font-display text-2xl text-[#0F2A1E]">TEAMS & ROSTERS</h2>
                <p className="text-xs text-[#64748B] font-mono">
                  Register team franchises associated with specific tournaments.
                </p>
              </div>
              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="px-4 py-2.5 rounded bg-[#0F2A1E] text-white font-display text-xs hover:bg-[#1B4332] flex items-center gap-2 shadow"
              >
                <Plus size={16} />
                <span>Add Team to Tournament</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white rounded-xl border border-[#CBD5E1] p-5 flex items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-[#0F2A1E] text-[#E8A33D] font-display flex items-center justify-center font-bold text-base shrink-0 overflow-hidden">
                      {team.logo_url ? (
                        <img src={team.logo_url} alt={team.name} className="w-9 h-9 object-contain" />
                      ) : (
                        team.short_name
                      )}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="font-display text-base text-[#0F2A1E] truncate">{team.name}</h3>
                      <div className="text-xs font-mono text-[#E8A33D] bg-[#0F2A1E] px-2 py-0.5 rounded inline-block truncate max-w-full">
                        {team.tournaments?.name || 'Tournament Team'} ({team.short_name})
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTeam(team.id, team.name)}
                    className="p-1.5 rounded text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors shrink-0"
                    title="Delete Team"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Sponsors */}
        {activeTab === 'sponsors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-4">
              <div>
                <h2 className="font-display text-2xl text-[#0F2A1E]">TOURNAMENT SPONSORS & PARTNERS</h2>
                <p className="text-xs text-[#64748B] font-mono">
                  Register sponsors for tournaments to present in match broadcasts and watch pages.
                </p>
              </div>
              <button
                onClick={() => setIsSponsorModalOpen(true)}
                className="px-4 py-2.5 rounded bg-[#0F2A1E] text-white font-display text-xs hover:bg-[#1B4332] flex items-center gap-2 shadow"
              >
                <Plus size={16} />
                <span>Add Sponsor to Tournament</span>
              </button>
            </div>

            {sponsors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsors.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-xl border border-[#CBD5E1] p-5 flex items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                        {s.logo_url ? (
                          <img src={s.logo_url} alt={s.name} className="w-full h-full object-contain" />
                        ) : (
                          <Shield className="text-slate-400" size={24} />
                        )}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-display text-base text-[#0F2A1E] truncate">{s.name}</h3>
                        <div className="text-xs font-mono text-[#E8A33D] bg-[#0F2A1E] px-2 py-0.5 rounded inline-block font-bold">
                          {s.tier || 'Match Sponsor'}
                        </div>
                        {s.tournaments?.name && (
                          <div className="text-[11px] font-mono text-slate-500 truncate">
                            {s.tournaments.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteSponsor(s.id, s.name)}
                      className="p-1.5 rounded text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors shrink-0"
                      title="Delete Sponsor"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#CBD5E1] p-12 text-center space-y-3">
                <Shield size={36} className="mx-auto text-slate-400" />
                <h3 className="font-display text-base text-[#0F2A1E]">No Sponsors Added Yet</h3>
                <p className="text-xs font-mono text-slate-500 max-w-md mx-auto">
                  Add sponsors to your tournaments to assign them when scheduling matches and displaying broadcast lower-thirds.
                </p>
                <button
                  onClick={() => setIsSponsorModalOpen(true)}
                  className="px-4 py-2 rounded bg-[#0F2A1E] text-white font-display text-xs hover:bg-[#1B4332]"
                >
                  Add First Sponsor
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <CreateTournamentModal
        sports={sports}
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onSuccess={fetchAllCMSData}
      />

      <CreateTeamModal
        tournaments={tournaments}
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSuccess={fetchAllCMSData}
      />

      <CreateSponsorModal
        tournaments={tournaments}
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
        onSuccess={fetchAllCMSData}
      />

      <CreateMatchModal
        tournaments={tournaments}
        teams={teams}
        sponsors={sponsors}
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        onSuccess={fetchAllCMSData}
      />
      </div>
    </CMSPinGuard>
  );
}
