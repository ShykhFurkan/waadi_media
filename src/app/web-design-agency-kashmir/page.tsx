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
  title: 'Web Design Agency in Kashmir - Waadi Media',
  description:
    "A Kashmir-based web design and digital agency for tourism, education, horticulture, retail and startups. Clear prices, fast delivery.",
  alternates: {
    canonical: '/web-design-agency-kashmir',
  },
  openGraph: {
    title: 'Web Design Agency in Kashmir - Waadi Media',
    description:
      "A Kashmir-based web design and digital agency for tourism, education, horticulture, retail and startups. Clear prices, fast delivery.",
    url: '/web-design-agency-kashmir',
  },
};

const kashmirFaqs = [
  {
    q: 'Do you work with businesses across all districts of Kashmir?',
    a: 'Yes. While our primary base is in Anantnag, we work with hotels, tour operators, growers, consultancies, and retailers across Srinagar, Baramulla, Pulwama, Budgam, Kupwara, Ganderbal, and Shopian.',
  },
  {
    q: 'Can a Kashmiri e-commerce website accept online payments from across India?',
    a: 'Yes. We integrate trusted Indian payment gateways that support instant UPI (Google Pay, PhonePe, Paytm), debit cards, credit cards, and net banking. For businesses exporting saffron, shawls, or dry fruits internationally, we also configure global card processing.',
  },
  {
    q: 'How fast will my website load on mobile connections in the valley?',
    a: 'Mobile performance is our core priority. Because most local customers and travellers browse on Android phones over variable mobile networks, we build lightweight static and server-rendered pages without bulky plugins, keeping load times under 2 seconds.',
  },
  {
    q: 'Do you charge monthly retainers or one-time project fees?',
    a: 'Our website design and development projects are fixed-price with clear milestone deliverables agreed in writing before work starts. We publish our starting prices openly—landing pages start from ₹5,000 and business websites from ₹15,000. Ongoing maintenance is optional from ₹1,500 per month.',
  },
];

