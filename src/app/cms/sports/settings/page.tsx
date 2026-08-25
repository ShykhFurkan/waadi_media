'use client';

import React from 'react';
import { Settings, Shield, Globe, Radio } from 'lucide-react';
import { CMSNav } from '@/components/sports/CMSNav';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';

export default function CMSSettingsPage() {
  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
        <CMSNav />

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF2] pb-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[#111827]">SPORTS CMS SETTINGS</h2>
              <p className="text-xs text-[#64748B] font-medium">
                Configure default sports settings, broadcast options, venues, and platform security.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* General Settings */}
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 border-b border-[#E5EAF2] pb-3">
                <Globe size={20} className="text-[#0757E8]" />
                <h3 className="font-display font-extrabold text-base text-[#111827]">Platform Defaults</h3>
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-[#64748B]">Primary Sport Focus</span>
                  <p className="font-bold text-[#111827]">⚽ Football</p>
                </div>
                <div>
                  <span className="text-[#64748B]">Demo Fallback Mode</span>
                  <p className="font-bold text-emerald-600">Enabled when DB is empty</p>
                </div>
              </div>
            </div>

            {/* Broadcast Preserved Settings */}
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 border-b border-[#E5EAF2] pb-3">
                <Radio size={20} className="text-[#EF233C]" />
                <h3 className="font-display font-extrabold text-base text-[#111827]">Broadcast Switcher Config</h3>
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-[#64748B]">Broadcasting Subsystem</span>
                  <p className="font-bold text-emerald-600">✓ Immutable & Active</p>
                </div>
                <div>
                  <span className="text-[#64748B]">Simulcast YouTube / Facebook</span>
                  <p className="font-bold text-[#111827]">Configured via Live Console</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CMSPinGuard>
  );
}
