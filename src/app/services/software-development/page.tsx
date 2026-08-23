import React from 'react';
import { generateSeoMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from '@/lib/seo';
import { Cpu, CheckCircle2, ArrowRight, Database, ShieldCheck, Smartphone } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Software Development Company in Kashmir | Custom Apps & Systems',
    description: 'Leading software development company in Kashmir & Srinagar. Custom mobile apps, POS software, internal management tools, and enterprise systems built for local businesses.',
    path: '/services/software-development'
});

const faqs = [
    { q: "What types of software do you build in Kashmir?", a: "We build Point of Sale (POS) software, internal management CRM tools, mobile cross-platform apps (iOS & Android), inventory tracking systems, and custom business databases." },
    { q: "Can your software operate offline during Kashmir internet outages?", a: "Yes! We specialize in local offline-first architecture that keeps your business operating smoothly during network interruptions and auto-syncs when online." }
];

export default function SoftwareDevelopmentPage() {
    const serviceSchema = generateServiceSchema({
        name: "Software & Mobile App Development in Kashmir",
        description: "Custom business software, POS systems, mobile applications, and internal tools engineered for Kashmir enterprises.",
        path: "/services/software-development"
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Software Development", url: "/services/software-development" }
    ]);

    const faqSchema = generateFaqSchema(faqs);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="max-w-5xl mx-auto space-y-16">

                {/* Hero */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Cpu size={14} />
                        <span>Kashmir Software Engineering Leader</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Software & App Development <br />
                        <span className="text-blue-600 dark:text-blue-500">Company in Kashmir</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        We build custom business software, mobile applications (iOS/Android), and internal management systems that eliminate operational bottlenecks.
                    </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Software & App Development Scope</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "Cross-Platform Mobile Apps (iOS & Android)",
                            "Custom Point of Sale (POS) Systems",
                            "Internal Business CRM & ERP Tools",
                            "Offline-First Data Syncing Architecture",
                            "Database Architecture & Cloud Servers",
                            "Secure RESTful API Development",
                            "Role-Based Staff Access & Audit Logs",
                            "Ongoing Technical Support & Maintenance"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="ui-card p-6 rounded-2xl space-y-2">
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{faq.q}</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Need Custom Business Software or App?</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Speak with our lead software engineers in Srinagar today.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Discuss Software Project</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
