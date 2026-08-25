'use client';

import React, { useEffect, useState } from 'react';
import { Newspaper, BookOpen, Video, Plus } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { MOCK_NEWS, MOCK_STORIES, MOCK_FEATURED_VIDEOS } from '@/lib/sports/mock-data';

export default function CMSContentPage() {
  const [tab, setTab] = useState<'news' | 'stories' | 'videos'>('news');

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[#111827]">SPORTS CONTENT PUBLISHING</h2>
              <p className="text-xs text-[#64748B] font-medium">
                Publish news articles, editorial stories, match highlights, and tactical videos.
              </p>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1 bg-[#F1F4F8] p-1 rounded-xl">
              <button
                onClick={() => setTab('news')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  tab === 'news' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                News Articles ({MOCK_NEWS.length})
              </button>
              <button
                onClick={() => setTab('stories')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  tab === 'stories' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                Stories ({MOCK_STORIES.length})
              </button>
              <button
                onClick={() => setTab('videos')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                  tab === 'videos' ? 'bg-white text-[#0757E8] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                Videos ({MOCK_FEATURED_VIDEOS.length})
              </button>
            </div>
          </div>

          {/* News Tab */}
          {tab === 'news' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_NEWS.map((n) => (
                <div key={n.id} className="bg-white rounded-2xl border border-[#E5EAF2] p-5 space-y-3 shadow-xs hover:border-[#0757E8]/40 transition-all">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0757E8] bg-[#EAF2FF] px-2 py-0.5 rounded-md">
                    {n.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-[#111827] line-clamp-2">{n.title}</h3>
                  <p className="text-xs text-[#64748B] line-clamp-2">{n.summary}</p>
                </div>
              ))}
            </div>
          )}

          {/* Stories Tab */}
          {tab === 'stories' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_STORIES.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-[#E5EAF2] p-5 space-y-3 shadow-xs hover:border-[#0757E8]/40 transition-all">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0757E8] bg-[#EAF2FF] px-2 py-0.5 rounded-md">
                    {s.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-[#111827] line-clamp-2">{s.title}</h3>
                  <p className="text-xs text-[#64748B] line-clamp-2">{s.excerpt}</p>
                  <span className="text-[11px] font-mono text-[#64748B] block">{s.readTime}</span>
                </div>
              ))}
            </div>
          )}

          {/* Videos Tab */}
          {tab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_FEATURED_VIDEOS.map((v) => (
                <div key={v.id} className="bg-white rounded-2xl border border-[#E5EAF2] p-5 space-y-3 shadow-xs hover:border-[#0757E8]/40 transition-all">
                  <h3 className="font-display font-bold text-base text-[#111827]">{v.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-[#64748B]">
                    <span>Duration: {v.duration}</span>
                    <span>Views: {v.views}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </CMSPinGuard>
  );
}
