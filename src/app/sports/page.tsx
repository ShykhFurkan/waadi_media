'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Radio, Trophy, Calendar, Activity, Tv, ArrowRight, Layers } from 'lucide-react';
import { supabase, Match, Tournament, Sponsor } from '@/lib/supabase';
import { Header } from '@/components/sports/Header';
import { RidgeLine } from '@/components/sports/RidgeLine';
import { LiveBadge } from '@/components/sports/LiveBadge';
import { ScoreDisplay } from '@/components/sports/ScoreDisplay';
import { MatchCard } from '@/components/sports/MatchCard';
import { SponsorCard } from '@/components/sports/SponsorCard';
import { seedWaadiSportsData } from '@/lib/seedData';

export default function SportsLandingPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'cricket' | 'football'>('all');
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSportsData();
  }, []);

  async function fetchSportsData() {
    setLoading(true);
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

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F7F5F0]">
      <Header />

      {/* Hero Live Section */}
      <section className="pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-hero-reveal">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl sm:text-3xl tracking-tight text-[#F7F5F0]">
              LIVE NOW ON <span className="text-[#E8A33D]">WAADI TV</span>
            </h1>
            {activeLive.length > 0 && <LiveBadge size="md" />}
          </div>
          <Link
            href="/sports/tv"
            className="text-xs font-mono text-[#E8A33D] hover:underline flex items-center gap-1"
          >
            <span>All Broadcasts</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {activeLive.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {activeLive.map((match) => (
              <div
                key={match.id}
                className="lg:col-span-8 rounded-xl border border-[#22302B] bg-[#0A1712] p-6 relative overflow-hidden shadow-2xl"
              >
                <RidgeLine variant="texture" className="absolute -bottom-2 left-0 right-0" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#A8B8AF] uppercase tracking-wider">
                    {match.tournaments?.name} · {match.venue}
                  </span>
                  <LiveBadge size="sm" />
                </div>

                <div className="grid grid-cols-12 items-center gap-4 my-6">
                  <div className="col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
                    <div className="w-16 h-16 rounded-full bg-[#0F2A1E] border border-[#22302B] flex items-center justify-center font-display text-xl text-[#E8A33D]">
                      {match.home_team?.short_name || 'HT'}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-[#F7F5F0] leading-tight">
                      {match.home_team?.name}
                    </h3>
                  </div>

                  <div className="col-span-2 flex flex-col items-center justify-center">
                    <ScoreDisplay
                      homeScore={match.home_score}
                      awayScore={match.away_score}
                      isLive={true}
                      size="hero"
                    />
                    <span className="text-xs font-mono text-[#E8A33D] mt-2">
                      {match.status_detail}
                    </span>
                  </div>

                  <div className="col-span-5 flex flex-col items-center sm:items-end text-center sm:text-right gap-2">
                    <div className="w-16 h-16 rounded-full bg-[#0F2A1E] border border-[#22302B] flex items-center justify-center font-display text-xl text-[#E8A33D]">
                      {match.away_team?.short_name || 'AT'}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-[#F7F5F0] leading-tight">
                      {match.away_team?.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#22302B]">
                  <span className="text-xs text-[#A8B8AF] font-mono">
                    Simulcast: Waadi TV · YouTube · Facebook
                  </span>
                  <Link
                    href={`/sports/tv/${match.id}`}
                    className="px-5 py-2.5 rounded-lg bg-[#E8A33D] text-[#0F2A1E] font-display text-sm hover:bg-[#F2C878] transition-colors shadow-lg flex items-center gap-2"
                  >
                    <span>Watch Stream</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}

            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              {sponsors[0] && (
                <SponsorCard
                  name={sponsors[0].name}
                  logoUrl={sponsors[0].logo_url}
                  className="h-full"
                />
              )}
              <div className="rounded-xl border border-[#22302B] bg-[#0A1712] p-5 text-xs text-[#A8B8AF] space-y-2">
                <div className="font-display text-sm text-[#F7F5F0] flex items-center gap-2">
                  <Tv size={16} className="text-[#E8A33D]" />
                  <span>Browser Production Studio</span>
                </div>
                <p>
                  Browser-captured multi-camera stream. No local software required for main or guest cameras.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Fix #3: Compact, left-aligned empty hero card with Ridge Line texture background */
          <div className="relative rounded-xl border border-[#22302B] bg-[#0A1712] p-6 max-w-2xl overflow-hidden space-y-2">
            <RidgeLine variant="texture" className="absolute -bottom-2 right-0 w-96 opacity-30" />
            <div className="flex items-center gap-2 text-[#E8A33D]">
              <Radio size={18} />
              <span className="font-display text-sm text-[#F7F5F0] uppercase tracking-wider">
                Broadcast Offline
              </span>
            </div>
            <h3 className="font-display text-lg text-[#F7F5F0]">No Live Matches Right Now</h3>
            <p className="text-xs text-[#A8B8AF]">
              Check out the upcoming tournament schedule below or watch recent match highlights on Waadi TV.
            </p>
          </div>
        )}
      </section>

      {/* Fix #7: Signature Ridge Line Divider */}
      <RidgeLine variant="divider" />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* Fix #4: Single instance of Sport Filter Pills directly above the content grid */}
        <div className="flex items-center justify-between border-b border-[#22302B] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-display text-xs tracking-wider uppercase transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#E8A33D] text-[#0F2A1E] font-bold'
                  : 'bg-[#0A1712] border border-[#22302B] text-[#A8B8AF] hover:text-[#F7F5F0]'
              }`}
            >
              All Sports
            </button>
            <button
              onClick={() => setActiveTab('cricket')}
              className={`px-4 py-2 rounded-lg font-display text-xs tracking-wider uppercase transition-colors ${
                activeTab === 'cricket'
                  ? 'bg-[#E8A33D] text-[#0F2A1E] font-bold'
                  : 'bg-[#0A1712] border border-[#22302B] text-[#A8B8AF] hover:text-[#F7F5F0]'
              }`}
            >
              Cricket
            </button>
            <button
              onClick={() => setActiveTab('football')}
              className={`px-4 py-2 rounded-lg font-display text-xs tracking-wider uppercase transition-colors ${
                activeTab === 'football'
                  ? 'bg-[#E8A33D] text-[#0F2A1E] font-bold'
                  : 'bg-[#0A1712] border border-[#22302B] text-[#A8B8AF] hover:text-[#F7F5F0]'
              }`}
            >
              Football
            </button>
          </div>

          <span className="text-xs font-mono text-[#A8B8AF]">
            Showing {activeTab.toUpperCase()} content
          </span>
        </div>

        {/* Fix #6: Section Cards with consistent container styling */}

        {/* Section 1: Active Tournaments */}
        <section className="rounded-xl border border-[#22302B] bg-[#0A1712] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#22302B] pb-3">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-[#E8A33D]" />
              <h2 className="font-display text-lg text-[#F7F5F0]">ACTIVE TOURNAMENTS</h2>
            </div>
            <span className="text-xs font-mono text-[#A8B8AF]">{tournaments.length} Tournaments</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border border-[#22302B] bg-[#0F2A1E] p-5 flex items-center justify-between gap-4 hover:border-[#E8A33D]/40 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#E8A33D]">{t.season} Season</span>
                  <h3 className="font-display text-base text-[#F7F5F0]">{t.name}</h3>
                  <p className="text-xs text-[#A8B8AF] line-clamp-1">{t.description}</p>
                </div>
                <Link
                  href={`/sports/tournament/${t.slug}`}
                  className="px-3.5 py-1.5 rounded border border-[#22302B] text-xs font-mono text-[#F7F5F0] hover:border-[#E8A33D] transition-colors"
                >
                  Fixtures →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Upcoming Matches */}
        <section className="rounded-xl border border-[#22302B] bg-[#0A1712] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#22302B] pb-3">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#E8A33D]" />
              <h2 className="font-display text-lg text-[#F7F5F0]">UPCOMING MATCHES</h2>
            </div>
            <span className="text-xs font-mono text-[#A8B8AF]">{activeUpcoming.length} Scheduled</span>
          </div>

          {activeUpcoming.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeUpcoming.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#A8B8AF] font-mono">
              No upcoming matches scheduled for this filter.
            </div>
          )}
        </section>

        {/* Section 3: Recent Results */}
        <section className="rounded-xl border border-[#22302B] bg-[#0A1712] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#22302B] pb-3">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-[#E8A33D]" />
              <h2 className="font-display text-lg text-[#F7F5F0]">RECENT RESULTS</h2>
            </div>
            <span className="text-xs font-mono text-[#A8B8AF]">{activeRecent.length} Completed</span>
          </div>

          {activeRecent.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRecent.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#A8B8AF] font-mono">
              No recent results recorded yet.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
