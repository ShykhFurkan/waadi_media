import React from 'react';
import { StickerIcon } from '@/components/illustrations/StickerSprite';

const marqueeServices = [
  'Websites',
  'Online Stores',
  'SEO & Search',
  'Brand Identity',
  'Google & Meta Ads',
  'Custom Software',
  'WhatsApp Automation',
  'Web Applications',
];

export function CrossingMarquees() {
  return (
    <div className="relative py-12 sm:py-20 overflow-hidden select-none bg-paper pointer-events-none">
      <div className="pointer-events-auto relative py-6">
        {/* Band 1: Ink background, Paper text, Saffron star glyphs, -3 degrees */}
        <div
          className="group relative w-full overflow-hidden py-3.5 bg-ink text-paper border-y-[3px] border-ink shadow-hard-sm -rotate-3 z-10"
        >
          <div className="flex w-max animate-marquee-forward motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            {[1, 2].map((group) => (
              <div key={group} className="flex shrink-0 items-center">
                {marqueeServices.map((service, idx) => (
                  <span key={idx} className="inline-flex items-center mx-6">
                    <span className="font-display font-black text-xl sm:text-2xl uppercase tracking-wider text-paper">
                      {service}
                    </span>
                    <span className="ml-8 text-saffron shrink-0">
                      <StickerIcon name="star" size={20} />
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Band 2: Saffron background, Ink text, +2 degrees */}
        <div
          className="group relative w-full overflow-hidden py-3.5 bg-saffron text-ink border-y-[3px] border-ink shadow-hard-md rotate-2 z-20 -mt-3 sm:-mt-5"
        >
          <div className="flex w-max animate-marquee-backward motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            {[1, 2].map((group) => (
              <div key={group} className="flex shrink-0 items-center">
                {[...marqueeServices].reverse().map((service, idx) => (
                  <span key={idx} className="inline-flex items-center mx-6">
                    <span className="font-display font-black text-xl sm:text-2xl uppercase tracking-wider text-ink">
                      {service}
                    </span>
                    <span className="ml-8 text-chinar shrink-0">
                      <StickerIcon name="chinar" size={20} />
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
