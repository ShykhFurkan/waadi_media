import React from 'react';
import { Container } from '@/components/layout/Container';
import { Sticker } from '@/components/ui/Sticker';
import { HighlighterSwash } from '@/components/ui/HighlighterSwash';
import { StickerIcon } from '@/components/illustrations/StickerSprite';

export function WhyWaadiSection() {
  const points = [
    {
      num: '01',
      title: 'We understand Kashmir.',
      text: 'We know your customers, your seasons and your market, because we live here.',
      color: 'bg-paper-2',
      rotate: -1.5,
      icon: 'chinar' as const,
    },
    {
      num: '02',
      title: 'We keep it simple.',
      text: "No jargon and no long reports you don't need. We tell you what matters and what happens next.",
      color: 'bg-saffron',
      rotate: 1,
      icon: 'sparkle' as const,
    },
    {
      num: '03',
      title: 'Prices you can see.',
      text: "Our starting prices are on this site. You'll know the cost before you call.",
      color: 'bg-mint',
      rotate: -1,
      icon: 'star' as const,
    },
    {
      num: '04',
      title: 'We work fast.',
      text: 'Small team, direct line to the person building your project, quick answers.',
      color: 'bg-sky',
      rotate: 1.5,
      icon: 'bolt' as const,
    },
  ];

  return (
    <section id="why-waadi" className="py-24 sm:py-36 bg-paper relative border-t-[3px] border-ink">
      <Container>
        {/* Section Sticker */}
        <div className="inline-block mb-6">
          <Sticker color="chinar" rotate={-1.5} icon={<StickerIcon name="chinar" size={16} />}>
            Why Waadi
          </Sticker>
        </div>

        {/* One Giant Statement with Saffron Highlighter Swashes */}
        <div className="max-w-5xl mb-16 sm:mb-24">
          <h2 className="text-h1 text-ink leading-tight">
            A LOCAL AGENCY THAT SPEAKS YOUR LANGUAGE —{' '}
            <HighlighterSwash>built on craft, clear prices,</HighlighterSwash>{' '}
            AND DEEP VALLEY CONTEXT.
          </h2>
        </div>

        {/* Four Bento Tiles: single column on mobile, tilted on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {points.map((point) => (
            <div
              key={point.num}
              style={{ '--tile-rotate': `${point.rotate}deg` } as React.CSSProperties}
              className={`tile-neo ${point.color} text-ink p-5 sm:p-10 rounded-[20px] border-[3px] border-ink shadow-hard-sm sm:shadow-hard-md hover:shadow-hard-lg transition-transform rotate-0 sm:[transform:rotate(var(--tile-rotate))]`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-black text-2xl text-ink">
                  {point.num}
                </span>
                <div className="w-10 h-10 rounded-full border-2 border-ink bg-white flex items-center justify-center shadow-hard-sm">
                  <StickerIcon name={point.icon} size={20} />
                </div>
              </div>

              <h3 className="font-display text-2xl font-black text-ink uppercase mb-2">
                {point.title}
              </h3>
              <p className="text-body font-medium leading-relaxed">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
