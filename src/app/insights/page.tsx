import React from 'react';
import { generateSeoMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Insights & Kashmir Business Technology Guides | Waadi Media',
    description: 'Expert research, web development guides, social media strategies, and digital scaling playbooks for Kashmir business owners.',
    path: '/insights'
});

const articles = [
    {
        slug: "how-to-scale-kashmir-businesses-digitally",
        category: "Kashmir Business Growth",
        title: "How To Scale A Kashmir Business Digitally In 2026",
        description: "A comprehensive guide on leveraging Next.js websites, WhatsApp API automations, and targeted Instagram Reels to expand beyond traditional storefront limits.",
        date: "August 2026",
        readTime: "6 min read"
    },
    {
        slug: "web-development-guide-kashmir",
        category: "Web Engineering",
        title: "Why Custom Next.js Beats Legacy Website Builders For Kashmir Brands",
        description: "Analyzing performance metrics (<0.8s load time), security advantages, and Google search ranking power for local hospitality and retail platforms.",
        date: "August 2026",
        readTime: "8 min read"
    },
    {
        slug: "local-seo-and-google-business-profile-kashmir",
        category: "SEO Strategy",
        title: "Kashmir Local SEO Guide: Ranking #1 On Google Maps In Srinagar",
        description: "Step-by-step strategies for optimizing Google Business Profiles, local NAP citations, and schema markup to capture high-intent regional searches.",
        date: "August 2026",
        readTime: "7 min read"
    }
];

export default function InsightsPage() {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Insights", url: "/insights" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-6xl mx-auto space-y-16">
                
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <BookOpen size={14} />
                        <span>Topical Authority & Knowledge</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Waadi Media <span className="text-blue-600 dark:text-blue-500">Insights</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                        In-depth articles, technical playbooks, and strategic guides written by Kashmir&apos;s leading software engineers and growth marketers.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {articles.map((art) => (
                        <div key={art.slug} className="ui-card p-6 rounded-3xl flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-[11px] font-bold text-blue-600 dark:text-blue-400">
                                    <span className="uppercase">{art.category}</span>
                                    <span className="text-slate-400 font-normal">{art.readTime}</span>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                                </h2>

                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {art.description}
                                </p>
                            </div>

                            <Link href={`/insights/${art.slug}`} passHref>
                                <div className="pt-2 flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                                    <span>Read Article</span>
                                    <ArrowRight size={14} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
