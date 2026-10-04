import React from 'react';
import { Container } from '@/components/layout/Container';

export function WhyWaadiSection() {
  const editorialStatement =
    'A local agency that speaks your language — built on craft, clear pricing, and deep valley context.';

  const points = [
    {
      title: 'We understand Kashmir.',
      text: 'We know your customers, your seasons and your market, because we live here.',
    },
    {
      title: 'We keep it simple.',
      text: "No jargon and no long reports you don't need. We tell you what matters and what happens next.",
    },
    {
      title: 'Prices you can see.',
      text: "Our starting prices are on this site. You'll know the cost before you call.",
    },
    {
      title: 'We work fast.',
      text: 'Small team, direct line to the person building your project, quick answers.',
    },
  ];

  const words = editorialStatement.split(' ');

  return (
    <section id="why-waadi" className="py-24 sm:py-36 bg-snow border-t border-line">
      <Container>
        {/* Section Label */}
        <span className="text-xs uppercase tracking-widest text-mist font-semibold block mb-8">
          Why Waadi
        </span>

        {/* Large Editorial Statement (~3rem Cormorant) with scroll-driven opacity */}
        <div className="max-w-5xl mb-20 sm:mb-28">
          <p className="font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] font-normal leading-[1.12] text-ink text-balance tracking-tight">
            {words.map((word, idx) => (
              <span
                key={idx}
                className="inline-block mr-[0.26em] scroll-word-opacity transition-opacity duration-300"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Below: Four statements in two columns with hairline dividers */}
        <div className="border-t border-line grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line">
          {/* Column 1: Items 0 and 1 */}
          <div className="divide-y divide-line pr-0 md:pr-12">
            {points.slice(0, 2).map((point, index) => (
              <div key={index} className="py-8 sm:py-10 first:pt-8 last:pb-8">
                <span className="text-xs font-mono text-mist font-medium uppercase tracking-widest block mb-2">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-2xl font-medium text-ink mb-2">
                  {point.title}
                </h3>
                <p className="text-body text-graphite leading-relaxed">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          {/* Column 2: Items 2 and 3 */}
          <div className="divide-y divide-line pl-0 md:pl-12">
            {points.slice(2, 4).map((point, index) => (
              <div key={index} className="py-8 sm:py-10 first:pt-8 last:pb-8">
                <span className="text-xs font-mono text-mist font-medium uppercase tracking-widest block mb-2">
                  0{index + 3}
                </span>
                <h3 className="font-serif text-2xl font-medium text-ink mb-2">
                  {point.title}
                </h3>
                <p className="text-body text-graphite leading-relaxed">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
