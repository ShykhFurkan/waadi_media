import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Sticker } from '@/components/ui/Sticker';
import { StickerIcon, StickerIconName } from '@/components/illustrations/StickerSprite';

export function IndustriesSection() {
  const industries: {
    name: string;
    desc: string;
    href: string;
    linkText: string;
    icon: StickerIconName;
    color: string;
    rotate: number;
  }[] = [
    {
      name: 'Tourism & Hospitality',
      desc: 'Hotels, houseboats, tour operators, and private transport.',
      href: '/work/wonder-delight-tours-travels',
      linkText: 'Wonder Delight Case Study',
      icon: 'crocus',
      color: 'bg-saffron',
      rotate: -1.5,
    },
    {
      name: 'Higher Education',
      desc: 'Consultancies, institutes, international student advisories.',
      href: '/work/kaali-edge',
      linkText: 'Kaali Edge Case Study',
      icon: 'blossom',
      color: 'bg-almond',
      rotate: 1,
    },
    {
      name: 'Horticulture & Agriculture',
      desc: 'Apple growers, saffron producers, dry fruit exporters, cold stores.',
      href: '/services/ecommerce-websites',
      linkText: 'E-commerce for Sellers',
      icon: 'apple',
      color: 'bg-chinar',
      rotate: -1,
    },
    {
      name: 'Handicrafts & Heritage',
      desc: 'Pashmina, artisanal carpets, wood carving, papier-mâché.',
      href: '/services/ecommerce-websites',
      linkText: 'Online Store Design',
      icon: 'chinar',
      color: 'bg-mint',
      rotate: 1.5,
    },
    {
      name: 'Software Startups',
      desc: 'Early-stage founders building scalable web apps and platforms.',
      href: '/work/smarthire',
      linkText: 'SmartHire Software Demo',
      icon: 'bolt',
      color: 'bg-sky',
      rotate: -1.5,
    },
  ];

  return (
    <section id="industries" className="py-24 sm:py-36 bg-paper relative border-t-[3px] border-ink">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-block mb-3">
            <Sticker color="sky" rotate={-1} icon={<StickerIcon name="chinar" size={16} />}>
              Sectors
            </Sticker>
          </div>
          <h2 className="text-h2 text-ink">
            BUILT FOR KASHMIR&apos;S BUSINESSES.
          </h2>
          <p className="text-lead mt-2">
            Every valley sector has distinct commercial rhythms, payment patterns, and customer trust signals.
          </p>
        </div>

        {/* Wrapped Row of Chunky Pills with Icons */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 items-stretch">
          {industries.map((ind) => (
            <Link
              key={ind.name}
              href={ind.href}
              style={{ '--ind-rotate': `${ind.rotate}deg` } as React.CSSProperties}
              className={`p-5 sm:p-7 rounded-[20px] border-[3px] border-ink ${ind.color} text-ink shadow-hard-sm sm:shadow-hard-md hover:shadow-hard-lg hover:scale-105 transition-all flex flex-col justify-between w-full sm:w-auto sm:max-w-sm sm:flex-1 sm:min-w-[280px] rotate-0 sm:[transform:rotate(var(--ind-rotate))]`}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full border-2 border-ink bg-white flex items-center justify-center shadow-hard-sm">
                    <StickerIcon name={ind.icon} size={22} />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-ink uppercase">
                    {ind.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-ink/85 mb-4">
                  {ind.desc}
                </p>
              </div>

              <div className="inline-flex items-center gap-1 font-display font-black text-xs uppercase underline decoration-2 underline-offset-2">
                <span>{ind.linkText}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
