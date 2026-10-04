import React from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Tile } from '@/components/ui/Tile';
import { Sticker } from '@/components/ui/Sticker';
import { RotatingBadge } from '@/components/ui/RotatingBadge';
import { HighlighterSwash } from '@/components/ui/HighlighterSwash';
import { StickerIcon } from '@/components/illustrations/StickerSprite';

export const metadata: Metadata = {
  title: 'Dev Component Kit - Waadi Media (Neo-Brutalist)',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevKitPage() {
  const tokens = [
    { name: '--paper', hex: '#FBF6EA', bg: 'bg-paper text-ink' },
    { name: '--paper-2', hex: '#F3EAD3', bg: 'bg-paper-2 text-ink' },
    { name: '--ink', hex: '#0B0B0B', bg: 'bg-ink text-white' },
    { name: '--blue', hex: '#0057FF', bg: 'bg-blue text-white' },
    { name: '--saffron', hex: '#FFC72C', bg: 'bg-saffron text-ink' },
    { name: '--chinar', hex: '#FF5A36', bg: 'bg-chinar text-ink' },
    { name: '--almond', hex: '#FF9EC4', bg: 'bg-almond text-ink' },
    { name: '--mint', hex: '#6FE3C1', bg: 'bg-mint text-ink' },
    { name: '--sky', hex: '#9FD0FF', bg: 'bg-sky text-ink' },
    { name: '--white', hex: '#FFFFFF', bg: 'bg-white text-ink' },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink p-6 sm:p-12 space-y-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-[3px] border-ink p-8 rounded-[20px] bg-saffron shadow-hard-lg">
        <span className="text-sticker bg-white border-2 border-ink px-3 py-1 rounded-full shadow-hard-sm inline-block mb-3">
          Internal Dev Tool
        </span>
        <h1 className="text-h1">Neo-Brutalist Design Kit</h1>
        <p className="text-lead mt-2">
          Tokens, Typography, Buttons, Bento Tiles, Stickers, Forms & Shadows at 360px & 1440px.
        </p>
      </div>

      {/* 1. Color Tokens */}
      <section className="space-y-6">
        <h2 className="text-h2">1. Color Tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {tokens.map((t) => (
            <div
              key={t.name}
              className={`p-4 rounded-[14px] border-[3px] border-ink shadow-hard-sm ${t.bg} flex flex-col justify-between h-28`}
            >
              <span className="font-display font-black text-sm">{t.name}</span>
              <span className="font-mono text-xs font-bold">{t.hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography & Headlines with Highlighter */}
      <section className="space-y-6">
        <h2 className="text-h2">2. Typography</h2>
        <div className="p-8 border-[3px] border-ink rounded-[20px] bg-paper-2 shadow-hard-md space-y-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-ink/60">H1 Display with Highlighter</span>
            <h1 className="text-h1 mt-1">
              BUILT IN THE VALLEY.{' '}
              <HighlighterSwash>Made for your business.</HighlighterSwash>
            </h1>
          </div>

          <div>
            <span className="text-xs uppercase font-mono font-bold text-ink/60">H2 Section Heading</span>
            <h2 className="text-h2 mt-1">FAST SITES, CLEAR PRICES.</h2>
          </div>

          <div>
            <span className="text-xs uppercase font-mono font-bold text-ink/60">H3 Subhead</span>
            <h3 className="text-h3 mt-1">EVERY DETAIL MATTERS.</h3>
          </div>

          <div>
            <span className="text-xs uppercase font-mono font-bold text-ink/60">Outfit Body (17-18px)</span>
            <p className="text-body mt-1">
              Websites, SEO, branding, ads and software for Kashmir&apos;s businesses. Clear prices, fast delivery, built in Anantnag. Max 68 characters per line for calm legibility.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Buttons & Rotating Badge */}
      <section className="space-y-6">
        <h2 className="text-h2">3. Buttons & Badge</h2>
        <div className="flex flex-wrap items-center gap-6 p-8 border-[3px] border-ink rounded-[20px] bg-paper shadow-hard-md">
          <Button variant="saffron">Book a free call</Button>
          <Button variant="blue">See our work</Button>
          <Button variant="outline">Learn more</Button>
          <RotatingBadge />
        </div>
      </section>

      {/* 4. Stickers & Chips */}
      <section className="space-y-6">
        <h2 className="text-h2">4. Stickers</h2>
        <div className="flex flex-wrap items-center gap-4 p-8 border-[3px] border-ink rounded-[20px] bg-paper-2 shadow-hard-md">
          <Sticker color="saffron" rotate={-2} icon={<StickerIcon name="star" size={18} />}>
            Most Popular
          </Sticker>
          <Sticker color="chinar" rotate={1.5} icon={<StickerIcon name="chinar" size={18} />}>
            Made in Kashmir
          </Sticker>
          <Sticker color="mint" rotate={-1} icon={<StickerIcon name="sparkle" size={18} />}>
            Fast Delivery
          </Sticker>
          <Sticker color="sky" rotate={2} icon={<StickerIcon name="crocus" size={18} />}>
            Saffron Valley
          </Sticker>
          <Sticker color="almond" rotate={-2} icon={<StickerIcon name="apple" size={18} />}>
            Valley Exporter
          </Sticker>
          <Sticker color="white" rotate={1} icon={<StickerIcon name="bolt" size={18} />}>
            Free Discovery
          </Sticker>
        </div>
      </section>

      {/* 5. Bento Tiles (3px border, 20px radius, 6px shadow) */}
      <section className="space-y-6">
        <h2 className="text-h2">5. Bento Tiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Tile color="saffron" rotate={-1}>
            <Sticker color="white" className="mb-4">Feature</Sticker>
            <h3 className="text-h3 mb-2">TOURISM CMS</h3>
            <p className="text-body">Custom booking and tour management engine built for Kashmir operators.</p>
          </Tile>
          <Tile color="almond" rotate={1}>
            <Sticker color="paper" className="mb-4">Education</Sticker>
            <h3 className="text-h3 mb-2">KAALI EDGE</h3>
            <p className="text-body">Trust-first portal guiding Kashmiri students toward study abroad options.</p>
          </Tile>
          <Tile color="mint">
            <Sticker color="sky" className="mb-4">AI Software</Sticker>
            <h3 className="text-h3 mb-2">SMARTHIRE</h3>
            <p className="text-body">Structured AI recruiting platform built for unbiased multi-round candidate screening.</p>
          </Tile>
        </div>
      </section>

      {/* 6. Form Fields (3px ink border, 14px radius, 52px tall, hard shadow on focus) */}
      <section className="space-y-6">
        <h2 className="text-h2">6. Inputs & Forms</h2>
        <div className="p-8 border-[3px] border-ink rounded-[20px] bg-paper shadow-hard-md max-w-lg space-y-4">
          <div>
            <label className="font-display text-xs block mb-1.5 uppercase tracking-wider">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Farooq Ahmad"
              className="w-full h-[52px] px-4 rounded-[14px] border-[3px] border-ink bg-white text-ink text-base font-medium shadow-hard-sm focus:shadow-hard-md transition-shadow"
            />
          </div>
          <div>
            <label className="font-display text-xs block mb-1.5 uppercase tracking-wider">Phone / WhatsApp</label>
            <input
              type="tel"
              placeholder="+91 70060 00000"
              className="w-full h-[52px] px-4 rounded-[14px] border-[3px] border-ink bg-white text-ink text-base font-medium shadow-hard-sm focus:shadow-hard-md transition-shadow"
            />
          </div>
          <Button variant="saffron" className="w-full mt-2">Submit Enquiry</Button>
        </div>
      </section>
    </div>
  );
}
