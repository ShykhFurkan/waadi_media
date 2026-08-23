import React from 'react';
import { generateSeoMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Why Custom Next.js Beats Legacy Website Builders For Kashmir Brands | Waadi Media',
    description: 'Technical analysis of website speed, Core Web Vitals, Google SEO ranking, and security advantages of custom Next.js web development in Kashmir.',
    path: '/insights/web-development-guide-kashmir'
});

export default function ArticleTwoPage() {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Insights", url: "/insights" },
        { name: "Web Development Guide Kashmir", url: "/insights/web-development-guide-kashmir" }
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
                    <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">Web Engineering</span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Why Custom Next.js Beats Legacy Website Builders For Kashmir Brands
                    </h1>
                    <div className="text-xs text-slate-400">Published by Waadi Media Engineering Team • 8 min read</div>
                </div>

                <div className="ui-card p-8 sm:p-10 rounded-3xl space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    <p>
                        Many business owners in Srinagar initially opt for generic site builders. However, as business volume grows, severe technical limitations emerge around load times, mobile responsiveness, and Google search indexability.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Page Speed & Google Core Web Vitals</h2>
                    <p>
                        Next.js utilizes Server-Side Rendering (SSR) and Static Site Generation (SSG), pre-rendering HTML pages before sending them to the browser. This results in ultra-fast page loads (under 0.8 seconds), dramatically lowering bounce rates.
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Bank-Grade Security & Custom Integrations</h2>
                    <p>
                        Custom Next.js applications eliminate vulnerable third-party plugin bloat, providing secure payment integration with Razorpay and Stripe alongside custom database connections.
                    </p>
                </div>
            </div>
        </div>
    );
}
