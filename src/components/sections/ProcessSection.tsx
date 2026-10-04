import React from 'react';
import { Container } from '@/components/layout/Container';
import { Sticker } from '@/components/ui/Sticker';
import { RiverRibbon } from '@/components/illustrations/RiverRibbon';
import { StickerIcon } from '@/components/illustrations/StickerSprite';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'We talk.',
      desc: 'A free 20-minute call. You tell us about your business, what you need, and the goals you want to hit.',
      color: 'bg-paper',
      rotate: -1,
    },
    {
      num: '02',
      title: 'We plan.',
      desc: 'You get a clear scope, a fixed price and a timeline in writing. No vague estimates, no hidden extras.',
      color: 'bg-paper-2',
      rotate: 1,
    },
    {
      num: '03',
      title: 'We build.',
      desc: 'You see progress along the way and share feedback easily. Fast iterations with direct access to the builder.',
      color: 'bg-mint',
      rotate: -1,
    },
    {
      num: '04',
      title: 'We launch and grow.',
      desc: 'We go live, train you and your team, and stay on hand for technical support, maintenance, and growth.',
      color: 'bg-sky',
      rotate: 1,
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-36 bg-paper relative border-t-[3px] border-ink overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-block mb-3">
            <Sticker color="mint" rotate={-1.5} icon={<StickerIcon name="sparkle" size={16} />}>
              Process
            </Sticker>
          </div>
          <h2 className="text-h2 text-ink">
            HOW A PROJECT WORKS.
          </h2>
          <p className="text-lead mt-2">
            From our first conversation to launch and long-term momentum. Simple steps, zero surprises.
          </p>
        </div>

        {/* Process Bento Tiles connected by the River Ribbon */}
        <div className="relative">
          {/* Horizontal River Ribbon connecting tiles on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 -z-0">
            <RiverRibbon variant="horizontal" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step) => (
              <div
                key={step.num}
                style={{ transform: `rotate(${step.rotate}deg)` }}
                className={`tile-neo ${step.color} text-ink p-7 sm:p-8 rounded-[20px] border-[3px] border-ink shadow-hard-md hover:shadow-hard-lg flex flex-col justify-between`}
              >
                <div>
                  {/* Number Badge (the only numbered section per brief) */}
                  <div className="w-14 h-14 rounded-full border-[3px] border-ink bg-saffron flex items-center justify-center font-display font-black text-2xl shadow-hard-sm mb-6">
                    {step.num}
                  </div>

                  <h3 className="font-display text-2xl font-black text-ink uppercase mb-3">
                    {step.title}
                  </h3>

                  <p className="text-body font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t-2 border-ink/20">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink/75">
                    Step {step.num} of 04
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
