'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { supabase, Match, MatchEvent, Sponsor } from '@/lib/supabase';
import { Header } from '@/components/sports/Header';
import { LiveBadge } from '@/components/sports/LiveBadge';
import { ScoreDisplay } from '@/components/sports/ScoreDisplay';
import { RidgeLine } from '@/components/sports/RidgeLine';
import { SponsorCard } from '@/components/sports/SponsorCard';

export default function MatchWatchPage({ params }: { params: Promise<{ matchId: string }> }) {
  const resolvedParams = use(params);
  const matchId = resolvedParams.matchId;

  const [match, setMatch] = useState<Match | null>(null);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatchDetails();

    // Setup Supabase Realtime for Match Score Updates
    const matchChannel = supabase
      .channel(`match-${matchId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'matches', filter: `id=eq.${matchId}` },
        (payload) => {
          setMatch((prev) => (prev ? { ...prev, ...payload.new } : (payload.new as Match)));
        }
      )
      .subscribe();

    // Setup Supabase Realtime for Match Events
    const eventsChannel = supabase
      .channel(`events-${matchId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'match_events', filter: `match_id=eq.${matchId}` },
        (payload) => {
          setEvents((prev) => [payload.new as MatchEvent, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(matchChannel);
      supabase.removeChannel(eventsChannel);
    };
  }, [matchId]);

  async function fetchMatchDetails() {
    setLoading(true);
    const { data: matchData } = await supabase
      .from('matches')
      .select('*, tournaments(*, sports(*)), home_team:home_team_id(*), away_team:away_team_id(*), sponsor:sponsor_id(*)')
      .eq('id', matchId)
      .single();

    if (matchData) {
      setMatch(matchData);
      if (matchData.sponsor) setSponsor(matchData.sponsor);
    }

    const { data: eventData } = await supabase
      .from('match_events')
      .select('*')
      .eq('match_id', matchId)
      .order('timestamp', { ascending: false });

    if (eventData) setEvents(eventData);

    setLoading(false);
  }

  if (loading || !match) {
    return (
      <div className="min-h-screen bg-[#0F2A1E] text-[#F7F5F0]">
        <Header />
        <RidgeLine variant="loading" />
      </div>
    );
  }

  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F7F5F0]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Match Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22302B] pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/sports/tv"
              className="px-3 py-1 rounded border border-[#22302B] text-xs font-mono text-[#8A9A91] hover:text-[#F7F5F0]"
            >
              ← Waadi TV
            </Link>
            <span className="text-xs font-mono text-[#8A9A91]">
              {match.tournaments?.name} · {match.venue}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isLive && <LiveBadge size="md" />}
            {isCompleted && (
              <span className="px-3 py-1 rounded bg-[#1B4332] text-xs font-mono text-[#8A9A91]">
                MATCH ENDED · VOD AVAILABLE
              </span>
            )}
            <div className="flex items-center gap-2 text-xs font-mono text-[#8A9A91]">
              <span className="px-2 py-0.5 rounded bg-[#1B4332] border border-[#22302B] text-[#E8A33D]">
                🔴 YouTube Live
              </span>
              <span className="px-2 py-0.5 rounded bg-[#1B4332] border border-[#22302B] text-[#E8A33D]">
                🔵 Facebook Stream
              </span>
            </div>
          </div>
        </div>

        {/* Video Player & Realtime Scoreboard Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Video Stream Container */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-xl border border-[#22302B] bg-[#000000] aspect-video flex flex-col justify-between p-4 overflow-hidden shadow-2xl">
              {/* Background Ridge Line Texture (§6) */}
              <RidgeLine variant="texture" className="absolute top-2 left-0 right-0" />

              {/* Top Overlay: Live Score Bar */}
              <div className="relative z-10 flex items-center justify-between bg-[#0F2A1E]/90 backdrop-blur-md border border-[#22302B] rounded-lg px-4 py-2">
                <div className="flex items-center gap-3 font-display text-sm">
                  <span className="text-[#F7F5F0]">{match.home_team?.short_name}</span>
                  <ScoreDisplay
                    homeScore={match.home_score}
                    awayScore={match.away_score}
                    isLive={isLive}
                    isCompleted={isCompleted}
                    size="sm"
                  />
                  <span className="text-[#F7F5F0]">{match.away_team?.short_name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#E8A33D]">{match.status_detail}</span>
                  {isLive && <LiveBadge size="sm" />}
                </div>
              </div>

              {/* Simulated Browser WebRTC Broadcast Stream Canvas */}
              <div className="my-auto text-center space-y-3 relative z-10 py-12">
                <div className="w-16 h-16 rounded-full bg-[#1B4332] border border-[#E8A33D] flex items-center justify-center mx-auto text-2xl animate-pulse">
                  📡
                </div>
                <h2 className="font-display text-lg text-[#F7F5F0]">
                  {isLive ? 'WAADI TV LIVE BROWSER STREAM' : 'FULL MATCH RECORDED VOD'}
                </h2>
                <p className="text-xs text-[#8A9A91] max-w-md mx-auto font-mono">
                  {isLive
                    ? 'Composed in-browser multi-camera WebRTC feed. Pushed directly to Waadi TV player.'
                    : 'Stream completed. High-definition post-match VOD recording.'}
                </p>
              </div>

              {/* Bottom Video Controls / Sponsor Overlay Bug */}
              <div className="relative z-10 flex items-center justify-between bg-[#0F2A1E]/80 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-mono text-[#8A9A91]">
                <span>HD 1080p · 60 FPS</span>
                {sponsor && (
                  <span className="text-[#E8A33D] font-semibold">
                    Presented by {sponsor.name}
                  </span>
                )}
              </div>
            </div>

            {/* Sponsor Placement Box (§4) */}
            {sponsor && (
              <SponsorCard name={sponsor.name} logoUrl={sponsor.logo_url} variant="watch_page" />
            )}
          </div>

          {/* Right Sidebar: Realtime Event Timeline & Match Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-xl border border-[#22302B] bg-[#1B4332] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#22302B] pb-3">
                <h3 className="font-display text-base text-[#F7F5F0]">MATCH TIMELINE</h3>
                <span className="text-[10px] font-mono text-[#8A9A91]">Supabase Realtime</span>
              </div>

              {/* Event Feed */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {events.length > 0 ? (
                  events.map((evt) => (
                    <div
                      key={evt.id}
                      className="rounded-lg border border-[#22302B] bg-[#0F2A1E] p-3 flex items-start gap-3 text-xs"
                    >
                      <span className="font-mono text-[#E8A33D] bg-[#1B4332] px-2 py-0.5 rounded font-semibold">
                        {evt.match_time}
                      </span>
                      <div className="space-y-0.5">
                        <div className="font-semibold text-[#F7F5F0] capitalize">
                          {evt.event_type.replace('_', ' ')}
                        </div>
                        <div className="text-[#8A9A91]">
                          {new Date(evt.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#8A9A91] text-center py-6">
                    No match events logged yet. Events will appear here in real-time as logged by the broadcast console.
                  </p>
                )}
              </div>
            </div>

            {/* Teams Roster Preview */}
            <div className="rounded-xl border border-[#22302B] bg-[#0F2A1E] p-4 space-y-2 text-xs">
              <div className="font-display text-sm text-[#F7F5F0]">TEAMS IN THIS MATCH</div>
              <div className="flex items-center justify-between text-[#8A9A91] pt-1">
                <span>{match.home_team?.name}</span>
                <span className="font-mono text-[#E8A33D]">HOME</span>
              </div>
              <div className="flex items-center justify-between text-[#8A9A91]">
                <span>{match.away_team?.name}</span>
                <span className="font-mono text-[#E8A33D]">AWAY</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
