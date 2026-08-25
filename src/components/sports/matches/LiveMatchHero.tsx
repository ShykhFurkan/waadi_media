'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Activity, Users, BarChart2, MessageSquare, Radio, Tv, Eye } from 'lucide-react';
import { SportMatch } from '@/lib/sports/types';
import { useLiveClock } from '@/lib/sports/realtime/useLiveClock';
import { SportsVideoPlayer } from '../SportsVideoPlayer';

interface LiveMatchHeroProps {
  initialMatch: SportMatch | null;
  isDetailPage?: boolean;
}

export const LiveMatchHero: React.FC<LiveMatchHeroProps> = ({ initialMatch, isDetailPage = false }) => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'lineups' | 'stats' | 'commentary'>('tracker');
  const match = initialMatch;
  const clockDisplay = useLiveClock(match?.startedAt, match?.status, match?.statusDetail || 'In Progress');

  // Detect operator live stream status dynamically via DB status, localStorage, or BroadcastChannel
  const [isOperatorStreaming, setIsOperatorStreaming] = useState(Boolean(match?.broadcast?.isLive));
  const [isPlayingStream, setIsPlayingStream] = useState(isDetailPage);

  useEffect(() => {
    if (!match?.id) return;

    // Check localStorage
    const localActive = localStorage.getItem('waadi_sports_broadcast_' + match.id) === 'true';
    if (localActive) {
      setIsOperatorStreaming(true);
    }

    // Listen on BroadcastChannel for live signaling from the operator broadcast console
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel(`waadi_sports_broadcast_${match.id}`);
      bc.onmessage = (event) => {
        if (event.data && (event.data.type === 'offer' || event.data.type === 'stream_active' || event.data.type === 'ping')) {
          setIsOperatorStreaming(true);
        }
      };
      return () => {
        bc.close();
      };
    }
  }, [match?.id]);

  if (!match) {
    return (
      <div className="w-full bg-[#071426] text-white rounded-2xl p-8 text-center border border-[#0B1728]">
        <Radio className="mx-auto mb-2 text-[#EF233C] animate-pulse" size={32} />
        <h3 className="font-display text-xl">No Live Match In Progress</h3>
        <p className="text-sm text-white/70 mt-1">Check upcoming fixtures below for schedule details.</p>
      </div>
    );
  }

  const goalEvents = match.events?.filter((e) => e.type === 'goal') || [];
  const homeGoals = goalEvents.filter((e) => e.teamId === match.homeTeam.id);
  const awayGoals = goalEvents.filter((e) => e.teamId === match.awayTeam.id);

  return (
    <div className="w-full bg-[#071426] text-white rounded-2xl border border-[#0B1728] shadow-2xl overflow-hidden relative font-sans">
      {/* Stadium Illumination Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A4A]/40 via-transparent to-[#05070B]/90 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1769FF]/15 blur-3xl rounded-full pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Metadata & Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EF233C] text-white text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              LIVE
            </span>
            <span className="font-bold text-sm text-white/90 truncate">
              {match.competition.name}
            </span>
            {match.competition.edition && (
              <span className="text-xs text-white/60 hidden sm:inline">
                – {match.competition.edition}
              </span>
            )}
          </div>

          {/* Toggle between Video Player and Match Info Scoreboard */}
          {isDetailPage && (
            <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setIsPlayingStream(true)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  isPlayingStream
                    ? 'bg-[#0757E8] text-white shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Tv size={13} />
                <span>Video Player</span>
              </button>

              <button
                onClick={() => setIsPlayingStream(false)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  !isPlayingStream
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Eye size={13} />
                <span>Match Info</span>
              </button>
            </div>
          )}
        </div>

        {/* Video Player Embed (Mounted on detail page or when stream triggered) */}
        {isPlayingStream ? (
          <div className="w-full rounded-xl overflow-hidden bg-black aspect-video border border-white/10 shadow-2xl relative">
            <SportsVideoPlayer
              matchId={match.id}
              title={`${match.homeTeam.name} VS ${match.awayTeam.name}`}
              subtitle={match.competition.name}
            />
          </div>
        ) : (
          /* Match Hero Score & Details Display */
          <div className="flex flex-col items-center justify-center space-y-6 py-2">
            {/* Blue Capsule Timer */}
            <div className="flex flex-col items-center">
              <div className="px-4 py-1 rounded-full bg-[#0757E8] text-white text-xs font-mono font-bold tracking-widest shadow-md flex items-center gap-1.5">
                <span>{clockDisplay}</span>
              </div>
              <span className="text-[11px] font-mono text-white/70 mt-1 uppercase tracking-wider">
                {match.statusDetail || 'In Progress'}
              </span>
            </div>

            {/* Teams and Prominent Score */}
            <div className="w-full grid grid-cols-12 items-center gap-2 max-w-2xl mx-auto">
              {/* Home Team */}
              <div className="col-span-4 flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/20 p-2 flex items-center justify-center shadow-lg group">
                  {match.homeTeam.logoUrl ? (
                    <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
                  ) : (
                    <span className="font-display font-extrabold text-xl text-[#1769FF]">
                      {match.homeTeam.shortName || match.homeTeam.name.substring(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <h2 className="font-display font-extrabold text-sm sm:text-base tracking-tight leading-snug text-white">
                  {match.homeTeam.name}
                </h2>
              </div>

              {/* Dominant Hero Score */}
              <div className="col-span-4 flex items-center justify-center">
                <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white flex items-center gap-2 sm:gap-4 drop-shadow-md">
                  <span>{(match.homeScore as any).goals ?? (match.homeScore as any).runs ?? (match.homeScore as any).points ?? 0}</span>
                  <span className="text-white/40 font-normal">-</span>
                  <span>{(match.awayScore as any).goals ?? (match.awayScore as any).runs ?? (match.awayScore as any).points ?? 0}</span>
                </div>
              </div>

              {/* Away Team */}
              <div className="col-span-4 flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/20 p-2 flex items-center justify-center shadow-lg group">
                  {match.awayTeam.logoUrl ? (
                    <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
                  ) : (
                    <span className="font-display font-extrabold text-xl text-[#1769FF]">
                      {match.awayTeam.shortName || match.awayTeam.name.substring(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <h2 className="font-display font-extrabold text-sm sm:text-base tracking-tight leading-snug text-white">
                  {match.awayTeam.name}
                </h2>
              </div>
            </div>

            {/* Scorers Summary (Rendered dynamically if match events exist) */}
            {goalEvents.length > 0 && (
              <div className="w-full max-w-xl mx-auto grid grid-cols-2 gap-4 text-xs font-medium text-white/80 border-t border-white/10 pt-3">
                <div className="text-left space-y-0.5">
                  {homeGoals.map((g, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span>⚽ {g.playerName || 'Goal'} {g.matchMinute ? `${g.matchMinute}'` : ''}</span>
                    </div>
                  ))}
                </div>
                <div className="text-right space-y-0.5">
                  {awayGoals.map((g, idx) => (
                    <div key={idx} className="flex items-center justify-end gap-1.5">
                      <span>{g.playerName || 'Goal'} {g.matchMinute ? `${g.matchMinute}'` : ''} ⚽</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Watch Live Primary CTA */}
            <div className="pt-2">
              {isDetailPage ? (
                <button
                  onClick={() => setIsPlayingStream(true)}
                  className="px-8 py-3 rounded-xl bg-[#0757E8] hover:bg-[#004ED0] text-white font-display font-bold text-sm tracking-wide shadow-lg shadow-[#0757E8]/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Play size={18} className="fill-current" />
                  <span>{isOperatorStreaming ? 'SWITCH TO LIVE STREAM' : 'OPEN LIVE PLAYER'}</span>
                </button>
              ) : (
                <Link
                  href={`/sports/matches/${match.id}`}
                  className="px-8 py-3 rounded-xl bg-[#0757E8] hover:bg-[#004ED0] text-white font-display font-bold text-sm tracking-wide shadow-lg shadow-[#0757E8]/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Play size={18} className="fill-current" />
                  <span>WATCH LIVE / FIXTURE DETAILS</span>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Secondary Match Control Tabs */}
        <div className="border-t border-white/10 pt-3">
          <div className="flex items-center justify-around sm:justify-center gap-2 sm:gap-8 text-xs font-semibold text-white/70 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors ${
                activeTab === 'tracker' ? 'bg-white/10 text-white font-bold' : 'hover:text-white'
              }`}
            >
              <Activity size={14} />
              <span>Live Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('lineups')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors ${
                activeTab === 'lineups' ? 'bg-white/10 text-white font-bold' : 'hover:text-white'
              }`}
            >
              <Users size={14} />
              <span>Lineups</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors ${
                activeTab === 'stats' ? 'bg-white/10 text-white font-bold' : 'hover:text-white'
              }`}
            >
              <BarChart2 size={14} />
              <span>Stats</span>
            </button>

            <button
              onClick={() => setActiveTab('commentary')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors ${
                activeTab === 'commentary' ? 'bg-white/10 text-white font-bold' : 'hover:text-white'
              }`}
            >
              <MessageSquare size={14} />
              <span>Commentary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
