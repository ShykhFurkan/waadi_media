import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BLOG_POSTS } from "@/data/blogs";
import { BlogListClient } from "./BlogListClient";

export const metadata: Metadata = {
  title: "Kashmir Business & Technology Blog | Web Dev, SEO & AI Guides | Waadi Media",
  description:
    "Explore actionable guides on web development, local SEO, D2C saffron & handicraft e-commerce, hotel direct bookings, and WhatsApp automation in Kashmir.",
  alternates: {
    canonical: "https://waadimedia.com/blog",
  },
  openGraph: {
    title: "Kashmir Business & Technology Blog | Web Dev, SEO & AI Guides | Waadi Media",
    description:
      "Actionable engineering, SEO, and digital growth playbooks tailored for businesses across Srinagar, Anantnag, and Kashmir.",
    url: "https://waadimedia.com/blog",
    siteName: "Waadi Media",
    images: ["/kashmir_hero_bg.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashmir Business & Technology Blog | Web Dev, SEO & AI Guides | Waadi Media",
    description:
      "Actionable engineering, SEO, and digital growth playbooks tailored for businesses across Srinagar, Anantnag, and Kashmir.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://waadimedia.com/blog" },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Waadi Media Kashmir Business & Engineering Blog",
  description:
    "Expert guides on e-commerce, hotel direct booking systems, local SEO, web development costs, and AI automation in Jammu & Kashmir.",
  url: "https://waadimedia.com/blog",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: BLOG_POSTS.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://waadimedia.com/blog/${post.slug}`,
      name: post.title,
    })),
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />

      {/* Hero Section */}
      <PageHero
        badge="Kashmir Digital Growth & Tech Guides"
        title="Web, E-Commerce & AI"
        highlightText="Playbooks for Kashmir"
        description="Researched guides, technical blueprints, and growth playbooks tailored for business owners, artisans, hoteliers, and startups in Jammu & Kashmir."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <AnimatedSection className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
              Actionable Business & Tech Guides
            </h2>
            <p className="text-slate-600 text-sm">
              Discover proven digital strategies to expand beyond storefront boundaries, eliminate middleman cuts, and win the local Kashmir market.
            </p>
          </div>

          {/* Interactive Filterable Client Component */}
          <BlogListClient initialPosts={BLOG_POSTS} />
        </div>
      </AnimatedSection>
    </>
  );
}
