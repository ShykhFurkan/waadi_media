import React from 'react';
import { generateSeoMetadata } from '@/lib/seo';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = generateSeoMetadata({
    title: 'Cookie Policy | Waadi Media',
    description: 'Waadi Media cookie policy explaining how we handle session cookies, analytics cookies, and preferences on waadimedia.com.',
    path: '/cookies'
});

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <div className="max-w-4xl mx-auto space-y-8">
                <Link href="/" className="inline-flex items-center space-x-2 text-xs font-bold uppercase text-blue-600 dark:text-blue-400 hover:underline">
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                </Link>

                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                        Cookie <span className="text-blue-600 dark:text-blue-500">Policy</span>
                    </h1>

                    <div className="ui-card p-8 sm:p-10 rounded-3xl space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        <p>
                            Waadi Media uses essential cookies and local storage tokens strictly to maintain theme preferences (Light/Dark mode) and basic site performance analytics.
                        </p>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Essential Preference Cookies</h2>
                        <p>
                            We use `localStorage` to remember your selected theme (Light vs. Dark mode) across page visits. No personal data is stored in these tokens.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
