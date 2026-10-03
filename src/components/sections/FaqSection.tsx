import React from 'react';
import { mainFaqs } from '@/data/faqs';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFaqPageSchema } from '@/lib/seo';

export function FaqSection() {
  // Top 6 FAQs per Section 10.1
  const homeFaqs = mainFaqs.slice(0, 6);

  const accordionItems = homeFaqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
  }));

  const faqSchema = getFaqPageSchema(homeFaqs);

  return (
    <section className="py-20 md:py-28 bg-snow border-t border-line">
      {/* FAQPage JSON-LD schema per Section 8.4 */}
      <JsonLd data={faqSchema} />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-h2 text-ink mb-4">Frequently asked questions.</h2>
          <p className="text-lead text-mist">
            Clear answers about pricing, turnaround times, and ownership.
          </p>
        </div>

        <div className="max-w-3xl">
          <Accordion items={accordionItems} />
        </div>
      </div>
    </section>
  );
}
