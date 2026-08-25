import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Shield, MapPin, Trophy, Users, Activity, Play, CheckCircle2, UserCheck } from 'lucide-react';
import { getMatchById } from '@/lib/sports/repositories/matches';
import { getPlayersByTeamId } from '@/lib/sports/repositories/players';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { LiveMatchHero } from '@/components/sports/matches/LiveMatchHero';

interface Props {
  params: Promise<{ matchId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const match = await getMatchById(resolvedParams.matchId);

  if (!match) {
    return {
      title: 'Match Not Found | Waadi Sports',
    };
  }

  const title = `${match.homeTeam.name} vs ${match.awayTeam.name} Live Score & Squad Stats | Waadi Sports`;
  const description = `Live coverage of ${match.homeTeam.name} vs ${match.awayTeam.name} in ${match.competition.name}. Real-time score, goalscorers, player rosters, and match events.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function MatchDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const match = await getMatchById(resolvedParams.matchId);

  if (!match) {
    notFound();
  }

  const homePlayers = await getPlayersByTeamId(match.homeTeam.id);
  const awayPlayers = await getPlayersByTeamId(match.awayTeam.id);

  const homeScoreNum = (match.homeScore as any).goals ?? (match.homeScore as any).runs ?? (match.homeScore as any).points ?? 0;
  const awayScoreNum = (match.awayScore as any).goals ?? (match.awayScore as any).runs ?? (match.awayScore as any).points ?? 0;

  const isLive = match.status === 'live' || match.status === 'halftime';

  return (
    <div className="min-h-screen bg-[#071426] text-white flex flex-col font-sans pb-16 md:pb-8 selection:bg-[#0757E8] selection:text-white">
      <SportsHeader />
      <SecondaryNav />

      {/* Main Single Match Focused View */}
      <main className="max-w-5xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10"
          >
            <ArrowLeft size={16} />
            <span>Back to Sports Hub</span>
          </Link>

          <div className="flex items-center gap-2">
            {isLive ? (
              <span className="px-3 py-1 rounded-full bg-[#EF233C] text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                LIVE MATCH
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-mono uppercase font-bold border border-white/10">
                {match.status}
              </span>
            )}
          </div>
        </div>

        {/* 1. Hero Live Broadcast & Score Center */}
        <LiveMatchHero initialMatch={match} isDetailPage={true} />

        {/* 2. Goalscorers & Match Events Breakdown Section */}
        <div className="bg-[#0B1E36] rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display font-extrabold text-sm text-[#1769FF] uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} />
              <span>GOALSCORERS & MATCH EVENTS SUMMARY</span>
            </h3>
            <span className="text-xs font-mono text-white/60">
              {match.statusDetail || 'In Progress'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Home Team Goals */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-white">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-extrabold text-[#1769FF]">
                  {match.homeTeam.shortName || match.homeTeam.name.substring(0, 3).toUpperCase()}
                </div>
                <span>{match.homeTeam.name} ({homeScoreNum})</span>
              </div>
              <ul className="space-y-1.5 pl-8 text-xs font-mono text-white/80">
                {(match.events || []).filter((e) => e.teamId === match.homeTeam.id).length > 0 ? (
                  (match.events || []).filter((e) => e.teamId === match.homeTeam.id).map((e, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span>{e.type === 'goal' ? '⚽' : e.type === 'yellow_card' ? '🟨' : '🟥'} {e.playerName || 'Event'} {e.matchMinute ? `${e.matchMinute}'` : ''}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-white/40 italic">No events logged for home team</li>
                )}
              </ul>
            </div>

            {/* Away Team Goals */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-white sm:justify-end text-right">
                <span>{match.awayTeam.name} ({awayScoreNum})</span>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-extrabold text-[#1769FF]">
                  {match.awayTeam.shortName || match.awayTeam.name.substring(0, 3).toUpperCase()}
                </div>
              </div>
              <ul className="space-y-1.5 sm:text-right text-xs font-mono text-white/80">
                {(match.events || []).filter((e) => e.teamId === match.awayTeam.id).length > 0 ? (
                  (match.events || []).filter((e) => e.teamId === match.awayTeam.id).map((e, idx) => (
                    <li key={idx} className="flex items-center gap-2 sm:justify-end">
                      <span>{e.playerName || 'Event'} {e.matchMinute ? `${e.matchMinute}'` : ''} {e.type === 'goal' ? '⚽' : e.type === 'yellow_card' ? '🟨' : '🟥'}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-white/40 italic">No events logged for away team</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Squad Players Rosters Section (Home vs Away) */}
        <div className="bg-[#0B1E36] rounded-2xl border border-white/10 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display font-extrabold text-sm text-[#1769FF] uppercase tracking-wider flex items-center gap-2">
              <Users size={16} />
              <span>OFFICIAL TEAM LINEUPS & SQUAD PLAYERS</span>
            </h3>
            <span className="text-xs font-mono text-white/60">
              {homePlayers.length + awayPlayers.length} Registered Squad Members
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Squad */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-[#1769FF]" />
                  <span className="font-display font-extrabold text-sm text-white">{match.homeTeam.name}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                  {homePlayers.length} Players
                </span>
              </div>

              <div className="bg-[#071426] rounded-xl border border-white/10 overflow-hidden divide-y divide-white/5">
                {homePlayers.map((p) => (
                  <div key={p.id} className="p-2.5 flex items-center justify-between text-xs font-mono hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-black text-[#1769FF]">#{p.jerseyNumber}</span>
                      <span className="font-bold text-white">{p.name}</span>
                    </div>
                    <span className="text-white/60 text-[11px]">{p.position}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Away Squad */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-[#1769FF]" />
                  <span className="font-display font-extrabold text-sm text-white">{match.awayTeam.name}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                  {awayPlayers.length} Players
                </span>
              </div>

              <div className="bg-[#071426] rounded-xl border border-white/10 overflow-hidden divide-y divide-white/5">
                {awayPlayers.map((p) => (
                  <div key={p.id} className="p-2.5 flex items-center justify-between text-xs font-mono hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-black text-[#1769FF]">#{p.jerseyNumber}</span>
                      <span className="font-bold text-white">{p.name}</span>
                    </div>
                    <span className="text-white/60 text-[11px]">{p.position}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Match Venue & Tournament Info */}
        <div className="bg-[#0B1E36] rounded-2xl border border-white/10 p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-white/80">
          <div className="flex items-center gap-2.5">
            <Trophy size={18} className="text-[#1769FF]" />
            <div>
              <span className="text-white/50 text-[10px] block uppercase">Competition</span>
              <span className="font-bold text-white">{match.competition.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin size={18} className="text-[#1769FF]" />
            <div>
              <span className="text-white/50 text-[10px] block uppercase">Venue Stadium</span>
              <span className="font-bold text-white">{match.venue?.name || 'Sports Stadium'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <div>
              <span className="text-white/50 text-[10px] block uppercase">Match Status</span>
              <span className="font-bold text-emerald-400 uppercase">{match.status}</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