export default function KashmirLocalPage() {
  const faqSchema = getFaqPageSchema(
    kashmirFaqs.map((f) => ({ question: f.q, answer: f.a }))
  );

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Web Design Agency in Kashmir', url: '/web-design-agency-kashmir' },
  ]);

  const relevantServices = servicesData.filter((s) =>
    ['website-design-development', 'ecommerce-websites', 'seo'].includes(s.slug)
  );

  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbsSchema} />

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 space-y-16 md:space-y-20">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-mist font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-blue transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Web design agency in Kashmir</span>
        </nav>

        {/* Hero Section */}
        <div className="max-w-3xl space-y-6">
          <span className="text-xs uppercase tracking-wider text-blue font-semibold block">
            Digital Agency &bull; Jammu &amp; Kashmir
          </span>
          <h1 className="text-h1 text-ink">
            Web design agency in Kashmir
          </h1>
          <p className="text-lead text-graphite leading-relaxed">
            Kashmir&apos;s businesses have more to offer than ever, from tourism and horticulture to crafts and education. Waadi Media is a web design and digital agency from Anantnag that helps them get found, trusted and booked online.
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

        {/* Narrative Section: Statewide View & Regional Economic Dynamics */}
        <div className="border-t border-line pt-12 space-y-8">
          <h2 className="text-h2 text-ink">
            Building websites for Kashmir&apos;s real economy
          </h2>

          <div className="space-y-6 text-body text-graphite leading-relaxed">
            <p>
              Commerce in Jammu &amp; Kashmir moves to a rhythm that outside agencies rarely understand. Our valley is shaped by distinct seasons: the frantic influx of summer travellers eager to visit Gulmarg and Pahalgam, the autumn harvest of saffron in Pampore and apples across Sopore and Shopian, the academic admission cycles for students seeking universities abroad, and the quiet chill of winter when online channels become the primary lifeline for business.
            </p>
            <p>
              When a business in Kashmir hires an agency based in Delhi or Bangalore, they often encounter a disconnect. Distant agencies don&apos;t know the local market, don&apos;t understand why direct WhatsApp integration is essential for closing bookings, and rely on bloated templates that grind to a halt on average 4G connections in south or north Kashmir.
            </p>
            <p>
              Waadi Media was created to provide a modern, local alternative. We live here, work here, and understand the practical hurdles Kashmiri entrepreneurs face every day. Our approach is grounded in three fundamentals: clean code that loads instantly on every phone, open pricing published clearly on our website, and direct communication without layers of account managers.
            </p>
          </div>
        </div>

        {/* Industries We Serve Across the Valley */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              Industries we build for across Jammu &amp; Kashmir
            </h2>
            <p className="text-lead text-mist mt-1">
              Every sector in the valley has specific technical and commercial requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Tourism &amp; Hospitality</h3>
              <p className="text-sm text-graphite leading-relaxed">
                Tour operators, hotels, houseboats, and taxi services need fast booking inquiry flows, verified itineraries, and Google Maps integration that convert online interest into confirmed direct bookings without paying exorbitant OTA commissions.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Horticulture &amp; Agri-Produce</h3>
              <p className="text-sm text-graphite leading-relaxed">
                Growers and merchants of Kashmiri apples, walnuts, almonds, and saffron require digital product catalogues and bulk inquiry channels that connect them directly with wholesale buyers and consumers across India.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Handicrafts &amp; Artisan Goods</h3>
              <p className="text-sm text-graphite leading-relaxed">
                Pashmina weavers, walnut wood carvers, and paper-mâché artisans deserve digital stores that convey luxury, authenticity, and heritage with seamless UPI and credit card checkout for buyers nationwide.
              </p>
            </div>

            <div className="p-6 bg-paper border border-line rounded-2xl space-y-2">
              <h3 className="text-lg font-sans font-semibold text-ink">Education &amp; Professional Services</h3>
              <p className="text-sm text-graphite leading-relaxed">
                Consultancies, private schools, clinics, and legal practices need calm, trust-first web pages that clearly explain their services and make booking a free consultation simple.
              </p>
            </div>
          </div>
        </div>

        {/* Relevant Services with Pricing */}
        <div className="border-t border-line pt-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-h2 text-ink">
                Core services for Kashmiri businesses
              </h2>
              <p className="text-lead text-mist mt-1">
                Transparent starting prices with zero hidden costs.
              </p>
            </div>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-blue hover:text-blue-deep transition-colors whitespace-nowrap"
            >
              Compare all pricing
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

        {/* Real Work Proof: Linking to all 3 case studies */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              Real projects built in Kashmir
            </h2>
            <p className="text-lead text-mist mt-1">
              Explore our recent case studies across tourism, education, and software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <div
                key={project.slug}
                className="p-6 bg-paper border border-line rounded-2xl flex flex-col justify-between hover:border-blue transition-colors"
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-blue font-semibold block">
                    {project.sector}
                  </span>
                  <h3 className="text-lg font-semibold text-ink">
                    <Link href={`/work/${project.slug}`} className="hover:text-blue transition-colors">
                      {project.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-mist line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-line flex items-center justify-between">
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-xs font-semibold text-blue hover:text-blue-deep transition-colors"
                  >
                    View case study
                  </Link>
                  <OutboundLink
                    href={project.liveUrl}
                    label={project.name}
                    className="text-xs text-graphite hover:text-ink transition-colors"
                  >
                    Visit site
                  </OutboundLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local FAQ Section */}
        <div className="border-t border-line pt-12 space-y-8">
          <div>
            <h2 className="text-h2 text-ink">
              Frequently asked questions in Kashmir
            </h2>
            <p className="text-lead text-mist mt-1">
              Common questions about working with our local team.
            </p>
          </div>

          <Accordion
            items={kashmirFaqs.map((f, idx) => ({
              id: `kashmir-faq-${idx}`,
              question: f.q,
              answer: f.a,
            }))}
          />
        </div>

        {/* Google Map Section */}
        <div className="border-t border-line pt-12 space-y-6">
          <div>
            <h2 className="text-h2 text-ink">
              Our valley headquarters
            </h2>
            <p className="text-lead text-mist mt-1">
              Operating from Anantnag, serving clients across Jammu &amp; Kashmir and India.
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
              title="Waadi Media location in Kashmir"
              className="w-full h-[380px]"
            />
          </div>
        </div>

        {/* CTA Band */}
        <div className="pt-8 border-t border-line">
          <div className="p-8 sm:p-12 bg-paper border border-line rounded-3xl text-center space-y-4 shadow-floating">
            <h2 className="text-h2 text-ink">
              Ready to give your Kashmir business an online presence?
            </h2>
            <p className="text-lead text-mist max-w-lg mx-auto">
              Schedule a free 20-minute call. We will review what your business needs and provide an honest estimate.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button href="/book-a-call" variant="primary">
                Book a free call
              </Button>
              <Button href="/pricing" variant="secondary">
                See all prices
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
