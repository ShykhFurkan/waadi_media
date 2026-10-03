import React from 'react';
import { testimonialsData } from '@/data/testimonials';

export function TestimonialsSection() {
  // Hard Rule 1: Never invent testimonials. Render only if testimonialsData has entries; otherwise hide the whole section.
  if (!testimonialsData || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-snow border-t border-line">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <h2 className="text-h2 text-ink mb-12">What clients say.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((t) => (
            <div key={t.id} className="p-8 bg-paper border border-line rounded-2xl">
              <p className="text-body text-graphite mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <strong className="text-ink block">{t.name}</strong>
                <span className="text-sm text-mist">{t.business}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
