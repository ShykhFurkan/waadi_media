'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Trophy, Activity, Award } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getPlayerById } from '@/lib/sports/repositories/players';
import { SportPlayer } from '@/lib/sports/types';

export default function PlayerDetailPage({ params }: { params: Promise<{ playerId: string }> }) {
  const resolvedParams = use(params);
  const playerId = resolvedParams.playerId;

  const [player, setPlayer] = useState<SportPlayer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayer();
  }, [playerId]);

  async function loadPlayer() {
    setLoading(true);
    const p = await getPlayerById(playerId);
    setPlayer(p);
    setLoading(false);
  }

  if (loading) {
    return (
      <CMSPinGuard>
        <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center font-mono text-xs text-[#64748B]">
          Loading player profile...
        </div>
      </CMSPinGuard>
    );
  }

  if (!player) {
    return (
      <CMSPinGuard>
        <div className="min-h-screen bg-[#F7F9FC] p-8 text-center space-y-4">
          <h2 className="font-display font-extrabold text-xl">Player Not Found</h2>
          <Link href="/cms/sports/players" className="text-xs font-mono text-[#0757E8]">
            ← Back to Players Directory
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
          <Link href="/cms/sports/players" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0757E8] hover:underline">
            <ArrowLeft size={14} />
            <span>Back to Players Directory</span>
          </Link>

          {/* Player Header Card */}
          <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#0757E8] text-white font-display flex items-center justify-center font-black text-2xl shadow-xs overflow-hidden">
                {player.avatarUrl ? (
                  <img src={player.avatarUrl} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  player.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <div>
                <h1 className="font-display font-extrabold text-2xl text-[#111827]">{player.name}</h1>
                <div className="flex items-center gap-3 text-xs font-mono text-[#64748B] mt-1">
                  <span className="font-bold text-[#0757E8] bg-[#EAF2FF] px-2 py-0.5 rounded">
                    {player.teamName}
                  </span>
                  <span>Position: {player.position || 'Forward'}</span>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-[#F1F4F8] rounded-xl text-right font-mono">
              <div className="text-2xl font-black text-[#0757E8]">{player.goals || 0}</div>
              <span className="text-[10px] text-[#64748B] font-bold uppercase">Total Goals</span>
            </div>
          </div>

          {/* Player Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs md:col-span-2">
              <h3 className="font-display font-extrabold text-lg text-[#111827]">SEASON STATISTICS & METRICS</h3>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#64748B]">Appearances</span>
                  <p className="font-bold text-[#111827] text-sm">6 Matches</p>
                </div>
                <div>
                  <span className="text-[#64748B]">Goals Scored</span>
                  <p className="font-bold text-[#0757E8] text-sm">{player.goals || 0} Goals</p>
                </div>
                <div>
                  <span className="text-[#64748B]">Yellow Cards</span>
                  <p className="font-bold text-amber-600 text-sm">1 Card</p>
                </div>
                <div>
                  <span className="text-[#64748B]">Red Cards</span>
                  <p className="font-bold text-[#EF233C] text-sm">0 Cards</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <h3 className="font-display font-extrabold text-base text-[#111827]">AFFILIATION</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-[#E5EAF2]">
                  <span className="text-[#64748B]">Club</span>
                  <span className="font-bold text-[#111827]">{player.teamName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5EAF2]">
                  <span className="text-[#64748B]">Status</span>
                  <span className="font-bold text-emerald-600">Active Player</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CMSPinGuard>
  );
}
