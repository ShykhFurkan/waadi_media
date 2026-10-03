import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { projectsData } from '@/data/projects';
import { formatStartingPrice } from '@/data/pricing';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFaqPageSchema, getBreadcrumbSchema } from '@/lib/seo';
import { MessageCircle } from 'lucide-react';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Web Design Agency in Anantnag - Waadi Media',
  description:
    'Waadi Media is based in Anantnag. Websites, branding, SEO and ads for local businesses at clear prices.',
  alternates: {
    canonical: '/web-design-agency-anantnag',
  },
  openGraph: {
    title: 'Web Design Agency in Anantnag - Waadi Media',
    description:
      'Waadi Media is based in Anantnag. Websites, branding, SEO and ads for local businesses at clear prices.',
    url: '/web-design-agency-anantnag',
  },
};

const anantnagFaqs = [
  {
    q: 'Where exactly is Waadi Media located in Anantnag?',
    a: 'We are based right here in Anantnag, Jammu & Kashmir. You can view our exact registered location on Google Maps below. Being local means you can sit down with us in person to plan your project, review prototypes, and get direct technical support.',
  },
  {
    q: 'Can you help apple growers and cold stores in South Kashmir set up digital wholesale catalogues?',
    a: 'Yes. South Kashmir is India’s premier apple belt. We build clean B2B digital catalogues and inquiry portals that allow growers, cold atmosphere (CA) storage operators, and fruit merchants to present their grades, varieties, and packaging to wholesale buyers across India without relying solely on middlemen.',
  },
  {
    q: 'What is the most affordable way for an Anantnag retail shop to get online?',
    a: 'Our single-page landing page starts from ₹5,000. It includes your business story, photo gallery, location directions, operating hours, and a direct WhatsApp button so local customers can message you directly from their phones.',
  },
  {
    q: 'Do you offer hands-on training for our staff in Anantnag?',
    a: 'Yes. Every website or e-commerce store we deliver includes a dedicated in-person training walkthrough. We show you how to update photos, add new products, check customer inquiries, and manage your Google Business Profile.',
  },
  {
    q: 'Can our website accept payments via UPI apps like Google Pay and PhonePe?',
    a: 'Yes. We configure domestic payment gateways supporting instant UPI, credit cards, debit cards, and net banking so your customers enjoy frictionless checkout.',
  },
];

