import React from 'react';
import { mainFaqs } from '@/data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFaqPageSchema } from '@/lib/seo';
import { Container } from '@/components/layout/Container';

export function FaqSection() {
  const homeFaqs = mainFaqs.slice(0, 6);

  const accordionItems = homeFaqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  const faqSchema = getFaqPageSchema(homeFaqs);

  return (
    <section id="faq" className="py-24 sm:py-36 bg-snow border-t border-line">
      {/* FAQPage JSON-LD schema */}
      <JsonLd data={faqSchema} />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Heading & lead */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs uppercase tracking-widest text-mist font-semibold block mb-3">
              FAQ
            </span>
            <h2 className="text-h2 text-ink mb-4">
              Frequently asked questions.
            </h2>
            <p className="text-lead text-graphite max-w-md">
              Clear answers about pricing, turnaround times, payments, and complete IP ownership.
            </p>
          </div>

          {/* Right Column (7 cols): Accordion */}
          <div className="lg:col-span-7">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}
