'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Shield, Trash2 } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getSponsors, deleteSponsor } from '@/lib/sports/repositories/sponsors';
import { getCompetitions, Competition } from '@/lib/sports/repositories/competitions';
import { Sponsor } from '@/lib/supabase';
import { CreateSponsorModal } from '@/components/sports/CreateSponsorModal';

export default function CMSSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [sList, cList] = await Promise.all([getSponsors(), getCompetitions()]);
    setSponsors(sList);
    setCompetitions(cList);
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (confirm(`Are you sure you want to delete sponsor "${name}"?`)) {
      await deleteSponsor(id);
      loadData();
    }
  }

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[#111827]">SPONSORS & PARTNERS</h2>
              <p className="text-xs text-[#64748B] font-medium">
                Register brand sponsors to present in match broadcasts, lower-thirds, and watch pages.
              </p>
            </div>
            <button
              onClick={() => setIsSponsorModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors flex items-center gap-2 shadow-xs"
            >
              <Plus size={16} />
              <span>+ Add Sponsor</span>
            </button>
          </div>

          {/* Sponsors Grid */}
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsors.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl border border-[#E5EAF2] p-5 flex items-center justify-between gap-4 shadow-xs hover:border-[#0757E8]/40 transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 rounded-xl bg-[#F1F4F8] border border-[#E5EAF2] flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                      {s.logo_url ? (
                        <img src={s.logo_url} alt={s.name} className="w-full h-full object-contain" />
                      ) : (
                        <Shield className="text-[#64748B]" size={24} />
                      )}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-display font-bold text-base text-[#111827] truncate">{s.name}</h3>
                      <div className="text-xs font-mono text-[#0757E8] bg-[#EAF2FF] px-2 py-0.5 rounded-md inline-block font-bold">
                        {s.tier || 'Match Sponsor'}
                      </div>
                      {s.tournaments?.name && (
                        <div className="text-[11px] font-mono text-[#64748B] truncate">
                          {s.tournaments.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(s.id, s.name)}
                    className="p-1.5 rounded-lg text-[#EF233C] hover:bg-red-50 transition-colors shrink-0"
                    title="Delete Sponsor"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center space-y-3 shadow-xs">
              <Shield size={36} className="mx-auto text-[#64748B]" />
              <h3 className="font-display font-bold text-base text-[#111827]">No Sponsors Added Yet</h3>
              <p className="text-xs font-mono text-[#64748B] max-w-md mx-auto">
                Add sponsors to your tournaments to assign them when scheduling matches and displaying broadcast lower-thirds.
              </p>
              <button
                onClick={() => setIsSponsorModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0]"
              >
                + Add First Sponsor
              </button>
            </div>
          )}
        </main>

        <CreateSponsorModal
          tournaments={competitions.map((c) => ({ id: c.id, sport_id: 'football', name: c.name, slug: c.slug, season: c.season }))}
          isOpen={isSponsorModalOpen}
          onClose={() => setIsSponsorModalOpen(false)}
          onSuccess={loadData}
        />
      </div>
    </CMSPinGuard>
  );
}
