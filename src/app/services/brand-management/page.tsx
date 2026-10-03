import type { Metadata } from "next";
import Link from "next/link";
import { Palette, CheckCircle2, ArrowUpRight, Sparkles, Layers, Eye, Award, Gem, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ConsultationCta } from "@/components/ConsultationCta";

export const metadata: Metadata = {
  title: "Luxury Brand Identity & Packaging Design in Kashmir | Waadi Media",
  description:
    "Bespoke visual identity, luxury packaging for Pashmina and saffron exporters, logo systems, and strategic positioning for premier businesses in Srinagar, Anantnag, and across India.",
  alternates: {
    canonical: "https://waadimedia.com/services/brand-management",
  },
  openGraph: {
    title: "Luxury Brand Identity & Packaging Design in Kashmir | Waadi Media",
    description:
      "Transform your business visual identity, luxury packaging, and digital positioning with Waadi Media.",
    url: "https://waadimedia.com/services/brand-management",
    siteName: "Waadi Media",
    images: ["/kashmir_hero_bg.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Brand Identity & Packaging Design in Kashmir | Waadi Media",
    description:
      "Transform your business visual identity, luxury packaging, and digital positioning with Waadi Media.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Brand Management",
  provider: {
    "@type": "Organization",
    name: "Waadi Media",
  },
  areaServed: ["Anantnag", "Srinagar", "Kashmir Valley", "Jammu and Kashmir", "India"],
  description:
    "Strategic brand identity creation, luxury packaging design, brand guidelines, and visual positioning for companies in Kashmir and India.",
  url: "https://waadimedia.com/services/brand-management",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://waadimedia.com/services" },
    { "@type": "ListItem", position: 3, name: "Brand Management", item: "https://waadimedia.com/services/brand-management" },
  ],
};

export default function BrandManagementPage() {
  const brandPillars = [
    {
      icon: Gem,
      title: "Luxury Craft & Export Packaging",
      description: "Custom box packaging, embossed certificates of authenticity, and sustainable luxury unboxing designs for Kashmir's GI-tagged Pashmina, saffron, and walnut crafts.",
      badge: "Kashmir Luxury Crafts",
    },
    {
      icon: Sparkles,
      title: "Vector Logo & Identity Systems",
      description: "Timeless typographic marks, bespoke monograms, vector SVG assets, and harmonious color palettes engineered to look stunning across billboards, mobile apps, and business collateral.",
      badge: "Visual Identity",
    },
    {
      icon: Layers,
      title: "Comprehensive Brand Guidelines",
      description: "Exhaustive design design tokens, typography rules (pairing editorial serifs with clean grotesks), spacing scales, and strict social media visual guidelines.",
      badge: "Design Tokens",
    },
    {
      icon: Eye,
      title: "Hospitality & Resort Visuals",
      description: "Bespoke guest stationery, in-room dining menus, signage systems, and digital assets crafted for boutique hotels, houseboats, and luxury valley resorts.",
      badge: "Hospitality Branding",
    },
    {
      icon: Award,
      title: "Sports & Club Brand Direction",
      description: "Matchday visual templates, kit sleeve typography, sponsor pitch presentations, and fan merchandise design as proven with Kehribal FC.",
      badge: "Sports & Culture",
    },
    {
      icon: ShieldCheck,
      title: "Trademark & Copyright Readiness",
      description: "Original vector artworks and typography systems prepared for Indian trademark registration and IP protection with zero copyright conflicts.",
      badge: "IP Ready",
    },
  ];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        badge="Creative Direction • Anantnag & Srinagar"
        title="Luxury Brand Identity &"
        highlightText="Visual Positioning"
        description="We craft unforgettable brand identities, luxury packaging, and cohesive visual systems that command high price points for businesses in Kashmir and across India."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Brand Management" },
        ]}
      />

      <AnimatedSection className="textured-bg py-28 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="luxury-badge">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Creative Disciplines</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
              Design That Commands <span className="font-serif italic font-normal text-blue-600">Prestige &amp; Trust</span>
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              From Kashmir&apos;s heritage crafts to modern tech startups, we build enduring identities that resonate across global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {brandPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
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
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    <span>Vector Scalable &amp; Print-Ready</span>
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