export default function AnantnagLocalPage() {
  const faqSchema = getFaqPageSchema(
    anantnagFaqs.map((f) => ({ question: f.q, answer: f.a }))
  );

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Web Design Agency in Anantnag', url: '/web-design-agency-anantnag' },
  ]);

  const relevantServices = servicesData.filter((s) =>
    ['website-design-development', 'ecommerce-websites', 'seo'].includes(s.slug)
  );

  const featuredCaseStudy = projectsData.find((p) => p.slug === 'wonder-delight-tours-travels') || projectsData[0];

  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbsSchema} />

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 space-y-16 md:space-y-20">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-mist font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-blue transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Web design agency in Anantnag</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-3xl space-y-6">
          <span className="text-xs uppercase tracking-wider text-blue font-semibold block">
            Hometown Digital Agency &bull; Anantnag, Jammu &amp; Kashmir
          </span>
          <h1 className="text-h1 text-ink">
            Web design agency in Anantnag
          </h1>
          <p className="text-lead text-graphite leading-relaxed">
            Waadi Media is based right here in Anantnag. We know the market, the shops, orchards and offices, and we&apos;re close enough to meet in person when it helps.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button href="/book-a-call" variant="primary">
              Book a free call
            </Button>
            <a
              href={whatsappLink(defaultWhatsAppMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper border border-line text-sm font-medium text-graphite hover:border-whatsapp hover:text-whatsapp transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-whatsapp" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Narrative Section: The Hometown Story & South Kashmir Economy */}
        <div className="border-t border-line pt-12 space-y-8">
          <h2 className="text-h2 text-ink">
            Our hometown story: Digital craftsmanship rooted in South Kashmir
          </h2>

          <div className="space-y-6 text-body text-graphite leading-relaxed">
            <p>
              Anantnag (Islamabad) is South Kashmir&apos;s commercial capital and economic powerhouse. From the bustling retail corridors of KP Road, Reshi Bazar, and Janglat Mandi, to the expanding industrial clusters, diagnostic laboratories, and schools across Dialgam, Mattan, and Khanabal, Anantnag has always been a town driven by trade and enterprise.
            </p>
            <p>
              Beyond the city center, the district forms the backbone of Kashmir&apos;s agricultural wealth. Hundreds of apple orchards, walnut producers, controlled-atmosphere cold storages, trout farms in Kokernag, and world-renowned willow cricket bat makers in Sangam and Halmulla produce world-class products. Yet, for years, the digital tools available to local businesses were either non-existent or overpriced.
            </p>
            <p>
              Local entrepreneurs were forced to choose between inexperienced hobbyists who built slow, broken WordPress sites, or agencies in Delhi and Mumbai that charged excessive fees and had no understanding of South Kashmir&apos;s reality.
            </p>
            <p>
              Waadi Media was founded right here in Anantnag to change that narrative. We are proud of our hometown. When you partner with us, you are not speaking to a detached helpdesk or an overseas freelancer; you are collaborating directly with local engineers who live in your community, understand your commercial pressures, and take personal pride in every project launched.
            </p>
          </div>
        </div>

        {/* Why Having a Local Agency Matters in Anantnag */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              Why an Anantnag-based agency makes a tangible difference
            </h2>
            <p className="text-lead text-mist mt-1">
              Four concrete advantages of partnering with a digital agency right down the road.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Face-to-Face Accountability</h3>
              <p className="text-sm text-graphite leading-relaxed">
                When you invest in your business&apos;s digital infrastructure, trust is everything. Being located in Anantnag means we can meet in person to review wireframes, understand your product line, and deliver hands-on training to your team.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Horticulture &amp; B2B Wholesale Catalogues</h3>
              <p className="text-sm text-graphite leading-relaxed">
                Whether you operate a cold store along NH-44 or package premium walnut kernels, we build clean, verified product catalogues that showcase your certifications, harvest dates, and bulk ordering specifications to buyers nationwide.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Mobile Performance on Local Networks</h3>
              <p className="text-sm text-graphite leading-relaxed">
                We know how network speeds fluctuate across South Kashmir. We engineer websites using modern static rendering and minimal CSS, ensuring your website loads in under 1.5 seconds even on modest 4G connections.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Published, Transparent Pricing</h3>
              <p className="text-sm text-graphite leading-relaxed">
                We do not quote arbitrary prices based on who is asking. Our website design starts at ₹5,000 for landing pages and ₹15,000 for full five-page business websites. Every scope is committed in writing with zero surprise charges.
              </p>
            </div>
          </div>
        </div>

        {/* Relevant Services with Pricing */}
        <div className="border-t border-line pt-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-h2 text-ink">
                Popular services for Anantnag enterprises
              </h2>
              <p className="text-lead text-mist mt-1">
                From simple local business profiles to comprehensive e-commerce stores.
              </p>
            </div>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-blue hover:text-blue-deep transition-colors whitespace-nowrap"
            >
              See all prices
            </Link>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {relevantServices.map((service) => (
              <div
                key={service.slug}
                className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="max-w-xl">
                  <h3 className="text-xl font-sans font-semibold text-ink mb-1">
                    <Link href={`/services/${service.slug}`} className="hover:text-blue transition-colors">
                      {service.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-mist">
                    {service.shortLine}
                  </p>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <span className="text-price text-graphite tabular-numbers">
                    {formatStartingPrice(service.startingPrice, service.priceUnit)}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold px-4 py-2 rounded-full border border-line hover:border-blue hover:text-blue transition-colors"
                  >
                    View service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Case Study: Wonder Delight Tours & Travels */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              Case study: Transforming local tourism inquiries
            </h2>
            <p className="text-lead text-mist mt-1">
              How we built a high-converting digital platform for a valley tour operator.
            </p>
          </div>

          <div className="p-8 bg-paper border border-line rounded-3xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-wider text-blue font-semibold">
                {featuredCaseStudy.sector}
              </span>
              <span className="text-xs text-mist">
                {featuredCaseStudy.services.join(' &bull; ')}
              </span>
            </div>

            <h3 className="text-2xl font-sans font-bold text-ink">
              {featuredCaseStudy.name}: {featuredCaseStudy.summary}
            </h3>

            <p className="text-body text-graphite leading-relaxed">
              Wonder Delight Tours &amp; Travels needed to reach domestic travellers planning trips to Pahalgam, Gulmarg, and Sonamarg. We replaced their reliance on third-party portals with a custom, lightning-fast website featuring interactive tour packages, transparent seasonal itineraries, and instant WhatsApp booking triggers. The result was a dramatic increase in direct, high-value inquiries.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/work/${featuredCaseStudy.slug}`}
                className="text-sm font-semibold px-5 py-2.5 rounded-full bg-blue text-white hover:bg-blue-deep transition-colors"
              >
                Read full case study
              </Link>
              <a
                href={featuredCaseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-graphite hover:text-ink transition-colors"
              >
                Visit live website &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Local FAQ Section */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              Frequently asked questions in Anantnag
            </h2>
            <p className="text-lead text-mist mt-1">
              Practical answers for local business owners in South Kashmir.
            </p>
          </div>

          <Accordion
            items={anantnagFaqs.map((f, idx) => ({
              id: `anantnag-faq-${idx}`,
              question: f.q,
              answer: f.a,
            }))}
          />
        </div>

        {/* Real Embedded Google Map Section */}
        <div className="border-t border-line pt-12 space-y-6">
          <div>
            <h2 className="text-h2 text-ink">
              Visit our registered location in Anantnag
            </h2>
            <p className="text-lead text-mist mt-1">
              Located right here in Anantnag, Jammu &amp; Kashmir. Feel free to connect for a scheduled in-person meeting.
            </p>
          </div>

          <div className="w-full overflow-hidden rounded-[28px] border border-line bg-paper shadow-floating">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.8970439720943!2d75.21139585007596!3d33.7374783179307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e20f9f983cb67d%3A0x91ab9d8edfdc7d2d!2sWaadi%20media!5e0!3m2!1sen!2sin!4v1791025594229!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Waadi Media registered location in Anantnag"
              className="w-full h-[380px]"
            />
          </div>
        </div>

        {/* CTA Band */}
        <div className="pt-8 border-t border-line">
          <div className="p-8 sm:p-12 bg-paper border border-line rounded-3xl text-center space-y-4 shadow-floating">
            <h2 className="text-h2 text-ink">
              Let&apos;s build something great for your Anantnag business
            </h2>
            <p className="text-lead text-mist max-w-lg mx-auto">
              Schedule a free 20-minute call or drop us a message on WhatsApp. We will help you choose the right digital strategy without any high-pressure sales talk.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button href="/book-a-call" variant="primary">
                Book a free call
              </Button>
              <Button href="/pricing" variant="secondary">
                View all pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
