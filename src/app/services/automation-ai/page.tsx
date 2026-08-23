import React from 'react';
import { generateSeoMetadata, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Repeat, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Business Automation & AI Agency in Kashmir | WhatsApp Bots & CRM',
    description: 'Premier business automation & AI agency in Kashmir. Custom WhatsApp API bots, lead routing, CRM integrations, and operational workflows for Srinagar enterprises.',
    path: '/services/automation-ai'
});

export default function AutomationAiPage() {
    const serviceSchema = generateServiceSchema({
        name: "Business Automation & AI Solutions in Kashmir",
        description: "WhatsApp API bots, lead automation, CRM integrations, and AI workflow engineering for Kashmir businesses.",
        path: "/services/automation-ai"
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Automation & AI", url: "/services/automation-ai" }
    ]);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Repeat size={14} />
                        <span>Kashmir Business Automations Leader</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Business Automation & AI <br />
                        <span className="text-blue-600 dark:text-blue-500">in Kashmir</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        We build custom WhatsApp API bots, lead management workflows, and CRM automations that eliminate manual work and double team productivity.
                    </p>
                </div>

                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Automation & AI Scope</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "WhatsApp API Automated Ordering & Invoice Bots",
                            "Website Lead Ingestion to CRM (Zoho, HubSpot, Google Sheets)",
                            "Automated Email & SMS Customer Triggers",
                            "Inventory Sync Across Multiple Outlets",
                            "Custom AI Chatbots for Customer Support",
                            "Internal Staff Task & Notification Triggers"
                        ].map((d, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ui-card rounded-3xl p-8 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Eliminate Manual Business Friction</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Schedule an automation audit with our workflow engineers.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Request Automation Audit</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
