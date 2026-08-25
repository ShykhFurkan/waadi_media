import React from 'react';
import { Smartphone } from 'lucide-react';

export const AppPromotionBanner: React.FC = () => {
  return (
    <div className="w-full rounded-2xl bg-[#0757E8] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 blur-2xl rounded-full pointer-events-none" />

      <div className="flex items-center gap-4 text-center sm:text-left z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
          <Smartphone size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">
            Never Miss a Moment!
          </h3>
          <p className="text-xs sm:text-sm text-white/80 max-w-md font-medium">
            Get live scores, match alerts & exclusive sports stories directly on your phone.
          </p>
        </div>
      </div>

      <button className="px-6 py-3 rounded-xl bg-white text-[#0757E8] hover:bg-white/90 font-display font-bold text-sm tracking-wide shadow-lg shrink-0 transition-transform active:scale-95 z-10">
        Download App
      </button>
    </div>
  );
};
