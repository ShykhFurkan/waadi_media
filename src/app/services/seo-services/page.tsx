import React from 'react';
import { generateSeoMetadata, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Search, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'SEO Agency in Kashmir & Srinagar | Search Engine Optimization',
    description: 'Premier SEO agency in Kashmir & Srinagar. Technical SEO, local Google Business Profile ranking, schema markup, and organic traffic growth for local businesses.',
    path: '/services/seo-services'
});

export default function SeoServicesPage() {
    const serviceSchema = generateServiceSchema({
        name: "SEO Services & Local Business Ranking in Kashmir",
        description: "Technical SEO, Google Business Profile optimization, local citation building, and search engine ranking.",
        path: "/services/seo-services"
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "SEO Services", url: "/services/seo-services" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Search size={14} />
                        <span>Kashmir SEO Leader</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        SEO Agency in Kashmir <br />
                        <span className="text-blue-600 dark:text-blue-500">& Srinagar</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        We optimize your digital presence for top Google search rankings, local map packs, and long-term organic traffic.
                    </p>
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">SEO Architecture Scope</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "Technical SEO & Google Core Web Vitals Optimization",
                            "Google Business Profile & Local Map Pack Ranking",
                            "Schema.org JSON-LD Structured Data Implementation",
                            "Keyword Research & Search Intent Mapping",
                            "Kashmir Regional Citation & NAP Consistency",
                            "Content Clustering & Topical Authority Building"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Want To Rank #1 On Google In Kashmir?</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Request an in-depth SEO website audit today.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Request SEO Audit</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
