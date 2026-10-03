import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Code2,
  Cpu,
  Share2,
  Palette,
  Globe2,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Award,
  Zap,
  PhoneCall,
  ShieldCheck,
  Check,
  Search,
  ShoppingBag,
  Hotel,
  Compass,
  Boxes,
  Plane,
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { InquiryForm } from "@/components/InquiryForm";
import { BrandLogos } from "@/components/BrandLogos";
import { StatsSection } from "@/components/StatsSection";
import { WaadiMethodSection } from "@/components/WaadiMethodSection";
import { TechStackSection } from "@/components/TechStackSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ConsultationCta } from "@/components/ConsultationCta";
import { HomeHero } from "@/components/HomeHero";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Top Web Development, AI & Digital Agency in Kashmir | Waadi Media",
  description:
    "Waadi Media is Jammu & Kashmir's premier digital engineering and creative agency based in Anantnag and Srinagar. Led by Furkan Mushtaq (B.Tech CS), delivering ultra-fast Next.js websites, custom AI hiring pipelines, and high-impact social media management across Kashmir, India, and abroad.",
  alternates: {
    canonical: "https://waadimedia.com",
  },
  openGraph: {
    title: "Top Web Development, AI & Digital Agency in Kashmir | Waadi Media",
    description:
      "Premier software engineering and creative studio in Anantnag & Srinagar, Kashmir. Next.js websites, custom AI automations, and viral brand growth.",
    url: "https://waadimedia.com",
    siteName: "Waadi Media",
    images: ["/kashmir_hero_bg.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Web Development, AI & Digital Agency in Kashmir | Waadi Media",
    description:
      "Premier digital engineering studio in Kashmir. Next.js websites, custom AI pipelines, and brand growth.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const founderPersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Furkan Mushtaq",
  jobTitle: "Founder & Lead Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Waadi Media",
  },
  url: "https://waadimedia.com/about",
  sameAs: ["https://www.linkedin.com/in/furkanmushtaq", "https://github.com/furkanmushtaq"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why choose a Kashmir-based digital agency like Waadi Media over Delhi or Bangalore agencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Waadi Media bridges Computer Science precision with deep firsthand understanding of Jammu & Kashmir market dynamics, tourism seasonality, and local search intent in Srinagar, Anantnag, and Jammu.",
      },
    },
    {
      "@type": "Question",
      name: "Do you integrate Indian payment gateways (UPI, Razorpay, Cashfree) and international payments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every platform supports UPI (Google Pay, PhonePe, Paytm), Net Banking, and cards via Razorpay. For Kashmir exporters, we integrate Stripe and PayPal with multi-currency checkout.",
      },
    },
    {
      "@type": "Question",
      name: "How do you guarantee websites load under 0.8s across Kashmir mobile networks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We handcraft lightweight Next.js static pages with edge caching, automated WebP/AVIF image compression, and sub-second asset delivery via global CDNs.",
      },
    },
  ],
};

