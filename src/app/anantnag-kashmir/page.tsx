import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, CheckCircle2, ArrowUpRight, Building2, Globe2, Award } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Software & Web Development Agency Serving Anantnag & Srinagar | Waadi Media",
  description:
    "Based in Anantnag, Waadi Media serves clients across Srinagar and the Kashmir Valley with web development, software, and social media services.",
  alternates: {
    canonical: "https://waadimedia.com/anantnag-kashmir",
  },
  openGraph: {
    title: "Software & Web Development Agency Serving Anantnag & Srinagar | Waadi Media",
    description:
      "Based in Anantnag, Waadi Media serves clients across Srinagar and the Kashmir Valley with web development, software, and social media services.",
    url: "https://waadimedia.com/anantnag-kashmir",
    siteName: "Waadi Media",
    images: ["/kashmir_hero_bg.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software & Web Development Agency Serving Anantnag & Srinagar | Waadi Media",
    description:
      "Based in Anantnag, Waadi Media serves clients across Srinagar and the Kashmir Valley.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Waadi Media",
  image: "https://waadimedia.com/logo.png",
  url: "https://waadimedia.com/anantnag-kashmir",
  telephone: "+91-7780940317",
  email: "contact@waadimedia.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Town",
    addressLocality: "Anantnag",
    addressRegion: "Jammu and Kashmir",
    postalCode: "192101",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "33.7311",
    longitude: "75.1487",
  },
  areaServed: [
    { "@type": "City", name: "Anantnag" },
    { "@type": "City", name: "Srinagar" },
    { "@type": "AdministrativeArea", name: "Kashmir Valley" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Anantnag & Kashmir", item: "https://waadimedia.com/anantnag-kashmir" },
  ],
};

export default function AnantnagKashmirPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Eye-Catching Scenic Page Hero */}
      <PageHero
        badge="Anantnag • Srinagar • Kashmir Valley"
        title="Digital Agency Serving"
        highlightText="Anantnag & Srinagar"
        description="Waadi Media is rooted in Anantnag, Kashmir. We work directly with local business owners, travel operators, and consultants across the Kashmir Valley."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Anantnag & Kashmir" }]}
        stats={[
          { label: "Headquarters", value: "Anantnag", icon: <MapPin className="h-4 w-4 text-blue-400" /> },
          { label: "Service Radius", value: "All Kashmir", icon: <Globe2 className="h-4 w-4 text-blue-400" /> },
          { label: "Local Clients", value: "Wonder & Kaali", icon: <Award className="h-4 w-4 text-blue-400" /> },
          { label: "Direct Phone", value: "+91 7780940317", icon: <Phone className="h-4 w-4 text-blue-400" /> },
        ]}
      />

      <AnimatedSection className="py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
                Empowering Local Businesses in Kashmir with Modern Engineering
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  As an independent software engineer based in Anantnag, <strong>Furkan Mushtaq</strong> understands the unique market dynamics, seasonal tourism flows, and local SEO challenges faced by Valley businesses.
                </p>
                <p>
                  We build custom web platforms, automated lead-capture systems, and localized content strategies tailored specifically to help brands in Anantnag, Srinagar, Gulmarg, and Pahalgam rank at the top of search results.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                {[
                  "Kashmir Tourism & Hotel Portals",
                  "Educational Consultancy Portals",
                  "Local Sports Club Brand Growth",
                  "Hyper-Local Google Maps Pack SEO",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-xl space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">Get in Touch Directly</h3>
                  <p className="text-xs text-slate-600">Based in Anantnag, J&K. Available for in-person meetings in Anantnag & Srinagar.</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
                    <span>Main Town, Anantnag, Jammu & Kashmir 192101</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <Phone className="h-5 w-5 text-blue-600 shrink-0" />
                    <a href="tel:+917780940317" className="hover:text-blue-600 font-semibold">+91 7780940317</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                    <a href="mailto:contact@waadimedia.com" className="hover:text-blue-600 font-semibold">contact@waadimedia.com</a>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Link
                    href="/contact"
                    className="inline-flex w-full justify-center items-center gap-2 rounded-full bg-blue-600 py-3.5 text-xs font-bold text-white shadow-lg hover:bg-blue-700 transition-all"
                  >
                    <span>Schedule Local Consultation &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Inquiry Form Section */}
      <AnimatedSection className="py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InquiryForm />
        </div>
      </AnimatedSection>
    </>
  );
}
