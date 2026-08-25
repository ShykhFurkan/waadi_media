import React from 'react';
import { AdSlotProps } from '@/lib/sports/types';

export const AdBanner: React.FC<AdSlotProps> = ({ slot, format, className = '' }) => {
  // Dimension configuration for zero-layout-shift preservation
  let dimensions = 'w-full max-w-[320px] h-[50px]';
  let labelText = '320 × 50';

  switch (format) {
    case 'mobile-banner':
      dimensions = 'w-[320px] h-[50px]';
      labelText = '320 × 50';
      break;
    case 'mobile-large':
      dimensions = 'w-[320px] h-[100px]';
      labelText = '320 × 100';
      break;
    case 'rectangle':
      dimensions = 'w-[300px] h-[250px]';
      labelText = '300 × 250';
      break;
    case 'leaderboard':
      dimensions = 'w-full max-w-[970px] h-[90px]';
      labelText = '970 × 90';
      break;
    case 'skyscraper':
      dimensions = 'w-[160px] md:w-[300px] h-[600px]';
      labelText = '300 × 600';
      break;
  }

  return (
    <div className={`w-full flex items-center justify-center py-2 my-2 ${className}`}>
      <div
        data-ad-slot={slot}
        data-ad-format={format}
        className={`${dimensions} bg-[#F1F4F8] border border-[#E5EAF2] rounded-lg flex flex-col items-center justify-center p-2 text-center select-none shadow-inner transition-opacity`}
      >
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#94A3B8] uppercase">
          ADVERTISEMENT
        </span>
        <span className="text-[11px] font-mono text-[#64748B] mt-0.5">
          {labelText}
        </span>
      </div>
    </div>
  );
};
