'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trophy, Trash2, Calendar, Shield } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getCompetitions, deleteCompetition, Competition } from '@/lib/sports/repositories/competitions';
import { CreateCompetitionModal } from '@/components/sports/CreateCompetitionModal';

export default function CMSCompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const list = await getCompetitions();
    setCompetitions(list);
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (confirm(`Are you sure you want to delete competition "${name}"?`)) {
      await deleteCompetition(id);
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
              <h2 className="font-display font-extrabold text-2xl text-[#111827]">COMPETITIONS MANAGEMENT</h2>
              <p className="text-xs text-[#64748B] font-medium">
                Unified management module for Football Leagues & Knockout Tournaments.
              </p>
            </div>
            <button
              onClick={() => setIsCompModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors flex items-center gap-2 shadow-xs"
            >
              <Plus size={16} />
              <span>+ Create Competition</span>
            </button>
          </div>

          {/* Competitions Grid */}
          {competitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competitions.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs relative group hover:border-[#0757E8]/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-md ${
                        c.type === 'League'
                          ? 'bg-[#EAF2FF] text-[#0757E8]'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {c.type === 'League' ? '🏆 League System' : '🥇 Knockout Tournament'} · {c.season}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/cms/sports/competitions/${c.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-[#F1F4F8] text-[#111827] font-display font-bold text-xs hover:bg-[#E5EAF2] transition-colors"
                      >
                        Manage
                      </Link>
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
                        className="p-1.5 rounded-lg text-[#EF233C] hover:bg-red-50 transition-colors"
                        title="Delete Competition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-extrabold text-xl text-[#111827]">{c.name}</h3>
                    <p className="text-xs text-[#64748B] line-clamp-2 mt-1">{c.description || 'No description provided.'}</p>
                  </div>

                  <div className="pt-3 border-t border-[#E5EAF2] flex items-center justify-between text-xs font-mono text-[#64748B]">
                    <span>Edition: {c.edition || '1st Edition'}</span>
                    <span>Status: <strong className="text-emerald-600 font-bold">{c.status}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center space-y-3 shadow-xs">
              <Trophy size={36} className="mx-auto text-[#64748B]" />
              <h3 className="font-display font-bold text-base text-[#111827]">No Competitions Created Yet</h3>
              <p className="text-xs font-mono text-[#64748B] max-w-md mx-auto">
                Create a league or tournament season to start registering teams and scheduling matches.
              </p>
              <button
                onClick={() => setIsCompModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0]"
              >
                + Create First Competition
              </button>
            </div>
          )}
        </main>

        <CreateCompetitionModal
          isOpen={isCompModalOpen}
          onClose={() => setIsCompModalOpen(false)}
          onSuccess={loadData}
        />
      </div>
    </CMSPinGuard>
  );
}
