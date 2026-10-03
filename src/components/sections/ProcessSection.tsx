import React from 'react';

export function ProcessSection() {
  const steps = [
    {
      num: '1',
      title: 'We talk.',
      desc: 'A free 20-minute call. You tell us about your business and goals.',
    },
    {
      num: '2',
      title: 'We plan.',
      desc: 'You get a clear scope, a fixed price and a timeline in writing.',
    },
    {
      num: '3',
      title: 'We build.',
      desc: 'You see progress along the way and share feedback easily.',
    },
    {
      num: '4',
      title: 'We launch and grow.',
      desc: 'We go live, train you, and stay on hand for support and marketing.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-snow border-t border-line">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-14">
          <h2 className="text-h2 text-ink">How a project works.</h2>
        </div>

        {/* 4 Sequential Steps (the only section with numbered markers per Section 6.2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 bg-paper border border-line rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-4xl text-blue/40 font-light block mb-4">
                  0{step.num}
                </span>
                <h3 className="text-xl font-sans font-semibold text-ink mb-2">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-graphite leading-relaxed mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
