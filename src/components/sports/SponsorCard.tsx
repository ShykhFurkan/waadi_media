import React from 'react';

interface SponsorCardProps {
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  className?: string;
  variant?: 'banner' | 'watch_page' | 'inline';
}

export const SponsorCard: React.FC<SponsorCardProps> = ({
  name,
  logoUrl,
  websiteUrl,
  className = '',
  variant = 'banner',
}) => {
  return (
    <div
      className={`rounded-lg border border-[#22302B] bg-[#1B4332]/40 p-3 flex items-center justify-between gap-4 ${className}`}
    >
      <div className="flex flex-col">
        <span className="text-xs uppercase font-body text-[#8A9A91] tracking-wider">
          Sponsored by
        </span>
        <span className="font-semibold text-sm text-[#F7F5F0]">{name}</span>
      </div>

      <div className="bg-[#F7F5F0] rounded px-3 py-1.5 flex items-center justify-center shadow-sm">
        {logoUrl ? (
          <img src={logoUrl} alt={name} className="h-6 max-w-[120px] object-contain" />
        ) : (
          <span className="text-xs font-display text-[#0F2A1E] uppercase tracking-wider">
            {name}
          </span>
        )}
      </div>
    </div>
  );
};
