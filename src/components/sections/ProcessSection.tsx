import React from 'react';
import { Container } from '@/components/layout/Container';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'We talk.',
      desc: 'A free 20-minute call. You tell us about your business, what you need, and the goals you want to hit.',
    },
    {
      num: '02',
      title: 'We plan.',
      desc: 'You get a clear scope, a fixed price and a timeline in writing. No vague estimates, no hidden extras.',
    },
    {
      num: '03',
      title: 'We build.',
      desc: 'You see progress along the way and share feedback easily. Fast iterations with direct access to the builder.',
    },
    {
      num: '04',
      title: 'We launch and grow.',
      desc: 'We go live, train you and your team, and stay on hand for technical support, maintenance, and growth.',
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-36 bg-snow border-t border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Sticky Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs uppercase tracking-widest text-mist font-semibold block mb-3">
              Process
            </span>
            <h2 className="text-h2 text-ink mb-4">
              How a project works.
            </h2>
            <p className="text-lead text-graphite max-w-md">
              From our first conversation to launch and long-term momentum. Simple steps, zero surprises.
            </p>
          </div>

          {/* Right Column (7 cols): Vertical Timeline with Saffron Progress Hairline */}
          <div className="lg:col-span-7 relative pl-8 sm:pl-12">
            {/* Background hairline */}
            <div
              className="absolute left-2.5 sm:left-3.5 top-3 bottom-8 w-[1px] bg-line"
              aria-hidden="true"
            />

            {/* Saffron filling hairline (CSS scroll-driven where supported, full fallback) */}
            <div
              className="absolute left-2.5 sm:left-3.5 top-3 bottom-8 w-[1px] bg-saffron origin-top transition-transform duration-300"
              style={{
                transform: 'scaleY(1)',
              }}
              aria-hidden="true"
            />

            {/* Sequential Steps (the only numbered section per brief) */}
            <div className="space-y-12 sm:space-y-20">
              {steps.map((step) => (
                <div key={step.num} className="relative group">
                  {/* Timeline Node Dot */}
                  <div
                    className="absolute -left-8 sm:-left-12 top-1.5 w-6 h-6 rounded-full bg-paper border border-line flex items-center justify-center text-xs font-mono text-saffron transition-colors group-hover:border-saffron"
                    aria-hidden="true"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-saffron" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-mist font-medium uppercase tracking-widest block">
                      {step.num}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink">
                      {step.title}
                    </h3>
                    <p className="text-body text-graphite max-w-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
