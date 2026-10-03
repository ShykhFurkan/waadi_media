import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, CheckCircle2, ArrowUpRight, Zap, Bot, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "AI Automation & Custom AI Pipeline Development | Waadi Media",
  description:
    "We build AI-powered hiring platforms, chatbots, and automation pipelines for startups and businesses worldwide. Led by Furkan Mushtaq, Waadi Media.",
  alternates: {
    canonical: "https://waadimedia.com/services/ai-automation",
  },
  openGraph: {
    title: "AI Automation & Custom AI Pipeline Development | Waadi Media",
    description:
      "We build AI-powered hiring platforms, chatbots, and automation pipelines for startups and businesses worldwide.",
    url: "https://waadimedia.com/services/ai-automation",
    siteName: "Waadi Media",
    images: ["/smart-hire-mockup.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation & Custom AI Pipeline Development | Waadi Media",
    description:
      "We build AI-powered hiring platforms, chatbots, and automation pipelines for startups and businesses worldwide.",
    images: ["/smart-hire-mockup.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Automation",
  provider: {
    "@type": "Organization",
    name: "Waadi Media",
  },
  areaServed: ["Anantnag", "Srinagar", "Kashmir Valley", "Remote"],
  description:
    "Custom AI pipeline engineering, automated talent recruitment systems (SmartHire), intelligent LLM workflows, and candidate evaluation engines.",
  url: "https://waadimedia.com/services/ai-automation",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://waadimedia.com/services" },
    { "@type": "ListItem", position: 3, name: "AI Automation", item: "https://waadimedia.com/services/ai-automation" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SmartHire and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SmartHire is an automated AI recruitment platform built by Waadi Media. It processes candidate applications, parses resumes, and scores talent fit automatically using custom AI pipelines.",
      },
    },
    {
      "@type": "Question",
      name: "Can Waadi Media integrate custom AI pipelines into existing business software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we build API-first AI pipelines that plug into your existing website, CRM, or database to automate repetitive data entry, screening, and content workflows.",
      },
    },
  ],
};

export default function AIAutomationPage() {
  const smartHireProject = {
    title: "SmartHire AI Talent Platform",
    category: "AI & Pipeline System",
    image: "/smart-hire-mockup.png",
    alt: "SmartHire AI recruitment automation platform by Waadi Media",
    description:
      "Automated AI pipeline system designed for hiring new talent using automated AI candidate evaluation, resume parsing, and screening.",
    outcomes: [
      "Automated candidate resume parsing pipeline",
      "Reduced HR screening time by 75%",
      "Custom evaluation scoring interface",
    ],
    tech: ["AI Pipelines", "Next.js", "TypeScript", "Python/API"],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <section className="py-12 lg:py-16 bg-gradient-to-b from-blue-50/60 to-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: "AI Automation", href: "/services/ai-automation" },
            ]}
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Cpu className="h-3.5 w-3.5 text-blue-600" />
              <span>AI Engineering & Automation</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              AI Automation & Custom AI Pipeline Development
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              We design and deploy automated AI pipeline systems—such as our flagship candidate recruitment platform <strong>SmartHire</strong>—to eliminate repetitive manual work.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Transform Operations with Custom AI Pipelines
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Whether you need automated talent screening, customer support AI assistants, or custom LLM data processors, Waadi Media builds scalable AI systems tailored for real-world reliability.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "Automated Hiring Pipelines (SmartHire)",
                    desc: "Parse hundreds of candidate resumes automatically and rank talent using custom criteria.",
                  },
                  {
                    title: "Intelligent Document & Data Processing",
                    desc: "Extract structured data from emails, invoices, and forms automatically.",
                  },
                  {
                    title: "Seamless API Integration",
                    desc: "Connect AI capabilities directly into your Next.js, React, or mobile application.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4 bg-slate-50">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{item.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <ProjectCard project={smartHireProject} />
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions (AI Automation)
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50 space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  Does Waadi Media work with clients outside Kashmir for AI projects?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes, Waadi Media works with remote and international clients on software, AI, and web development projects in addition to serving local businesses in Anantnag and Srinagar.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50 space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  What technologies are used in AI pipeline development?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We leverage Python, Next.js API routes, Supabase vector databases, and custom LLM prompt pipelines for high performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
