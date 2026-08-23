import React from 'react';
import { generateSeoMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Kashmir Local SEO Guide: Ranking #1 On Google Maps In Srinagar | Waadi Media',
    description: 'Step-by-step local SEO guide for ranking Kashmir businesses on Google Search and Maps pack. Google Business Profile setup, NAP consistency, and schema markup.',
    path: '/insights/local-seo-and-google-business-profile-kashmir'
});

export default function ArticleThreePage() {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Insights", url: "/insights" },
        { name: "Local SEO Guide Kashmir", url: "/insights/local-seo-and-google-business-profile-kashmir" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-3xl mx-auto space-y-8">
                <Link href="/insights" className="inline-flex items-center space-x-2 text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                    <ArrowLeft size={16} />
                    <span>Back to Insights</span>
                </Link>

                <div className="space-y-4">
                    <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">SEO Strategy</span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Kashmir Local SEO Guide: Ranking #1 On Google Maps In Srinagar
                    </h1>
                    <div className="text-xs text-slate-400">Published by Waadi Media SEO Team • 7 min read</div>
                </div>

                <div className="ui-card p-8 sm:p-10 rounded-3xl space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    <p>
                        When tourists and local customers search for &quot;best hotel in Gulmarg&quot; or &quot;cafe in Srinagar&quot;, Google Map Packs appear above organic search listings. Achieving top 3 map pack visibility requires disciplined local SEO execution.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Google Business Profile Optimization</h2>
                    <p>
                        Ensure your business name, primary category, subcategories, address, phone number, and operating hours are accurate and updated regularly with real geotagged photos.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Schema.org LocalBusiness Markup</h2>
                    <p>
                        Embedding JSON-LD structured data on your website communicates exact geo-coordinates, service areas, and customer review metrics directly to search engines in machine-readable format.
                    </p>
                </div>
            </div>
        </div>
    );
}
