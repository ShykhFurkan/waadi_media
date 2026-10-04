export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category?: 'general' | 'pricing' | 'process' | 'technical';
};

export const mainFaqs: FAQItem[] = [
  {
    id: 'cost',
    question: 'How much does a website cost?',
    answer:
      'A landing page starts at ₹5,000 and a 5-page business website at ₹15,000. The final price depends on your pages and features. We give you a fixed price in writing before we start.',
    category: 'pricing',
  },
  {
    id: 'timeline',
    question: 'How long does it take?',
    answer:
      'Typical times: landing page 3 to 5 days, business website 2 to 3 weeks, online store 3 to 5 weeks.',
    category: 'process',
  },
  {
    id: 'location',
    question: 'Do you only work with businesses in Kashmir?',
    answer:
      'No. We are based in Anantnag and work mostly with Kashmir businesses, but we serve clients across India.',
    category: 'general',
  },
  {
    id: 'payments',
    question: 'How do payments work?',
    answer:
      'For one-time projects, 50% to start and 50% on delivery. For software and apps, payment is split into milestones agreed in writing. Monthly services are billed at the start of each month.',
    category: 'pricing',
  },
  {
    id: 'updates',
    question: 'Can I update the website myself later?',
    answer:
      'Yes. For sites with a CMS we train you. You can also choose a maintenance plan and we do updates for you.',
    category: 'technical',
  },
  {
    id: 'ownership',
    question: 'Who owns the website?',
    answer:
      'You do. Once the project is paid in full, you own your domain, website code, content and accounts.',
    category: 'general',
  },
  {
    id: 'ads',
    question: 'Do you run ads too?',
    answer:
      'Yes, on Google, Facebook and Instagram. Ad spend is paid by you directly to the platform.',
    category: 'general',
  },
  {
    id: 'non-technical',
    question: "I'm not technical. Is that okay?",
    answer:
      "Yes, that's who we work best with. We explain everything in simple words and only share what you need to know.",
    category: 'general',
  },
  {
    id: 'gst',
    question: 'Are prices inclusive of GST?',
    answer:
      'Starting prices quoted are net service fees. Any applicable GST or statutory taxes are stated clearly before project sign-off.',
    category: 'pricing',
  },
];
