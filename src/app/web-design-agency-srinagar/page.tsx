import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { projectsData } from '@/data/projects';
import { formatStartingPrice } from '@/data/pricing';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { OutboundLink } from '@/components/ui/OutboundLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFaqPageSchema, getBreadcrumbSchema } from '@/lib/seo';
import { MessageCircle } from 'lucide-react';
import { defaultWhatsAppMessages, whatsappLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Web Design Agency in Srinagar - Waadi Media',
  description:
    'Websites, SEO and marketing for Srinagar businesses, from a Kashmiri agency that keeps things simple.',
  alternates: {
    canonical: '/web-design-agency-srinagar',
  },
  openGraph: {
    title: 'Web Design Agency in Srinagar - Waadi Media',
    description:
      'Websites, SEO and marketing for Srinagar businesses, from a Kashmiri agency that keeps things simple.',
    url: '/web-design-agency-srinagar',
  },
};

const srinagarFaqs = [
  {
    q: 'Do you have a physical office in Srinagar?',
    a: 'No. Our registered base is in Anantnag, but we work with clients across Srinagar every week. Because we are local to the valley, we coordinate in-person meetings in Srinagar for project kickoffs, or connect conveniently over Google Meet and WhatsApp.',
  },
  {
    q: 'How do you help Srinagar hotels and houseboats get direct bookings?',
    a: 'Most travellers first search on Google before booking through high-commission aggregators like MakeMyTrip or Booking.com. We build fast, mobile-friendly websites with direct WhatsApp booking engines and instant inquiry forms. Combined with local SEO, this allows guests to discover you directly and saves you from paying 15% to 25% in OTA commissions.',
  },
  {
    q: 'How important is Google Business Profile for businesses in Srinagar?',
    a: 'For clinics in Karan Nagar, retail showrooms on Residency Road, or cafes in Rajbagh, Google Business Profile is often your most valuable digital asset. We configure your profile, optimize your categories, build localized citations, and align your website schema so you appear in the top three map results when nearby customers search.',
  },
  {
    q: 'Can you work with professional consultancies and educational institutions in Srinagar?',
    a: 'Yes. We built the digital platform for Kaali Edge, an education and overseas study consultancy. We understand the need for dignified, calm design that builds immediate institutional trust for admissions, healthcare, and corporate services.',
  },
  {
    q: 'What is your typical turnaround time for a business website?',
    a: 'A standard five-page business website takes between two to three weeks from kickoff to launch. Single-page landing pages for marketing campaigns or seasonal promotions can be completed within seven business days.',
  },
];

