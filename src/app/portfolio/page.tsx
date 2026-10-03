import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowUpRight, Award, Globe2, Cpu, Share2 } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Waadi Media Portfolio | Client Case Studies & Projects",
  description:
    "Explore Waadi Media's portfolio of custom websites, AI hiring platforms, educational consultancies, and social media brand growth in Kashmir.",
  alternates: {
    canonical: "https://waadimedia.com/portfolio",
  },
  openGraph: {
    title: "Waadi Media Portfolio | Client Case Studies & Projects",
    description:
      "Explore Waadi Media's portfolio of custom websites, AI hiring platforms, and social media brand growth in Kashmir.",
    url: "https://waadimedia.com/portfolio",
    siteName: "Waadi Media",
    images: ["/wonder-delight-mockup.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waadi Media Portfolio | Client Case Studies & Projects",
    description:
      "Explore Waadi Media's portfolio of custom websites, AI hiring platforms, and social media brand growth in Kashmir.",
    images: ["/wonder-delight-mockup.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://waadimedia.com/portfolio" },
  ],
};

const creativeWorkSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Wonder Delight Travels — Travel Booking Platform",
    creator: { "@type": "Organization", name: "Waadi Media" },
    about: "Travel agency package booking engine",
    url: "https://wonderdelighttravels.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Kaali Edge Consultancy — Educational Admissions Portal",
    creator: { "@type": "Organization", name: "Waadi Media" },
    about: "Educational consultancy portal for MBBS admissions abroad",
    url: "https://kaaliedge.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "SmartHire — AI Talent Platform",
    creator: { "@type": "Organization", name: "Waadi Media" },
    about: "AI automated hiring pipeline system",
  },
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Kehribal FC — Sports Brand Management",
    creator: { "@type": "Organization", name: "Waadi Media" },
    about: "Football club social media growth and brand management",
  },
];

export default function PortfolioPage() {
  const projects = [
    {
      title: "Wonder Delight Travels",
      category: "Web Development & E-Commerce",
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
    {
      title: "SmartHire AI Platform",
      category: "AI & Custom Software",
      image: "/smart-hire-mockup.png",
      alt: "SmartHire AI talent recruitment system built by Waadi Media",
      description:
        "Automated AI pipeline system designed for recruiting new talent using automated resume filtering and candidate evaluation.",
      outcomes: [
        "Automated AI candidate parsing pipeline",
        "Reduced hiring screening time by 75%",
        "Seamless dashboard interface",
      ],
      tech: ["AI Pipelines", "Next.js", "TypeScript", "Python/API"],
    },
    {
      title: "Kehribal FC Brand Growth",
      category: "Social Media & Brand Management",
      image: "/kehribal-fc-showcase.jpg",
      alt: "Kehribal FC social media management and branding by Waadi Media",
      description:
        "End-to-end management of Kehribal FC's Instagram and Facebook pages, driving fan engagement and sponsor visibility.",
      outcomes: [
        "Multi-channel social media content strategy",
        "Match graphic design & reel production",
        "Consistent brand voice across Valley sports",
      ],
      tech: ["Social Media Strategy", "Content Design", "Community Growth"],
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {creativeWorkSchemas.map((schema, idx) => (
        <JsonLd key={idx} data={schema} />
      ))}

      {/* Eye-Catching Scenic Page Hero */}
      <PageHero
        badge="Proven Work & Case Studies"
        title="Featured Projects &"
        highlightText="Client Solutions"
        description="Explore how Waadi Media engineers Next.js web applications, AI automation tools, and social growth campaigns for brands across Kashmir."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        stats={[
          { label: "Client Solutions", value: "10+", icon: <Award className="h-4 w-4 text-blue-400" /> },
          { label: "Web Engineering", value: "Next.js 14", icon: <Globe2 className="h-4 w-4 text-blue-400" /> },
          { label: "AI Candidate ATS", value: "SmartHire", icon: <Cpu className="h-4 w-4 text-blue-400" /> },
          { label: "Social Impressions", value: "100k+", icon: <Share2 className="h-4 w-4 text-blue-400" /> },
        ]}
      />

      {/* Case Studies Grid Section */}
      <AnimatedSection className="py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">Selected Case Studies</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
                High-Impact Web, AI & Media Work
              </h3>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all self-start md:self-auto"
            >
              <span>Build Your Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Project Consultation CTA */}
      <AnimatedSection className="py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight">
            Have a project in mind for your brand in Kashmir?
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            From travel portals to AI automated workflows and social growth, we engineer every project with precision.
          </p>
          <div className="pt-4 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-blue-500 active:scale-95 transition-all"
            >
              <span>Request Free Consultation &rarr;</span>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
