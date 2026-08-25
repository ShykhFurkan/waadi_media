'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Trophy, Plus, Calendar, CheckCircle2, Shield, MapPin, Award } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getCompetitionById, Competition } from '@/lib/sports/repositories/competitions';
import { calculateStandings } from '@/lib/sports/repositories/standings';
import { getMatches } from '@/lib/sports/repositories/matches';
import { SportTeam, LeagueStanding, SportMatch } from '@/lib/sports/types';
import { RegisterTeamModal } from '@/components/sports/RegisterTeamModal';
import { CreateMatchModal } from '@/components/sports/CreateMatchModal';

export default function CompetitionDetailPage({ params }: { params: Promise<{ competitionId: string }> }) {
  const resolvedParams = use(params);
  const competitionId = resolvedParams.competitionId;

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [standings, setStandings] = useState<LeagueStanding[]>([]);
  const [matches, setMatches] = useState<SportMatch[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'teams' | 'fixtures' | 'standings'>('overview');
  const [loading, setLoading] = useState(true);

  // Modals
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [competitionId]);

  async function loadData() {
    setLoading(true);
    const [comp, stList, mList] = await Promise.all([
      getCompetitionById(competitionId),
      calculateStandings(competitionId),
      getMatches(),
    ]);

    setCompetition(comp);
    setStandings(stList);
    setMatches(mList.filter((m) => m.competition.id === competitionId));
    setLoading(false);
  }

  if (loading) {
    return (
      <CMSPinGuard>
        <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center font-mono text-xs text-[#64748B]">
          Loading competition management...
        </div>
      </CMSPinGuard>
    );
  }

  if (!competition) {
    return (
      <CMSPinGuard>
        <div className="min-h-screen bg-[#F7F9FC] p-8 text-center space-y-4">
          <h2 className="font-display font-extrabold text-xl">Competition Not Found</h2>
          <Link href="/cms/sports/competitions" className="text-xs font-mono text-[#0757E8]">
            ← Back to Competitions
          </Link>
        </div>
      </CMSPinGuard>
    );
  }

  const regTeams = competition.registeredTeams || [];

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 w-full">
          <Link href="/cms/sports/competitions" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0757E8] hover:underline">
            <ArrowLeft size={14} />
            <span>Back to Competitions</span>
          </Link>

          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold uppercase text-[#0757E8] bg-[#EAF2FF] px-2.5 py-0.5 rounded-md">
                  {competition.type === 'League' ? '🏆 League System' : '🥇 Knockout Tournament'}
                </span>
                <span className="text-xs font-mono font-bold uppercase text-[#0757E8] bg-[#0757E8]/10 px-2.5 py-0.5 rounded-md">
                  {competition.format || '11-a-side'}
                </span>
                <span className="text-xs font-mono text-[#64748B]">Season {competition.season}</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl text-[#111827]">{competition.name}</h1>
              {competition.prizePool && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-700 font-bold">
                  <Award size={15} className="text-amber-600" />
                  <span>Prize Pool: {competition.prizePool}</span>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-[#F1F4F8] p-1 rounded-xl shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  activeTab === 'overview' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  activeTab === 'teams' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                Teams ({regTeams.length})
              </button>
              <button
                onClick={() => setActiveTab('fixtures')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  activeTab === 'fixtures' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                Fixtures ({matches.length})
              </button>
              <button
                onClick={() => setActiveTab('standings')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  activeTab === 'standings' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                Standings
              </button>
            </div>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-6 shadow-xs md:col-span-2">
                <h3 className="font-display font-extrabold text-lg text-[#111827]">COMPETITION FORMAT & SPECIFICATIONS</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#E5EAF2]">
                    <span className="text-[#64748B] block mb-0.5">Match Format</span>
                    <p className="font-extrabold text-[#0757E8] text-sm">{competition.format || '11-a-side'}</p>
                  </div>
                  <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#E5EAF2]">
                    <span className="text-[#64748B] block mb-0.5">Required Squad Size</span>
                    <p className="font-extrabold text-[#111827] text-sm">{competition.squadSizeRequired || 18} Players</p>
                  </div>
                  <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#E5EAF2]">
                    <span className="text-[#64748B] block mb-0.5">Max Substitutes</span>
                    <p className="font-extrabold text-[#111827] text-sm">{competition.maxSubstitutes || 5} Subs</p>
                  </div>
                  <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#E5EAF2]">
                    <span className="text-[#64748B] block mb-0.5">Registered Teams</span>
                    <p className="font-extrabold text-[#0757E8] text-sm">{regTeams.length} Teams</p>
                  </div>
                  <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#E5EAF2]">
                    <span className="text-[#64748B] block mb-0.5">Total Fixtures</span>
                    <p className="font-extrabold text-[#111827] text-sm">{matches.length} Matches</p>
                  </div>
                  <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#E5EAF2]">
                    <span className="text-[#64748B] block mb-0.5">Competition Status</span>
                    <p className="font-extrabold text-emerald-600 text-sm">{competition.status}</p>
                  </div>
                </div>

                {/* Location & Prize Pool */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                  {competition.location && (
                    <div className="flex items-center gap-2 p-3 bg-[#F1F4F8] rounded-xl">
                      <MapPin size={18} className="text-[#0757E8] shrink-0" />
                      <div>
                        <span className="text-[#64748B] block text-[10px]">MAIN VENUE LOCATION</span>
                        <span className="font-bold text-[#111827]">{competition.location}</span>
                      </div>
                    </div>
                  )}

                  {competition.prizePool && (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200/80 rounded-xl">
                      <Award size={18} className="text-amber-700 shrink-0" />
                      <div>
                        <span className="text-amber-800 block text-[10px]">PRIZE MONEY & REWARDS</span>
                        <span className="font-extrabold text-amber-900">{competition.prizePool}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assigned Sponsors */}
                {competition.sponsors && competition.sponsors.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#E5EAF2]">
                    <h4 className="font-display font-extrabold text-xs text-[#111827] uppercase tracking-wider">
                      OFFICIAL TOURNAMENT SPONSORS & PARTNERS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {competition.sponsors.map((sName, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-[#EAF2FF] border border-[#0757E8]/20 text-[#0757E8] text-xs font-mono font-bold flex items-center gap-1.5"
                        >
                          <Shield size={14} />
                          <span>{sName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#E5EAF2]">
                  <p className="text-xs text-[#64748B]">{competition.description || 'No additional notes provided.'}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
                <h3 className="font-display font-extrabold text-base text-[#111827]">QUICK ACTIONS</h3>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] shadow-xs"
                >
                  + Register Existing Teams
                </button>
                <button
                  onClick={() => setIsMatchModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-white border border-[#E5EAF2] text-[#111827] font-display font-bold text-xs hover:bg-[#F1F4F8]"
                >
                  + Schedule Match
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Registered Teams */}
          {activeTab === 'teams' && (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-3">
                <h3 className="font-display font-extrabold text-lg text-[#111827]">REGISTERED COMPETITION TEAMS</h3>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0]"
                >
                  + Add / Register Teams
                </button>
              </div>

              {regTeams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regTeams.map((t) => (
                    <div key={t.id} className="p-4 rounded-xl border border-[#E5EAF2] bg-[#F7F9FC] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0757E8] text-white font-display flex items-center justify-center font-bold text-xs">
                          {t.shortName}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#111827]">{t.name}</div>
                          <div className="text-[10px] font-mono text-[#64748B]">Registered Team</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center space-y-3">
                  <Users size={32} className="mx-auto text-[#64748B]" />
                  <p className="text-xs font-mono text-[#64748B]">No teams registered in this competition yet.</p>
                  <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs"
                  >
                    + Add Existing Teams
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Fixtures */}
          {activeTab === 'fixtures' && (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-3">
                <h3 className="font-display font-extrabold text-lg text-[#111827]">COMPETITION FIXTURES</h3>
                <button
                  onClick={() => setIsMatchModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs"
                >
                  + Schedule Competition Match
                </button>
              </div>

              {matches.length > 0 ? (
                <div className="divide-y divide-[#E5EAF2]">
                  {matches.map((m) => (
                    <div key={m.id} className="py-3 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-bold text-sm text-[#111827]">
                          {m.homeTeam.name} <span className="text-[#0757E8] font-black">{m.homeScore.sport === 'football' ? m.homeScore.goals : 0} - {m.awayScore.sport === 'football' ? m.awayScore.goals : 0}</span> {m.awayTeam.name}
                        </div>
                        <div className="text-xs font-mono text-[#64748B]">
                          Venue: {m.venue?.name || 'Local Stadium'} · Status: <strong className="uppercase">{m.status}</strong>
                        </div>
                      </div>
                      <Link
                        href={`/cms/sports/matches/${m.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-[#F1F4F8] text-[#111827] font-display font-bold text-xs"
                      >
                        Manage Match
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-[#64748B]">
                  No matches scheduled for this competition yet.
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Standings */}
          {activeTab === 'standings' && (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-3">
                <h3 className="font-display font-extrabold text-lg text-[#111827]">COMPETITION STANDINGS</h3>
                <span className="text-xs font-mono text-[#64748B]">Calculated strictly from completed matches</span>
              </div>

              {standings.length > 0 ? (
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F1F4F8] font-mono text-[#64748B] font-bold">
                    <tr>
                      <th className="p-3">POS</th>
                      <th className="p-3">TEAM</th>
                      <th className="p-3 text-center">P</th>
                      <th className="p-3 text-center">W</th>
                      <th className="p-3 text-center">D</th>
                      <th className="p-3 text-center">L</th>
                      <th className="p-3 text-center">GD</th>
                      <th className="p-3 text-right">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5EAF2]">
                    {standings.map((row) => (
                      <tr key={row.pos} className="hover:bg-[#F7F9FC]">
                        <td className="p-3 font-mono font-bold text-[#64748B]">{row.pos}</td>
                        <td className="p-3 font-bold text-[#111827]">{row.team.name}</td>
                        <td className="p-3 text-center font-mono">{row.played}</td>
                        <td className="p-3 text-center font-mono text-emerald-600 font-bold">{row.won}</td>
                        <td className="p-3 text-center font-mono">{row.drawn}</td>
                        <td className="p-3 text-center font-mono text-[#EF233C] font-bold">{row.lost}</td>
                        <td className="p-3 text-center font-mono">{row.goalDifference}</td>
                        <td className="p-3 text-right font-mono font-extrabold text-[#0757E8] text-sm">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-xs font-mono text-[#64748B]">
                  No completed match data available to compute standings yet.
                </div>
              )}
            </div>
          )}
        </main>

        <RegisterTeamModal
          competitionId={competition.id}
          competitionName={competition.name}
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onSuccess={loadData}
        />

        <CreateMatchModal
          tournaments={[{ id: competition.id, sport_id: 'football', name: competition.name, slug: competition.slug, season: competition.season }]}
          teams={regTeams.map((t) => ({ id: t.id, sport_id: 'football', name: t.name, short_name: t.shortName, slug: t.name.toLowerCase() }))}
          sponsors={[]}
          isOpen={isMatchModalOpen}
          onClose={() => setIsMatchModalOpen(false)}
          onSuccess={loadData}
        />
      </div>
    </CMSPinGuard>
  );
}
