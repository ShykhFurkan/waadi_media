'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Radio, Plus, CheckCircle2, Shield, Activity } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { getMatchById } from '@/lib/sports/repositories/matches';
import { SportMatch, MatchStatus } from '@/lib/sports/types';

export default function MatchDetailPage({ params }: { params: Promise<{ matchId: string }> }) {
  const resolvedParams = use(params);
  const matchId = resolvedParams.matchId;

  const [match, setMatch] = useState<SportMatch | null>(null);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [status, setStatus] = useState<MatchStatus>('scheduled');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMatch();
  }, [matchId]);

  async function loadMatch() {
    setLoading(true);
    const m = await getMatchById(matchId);
    if (m) {
      setMatch(m);
      setHomeScore(m.homeScore.sport === 'football' ? m.homeScore.goals : 0);
      setAwayScore(m.awayScore.sport === 'football' ? m.awayScore.goals : 0);
      setStatus(m.status);
    }
    setLoading(false);
  }

  function handleAddGoal(team: 'home' | 'away') {
    if (team === 'home') setHomeScore((prev) => prev + 1);
    else setAwayScore((prev) => prev + 1);
  }

  if (loading) {
    return (
      <CMSPinGuard>
        <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center font-mono text-xs text-[#64748B]">
          Loading match details...
        </div>
      </CMSPinGuard>
    );
  }

  if (!match) {
    return (
      <CMSPinGuard>
        <div className="min-h-screen bg-[#F7F9FC] p-8 text-center space-y-4">
          <h2 className="font-display font-extrabold text-xl">Match Not Found</h2>
          <Link href="/cms/sports/matches" className="text-xs font-mono text-[#0757E8]">
            ← Back to Matches
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
          <Link href="/cms/sports/matches" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0757E8] hover:underline">
            <ArrowLeft size={14} />
            <span>Back to Matches List</span>
          </Link>

          {/* Match Status Bar */}
          <div className="bg-[#071426] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-6 border border-[#1E293B]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#0757E8] bg-[#0757E8]/20 px-3 py-1 rounded-md font-bold">
                {match.competition.name}
              </span>
              <span className="text-white/70">
                {new Date(match.scheduledAt).toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {/* Score Display */}
            <div className="flex items-center justify-between gap-4 py-4 border-y border-white/10">
              <div className="text-center sm:text-left flex-1 space-y-1">
                <h2 className="font-display font-extrabold text-xl sm:text-3xl text-white">{match.homeTeam.name}</h2>
                <span className="text-xs font-mono text-white/60">HOME TEAM</span>
              </div>

              <div className="text-center px-6 py-3 bg-[#0B1728] rounded-2xl border border-white/10 shadow-inner">
                <div className="font-mono font-black text-3xl sm:text-5xl text-white tracking-widest">
                  {homeScore} - {awayScore}
                </div>
                <span className="text-[11px] font-mono text-[#EF233C] uppercase font-bold tracking-wider block mt-1">
                  {status}
                </span>
              </div>

              <div className="text-center sm:text-right flex-1 space-y-1">
                <h2 className="font-display font-extrabold text-xl sm:text-3xl text-white">{match.awayTeam.name}</h2>
                <span className="text-xs font-mono text-white/60">AWAY TEAM</span>
              </div>
            </div>

            {/* Broadcast Launcher Button */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="text-xs font-mono text-white/60">
                Venue: {match.venue?.name || 'Local Stadium'}
              </div>

              {/* STRICT IMMUTABLE BROADCAST CONSOLE LINK */}
              <Link
                href={`/cms/sports/broadcast/${match.id}`}
                className="px-5 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors flex items-center gap-2 shadow-md"
              >
                <Play size={15} className="fill-current" />
                <span>Open Broadcast Console</span>
              </Link>
            </div>
          </div>

          {/* Live Score Operator Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Team Controls */}
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <h3 className="font-display font-extrabold text-base text-[#111827]">
                {match.homeTeam.name} Controls
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAddGoal('home')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-display font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>+ Goal</span>
                </button>
                <button
                  onClick={() => setHomeScore((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-xl border border-[#E5EAF2] text-[#64748B] font-mono text-xs hover:bg-[#F1F4F8]"
                >
                  - Goal
                </button>
              </div>
            </div>

            {/* Away Team Controls */}
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <h3 className="font-display font-extrabold text-base text-[#111827]">
                {match.awayTeam.name} Controls
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAddGoal('away')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-display font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>+ Goal</span>
                </button>
                <button
                  onClick={() => setAwayScore((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-xl border border-[#E5EAF2] text-[#64748B] font-mono text-xs hover:bg-[#F1F4F8]"
                >
                  - Goal
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CMSPinGuard>
  );
}