export default function HomePage() {
  const featuredProjects = [
    {
      title: "Wonder Delight Travels",
      category: "Kashmir Tourism & E-Commerce",
      url: "https://wonderdelighttravels.com",
      image: "/wonder-delight-mockup.png",
      alt: "Wonder Delight Travels website built by Waadi Media in Kashmir",
      description:
        "High-conversion Kashmir travel portal enabling global tourists to customize holiday itineraries, book houseboats, and secure valley packages seamlessly.",
      outcomes: [
        "Custom travel itinerary calculation workflow",
        "Sub-0.8s mobile load speed for high tourism traffic",
        "Ranked #1 for high-intent Kashmir holiday keywords",
      ],
      tech: ["Next.js 14", "React", "Tailwind CSS", "JSON-LD Schema"],
    },
    {
      title: "Kaali Edge Consultancy",
      category: "Global Education Admissions Portal",
      url: "https://kaaliedge.com",
      image: "/kaali-edge-mockup.png",
      alt: "Kaali Edge educational consultancy website built by Waadi Media in Kashmir",
      description:
        "Full-stack student portal for Kashmir's premier medical education consultancy, streamlining MBBS admissions abroad in Russia, Georgia, and Central Asia.",
      outcomes: [
        "Automated student lead qualification pipeline",
        "Global university search & criteria catalog",
        "300% increase in qualified parent inquiries",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Form Automation"],
    },
    {
      title: "SmartHire AI Platform",
      category: "Enterprise AI & Custom Software",
      image: "/smart-hire-mockup.png",
      alt: "SmartHire AI talent recruitment system built by Waadi Media",
      description:
        "Proprietary AI recruitment platform unifying automated resume screening, semantic skill matching, and interactive technical evaluations.",
      outcomes: [
        "Automated candidate resume parsing pipeline",
        "Reduced initial screening overhead by 75%",
        "Integrated interactive code assessment sandbox",
      ],
      tech: ["AI Pipelines", "Next.js", "TypeScript", "Python/API"],
    },
    {
      title: "Kehribal FC Kashmir Brand Growth",
      category: "Sports Brand & Social Management",
      image: "/kehribal-fc-showcase.jpg",
      alt: "Kehribal FC social media management and branding by Waadi Media",
      description:
        "End-to-end digital operations for Kehribal FC (@kehribal_fc), directing 4K cinematic matchday reels, fan engagement, and sponsor PR across Kashmir.",
      outcomes: [
        "Over 100k+ organic video impressions across the Valley",
        "High-production 4K drone & matchday cinematography",
        "Secured premier regional sponsorships and brand presence",
      ],
      tech: ["Social Strategy", "Cinematography", "Community Growth"],
    },
    {
      title: "Zoon Pashmina & Handicrafts",
      category: "Luxury Global E-Commerce & Export",
      image: "/handicraft-mockup.jpg",
      alt: "Zoon Pashmina global luxury e-commerce platform built by Waadi Media",
      description:
        "Direct-to-consumer international storefront connecting Srinagar's master Pashmina weavers with buyers across USA, Europe, and UAE with multi-currency checkout.",
      outcomes: [
        "Multi-currency USD/EUR/AED Razorpay & Stripe gateway",
        "Sub-0.7s international edge CDN load velocity",
        "240% increase in export inquiries and direct overseas sales",
      ],
      tech: ["Next.js", "Stripe Multi-Currency", "Tailwind CSS", "Global SEO"],
    },
    {
      title: "Zenith Luxury Resort & Houseboats",
      category: "Hospitality & Houseboat Reservation Engine",
      image: "/resort-mockup.jpg",
      alt: "Zenith Luxury Resort website and booking engine built by Waadi Media",
      description:
        "Bespoke hospitality reservation portal for premier Pahalgam and Dal Lake luxury stays, featuring live room availability and instant WhatsApp booking alerts.",
      outcomes: [
        "Direct booking portal bypassing high OTA commissions",
        "Instant automated WhatsApp reservation alerts",
        "Ranked #1 for high-intent luxury Pahalgam stay searches",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API"],
    },
  ];

  const servicesGrid = [
    {
      title: "Next.js Web Engineering",
      description: "Ultra-fast custom web applications, travel booking portals, and luxury e-commerce platforms engineered for sub-second speeds and top Google rankings.",
      icon: Globe2,
      href: "/services/web-development",
      badge: "Flagship Stack",
    },
    {
      title: "Custom Software & ERPs",
      description: "Tailor-made software platforms, inventory databases, fruit mandi commission ledgers (Sopore/Shopian), and offline-first cloud applications.",
      icon: Code2,
      href: "/services/software-development",
      badge: "Enterprise",
    },
    {
      title: "AI Workflows & Automations",
      description: "Proprietary AI pipelines (such as SmartHire), WhatsApp business API lead routing, automated document parsers, and custom LLM workflows.",
      icon: Cpu,
      href: "/services/ai-automation",
      badge: "AI Powered",
    },
    {
      title: "Social Media Growth & 4K Media",
      description: "Complete management of Instagram, YouTube & LinkedIn with cinematic on-location 4K video shoots across Kashmir and viral sports coverage.",
      icon: Share2,
      href: "/services/social-media-management",
      badge: "High Growth",
    },
    {
      title: "Luxury Brand Identity Design",
      description: "Comprehensive visual identity, high-end logos, typography guidelines, and packaging for Kashmir's luxury crafts, hospitality, and corporate firms.",
      icon: Palette,
      href: "/services/brand-management",
      badge: "Creative",
    },
    {
      title: "J&K & India Search Dominance (SEO)",
      description: "Hyper-targeted Google Business Profile optimization, JSON-LD Schema architectures, and Core Web Vitals engineering to capture the #1 Google rank.",
      icon: Search,
      href: "/services/seo-services",
      badge: "Rank #1",
    },
  ];

  const regionalSolutions = [
    {
      title: "Kashmir Tourism, Cab & Houseboat Systems",
      location: "Srinagar • Gulmarg • Pahalgam • Sonamarg",
      icon: Plane,
      description:
        "High-performance booking engines with automated WhatsApp itinerary generation, customized holiday package calculators, and instant advance payment collection tailored for peak tourist seasons.",
      highlights: ["Sub-0.8s loads on mountain networks", "Instant WhatsApp itinerary delivery", "Zero middleman OTA commissions"],
    },
    {
      title: "Export E-Commerce for Pashmina & Saffron",
      location: "Srinagar • Downtown Crafts Hub • Global Export",
      icon: ShoppingBag,
      description:
        "Luxury global storefronts for authentic Kashmiri Pashmina shawls, walnut carvings, saffron, and dry fruits with automated multi-currency checkout (USD, EUR, GBP, AED) and DHL Express tracking.",
      highlights: ["Razorpay, Stripe & UPI gateway", "Artisan authenticity verification", "Automated international shipping labels"],
    },
    {
      title: "Overseas Medical Education Portals",
      location: "Srinagar • Anantnag • Jammu",
      icon: Compass,
      description:
        "High-trust admission funnels designed for educational consultancies helping students secure MBBS admissions abroad (Russia, Georgia, Uzbekistan), with automated CRM lead qualification.",
      highlights: ["300%+ verified inquiry surge", "University comparison catalogs", "Parent counselor routing bots"],
    },
    {
      title: "Apple Mandi & Cold Storage Cloud ERPs",
      location: "Sopore • Shopian • Kulgam • Pulwama",
      icon: Boxes,
      description:
        "Bespoke cloud software for Kashmir's apple industry, digitizing crate counts, cold storage temperature logs, commission agent ledgers, and grower payouts with offline-first synchronization.",
      highlights: ["Offline-first valley connectivity", "Instant WhatsApp ledger statements", "Multi-branch mandi synchronization"],
    },
  ];

  return (
    <>
      <JsonLd data={founderPersonSchema} />
      <JsonLd data={faqSchema} />

      {/* Scenic Hero Section with Floating Glass Bar */}
      <HomeHero />

      {/* Brand Logos / Social Proof Bar Section */}
      <section className="bg-slate-950 py-10 border-b border-slate-800">
        <BrandLogos />
      </section>

      {/* Key Stats & Metrics Section */}
      <StatsSection />

      {/* 1. SECTION: Our Services & Solutions */}
      <AnimatedSection className="textured-bg relative py-28 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="luxury-badge">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Bespoke Capabilities &amp; Services</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight leading-[1.12]">
              Architected for <span className="font-serif italic font-normal text-blue-600">Exponential Growth</span> in Kashmir &amp; India
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-2xl mx-auto">
              Bridging Computer Science precision with Kashmir market dynamics to build digital assets that dominate search results and convert visitors into loyal clients.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesGrid.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link
                  key={idx}
                  href={service.href}
                  className="glass-card glass-card-hover group flex flex-col justify-between rounded-3xl p-8 bg-white/85 backdrop-blur-2xl border border-slate-200/90 shadow-xl transition-all"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700 border border-slate-200/80">
                        {service.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>Explore Methodology &rarr;</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* 2. SECTION: Modern Tech Stack & Standards */}
      <TechStackSection />

      {/* 3. SECTION: Featured Work & Case Studies */}
      <AnimatedSection className="textured-bg relative py-28 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-3">
              <div className="luxury-badge">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Verified Client Case Studies</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
                Proven Impact for <span className="font-serif italic font-normal text-blue-600">Valley &amp; Global</span> Leaders
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-blue-600/25 hover:bg-blue-700 transition-all self-start md:self-auto"
            >
              <span>Explore All Case Studies</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* REGIONAL INDUSTRY SOLUTIONS MATRIX (Jammu & Kashmir + India SEO) */}
      <AnimatedSection className="textured-bg-dark py-28 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="luxury-badge-dark">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Tailored Regional Solutions</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
              Engineered for <span className="font-serif italic font-normal text-blue-300">Jammu, Kashmir &amp; India</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              We understand the unique operational rhythms of Kashmir businesses—from tourism seasonality and handicrafts export to agricultural mandi logistics and valley mobile networks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {regionalSolutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div
                  key={idx}
                  className="glass-card-dark rounded-3xl p-8 backdrop-blur-2xl hover:border-blue-500/50 transition-all shadow-2xl flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wide uppercase text-blue-300 bg-blue-950/70 border border-blue-800/60 px-3.5 py-1 rounded-full">
                        {sol.location}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {sol.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {sol.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    {sol.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* 4. SECTION: Engineering Process (Waadi Method) */}
      <WaadiMethodSection />

      {/* 5. SECTION: Client Feedback & Impact (Testimonials) */}
      <TestimonialsSection />

      {/* 6. SECTION: Why Work With Waadi Media? (Founder Spotlight) */}
      <AnimatedSection className="textured-bg relative py-28 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-slate-950 p-8 text-white shadow-2xl backdrop-blur-2xl border border-slate-800 space-y-6">
                <div className="luxury-badge-dark">
                  <Award className="h-3.5 w-3.5 text-blue-400" />
                  <span>Lead Engineer &amp; Founder</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-extrabold tracking-tight text-white">Furkan Mushtaq</h3>
                  <div className="text-sm font-semibold text-blue-400">B.Tech in Computer Science &amp; Technology</div>
                </div>

                <p className="text-sm leading-relaxed text-slate-300">
                  Software engineer with deep technical grounding in modern cloud architectures, Next.js full-stack engineering, and automated AI pipelines, dedicated to establishing Kashmir as a digital innovation hub.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <Building2 className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Based in Anantnag &amp; Srinagar, Jammu &amp; Kashmir</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <PhoneCall className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>+91 7780940317 • contact@waadimedia.com</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Read Engineering Story &amp; Vision &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="luxury-badge">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>The Waadi Media Distinction</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl leading-tight tracking-tight">
                Computer Science Rigor <span className="font-serif italic font-normal text-blue-600">Aligned with</span> Kashmir Market Reality
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Whether deploying custom travel reservation workflows for <strong>Wonder Delight Travels</strong>, educational portals for <strong>Kaali Edge</strong>, AI screening tools for <strong>SmartHire</strong>, or driving 100k+ reach for sports icons like <strong>Kehribal FC</strong>, our work is crafted for unmatched speed, security, and top Google search rankings in India.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                <div className="glass-card rounded-2xl p-6 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <div className="text-base font-bold text-slate-900">Zero Template Bloatware</div>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">Handcrafted Next.js and TypeScript. Sub-second load times that keep visitors on your site.</div>
                </div>

                <div className="glass-card rounded-2xl p-6 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <div className="text-base font-bold text-slate-900">Proprietary AI Integration</div>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">Streamlining lead acquisition, automated candidate parsing, and WhatsApp API bots.</div>
                </div>

                <div className="glass-card rounded-2xl p-6 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <div className="text-base font-bold text-slate-900">#1 Local Kashmir &amp; India SEO</div>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">Tailored schema architectures to capture high-intent inquiries across Jammu, Kashmir &amp; India.</div>
                </div>

                <div className="glass-card rounded-2xl p-6 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 shrink-0" />
                    <div className="text-base font-bold text-slate-900">Direct Founder Partnership</div>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">Collaborate directly with Furkan Mushtaq. Transparent execution with zero middleman dilution.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 7. SECTION: Got Questions? We Have Answers (FAQ) */}
      <FaqSection />

      {/* Direct Consultation Call To Action Banner */}
      <ConsultationCta />

      {/* 8. SECTION: Project Discovery Form */}
      <AnimatedSection className="textured-bg relative py-28 border-b border-slate-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <InquiryForm />
        </div>
      </AnimatedSection>
    </>
  );
}
