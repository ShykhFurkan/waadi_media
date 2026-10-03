import type { Metadata, Viewport } from 'next';
import { Newsreader, Outfit } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { JsonLd } from '@/components/seo/JsonLd';
import { getProfessionalServiceSchema, getWebSiteSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5F8FC',
};

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Waadi Media - Web Design and Digital Agency in Kashmir',
    template: '%s - Waadi Media',
  },
  description:
    "Websites, SEO, branding, ads and software for Kashmir's businesses. Clear prices, fast delivery, built in Anantnag. Book a free call.",
  keywords: [
    'web design agency in Kashmir',
    'web design agency in Srinagar',
    'web design agency in Anantnag',
    'website development Kashmir',
    'digital marketing agency Kashmir',
    'SEO services Kashmir',
    'ecommerce website development Kashmir',
    'brand identity Kashmir',
    'Google Ads Kashmir',
    'social media marketing Srinagar',
  ],
  authors: [{ name: siteConfig.founder.name }],
  creator: siteConfig.founder.name,
  publisher: siteConfig.name,
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Waadi Media - Web Design and Digital Agency in Kashmir',
    description:
      "Websites, SEO, branding, ads and software for Kashmir's businesses. Clear prices, fast delivery, built in Anantnag. Book a free call.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waadi Media - Web Design and Digital Agency in Kashmir',
    description:
      "Websites, SEO, branding, ads and software for Kashmir's businesses. Clear prices, fast delivery, built in Anantnag.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${outfit.variable}`}>
      <head>
        <JsonLd data={getProfessionalServiceSchema()} />
        <JsonLd data={getWebSiteSchema()} />
      </head>
      <body className="min-h-screen bg-snow text-graphite font-sans antialiased flex flex-col selection:bg-blue selection:text-white">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue focus:text-white focus:rounded-full"
        >
          Skip to content
        </a>
        
        <Header />
        <main id="main-content" className="flex-1 w-full pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
