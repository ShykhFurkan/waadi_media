import React from 'react';
import { mainFaqs } from '@/data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFaqPageSchema } from '@/lib/seo';
import { Container } from '@/components/layout/Container';
import { Sticker } from '@/components/ui/Sticker';
import { StickerIcon } from '@/components/illustrations/StickerSprite';

export function FaqSection() {
  const homeFaqs = mainFaqs.slice(0, 6);

  const accordionItems = homeFaqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  const faqSchema = getFaqPageSchema(homeFaqs);

  return (
    <section id="faq" className="py-24 sm:py-36 bg-paper relative border-t-[3px] border-ink">
      {/* FAQPage JSON-LD schema preserved */}
      <JsonLd data={faqSchema} />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Heading & lead */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-block mb-3">
              <Sticker color="saffron" rotate={-2} icon={<StickerIcon name="sparkle" size={16} />}>
                Questions
              </Sticker>
            </div>
            <h2 className="text-h2 text-ink mb-4">
              FREQUENTLY ASKED QUESTIONS.
            </h2>
            <p className="text-lead max-w-md font-medium">
              Clear answers about pricing, turnaround times, payments, and complete IP ownership.
            </p>
          </div>

          {/* Right Column (7 cols): Accordion with rotating plus sticker */}
          <div className="lg:col-span-7">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}
