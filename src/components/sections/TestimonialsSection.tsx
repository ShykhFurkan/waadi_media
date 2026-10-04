import React from 'react';
import { testimonialsData } from '@/data/testimonials';
import { Container } from '@/components/layout/Container';

export function TestimonialsSection() {
  // Hard Rule: Never invent testimonials. Render nothing if data is empty.
  if (!testimonialsData || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 sm:py-36 bg-snow border-t border-line">
      <Container>
        <span className="text-xs uppercase tracking-widest text-mist font-semibold block mb-3">
          Client Feedback
        </span>
        <h2 className="text-h2 text-ink mb-16">What clients say.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((t) => (
            <div key={t.id} className="p-8 sm:p-10 bg-paper border border-line rounded-[28px]">
              <p className="font-serif italic text-xl text-graphite mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <strong className="text-ink font-medium block">{t.name}</strong>
                <span className="text-sm text-mist">{t.business}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
