'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Radio, Trophy, Calendar, Activity, Tv, ArrowRight, Layers, Clock, Shield, Sparkles, Play, Video } from 'lucide-react';
import { supabase, Match, Tournament, Sponsor, Broadcast } from '@/lib/supabase';
import { Header } from '@/components/sports/Header';
import { RidgeLine } from '@/components/sports/RidgeLine';
import { LiveBadge } from '@/components/sports/LiveBadge';
import { ScoreDisplay } from '@/components/sports/ScoreDisplay';
import { MatchCard } from '@/components/sports/MatchCard';
import { SponsorCard } from '@/components/sports/SponsorCard';
import { SportsVideoPlayer } from '@/components/sports/SportsVideoPlayer';

export default function SportsLandingPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'cricket' | 'football'>('all');
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [activeBroadcast, setActiveBroadcast] = useState<Broadcast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSportsData();

    // Setup Supabase Realtime subscription for real-time Go Live updates
    const matchesChannel = supabase
      .channel('public-sports-matches')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'matches' },
        () => {
          fetchSportsData();
        }
      )
      .subscribe();

    const broadcastChannel = supabase
      .channel('public-sports-broadcasts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'broadcasts' },
        () => {
          fetchSportsData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(matchesChannel);
      supabase.removeChannel(broadcastChannel);
    };
  }, []);

  async function fetchSportsData() {
    setLoading(true);

    // Fetch Broadcast Status
    const { data: bData } = await supabase
      .from('broadcasts')
      .select('*')
      .eq('status', 'live')
      .maybeSingle();

    if (bData) {
      setActiveBroadcast(bData);
    } else {
      setActiveBroadcast(null);
    }

    // Fetch Matches
    const { data: matchData } = await supabase
      .from('matches')
      .select('*, tournaments(*, sports(*)), home_team:home_team_id(*), away_team:away_team_id(*), sponsor:sponsor_id(*)');

    if (matchData) {
      setLiveMatches(matchData.filter((m) => m.status === 'live'));
      setUpcomingMatches(matchData.filter((m) => m.status === 'upcoming'));
      setRecentMatches(matchData.filter((m) => m.status === 'completed'));
    }

    const { data: tourData } = await supabase.from('tournaments').select('*, sports(*)');
    if (tourData) setTournaments(tourData);

    const { data: sponData } = await supabase.from('sponsors').select('*');
    if (sponData) setSponsors(sponData);

    setLoading(false);
  }

  const filterBySport = (matches: Match[]) => {
    if (activeTab === 'all') return matches;
    return matches.filter((m) => m.tournaments?.sports?.slug === activeTab);
  };

  const activeLive = filterBySport(liveMatches);
  const activeUpcoming = filterBySport(upcomingMatches);
  const activeRecent = filterBySport(recentMatches);

  const primaryLiveMatch = activeLive[0] || (liveMatches.length > 0 ? liveMatches[0] : null);
  const featuredUpcomingMatch = activeUpcoming[0] || (upcomingMatches.length > 0 ? upcomingMatches[0] : null);

  const isBroadcastLive = !!activeBroadcast || liveMatches.length > 0;

  return (
    <div className="min-h-screen bg-[#091510] text-[#F7F5F0] font-sans selection:bg-[#E8A33D] selection:text-[#0F2A1E]">
      <Header />

      {/* Main Broadcast Channel Hero Section */}
      <section className="pt-6 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4">
        {/* Channel Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F332A] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8A33D] text-[#0F2A1E] flex items-center justify-center font-display font-bold text-sm shadow">
              W
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl tracking-wide text-white uppercase flex items-center gap-2">
                <span>WAADI SPORTS BROADCAST</span>
                <span className="text-xs font-mono font-normal text-[#E8A33D] bg-[#132A1F] px-2 py-0.5 rounded border border-[#22302B]">
                  1080p NETWORK
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isBroadcastLive ? (
              <LiveBadge size="md" />
            ) : (
              <div className="px-3 py-1 rounded-full bg-[#132A1F] text-[#E8A33D] text-xs font-mono font-bold border border-[#22302B] flex items-center gap-2 uppercase shadow">
                <Clock size={14} className="animate-pulse" />
                <span>BROADCAST STANDBY (COMING SOON)</span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Hero Container: WATCH LIVE vs COMING SOON */}
        {isBroadcastLive && primaryLiveMatch ? (
          /* --- LIVE BROADCAST STATE --- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-4">
              {/* Interactive 1080p Video Player */}
              <SportsVideoPlayer
                matchId={primaryLiveMatch.id}
                title={`${primaryLiveMatch.home_team?.name} VS ${primaryLiveMatch.away_team?.name}`}
                subtitle={`${primaryLiveMatch.tournaments?.name || 'Waadi Championship'} · Live from ${primaryLiveMatch.venue}`}
                sponsorName={primaryLiveMatch.sponsor?.name || sponsors[0]?.name}
                isLive={true}
              />

              {/* Match Score & Realtime Status Bar */}
              <div className="rounded-xl border border-[#22302B] bg-[#0D2218] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 font-display text-base">
                    <span className="text-white font-bold">{primaryLiveMatch.home_team?.short_name}</span>
                    <ScoreDisplay
                      homeScore={primaryLiveMatch.home_score}
                      awayScore={primaryLiveMatch.away_score}
                      isLive={true}
                      size="md"
                    />
                    <span className="text-white font-bold">{primaryLiveMatch.away_team?.short_name}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-[#132A1F] text-xs font-mono text-[#E8A33D] border border-[#22302B]">
                    {primaryLiveMatch.status_detail}
                  </span>
                </div>

                <Link
                  href={`/sports/tv/${primaryLiveMatch.id}`}
                  className="px-4 py-2 rounded-lg bg-[#E8A33D] text-[#0F2A1E] font-display text-xs font-bold hover:bg-[#F2C878] transition-all shadow-lg flex items-center gap-2"
                >
                  <span>Full Screen TV View</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Side Broadcast Highlights & Info */}
            <div className="lg:col-span-4 space-y-4">
              {sponsors[0] && (
                <SponsorCard
                  name={sponsors[0].name}
                  logoUrl={sponsors[0].logo_url}
                  className="h-full"
                />
              )}
              <div className="rounded-xl border border-[#22302B] bg-[#0D2218] p-5 text-xs text-[#8A9A91] space-y-3 shadow-lg">
                <div className="font-display text-sm text-[#F7F5F0] flex items-center gap-2 uppercase font-bold">
                  <Radio size={16} className="text-[#E8A33D]" />
                  <span>SIMULCAST NETWORK SPECS</span>
                </div>
                <ul className="space-y-2 font-mono text-[11px]">
                  <li className="flex items-center justify-between border-b border-[#1F332A] pb-1.5">
                    <span>RESOLUTION:</span>
                    <strong className="text-white">1080p60 FULL HD</strong>
                  </li>
                  <li className="flex items-center justify-between border-b border-[#1F332A] pb-1.5">
                    <span>LATENCY:</span>
                    <strong className="text-[#10B981]">ULTRA-LOW WEBRTC</strong>
                  </li>
                  <li className="flex items-center justify-between border-b border-[#1F332A] pb-1.5">
                    <span>MULTI-CAM:</span>
                    <strong className="text-[#E8A33D]">MAIN + MOBILE GUEST</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>PLATFORMS:</span>
                    <strong className="text-white">WAADI TV · YOUTUBE · FB</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* --- COMING SOON / UPCOMING STANDBY STATE --- */
          <div className="relative rounded-2xl border border-[#22302B] bg-[#0D2218] p-6 sm:p-8 overflow-hidden shadow-2xl space-y-6">
            <RidgeLine variant="texture" className="absolute -bottom-2 right-0 w-full max-w-xl opacity-20 pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F332A] pb-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#E8A33D] animate-ping" />
                <span className="font-display text-xs text-[#E8A33D] uppercase tracking-widest font-bold">
                  UPCOMING BROADCAST STANDBY
                </span>
              </div>
              <span className="text-xs font-mono text-[#8A9A91]">
                Broadcast unlocks 5 minutes before scheduled kickoff
              </span>
            </div>

            {featuredUpcomingMatch ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs font-mono text-[#E8A33D] uppercase tracking-wider">
                    {featuredUpcomingMatch.tournaments?.name || 'WAADI SPORTS CHAMPIONSHIP'} · {featuredUpcomingMatch.venue}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-4 bg-[#07130E] rounded-xl border border-[#1F332A]">
                    {/* Home Team */}
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-[#0D1E16] border border-[#22302B] flex items-center justify-center font-display text-lg text-[#E8A33D] font-bold shadow-inner">
                        {featuredUpcomingMatch.home_team?.short_name || 'HT'}
                      </div>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl text-white uppercase font-bold">
                          {featuredUpcomingMatch.home_team?.name}
                        </h3>
                        <span className="text-[10px] font-mono text-[#8A9A91]">HOME TEAM</span>
                      </div>
                    </div>

                    <div className="font-display text-lg text-[#E8A33D] font-bold">VS</div>

                    {/* Away Team */}
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl text-white uppercase font-bold text-right">
                          {featuredUpcomingMatch.away_team?.name}
                        </h3>
                        <span className="text-[10px] font-mono text-[#8A9A91] block text-right">AWAY TEAM</span>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-[#0D1E16] border border-[#22302B] flex items-center justify-center font-display text-lg text-[#E8A33D] font-bold shadow-inner">
                        {featuredUpcomingMatch.away_team?.short_name || 'AT'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8A9A91]">
                    <div className="flex items-center gap-2 bg-[#07130E] px-3 py-1.5 rounded-lg border border-[#1F332A]">
                      <Calendar size={14} className="text-[#E8A33D]" />
                      <span>
                        {new Date(featuredUpcomingMatch.scheduled_at).toLocaleDateString([], {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-[#07130E] px-3 py-1.5 rounded-lg border border-[#1F332A]">
                      <Clock size={14} className="text-[#E8A33D]" />
                      <span>
                        KICKOFF AT {new Date(featuredUpcomingMatch.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side Standby Box */}
                <div className="lg:col-span-4 bg-[#07130E] rounded-xl border border-[#1F332A] p-6 text-center space-y-3 shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-[#132A1F] border border-[#E8A33D] flex items-center justify-center mx-auto text-[#E8A33D] animate-pulse">
                    <Video size={24} />
                  </div>
                  <h4 className="font-display text-sm text-white uppercase font-bold tracking-wider">
                    COMING SOON ON WAADI TV
                  </h4>
                  <p className="text-xs font-mono text-[#8A9A91]">
                    Live 1080p video stream will automatically begin as soon as the broadcast console goes live.
                  </p>
                </div>
              </div>
            ) : (
              /* Generic Coming Soon Standby if no matches scheduled */
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#132A1F] border border-[#E8A33D] flex items-center justify-center mx-auto text-[#E8A33D] animate-pulse shadow-xl">
                  <Radio size={32} />
                </div>
                <h3 className="font-display text-xl text-white uppercase font-bold">
                  COMING SOON — WAADI SPORTS 1080p BROADCAST
                </h3>
                <p className="text-xs font-mono text-[#8A9A91] max-w-md mx-auto">
                  Our multi-camera studio stream is currently offline. Stay tuned for upcoming live match broadcasts.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Signature Ridge Line Divider */}
      <RidgeLine variant="divider" />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Sport Filter Tabs */}
        <div className="flex items-center justify-between border-b border-[#1F332A] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-display text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#E8A33D] text-[#0F2A1E] font-bold'
                  : 'bg-[#0D2218] border border-[#22302B] text-[#8A9A91] hover:text-[#F7F5F0]'
              }`}
            >
              All Sports
            </button>
            <button
              onClick={() => setActiveTab('cricket')}
              className={`px-4 py-2 rounded-lg font-display text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'cricket'
                  ? 'bg-[#E8A33D] text-[#0F2A1E] font-bold'
                  : 'bg-[#0D2218] border border-[#22302B] text-[#8A9A91] hover:text-[#F7F5F0]'
              }`}
            >
              Cricket
            </button>
            <button
              onClick={() => setActiveTab('football')}
              className={`px-4 py-2 rounded-lg font-display text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'football'
                  ? 'bg-[#E8A33D] text-[#0F2A1E] font-bold'
                  : 'bg-[#0D2218] border border-[#22302B] text-[#8A9A91] hover:text-[#F7F5F0]'
              }`}
            >
              Football
            </button>
          </div>

          <span className="text-xs font-mono text-[#8A9A91] hidden sm:inline">
            Showing {activeTab.toUpperCase()} schedule
          </span>
        </div>

        {/* Active Tournaments */}
        <section className="rounded-xl border border-[#22302B] bg-[#0D2218] p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1F332A] pb-3">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-[#E8A33D]" />
              <h2 className="font-display text-base sm:text-lg text-white uppercase font-bold tracking-wide">
                ACTIVE TOURNAMENTS
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8A9A91]">{tournaments.length} Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border border-[#22302B] bg-[#07130E] p-4 flex items-center justify-between gap-4 hover:border-[#E8A33D]/50 transition-all shadow-md"
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#E8A33D] font-bold">{t.season} Season</span>
                  <h3 className="font-display text-base text-white font-bold">{t.name}</h3>
                  <p className="text-xs text-[#8A9A91] line-clamp-1">{t.description}</p>
                </div>
                <Link
                  href={`/sports/tournament/${t.slug}`}
                  className="px-3.5 py-1.5 rounded border border-[#22302B] text-xs font-mono text-white hover:border-[#E8A33D] hover:text-[#E8A33D] transition-colors shrink-0"
                >
                  Fixtures →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Matches */}
        <section className="rounded-xl border border-[#22302B] bg-[#0D2218] p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1F332A] pb-3">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#E8A33D]" />
              <h2 className="font-display text-base sm:text-lg text-white uppercase font-bold tracking-wide">
                UPCOMING FIXTURES
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8A9A91]">{activeUpcoming.length} Scheduled</span>
          </div>

          {activeUpcoming.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeUpcoming.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#8A9A91] font-mono">
              No upcoming matches scheduled for this filter.
            </div>
          )}
        </section>

        {/* Recent Results */}
        <section className="rounded-xl border border-[#22302B] bg-[#0D2218] p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1F332A] pb-3">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-[#E8A33D]" />
              <h2 className="font-display text-base sm:text-lg text-white uppercase font-bold tracking-wide">
                RECENT RESULTS
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8A9A91]">{activeRecent.length} Completed</span>
          </div>

          {activeRecent.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRecent.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#8A9A91] font-mono">
              No recent match results recorded.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
