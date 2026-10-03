import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Code2, Cpu, GraduationCap, CheckCircle2, ArrowUpRight, Award, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "About Furkan Mushtaq & Waadi Media | Software & AI Agency Kashmir",
  description:
    "Learn about Waadi Media and founder Furkan Mushtaq, a Computer Science & Technology graduate building custom software, web applications and AI pipelines in Kashmir.",
  alternates: {
    canonical: "https://waadimedia.com/about",
  },
  openGraph: {
    title: "About Furkan Mushtaq & Waadi Media | Software & AI Agency Kashmir",
    description:
      "Learn about Waadi Media and founder Furkan Mushtaq, a Computer Science & Technology graduate building custom software in Kashmir.",
    url: "https://waadimedia.com/about",
    siteName: "Waadi Media",
    images: ["/kashmir_hero_bg.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Furkan Mushtaq & Waadi Media | Software & AI Agency Kashmir",
    description:
      "Learn about Waadi Media and founder Furkan Mushtaq, CS & Technology graduate in Kashmir.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Furkan Mushtaq",
  jobTitle: "Founder & Lead Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Waadi Media",
  },
  url: "https://waadimedia.com/about",
  sameAs: ["https://www.linkedin.com/in/furkanmushtaq", "https://github.com/furkanmushtaq"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://waadimedia.com/about" },
  ],
};

export default function AboutPage() {
  const techSkills = [
    { category: "Core Web & Frontend", items: ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "HTML5/CSS3"] },
    { category: "Backend & Systems", items: ["Node.js", "Python", "Supabase / PostgreSQL", "REST & GraphQL APIs"] },
    { category: "AI & Automation", items: ["AI Candidate Screening (SmartHire)", "LLM Pipelines", "Workflow Automation"] },
    { category: "Digital Marketing & SEO", items: ["Local Kashmir SEO", "Social Media Management", "JSON-LD Schema Markup"] },
  ];

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Eye-Catching Scenic Page Hero */}
      <PageHero
        badge="Founder & Lead Software Engineer"
        title="About Furkan Mushtaq &"
        highlightText="Waadi Media"
        description="Combining Computer Science precision with Kashmir Valley business insight to craft ultra-fast web platforms, AI tools, and social growth campaigns."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        stats={[
          { label: "B.Tech Grad", value: "CS & Tech", icon: <GraduationCap className="h-4 w-4 text-blue-400" /> },
          { label: "Engineering Standard", value: "Next.js 14", icon: <Code2 className="h-4 w-4 text-blue-400" /> },
          { label: "AI Workflows", value: "SmartHire", icon: <Cpu className="h-4 w-4 text-blue-400" /> },
          { label: "Base Location", value: "Anantnag, JK", icon: <Award className="h-4 w-4 text-blue-400" /> },
        ]}
      />

      {/* Main Story & Background Section */}
      <AnimatedSection className="py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
                <span>Agency Background</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
                The Story Behind Waadi Media
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  Waadi Media was established by <strong>Furkan Mushtaq</strong>, an engineering graduate in Computer Science & Technology, with a vision to bridge the technology gap for businesses in the Kashmir Valley.
                </p>
                <p>
                  Having spent years studying software architectures, database design, and emerging AI frameworks, Furkan recognized that local businesses—ranging from travel agencies to educational consultancies and local sports clubs—often lacked modern, fast, and SEO-optimized digital infrastructure.
                </p>
                <p>
                  Today, Waadi Media serves as a full-service freelance digital agency, delivering tailor-made web platforms (such as <strong>wonderdelighttravels.com</strong> and <strong>kaaliedge.com</strong>), AI automated pipelines (such as <strong>SmartHire</strong>), and active social media management (such as <strong>Kehribal FC</strong>).
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
                <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50 space-y-2">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  <div className="text-base font-bold text-slate-900">Engineering Background</div>
                  <div className="text-xs text-slate-600">Computer Science & Technology graduate with deep technical grounding.</div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50 space-y-2">
                  <Cpu className="h-6 w-6 text-blue-600" />
                  <div className="text-base font-bold text-slate-900">AI & Software Integration</div>
                  <div className="text-xs text-slate-600">Specializing in custom web architectures, AI automation, and REST APIs.</div>
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-2xl space-y-6">
                <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-800 border border-slate-700">
                  <Image
                    src="/logo.png"
                    alt="Furkan Mushtaq - Founder of Waadi Media"
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Furkan Mushtaq</h3>
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Founder & Software Engineer</p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>B.Tech in Computer Science & Technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Based in Anantnag, Jammu & Kashmir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Available for Local & Remote Engineering Projects</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-blue-500 transition-all"
                  >
                    <span>Get in Touch</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Tech Stack Matrix Section */}
      <AnimatedSection className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
              Technical Competencies & Expertise
            </h2>
            <p className="text-sm text-slate-600">
              Modern tools and frameworks used at Waadi Media to build fast, robust, and scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techSkills.map((skill, idx) => (
              <div key={idx} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                  {skill.category}
                </h3>
                <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                  {skill.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
