import React from 'react';
import { Button } from '@/components/ui/Button';
import { ValleyScene } from '@/components/illustrations/ValleyScene';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { HighlighterSwash } from '@/components/ui/HighlighterSwash';
import { StickerIcon } from '@/components/illustrations/StickerSprite';

export function HeroSection() {
  const trueFacts = [
    { label: 'Based in Anantnag', icon: 'chinar' as const, rotate: -1.5 },
    { label: 'Since 2026', icon: 'sparkle' as const, rotate: 1 },
    { label: 'Clients across India', icon: 'star' as const, rotate: -1 },
    { label: 'Prices shown upfront', icon: 'bolt' as const, rotate: 1.5 },
  ];

  return (
    <section className="relative min-h-screen min-h-[100svh] flex flex-col justify-between pt-20 sm:pt-36 overflow-hidden bg-paper bg-dots">
      {/* Top Hero Text Container */}
      <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left: Headlines and CTA */}
          <div className="lg:col-span-9 space-y-4 sm:space-y-8 animate-pop-overshoot">
            {/* H1: Archivo Display + Instrument Serif italic highlighter swash */}
            <h1 className="text-h1 text-ink tracking-tight">
              <span className="block">BUILT IN THE VALLEY.</span>
              <span className="block mt-1 sm:mt-2">
                <HighlighterSwash>Made for your business.</HighlighterSwash>
              </span>
            </h1>

            {/* Lead Text - Server-rendered and immediately visible at first paint */}
            <p className="text-lead max-w-2xl font-medium text-balance">
              Websites, branding, marketing and software for Kashmir&apos;s businesses. Explained simply, priced openly, delivered fast.
            </p>

            {/* CTA Buttons */}
            <div className="pt-1 sm:pt-2 flex flex-row items-center gap-3">
              <Button href="/book-a-call" variant="saffron" className="text-sm sm:text-base px-5 sm:px-8 h-11 sm:h-[52px]">
                Book a free call
              </Button>
              <Button href="/work" variant="outline" className="text-sm sm:text-base px-4 sm:px-8 h-11 sm:h-[52px]">
                See our work
              </Button>
            </div>
          </div>

          {/* Right: Rotating Badge */}
          <div className="hidden lg:flex lg:col-span-3 justify-end items-center">
            <div className="p-3 bg-paper rounded-full border-[3px] border-ink shadow-hard-md hover:scale-105 transition-transform">
              <RotatingBadge size={130} />
            </div>
          </div>
        </div>

        {/* Pill strip along the bottom of the hero text with TRUE facts only */}
        <div className="mt-6 sm:mt-12 flex flex-wrap items-center gap-2 sm:gap-3 z-10">
          {trueFacts.map((fact) => (
            <div
              key={fact.label}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border-2 sm:border-[3px] border-ink shadow-hard-sm font-display text-[11px] sm:text-xs font-black uppercase tracking-wider select-none rotate-0 sm:[transform:rotate(var(--fact-rotate))]"
              style={{ '--fact-rotate': `${fact.rotate}deg` } as React.CSSProperties}
            >
              <StickerIcon name={fact.icon} size={16} />
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flagship Valley Scene occupying lower 55% */}
      <div className="w-full relative z-0 mt-4 sm:mt-6 pointer-events-none border-b-[3px] border-ink">
        <ValleyScene variant="hero" />
      </div>
    </section>
  );
}
