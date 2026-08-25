import React from 'react';
import Link from 'next/link';
import { SportNews } from '@/lib/sports/types';

interface NewsSectionProps {
  news: SportNews[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827]">
          News & Updates
        </h2>
        <Link
          href="/sports/news"
          className="text-xs font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/sports/news/${item.slug}`}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E5EAF2] hover:border-[#0757E8]/40 hover:shadow-md transition-all group"
          >
            <div className="w-[72px] h-[48px] rounded-xl overflow-hidden bg-[#F1F4F8] shrink-0">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-bold text-xs sm:text-sm text-[#111827] line-clamp-2 group-hover:text-[#0757E8] transition-colors">
                {item.title}
              </h4>
              <span className="text-[11px] font-mono text-[#64748B]">2 hours ago</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