export default function SrinagarLocalPage() {
  const faqSchema = getFaqPageSchema(
    srinagarFaqs.map((f) => ({ question: f.q, answer: f.a }))
  );

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Web Design Agency in Srinagar', url: '/web-design-agency-srinagar' },
  ]);

  const relevantServices = servicesData.filter((s) =>
    ['website-design-development', 'seo', 'digital-advertising'].includes(s.slug)
  );

  const featuredCaseStudy = projectsData.find((p) => p.slug === 'kaali-edge') || projectsData[0];

  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbsSchema} />

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 space-y-16 md:space-y-20">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-mist font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-blue transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Web design agency in Srinagar</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-3xl space-y-6">
          <span className="text-xs uppercase tracking-wider text-blue font-semibold block">
            Digital Agency &bull; Srinagar &amp; Greater Valley
          </span>
          <h1 className="text-h1 text-ink">
            Web design agency for Srinagar businesses
          </h1>
          <p className="text-lead text-graphite leading-relaxed">
            Srinagar is Kashmir&apos;s business hub: hotels, houseboats, retailers, clinics, schools and startups. If you run one, your customers are searching for you on their phones right now.
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

        {/* Narrative Section: Srinagar Market Reality */}
        <div className="border-t border-line pt-12 space-y-8">
          <h2 className="text-h2 text-ink">
            The digital reality of running a business in Srinagar
          </h2>

          <div className="space-y-6 text-body text-graphite leading-relaxed">
            <p>
              Srinagar is the commercial capital of Jammu &amp; Kashmir. From the legacy commercial establishments of Lal Chowk and the high-traffic luxury retail along Residency Road, to the healthcare corridor in Karan Nagar, boutique hospitality around Dal Lake and Boulevard Road, and the thriving cafes and consultancies of Rajbagh and Hyderpora, commercial competition in Srinagar has intensified rapidly.
            </p>
            <p>
              Whether a traveller steps out of Sheikh ul-Alam International Airport searching for a boutique stay in Nishat, or a family in Sanat Nagar looks for a reliable diagnostic clinic or tuition center, customer decisions start on a smartphone screen. If your business only exists as an unverified social media profile or an outdated page that takes eight seconds to load, potential clients immediately tap the next result.
            </p>
            <p>
              Many Srinagar business owners tell us the same story: they hired an agency from outside the state, paid high upfront fees, and were left with a generic template that broke within months. Distant agencies don&apos;t understand local buying behavior, they don&apos;t know why direct WhatsApp chat buttons convert far higher than lengthy contact forms, and they are never available when you need an urgent update.
            </p>
            <p>
              Waadi Media is different. While our headquarters are in Anantnag, we work with enterprises across Srinagar every single week. We make no false claims of having an office in Srinagar; instead, we offer honest communication, rapid digital delivery, and the flexibility to meet you in person in Srinagar or connect instantly over video calls.
            </p>
          </div>
        </div>

        {/* Why Local Search & GBP Matter in Srinagar */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              Winning local search and customer trust in Srinagar
            </h2>
            <p className="text-lead text-mist mt-1">
              Four specific areas where our digital engineering gives Srinagar enterprises a competitive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Google Business Profile &amp; Map Pack Ranking</h3>
              <p className="text-sm text-graphite leading-relaxed">
                When people search for &ldquo;hotels near Dal Lake&rdquo; or &ldquo;study abroad consultant Srinagar&rdquo;, the top three Google Map results capture over 60% of clicks. We optimize your local profile, structure your service categories, and integrate local schema markup on your website so you capture high-intent queries.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Bypassing Heavy OTA Commissions</h3>
              <p className="text-sm text-graphite leading-relaxed">
                Hotels, houseboats, and taxi operators in Srinagar often surrender 15% to 25% of their revenue to online travel agencies. We build direct booking systems and instant WhatsApp inquiry channels that allow guests to book directly with you, preserving your margins.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Institutional Credibility for High-Value Services</h3>
              <p className="text-sm text-graphite leading-relaxed">
                Education consultants, law firms, doctors, and architects cannot afford to look amateur. We design calm, restrained websites with clean typography, authentic photography, and clear credentials that immediately establish professional authority.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Direct Communication &amp; Local Meeting Flexibility</h3>
              <p className="text-sm text-graphite leading-relaxed">
                You work directly with the developer building your site, not a junior account manager. We respond to messages within hours, and because we are valley-based, we can easily sit down together over kahwa in Srinagar to plan your project kickoff.
              </p>
            </div>
          </div>
        </div>

        {/* Relevant Services with Pricing */}
        <div className="border-t border-line pt-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-h2 text-ink">
                Recommended services for Srinagar businesses
              </h2>
              <p className="text-lead text-mist mt-1">
                Fixed pricing with all deliverables clearly agreed in writing before kickoff.
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

        {/* Featured Case Study: Kaali Edge */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              Case study: Building digital authority for Srinagar
            </h2>
            <p className="text-lead text-mist mt-1">
              How we helped an educational consultancy establish regional trust.
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
              Kaali Edge needed a platform that reflected their deep experience in guiding Kashmiri students toward international university placements. We developed a modern, high-performance website paired with structured university guides and an educational blog. The platform eliminated confusing user journeys and replaced them with direct WhatsApp and appointment booking flows that tripled inquiry conversion.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/work/${featuredCaseStudy.slug}`}
                className="text-sm font-semibold px-5 py-2.5 rounded-full bg-blue text-white hover:bg-blue-deep transition-colors"
              >
                Read full case study
              </Link>
              <OutboundLink
                href={featuredCaseStudy.liveUrl}
                label={featuredCaseStudy.name}
                className="text-sm text-graphite hover:text-ink transition-colors"
              >
                Visit live website
              </OutboundLink>
            </div>
          </div>
        </div>

        {/* Local FAQ Section */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              Frequently asked questions in Srinagar
            </h2>
            <p className="text-lead text-mist mt-1">
              Common questions from businesses in Srinagar about working with us.
            </p>
          </div>

          <Accordion
            items={srinagarFaqs.map((f, idx) => ({
              id: `srinagar-faq-${idx}`,
              question: f.q,
              answer: f.a,
            }))}
          />
        </div>

        {/* Regional Base Map Section */}
        <div className="border-t border-line pt-12 space-y-6">
          <div>
            <h2 className="text-h2 text-ink">
              Our regional headquarters
            </h2>
            <p className="text-lead text-mist mt-1">
              Headquartered in Anantnag, serving businesses across Srinagar and Jammu &amp; Kashmir.
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
              title="Waadi Media regional location"
              className="w-full h-[380px]"
            />
          </div>
        </div>

        {/* CTA Band */}
        <div className="pt-8 border-t border-line">
          <div className="p-8 sm:p-12 bg-paper border border-line rounded-3xl text-center space-y-4 shadow-floating">
            <h2 className="text-h2 text-ink">
              Ready to elevate your Srinagar business online?
            </h2>
            <p className="text-lead text-mist max-w-lg mx-auto">
              Book a free 20-minute consultation. We will analyze your current presence and outline practical steps to grow your online inquiries.
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
