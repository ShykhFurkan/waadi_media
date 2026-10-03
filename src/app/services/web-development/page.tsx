import type { Metadata } from "next";
import Link from "next/link";
import { Globe2, CheckCircle2, ArrowUpRight, Code2, Zap, ShieldCheck, Award } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Web Development Company in Kashmir | Waadi Media",
  description:
    "Custom website design & development for businesses in Anantnag, Srinagar and beyond. Fast, mobile-first, SEO-ready websites built by Waadi Media.",
  alternates: {
    canonical: "https://waadimedia.com/services/web-development",
  },
  openGraph: {
    title: "Web Development Company in Kashmir | Waadi Media",
    description:
      "Custom website design & development for businesses in Anantnag, Srinagar and beyond.",
    url: "https://waadimedia.com/services/web-development",
    siteName: "Waadi Media",
    images: ["/kashmir_hero_bg.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Company in Kashmir | Waadi Media",
    description:
      "Custom website design & development for businesses in Anantnag, Srinagar and beyond.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web Development",
  provider: {
    "@type": "Organization",
    name: "Waadi Media",
  },
  areaServed: ["Anantnag", "Srinagar", "Kashmir Valley", "Remote"],
  description:
    "Custom website design and development for businesses, including e-commerce, travel booking portals, educational consultancies, and web applications.",
  url: "https://waadimedia.com/services/web-development",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://waadimedia.com/services" },
    { "@type": "ListItem", position: 3, name: "Web Development", item: "https://waadimedia.com/services/web-development" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a custom website cost in Kashmir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Website pricing depends on scope, features, and functionality. We offer transparent project-based pricing tailored for small local businesses up to custom full-stack web applications.",
      },
    },
    {
      "@type": "Question",
      name: "Are Waadi Media websites mobile-friendly and SEO-optimized?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, every website built by Waadi Media is 100% mobile responsive, ultra-fast loading, and pre-configured with JSON-LD schema markup and search engine metadata.",
      },
    },
  ],
};

export default function WebDevelopmentPage() {
  const caseStudies = [
    {
      title: "Wonder Delight Travels",
      category: "Travel Booking Platform",
      url: "https://wonderdelighttravels.com",
      image: "/wonder-delight-mockup.png",
      alt: "Wonder Delight Travels website built by Waadi Media in Kashmir",
      description:
        "Full-featured travel booking website allowing guests to browse, customize, and book tour packages with real-time inquiries.",
      outcomes: [
        "Custom travel package booking workflow",
        "Responsive, mobile-optimized experience",
        "SEO architecture tailored for Kashmir tourism",
      ],
      tech: ["Next.js", "React", "Tailwind CSS", "SEO Schema"],
    },
    {
      title: "Kaali Edge Consultancy",
      category: "EdTech & Consultant Portal",
      url: "https://kaaliedge.com",
      image: "/kaali-edge-mockup.png",
      alt: "Kaali Edge educational consultancy website built by Waadi Media in Kashmir",
      description:
        "Digital portal for an educational consultancy in Kashmir assisting students with MBBS admissions abroad.",
      outcomes: [
        "Lead generation & student application forms",
        "University search & guidance catalog",
        "High-conversion mobile landing structure",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Form Automation"],
    },
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Eye-Catching Scenic Page Hero */}
      <PageHero
        badge="Full-Stack Web Engineering"
        title="Custom Web Development"
        highlightText="Services in Kashmir"
        description="We design and engineer fast, mobile-first, SEO-ready websites for businesses in Anantnag, Srinagar, and across the Kashmir Valley."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Web Development" },
        ]}
        stats={[
          { label: "Engineering Standard", value: "Next.js 14", icon: <Code2 className="h-4 w-4 text-blue-400" /> },
          { label: "Load Speed Target", value: "< 0.8s", icon: <Zap className="h-4 w-4 text-blue-400" /> },
          { label: "Mobile Responsive", value: "100%", icon: <Globe2 className="h-4 w-4 text-blue-400" /> },
          { label: "Kashmir Projects", value: "Wonder & Kaali", icon: <Award className="h-4 w-4 text-blue-400" /> },
        ]}
      />

      {/* Main Content & Features */}
      <AnimatedSection className="py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
                Why Choose Waadi Media for Web Development in Kashmir?
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Unlike traditional agencies using heavy, slow template plugins, Waadi Media builds custom web applications using modern technologies like Next.js, React, and Tailwind CSS.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "Mobile-First & Ultra Fast",
                    desc: "Over 80% of users in Kashmir browse on mobile phones. Our websites load in under 0.8 seconds.",
                  },
                  {
                    title: "Built-In SEO & Schema Markup",
                    desc: "Every page is built with JSON-LD structured data so your business ranks high on Google for local keywords.",
                  },
                  {
                    title: "Custom Functional Workflows",
                    desc: "From travel booking engines to educational inquiry forms, we write custom logic for your business needs.",
                  },
                ].map((f, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-5 bg-slate-50">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{f.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white space-y-6 shadow-2xl">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Web Development Stack</div>
              <h3 className="text-2xl font-bold text-white">Engineered for Performance</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-blue-400" />
                  <span>Next.js 14 App Router & React 19</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span>Tailwind CSS & Glassmorphic UI</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>HTTPS SSL & Performance Optimization</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-slate-800">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-3.5 text-xs font-bold text-white hover:bg-blue-500 transition-all shadow-md"
                >
                  <span>Request Web Dev Proposal</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Case Studies */}
          <div className="space-y-8 pt-8 border-t border-slate-100">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Featured Web Development Projects
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {caseStudies.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </div>

          {/* FAQ Block */}
          <div className="space-y-6 pt-8 border-t border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50 space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  Does Waadi Media build e-commerce and booking engines?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes! We built <strong>wonderdelighttravels.com</strong> specifically to handle package browsing and custom travel booking requests.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50 space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  How long does it take to complete a web project?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Most custom business websites are delivered within 1 to 3 weeks depending on the complexity of functionality required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
