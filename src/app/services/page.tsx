import type { Metadata } from "next";
import Link from "next/link";
import { Globe2, Code2, Cpu, Share2, Palette, ArrowUpRight, CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Services & Digital Solutions in Kashmir | Waadi Media",
  description:
    "Explore Waadi Media's full range of services: Web Development, Custom Software Engineering, AI Automation, Social Media Management, and Brand Strategy.",
  alternates: {
    canonical: "https://waadimedia.com/services",
  },
  openGraph: {
    title: "Services & Digital Solutions in Kashmir | Waadi Media",
    description:
      "Explore Waadi Media's full range of services: Web Development, Custom Software, AI Automation, Social Media Management, and Branding.",
    url: "https://waadimedia.com/services",
    siteName: "Waadi Media",
    images: ["/kashmir_hero_bg.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Digital Solutions in Kashmir | Waadi Media",
    description:
      "Explore Waadi Media's full range of digital agency services in Kashmir.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://waadimedia.com/services" },
  ],
};

export default function ServicesHubPage() {
  const servicesList = [
    {
      title: "Web Development",
      description:
        "High-performance website design and e-commerce platforms engineered for speed, mobile responsiveness, and search engine visibility.",
      href: "/services/web-development",
      icon: Globe2,
      highlights: ["E-Commerce & Package Booking", "SEO Schema Integration", "Fast Mobile Performance"],
    },
    {
      title: "Custom Software Development",
      description:
        "Tailor-made software applications, web tools, and database systems built from scratch to streamline business workflows.",
      href: "/services/software-development",
      icon: Code2,
      highlights: ["Full-Stack App Architecture", "Custom APIs & Integrations", "Scalable Database Systems"],
    },
    {
      title: "AI Automation & Hiring Platforms",
      description:
        "Automated AI pipeline systems (like SmartHire) designed for talent acquisition, candidate parsing, and workflow automation.",
      href: "/services/ai-automation",
      icon: Cpu,
      highlights: ["SmartHire AI Candidate Parser", "Automated Workflows", "Custom AI Models & APIs"],
    },
    {
      title: "Social Media Management",
      description:
        "Active growth and strategic management for Instagram, Facebook, and LinkedIn pages (managing Kehribal FC & Kaali Edge).",
      href: "/services/social-media-management",
      icon: Share2,
      highlights: ["Graphic Design & Reel Content", "Audience Engagement Growth", "Sponsor Visibility"],
    },
    {
      title: "Brand Management & Identity",
      description:
        "Comprehensive brand identity design, logo creation, and strategic positioning to build an enduring brand presence.",
      href: "/services/brand-management",
      icon: Palette,
      highlights: ["Logo & Visual Identity", "Brand Guidelines", "Digital Brand Positioning"],
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Eye-Catching Scenic Page Hero */}
      <PageHero
        badge="End-to-End Capabilities"
        title="Services & Digital"
        highlightText="Solutions"
        description="We deliver engineered software products, AI automation pipelines, and strategic brand management designed specifically for Kashmir businesses and global clients."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        stats={[
          { label: "Core Capabilities", value: "5 Domains", icon: <Globe2 className="h-4 w-4 text-blue-400" /> },
          { label: "Next.js Performance", value: "< 0.8s", icon: <Zap className="h-4 w-4 text-blue-400" /> },
          { label: "AI Workflows", value: "SmartHire", icon: <Cpu className="h-4 w-4 text-blue-400" /> },
          { label: "Code Standards", value: "100% TS", icon: <ShieldCheck className="h-4 w-4 text-blue-400" /> },
        ]}
      />

      {/* Services Grid Section */}
      <AnimatedSection className="py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">Core Service Offerings</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
              Engineered for Measurable Impact
            </h3>
            <p className="text-slate-600 text-base">
              Select a service below to view detailed tech stacks, deliverables, and project case studies.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link
                  key={idx}
                  href={service.href}
                  className="glass-card glass-card-hover group flex flex-col justify-between rounded-3xl p-8 bg-white border border-slate-200 shadow-md transition-all"
                >
                  <div className="space-y-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {service.highlights.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>Explore Capability &rarr;</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
