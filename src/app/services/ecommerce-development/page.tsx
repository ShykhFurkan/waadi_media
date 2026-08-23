import React from 'react';
import { generateSeoMetadata, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'E-Commerce Development Company in Kashmir | Pashmina & Crafts',
    description: 'Premier e-commerce development company in Kashmir. Custom online stores for Pashmina shawls, handicrafts, retail outlets, and global export businesses.',
    path: '/services/ecommerce-development'
});

export default function EcommerceDevelopmentPage() {
    const serviceSchema = generateServiceSchema({
        name: "E-Commerce Store Development in Kashmir",
        description: "Custom e-commerce platforms, global shipping integration, Razorpay/Stripe checkouts, and Pashmina craft storefronts.",
        path: "/services/ecommerce-development"
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "E-Commerce Development", url: "/services/ecommerce-development" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <ShoppingBag size={14} />
                        <span>Kashmir E-Commerce Leader</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        E-Commerce Development <br />
                        <span className="text-blue-600 dark:text-blue-500">in Kashmir</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        We build high-converting global online stores for Pashmina heritage brands, handicrafts, and local retail outlets scaling worldwide.
                    </p>
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">E-Commerce Features Scope</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "Custom Storefronts & High-Speed Next.js/Shopify Build",
                            "Global Multi-Currency & Language Converters",
                            "Razorpay, Stripe, PayTM & International Checkouts",
                            "Automated Shipping & Courier API Integrations",
                            "Inventory Sync & Stock Management",
                            "Cart Abandonment Recovery & Conversion Funnels"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ready To Sell Your Kashmir Products Worldwide?</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Speak with our e-commerce developers in Srinagar today.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Request E-Commerce Store</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
