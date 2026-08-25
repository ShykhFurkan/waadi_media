'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2, Shield, Trophy, Play, Radio, Calendar, Flame } from 'lucide-react';
import { SportMatch, SportStory, SportTournament, SportPlayer, SportNews } from '@/lib/sports/types';
import { MatchControlBar } from './matches/MatchControlBar';
import { MatchCard } from './matches/MatchCard';
import { TournamentsSection } from './tournaments/TournamentsSection';
import { TopScorers } from './players/TopScorers';
import { StoryCard } from './stories/StoryCard';
import { AdBanner } from './ads/AdBanner';

interface PublicSportsFeedProps {
  liveMatches: SportMatch[];
  upcomingMatches: SportMatch[];
  previousMatches: SportMatch[];
  tournaments: SportTournament[];
  topScorers: SportPlayer[];
  stories: SportStory[];
  news: SportNews[];
}

export const PublicSportsFeed: React.FC<PublicSportsFeedProps> = ({
  liveMatches,
  upcomingMatches,
  previousMatches,
  tournaments,
  topScorers,
  stories,
  news,
}) => {
  const [matchTab, setMatchTab] = useState<'all' | 'live' | 'upcoming' | 'results'>('all');

  const nextUpcoming = upcomingMatches[0];
  const displayUpcoming = upcomingMatches.slice(0, 5);
  const displayPrevious = previousMatches.slice(0, 5);
  const featuredStory = stories[0];
  const sideStories = stories.slice(1, 4);

  return (
    <div className="space-y-8 font-sans">
      {/* 3. TODAY / MATCH CONTROL BAR */}
      <MatchControlBar
        activeTab={matchTab}
        onTabChange={(tab) => setMatchTab(tab)}
      />

      {/* 4. LIVE NOW SECTION */}
      {(matchTab === 'all' || matchTab === 'live') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF233C] animate-ping" />
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight">
                LIVE NOW
              </h2>
            </div>
            <Link
              href="/sports/live"
              className="text-xs font-mono font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {liveMatches.length > 0 ? (
            <div className="space-y-3">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            /* COMPACT NO LIVE MATCHES STATE */
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F1F4F8] text-[#64748B] flex items-center justify-center shrink-0">
                  <Radio size={22} />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-[#111827] uppercase tracking-wider">
                    NO LIVE MATCHES RIGHT NOW
                  </h3>
                  <p className="text-xs font-mono text-[#64748B] mt-0.5">
                    {nextUpcoming ? (
                      <>Next Match: <strong className="text-[#111827]">{nextUpcoming.homeTeam.name} vs {nextUpcoming.awayTeam.name}</strong></>
                    ) : (
                      'Check upcoming fixtures schedule below.'
                    )}
                  </p>
                </div>
              </div>

              {nextUpcoming && (
                <Link
                  href={`/sports/matches/${nextUpcoming.id}`}
                  className="px-4 py-2 rounded-xl bg-[#0757E8] text-white font-mono font-bold text-xs hover:bg-[#004ED0] transition-colors shrink-0 shadow-xs flex items-center gap-1.5"
                >
                  <Clock size={14} />
                  <span>Fixture Details →</span>
                </Link>
              )}
            </div>
          )}
        </section>
      )}

      {/* 5. UPCOMING MATCHES SECTION */}
      {(matchTab === 'all' || matchTab === 'upcoming') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight">
              UPCOMING MATCHES
            </h2>
            <Link
              href="/sports/matches"
              className="text-xs font-mono font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors flex items-center gap-1"
            >
              <span>View More</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {displayUpcoming.length > 0 ? (
            <div className="space-y-3">
              {displayUpcoming.map((match) => {
                const dateObj = new Date(match.scheduledAt);
                const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                return (
                  <div
                    key={match.id}
                    className="bg-white rounded-2xl border border-[#E5EAF2] p-4 sm:p-5 shadow-xs hover:border-[#0757E8]/40 hover:shadow-md transition-all space-y-3"
                  >
                    {/* Compact Competition Grouping Header */}
                    <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-2.5 text-xs font-mono">
                      <span className="font-bold text-[#0757E8] uppercase tracking-wider">
                        {match.competition.name}
                      </span>
                      <span className="text-[#64748B]">
                        {match.venue?.name || 'Kashmir Arena'}
                      </span>
                    </div>

                    {/* Match Grid */}
                    <div className="grid grid-cols-12 items-center gap-3 py-1">
                      {/* Home Team */}
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#F1F4F8] border border-[#E5EAF2] flex items-center justify-center overflow-hidden shrink-0">
                          {match.homeTeam.logoUrl ? (
                            <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} className="w-6 h-6 object-contain" />
                          ) : (
                            <span className="font-display font-bold text-xs text-[#0757E8]">{match.homeTeam.shortName}</span>
                          )}
                        </div>
                        <span className="font-display font-extrabold text-xs sm:text-sm text-[#111827] line-clamp-1">
                          {match.homeTeam.name}
                        </span>
                      </div>

                      {/* Prominent Kickoff Time */}
                      <div className="col-span-4 flex flex-col items-center justify-center text-center">
                        <span className="font-mono font-black text-sm sm:text-base text-[#0757E8] bg-[#EAF2FF] px-3 py-1 rounded-xl">
                          {timeStr}
                        </span>
                        <span className="text-[10px] font-mono text-[#64748B] uppercase mt-1">
                          UPCOMING
                        </span>
                      </div>

                      {/* Away Team */}
                      <div className="col-span-4 flex items-center justify-end gap-3 text-right">
                        <span className="font-display font-extrabold text-xs sm:text-sm text-[#111827] line-clamp-1">
                          {match.awayTeam.name}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#F1F4F8] border border-[#E5EAF2] flex items-center justify-center overflow-hidden shrink-0">
                          {match.awayTeam.logoUrl ? (
                            <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} className="w-6 h-6 object-contain" />
                          ) : (
                            <span className="font-display font-bold text-xs text-[#0757E8]">{match.awayTeam.shortName}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-[#E5EAF2] text-center space-y-1">
              <h4 className="font-display font-bold text-sm text-[#111827]">NO UPCOMING MATCHES</h4>
              <p className="text-xs font-mono text-[#64748B]">There are no upcoming matches scheduled yet.</p>
            </div>
          )}
        </section>
      )}

      {/* 6. ADVERTISEMENT */}
      <AdBanner slot="sports-home-middle" format="leaderboard" />

      {/* 7. PREVIOUS MATCHES & TOP SCORERS SECTION (Desktop 2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Previous Matches (70%) */}
        {(matchTab === 'all' || matchTab === 'results') && (
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight">
                PREVIOUS MATCHES
              </h2>
              <Link
                href="/sports/matches"
                className="text-xs font-mono font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors flex items-center gap-1"
              >
                <span>View More</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {displayPrevious.length > 0 ? (
              <div className="space-y-2.5">
                {displayPrevious.map((match) => {
                  const hScore = (match.homeScore as any).goals ?? 0;
                  const aScore = (match.awayScore as any).goals ?? 0;

                  return (
                    <div
                      key={match.id}
                      className="bg-white rounded-2xl border border-[#E5EAF2] p-4 shadow-xs hover:border-[#0757E8]/40 hover:shadow-sm transition-all flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1 truncate">
                        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block truncate">
                          {match.competition.name}
                        </span>
                        <div className="flex items-center gap-2 font-display font-bold text-xs sm:text-sm text-[#111827]">
                          <span className="truncate">{match.homeTeam.name}</span>
                          <span className="text-[#64748B]">vs</span>
                          <span className="truncate">{match.awayTeam.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="font-mono font-black text-sm sm:text-base text-[#111827] bg-[#F1F4F8] px-3 py-1 rounded-xl">
                          {hScore} - {aScore}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          FT
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-[#E5EAF2] text-center space-y-1">
                <h4 className="font-display font-bold text-sm text-[#111827]">NO RECENT RESULTS</h4>
                <p className="text-xs font-mono text-[#64748B]">Completed matches will appear here.</p>
              </div>
            )}
          </div>
        )}

        {/* 9. TOP SCORERS SECTION (Desktop Sidebar 30% / Mobile Full) */}
        <div className="lg:col-span-5">
          <TopScorers players={topScorers} />
        </div>
      </div>

      {/* 8. UNIFIED COMPETITIONS SECTION */}
      <TournamentsSection tournaments={tournaments} />

      {/* 10. ADVERTISEMENT */}
      <AdBanner slot="sports-home-stories-top" format="leaderboard" />

      {/* 11. TOP STORIES EDITORIAL SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight">
            TOP STORIES
          </h2>
          <Link
            href="/sports/stories"
            className="text-xs font-mono font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors flex items-center gap-1"
          >
            <span>View More</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {featuredStory ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Main Featured Story (70%) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5EAF2] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
              <div className="relative aspect-video bg-black overflow-hidden">
                {featuredStory.imageUrl ? (
                  <img
                    src={featuredStory.imageUrl}
                    alt={featuredStory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-[#071426] flex items-center justify-center text-white/40 font-mono text-xs">
                    KASHMIR SPORTS EDITORIAL
                  </div>
                )}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0757E8] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-md">
                  {featuredStory.category || 'Local Football'}
                </span>
              </div>

              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#111827] group-hover:text-[#0757E8] transition-colors line-clamp-2">
                    {featuredStory.title}
                  </h3>
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed font-normal">
                    {featuredStory.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E5EAF2] text-[11px] font-mono text-[#64748B]">
                  {featuredStory.publishedAt}
                </div>
              </div>
            </div>

            {/* Side Stories Grid (30%) */}
            <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
              {sideStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-2xl border border-[#E5EAF2] p-3.5 flex items-center gap-3.5 hover:border-[#0757E8]/40 hover:shadow-xs transition-all group"
                >
                  <div className="w-20 h-20 rounded-xl bg-[#F1F4F8] overflow-hidden shrink-0 border border-[#E5EAF2]">
                    {story.imageUrl ? (
                      <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-[#64748B]">SPORTS</div>
                    )}
                  </div>
                  <div className="space-y-1 truncate">
                    <span className="text-[10px] font-mono font-bold text-[#0757E8] uppercase">
                      {story.category || 'News'}
                    </span>
                    <h4 className="font-display font-bold text-xs text-[#111827] group-hover:text-[#0757E8] transition-colors line-clamp-2">
                      {story.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#64748B] block">{story.publishedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-[#E5EAF2] text-center space-y-1">
            <h4 className="font-display font-bold text-sm text-[#111827]">NO STORIES AVAILABLE</h4>
            <p className="text-xs font-mono text-[#64748B]">Editorial stories will appear here when published.</p>
          </div>
        )}
      </section>

      {/* 12. NEWS & UPDATES FEED SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827] tracking-tight">
            NEWS & UPDATES
          </h2>
          <Link
            href="/sports/news"
            className="text-xs font-mono font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors flex items-center gap-1"
          >
            <span>View More</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden divide-y divide-[#E5EAF2] shadow-xs">
          {news.length > 0 ? (
            news.slice(0, 5).map((item) => (
              <div key={item.id} className="p-4 hover:bg-[#F7F9FC] transition-colors flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-[#111827] hover:text-[#0757E8] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    {item.publishedAt} · {item.category || 'Local Sports'}
                  </span>
                </div>
                <ArrowRight size={15} className="text-[#64748B] shrink-0" />
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-xs font-mono text-[#64748B]">
              No recent news updates.
            </div>
          )}
        </div>
      </section>

      {/* 13. BOTTOM ADVERTISEMENT */}
      <AdBanner slot="sports-home-bottom" format="leaderboard" />
    </div>
  );
};
