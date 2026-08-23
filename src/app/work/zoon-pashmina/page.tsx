import React from 'react';
import { generateSeoMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Zoon Pashmina Global E-Commerce Case Study | Waadi Media',
    description: 'International luxury e-commerce platform for handwoven Pashmina shawls and Kashmiri handicrafts built by Waadi Media.',
    path: '/work/zoon-pashmina'
});

export default function ZoonPashminaCaseStudyPage() {
    const breadcrumbs = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Zoon Pashmina E-Commerce", url: "/work/zoon-pashmina" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                        Global E-Commerce Storefront
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Zoon Pashmina Global <br />
                        <span className="text-blue-600 dark:text-blue-500">Craft E-Commerce</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        Building an international luxury e-commerce store for handwoven Pashmina shawls, woodcrafts, and artisanal heritage products with multi-currency checkout.
                    </p>
                </div>

                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-video bg-slate-900">
                    <Image src="/handicraft-mockup.jpg" alt="Zoon Pashmina E-Commerce" fill className="object-cover" />
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Measured Business Impact</h2>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>12x Global Online Sales Growth</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Automated Currency Conversion (USD, EUR, GBP, INR)</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Studio Product Photography & Media</span></div>
                        <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /><span>Meta Retargeting Ads Campaign</span></div>
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sell Your Kashmiri Handicrafts Internationally?</h2>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase cursor-pointer">
                            <span>Request E-Commerce Store</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
