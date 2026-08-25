import React from 'react';
import { Metadata } from 'next';
import { SportsHeader } from '@/components/sports/layout/SportsHeader';
import { SecondaryNav } from '@/components/sports/layout/SecondaryNav';
import { BottomNavigation } from '@/components/sports/layout/BottomNavigation';
import { NewsSection } from '@/components/sports/news/NewsSection';
import { getNewsUpdates } from '@/lib/sports/repositories/news';

export const metadata: Metadata = {
  title: 'Sports News & Updates | Waadi Sports Pulse',
  description: 'Latest breaking sports news, match reports, and announcements.',
};

export default async function NewsPage() {
  const news = await getNewsUpdates();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans pb-16 md:pb-8">
      <SportsHeader />
      <SecondaryNav />

      <main className="max-w-4xl mx-auto px-4 w-full pt-6 space-y-6 flex-1">
        <NewsSection news={news} />
      </main>

      <BottomNavigation />
    </div>
  );
}
