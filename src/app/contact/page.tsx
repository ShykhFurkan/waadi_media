import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Contact Waadi Media Anantnag | Software & Digital Agency Kashmir",
  description:
    "Get in touch with Waadi Media and Furkan Mushtaq. Phone: +91 7780940317, Email: contact@waadimedia.com, Location: Anantnag, Jammu & Kashmir.",
  alternates: {
    canonical: "https://waadimedia.com/contact",
  },
  openGraph: {
    title: "Contact Waadi Media Anantnag | Software & Digital Agency Kashmir",
    description:
      "Get in touch with Waadi Media and Furkan Mushtaq in Anantnag, Kashmir. Phone: +91 7780940317.",
    url: "https://waadimedia.com/contact",
    siteName: "Waadi Media",
    images: ["/kashmir_hero_bg.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Waadi Media Anantnag | Software & Digital Agency Kashmir",
    description:
      "Get in touch with Waadi Media and Furkan Mushtaq in Anantnag, Kashmir.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://waadimedia.com/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Eye-Catching Scenic Page Hero */}
      <PageHero
        badge="Direct Founder Communication"
        title="Start Your Digital"
        highlightText="Transformation"
        description="Have a web development project, custom AI pipeline requirement, or social media management query? Contact Furkan Mushtaq today."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        stats={[
          { label: "Direct Phone", value: "+91 7780940317", icon: <Phone className="h-4 w-4 text-blue-400" /> },
          { label: "Response Window", value: "< 24 Hours", icon: <Clock className="h-4 w-4 text-blue-400" /> },
          { label: "Email Support", value: "contact@waadimedia.com", icon: <Mail className="h-4 w-4 text-blue-400" /> },
          { label: "HQ Location", value: "Anantnag, JK", icon: <MapPin className="h-4 w-4 text-blue-400" /> },
        ]}
      />

      <AnimatedSection className="py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            {/* Contact Details & Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  <span>Direct Communication</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">Direct Contact Details</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Reach out directly via phone, WhatsApp, or email. We respond to all project inquiries within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 rounded-3xl border border-slate-200 p-6 bg-slate-50/80 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call / WhatsApp</div>
                    <a
                      href="tel:+917780940317"
                      className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      +91 7780940317
                    </a>
                    <div className="text-xs text-slate-500 mt-1">Click to call directly on mobile</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-3xl border border-slate-200 p-6 bg-slate-50/80 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</div>
                    <a
                      href="mailto:contact@waadimedia.com"
                      className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      contact@waadimedia.com
                    </a>
                    <div className="text-xs text-slate-500 mt-1">For proposals & RFP submissions</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-3xl border border-slate-200 p-6 bg-slate-50/80 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Office Location</div>
                    <div className="text-base font-bold text-slate-900">
                      Anantnag, Jammu & Kashmir 192101
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Serving clients in Srinagar, Kashmir & globally</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-8 sm:p-10 shadow-lg">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
