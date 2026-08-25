import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { SportVideo } from '@/lib/sports/types';

interface FeaturedVideoProps {
  videos: SportVideo[];
}

export const FeaturedVideo: React.FC<FeaturedVideoProps> = ({ videos }) => {
  const mainVideo = videos[0];

  if (!mainVideo) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#111827]">
          Featured Video
        </h2>
        <Link
          href="/sports/videos"
          className="text-xs font-bold text-[#0757E8] hover:text-[#004ED0] transition-colors"
        >
          View All
        </Link>
      </div>

      <Link
        href={`/sports/videos/${mainVideo.id}`}
        className="group block relative rounded-2xl overflow-hidden aspect-video bg-[#05070B] border border-[#E5EAF2] shadow-md"
      >
        <img
          src={mainVideo.thumbnailUrl}
          alt={mainVideo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#0757E8] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play size={24} className="fill-current ml-1" />
          </div>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-white font-mono text-xs font-bold">
          {mainVideo.duration}
        </span>
      </Link>

      <div className="space-y-1">
        <h3 className="font-display font-bold text-base text-[#111827]">
          {mainVideo.title}
        </h3>
        <p className="text-xs font-mono text-[#64748B]">
          {mainVideo.views} • 1 day ago
        </p>
      </div>
    </section>
  );
};
