'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Shield, Trash2 } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getTeams, deleteTeam } from '@/lib/sports/repositories/teams';
import { SportTeam } from '@/lib/sports/types';
import { CreateTeamModal } from '@/components/sports/CreateTeamModal';
import { getCompetitions, Competition } from '@/lib/sports/repositories/competitions';

export default function CMSTeamsPage() {
  const [teams, setTeams] = useState<SportTeam[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [tList, cList] = await Promise.all([getTeams(), getCompetitions()]);
    setTeams(tList);
    setCompetitions(cList);
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (confirm(`Are you sure you want to delete team "${name}"?`)) {
      await deleteTeam(id);
      loadData();
    }
  }

  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.shortName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[#111827]">TEAMS MANAGEMENT</h2>
              <p className="text-xs text-[#64748B] font-medium">
                Global football clubs registry. Create teams and manage squad rosters.
              </p>
            </div>
            <button
              onClick={() => setIsTeamModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors flex items-center gap-2 shadow-xs"
            >
              <Plus size={16} />
              <span>+ Create Team</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3 bg-white border border-[#E5EAF2] rounded-xl px-3.5 py-2 shadow-xs">
            <Search size={16} className="text-[#64748B]" />
            <input
              type="text"
              placeholder="Search teams by name or short code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs font-medium text-[#111827] outline-hidden"
            />
          </div>

          {/* Teams Grid */}
          {filteredTeams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl border border-[#E5EAF2] p-5 flex items-center justify-between gap-4 shadow-xs hover:border-[#0757E8]/40 transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-[#EAF2FF] text-[#0757E8] font-display flex items-center justify-center font-bold text-base shrink-0 overflow-hidden">
                      {t.logoUrl ? (
                        <img src={t.logoUrl} alt={t.name} className="w-9 h-9 object-contain" />
                      ) : (
                        t.shortName
                      )}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="font-display font-bold text-base text-[#111827] truncate">{t.name}</h3>
                      <div className="text-xs font-mono text-[#0757E8] bg-[#EAF2FF] px-2 py-0.5 rounded-md inline-block font-bold">
                        {t.shortName} · Active Franchise
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/cms/sports/teams/${t.id}`}
                      className="px-3 py-1.5 rounded-xl bg-[#F1F4F8] text-[#111827] font-display font-bold text-xs hover:bg-[#E5EAF2] transition-colors"
                    >
                      Manage
                    </Link>
                    <button
                      onClick={() => handleDelete(t.id, t.name)}
                      className="p-1.5 rounded-lg text-[#EF233C] hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center space-y-3 shadow-xs">
              <Shield size={36} className="mx-auto text-[#64748B]" />
              <h3 className="font-display font-bold text-base text-[#111827]">No Teams Found</h3>
              <p className="text-xs font-mono text-[#64748B] max-w-md mx-auto">
                Create your first football team to start registering franchises for tournaments and leagues.
              </p>
              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0]"
              >
                + Create First Team
              </button>
            </div>
          )}
        </main>

        <CreateTeamModal
          tournaments={competitions.map((c) => ({ id: c.id, sport_id: 'football', name: c.name, slug: c.slug, season: c.season }))}
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          onSuccess={loadData}
        />
      </div>
    </CMSPinGuard>
  );
}
