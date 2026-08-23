import React from 'react';
import { generateSeoMetadata, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'SaaS Development Company in Kashmir | Custom Cloud Products',
    description: 'Premier SaaS development company in Kashmir. We design, engineer, and deploy subscription cloud products with automated billing and multi-tenant databases.',
    path: '/services/saas-development'
});

export default function SaasDevelopmentPage() {
    const serviceSchema = generateServiceSchema({
        name: "SaaS Product Development in Kashmir",
        description: "Cloud software as a service product engineering, multi-tenant databases, and subscription billing software.",
        path: "/services/saas-development"
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "SaaS Development", url: "/services/saas-development" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="max-w-5xl mx-auto space-y-16">

                {/* Hero */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Zap size={14} />
                        <span>SaaS Product Engineering</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        SaaS Development Company <br />
                        <span className="text-blue-600 dark:text-blue-500">in Kashmir</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        We build scalable, multi-tenant cloud software products with robust subscription billing, analytics, and enterprise controls.
                    </p>
                </div>

                {/* Scope */}
                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">SaaS Product Architecture Scope</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "Multi-Tenant Cloud Database Architecture",
                            "Automated Stripe & Razorpay Subscription Billing",
                            "User Roles, Permissions & Team Dashboards",
                            "API Gateways & External Integrations",
                            "Scalable Next.js & Serverless Microservices",
                            "Real-Time Analytics & Usage Tracking"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Building A Cloud Software Product?</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Schedule an engineering roadmap session with our SaaS architects.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Request SaaS Architecture</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
