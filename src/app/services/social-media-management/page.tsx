import type { Metadata } from "next";
import Link from "next/link";
import { Share2, CheckCircle2, ArrowUpRight, Instagram, Facebook, Users, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Social Media Management Agency in Kashmir | Waadi Media",
  description:
    "Grow your brand on Instagram, Facebook & LinkedIn with Waadi Media's social media management services for businesses in Anantnag and Srinagar.",
  alternates: {
    canonical: "https://waadimedia.com/services/social-media-management",
  },
  openGraph: {
    title: "Social Media Management Agency in Kashmir | Waadi Media",
    description:
      "Grow your brand on Instagram, Facebook & LinkedIn with Waadi Media's social media management services in Kashmir.",
    url: "https://waadimedia.com/services/social-media-management",
    siteName: "Waadi Media",
    images: ["/kehribal-fc-showcase.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Management Agency in Kashmir | Waadi Media",
    description:
      "Grow your brand on Instagram, Facebook & LinkedIn with Waadi Media's social media management services in Kashmir.",
    images: ["/kehribal-fc-showcase.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Social Media Management",
  provider: {
    "@type": "Organization",
    name: "Waadi Media",
  },
  areaServed: ["Anantnag", "Srinagar", "Kashmir Valley"],
  description:
    "End-to-end management of Instagram and Facebook pages, graphic creation, reel production, community growth, and digital brand management in Kashmir.",
  url: "https://waadimedia.com/services/social-media-management",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://waadimedia.com/services" },
    { "@type": "ListItem", position: 3, name: "Social Media Management", item: "https://waadimedia.com/services/social-media-management" },
  ],
};

export default function SocialMediaManagementPage() {
  const kehribalProject = {
    title: "Kehribal FC Brand & Social Management",
    category: "Sports Brand Growth",
    image: "/kehribal-fc-showcase.jpg",
    alt: "Kehribal FC social media management and graphic design by Waadi Media",
    description:
      "Full digital management for Kehribal FC's official Instagram and Facebook pages, creating match day creatives, reels, and fan engagement campaigns.",
    outcomes: [
      "Consistent matchday graphics & highlight reels",
      "Increased local fan engagement across Kashmir",
      "Sponsor logo placement & brand promotion",
    ],
    tech: ["Instagram Growth", "Facebook Page Management", "Graphic Design"],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="py-12 lg:py-16 bg-gradient-to-b from-blue-50/60 to-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: "Social Media Management", href: "/services/social-media-management" },
            ]}
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Share2 className="h-3.5 w-3.5 text-blue-600" />
              <span>Social Media Growth</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Social Media Management Agency in Kashmir
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              We manage and grow Instagram, Facebook, and LinkedIn channels for local brands, educational consultancies, and sports clubs across Anantnag and Srinagar.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Active Client Management: Kehribal FC & Kaali Edge
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Waadi Media handles everything from post scheduling and custom graphic artwork to video reel editing and audience interaction.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-pink-600 font-bold text-sm">
                    <Instagram className="h-4 w-4" />
                    <span>Instagram Growth</span>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    Custom graphics, match day banners, story polls, and video reels.
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    <Facebook className="h-4 w-4" />
                    <span>Facebook Page Control</span>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    Community updates, local ad campaigns, and page reputation management.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ProjectCard project={kehribalProject} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
