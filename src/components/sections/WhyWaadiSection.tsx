import React from 'react';

export function WhyWaadiSection() {
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

  return (
    <section className="py-20 md:py-28 bg-snow border-t border-line">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Heading */}
          <div className="lg:col-span-5 sticky top-28">
            <h2 className="text-h2 text-ink leading-tight text-balance">
              A local agency that speaks your language.
            </h2>
          </div>

          {/* Right Column (7 cols): Four plain statements separated by dividers */}
          <div className="lg:col-span-7">
            {points.map((point, index) => (
              <div key={index}>
                <div className="py-8 first:pt-0 last:pb-0">
                  <h3 className="text-xl font-sans font-semibold text-ink mb-2">
                    {point.title}
                  </h3>
                  <p className="text-body text-graphite max-w-xl">
                    {point.text}
                  </p>
                </div>
                {index < points.length - 1 && <hr className="border-t border-line" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
