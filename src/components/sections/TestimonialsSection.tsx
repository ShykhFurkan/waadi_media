import React from 'react';
import { testimonialsData } from '@/data/testimonials';
import { Container } from '@/components/layout/Container';
import { Sticker } from '@/components/ui/Sticker';
import { StickerIcon } from '@/components/illustrations/StickerSprite';

export function TestimonialsSection() {
  // Hard Rule: Never invent testimonials. Render nothing if data is empty.
  if (!testimonialsData || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 sm:py-36 bg-paper relative border-t-[3px] border-ink">
      <Container>
        <div className="inline-block mb-3">
          <Sticker color="almond" rotate={-1.5} icon={<StickerIcon name="sparkle" size={16} />}>
            Client Words
          </Sticker>
        </div>
        <h2 className="text-h2 text-ink mb-16">WHAT CLIENTS SAY.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((t) => (
            <div key={t.id} className="p-8 sm:p-10 bg-paper-2 border-[3px] border-ink rounded-[20px] shadow-hard-md">
              <p className="font-accent italic text-2xl text-ink mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <strong className="font-display font-black text-ink block text-lg uppercase">{t.name}</strong>
                <span className="text-sm font-medium text-ink/75">{t.business}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
