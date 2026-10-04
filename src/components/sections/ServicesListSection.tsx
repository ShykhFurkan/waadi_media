import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { formatStartingPrice } from '@/data/pricing';
import { Sticker } from '@/components/ui/Sticker';
import { Container } from '@/components/layout/Container';
import { StickerIcon, StickerIconName } from '@/components/illustrations/StickerSprite';

export function ServicesListSection() {
  const tileColors = [
    'paper-2',
    'sky',
    'mint',
    'saffron',
    'almond',
    'paper',
    'chinar',
    'sky',
  ] as const;

  const iconList: StickerIconName[] = [
    'star',
    'apple',
    'sparkle',
    'chinar',
    'blossom',
    'cloud',
    'bolt',
    'crocus',
  ];

  const rotations = [-1, 1, 1.5, -1.5, 1, -1, 1.5, -1];

  return (
    <section id="services" className="py-24 sm:py-32 bg-paper relative border-t-[3px] border-ink">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-block mb-3">
              <Sticker color="saffron" rotate={-2} icon={<StickerIcon name="bolt" size={16} />}>
                Capabilities
              </Sticker>
            </div>
            <h2 className="text-h2 text-ink">
              EVERYTHING YOUR BUSINESS NEEDS ONLINE.
            </h2>
            <p className="text-lead mt-2">
              Pick one service or let us handle the lot. Fixed scopes, fast delivery.
            </p>
          </div>
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 font-display font-black text-base uppercase underline decoration-[3px] underline-offset-4 hover:text-chinar transition-colors"
            >
              <span>See all 8 services</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 8-Tile Bento Grid of Mixed Sizes and Fills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => {
            const color = tileColors[index % tileColors.length];
            const icon = iconList[index % iconList.length];
            const rotate = rotations[index % rotations.length];

            const colorBgClasses = {
              paper: 'bg-paper',
              'paper-2': 'bg-paper-2',
              sky: 'bg-sky',
              mint: 'bg-mint',
              saffron: 'bg-saffron',
              almond: 'bg-almond',
              chinar: 'bg-chinar',
              white: 'bg-white',
              blue: 'bg-blue',
            }[color];

            const isColSpan2 = index === 0 || index === 6;

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                style={{ transform: `rotate(${rotate}deg)` }}
                className={`tile-neo ${colorBgClasses} text-ink p-7 sm:p-8 rounded-[20px] border-[3px] border-ink shadow-hard-md hover:shadow-hard-lg hover:scale-[1.02] transition-all flex flex-col justify-between ${
                  isColSpan2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Top row: Icon Sticker + Price Sticker */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="w-12 h-12 rounded-full border-[3px] border-ink bg-white flex items-center justify-center shadow-hard-sm">
                      <StickerIcon name={icon} size={24} />
                    </div>

                    <Sticker color="white" rotate={1.5}>
                      From {formatStartingPrice(service.startingPrice, service.priceUnit)}
                    </Sticker>
                  </div>

                  <h3 className="text-h3 text-ink mb-3 group-hover:underline">
                    {service.name}
                  </h3>

                  <p className="text-body font-medium text-ink/85">
                    {service.shortLine}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t-2 border-ink/20 flex items-center justify-between font-display font-black text-xs uppercase tracking-wider">
                  <span>Explore Service</span>
                  <span className="text-base">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
