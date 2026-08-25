'use client';

import React, { useState } from 'react';
import { Image, Video, Shield, FileText, Upload } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';

export default function CMSMediaPage() {
  const [tab, setTab] = useState<'all' | 'logos' | 'images' | 'videos'>('all');

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[#111827]">MEDIA ASSET LIBRARY</h2>
              <p className="text-xs text-[#64748B] font-medium">
                Centralized media repository for team logos, match photography, highlights, and sponsor banners.
              </p>
            </div>

            <button className="px-4 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors flex items-center gap-2 shadow-xs">
              <Upload size={16} />
              <span>Upload Media Asset</span>
            </button>
          </div>

          {/* Media Categories */}
          <div className="flex items-center gap-2 border-b border-[#E5EAF2] pb-3">
            <button
              onClick={() => setTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                tab === 'all' ? 'bg-[#0757E8] text-white' : 'bg-white border border-[#E5EAF2] text-[#64748B]'
              }`}
            >
              All Assets
            </button>
            <button
              onClick={() => setTab('logos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                tab === 'logos' ? 'bg-[#0757E8] text-white' : 'bg-white border border-[#E5EAF2] text-[#64748B]'
              }`}
            >
              Logos & Badges
            </button>
            <button
              onClick={() => setTab('images')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                tab === 'images' ? 'bg-[#0757E8] text-white' : 'bg-white border border-[#E5EAF2] text-[#64748B]'
              }`}
            >
              Match Photos
            </button>
            <button
              onClick={() => setTab('videos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                tab === 'videos' ? 'bg-[#0757E8] text-white' : 'bg-white border border-[#E5EAF2] text-[#64748B]'
              }`}
            >
              Video Packages
            </button>
          </div>

          {/* Media Assets Grid */}
          <div className="bg-white rounded-2xl border border-[#E5EAF2] p-12 text-center space-y-3 shadow-xs">
            <Image size={36} className="mx-auto text-[#64748B]" />
            <h3 className="font-display font-bold text-base text-[#111827]">Centralized Media Storage</h3>
            <p className="text-xs font-mono text-[#64748B] max-w-md mx-auto">
              Uploaded team logos, match images, and video clips will be accessible across tournaments, teams, news, and live broadcast overlays.
            </p>
          </div>
        </main>
      </div>
    </CMSPinGuard>
  );
}
