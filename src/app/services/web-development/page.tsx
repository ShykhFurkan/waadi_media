import React from 'react';
import { generateSeoMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFaqSchema } from '@/lib/seo';
import { Code, CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, Layers } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Web Development Company in Kashmir | Custom Next.js & Web Apps',
    description: 'Premier web development company in Kashmir & Srinagar. We build high-speed Next.js websites, custom e-commerce stores, and web applications built for high conversion.',
    path: '/services/web-development'
});

const faqs = [
    { q: "Why choose Next.js for web development in Kashmir?", a: "Next.js delivers ultra-fast page load speeds (<0.8s), superior Google search ranking capabilities (SSR/SSG), and bank-grade security compared to bloated traditional website builders." },
    { q: "How long does a custom web development project take?", a: "Standard corporate web platforms take 2 weeks, while complex e-commerce or custom web applications take 3 to 4 weeks." },
    { q: "Do you integrate payment gateways like Razorpay, UPI, and Stripe?", a: "Yes, we handle complete payment gateway setups including Razorpay, UPI, PayTM, Stripe, and international multi-currency checkouts." }
];

export default function WebDevelopmentPage() {
    const serviceSchema = generateServiceSchema({
        name: "Web Development Services in Kashmir",
        description: "Custom Next.js web applications, e-commerce stores, and high-performance websites built for Kashmir businesses.",
        path: "/services/web-development"
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Web Development", url: "/services/web-development" }
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
                        <Code size={14} />
                        <span>Kashmir Web Development Leader</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Web Development Company <br />
                        <span className="text-blue-600 dark:text-blue-500">in Kashmir & Srinagar</span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        We engineer lightning-fast Next.js websites, custom e-commerce platforms, and web applications built to convert visitors into paying clients.
                    </p>
                </div>

                {/* Key Features Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: "Ultra-Fast Page Speed", desc: "Page loads under 0.8s for maximum Google Core Web Vitals performance.", icon: <Zap className="text-blue-600 dark:text-blue-400" /> },
                        { title: "Custom Next.js & React", desc: "Zero slow page builders. Clean custom code built for scale.", icon: <Globe className="text-blue-600 dark:text-blue-400" /> },
                        { title: "High Conversion UX", desc: "Strategic design layouts optimized to capture qualified leads.", icon: <Layers className="text-blue-600 dark:text-blue-400" /> }
                    ].map((item, i) => (
                        <div key={i} className="ui-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
                            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 w-fit">{item.icon}</div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Deliverables Checklist */}
                <div className="ui-card rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Included Web Engineering Deliverables</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {[
                            "Custom Responsive Next.js & React Architecture",
                            "Razorpay, Stripe, and UPI Payment Integrations",
                            "On-Page SEO & Schema Structured Data",
                            "Custom Admin CMS Dashboard",
                            "SSL Security & HTTPS Setup",
                            "Mobile-First Touch Responsive Design",
                            "Domain, Hosting & DNS Management",
                            "Google Analytics 4 & Meta Pixel Tracking"
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
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ready To Build Your Custom Web Platform?</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Book a free technical consultation with our engineering team in Srinagar.</p>
                    <Link href="/lets-talk" passHref>
                        <div className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md shadow-blue-500/20 cursor-pointer">
                            <span>Request Web Proposal</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
