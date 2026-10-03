import type { Metadata } from "next";
import Link from "next/link";
import { Code2, CheckCircle2, ArrowUpRight, Cpu, Layers, Database, Sparkles, Server, Zap, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ConsultationCta } from "@/components/ConsultationCta";

export const metadata: Metadata = {
  title: "Custom Software Development & Cloud ERPs in Kashmir | Waadi Media",
  description:
    "Bespoke full-stack software development, cloud ERPs for cold storages and apple mandis, SaaS products, and database engineering led by Furkan Mushtaq (B.Tech CS) in Anantnag and Srinagar, Kashmir.",
  alternates: {
    canonical: "https://waadimedia.com/services/software-development",
  },
  openGraph: {
    title: "Custom Software Development & Cloud ERPs in Kashmir | Waadi Media",
    description:
      "Custom full-stack software development, cold storage ERPs, and API integrations by Waadi Media.",
    url: "https://waadimedia.com/services/software-development",
    siteName: "Waadi Media",
    images: ["/kashmir_hero_bg.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development & Cloud ERPs in Kashmir | Waadi Media",
    description:
      "Custom full-stack software development, cold storage ERPs, and API integrations by Waadi Media.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software Development",
  provider: {
    "@type": "Organization",
    name: "Waadi Media",
  },
  areaServed: ["Anantnag", "Srinagar", "Kashmir Valley", "Jammu and Kashmir", "India"],
  description:
    "Custom full-stack software application development, SaaS products, REST APIs, and automated business databases.",
  url: "https://waadimedia.com/services/software-development",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://waadimedia.com/services" },
    { "@type": "ListItem", position: 3, name: "Software Development", item: "https://waadimedia.com/services/software-development" },
  ],
};

export default function SoftwareDevelopmentPage() {
  const capabilities = [
    {
      icon: Layers,
      title: "Custom Cloud ERPs & Mandi Ledgers",
      description: "Bespoke database solutions built for Kashmir's fruit mandis (Sopore, Shopian), cold storages, and wholesale traders with offline-first synchronization and instant WhatsApp ledger billing.",
      badge: "Kashmir Agri-Tech",
    },
    {
      icon: Database,
      title: "High-Performance Next.js & REST APIs",
      description: "Clean, type-safe API architectures, real-time database synchronization via PostgreSQL/Supabase, and microservices built to withstand high concurrency.",
      badge: "Backend & Cloud",
    },
    {
      icon: Cpu,
      title: "Enterprise AI & Candidate Pipelines",
      description: "Proprietary AI recruitment systems (like SmartHire), intelligent document parsers, and custom WhatsApp Business API workflows that eliminate operational overhead.",
      badge: "AI Powered",
    },
    {
      icon: Server,
      title: "Hospitality & Tourism Reservation Backends",
      description: "Direct booking engines for Kashmir houseboats, luxury Pahalgam resorts, and tour operators with live room inventory management and Indian payment gateways.",
      badge: "Hospitality Tech",
    },
    {
      icon: ShieldCheck,
      title: "Offline-First Valley Architecture",
      description: "Architectures engineered to maintain flawless local functionality during intermittent network connectivity, auto-syncing seamlessly once connection is restored.",
      badge: "Zero Downtime",
    },
    {
      icon: Zap,
      title: "SaaS & MVP Rapid Prototyping",
      description: "Accelerated 2 to 4 week build-out for Indian and international startup founders looking to validate products with clean code, scalable databases, and Stripe/Razorpay billing.",
      badge: "Startup Accelerator",
    },
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        badge="Enterprise Engineering • Anantnag & Srinagar"
        title="Custom Software &"
        highlightText="Cloud Architecture"
        description="We engineer bespoke full-stack applications, apple mandi cloud ERPs, and automated business pipelines tailored to eliminate operational friction across Jammu, Kashmir, and India."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Software Development" },
        ]}
      />

      <AnimatedSection className="textured-bg py-28 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="luxury-badge">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Full-Stack Capabilities</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
              Software Architected for <span className="font-serif italic font-normal text-blue-600">Reliability &amp; Scale</span>
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Every system is engineered by Furkan Mushtaq (B.Tech CS) adhering to strict type safety, modular architecture, and zero technical debt.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover group flex flex-col justify-between rounded-3xl p-8 bg-white/85 backdrop-blur-2xl border border-slate-200/90 shadow-xl transition-all space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700 border border-slate-200/80">
                        {cap.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    <span>Engineered with TypeScript &amp; Next.js</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <ConsultationCta />
    </>
  );
}
