import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif, Outfit } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientDeferred } from '@/components/layout/ClientDeferred';
import { JsonLd } from '@/components/seo/JsonLd';
import { getProfessionalServiceSchema, getWebSiteSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FBF6EA',
};

// Neo-Brutalist heavy display font
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['800', '900'],
});

// Accent serif for editorial highlights over highlighter swashes
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-accent',
  weight: ['400'],
  style: ['italic', 'normal'],
});

// UI & body sans font
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Waadi Media - Web Design and Digital Agency in Kashmir',
    template: '%s',
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
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '1Fatb0r-aLsTSMMwmoorkk6FqjUuRxPZZUapOxNg7EM',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-FRL8C83R8C';
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TNMQXH79';

  return (
    <html lang="en" className={`${archivo.variable} ${instrumentSerif.variable} ${outfit.variable}`}>
      <head>
        {/* Google Tag Manager */}
        {gtmId && (
          <script
            id="google-tag-manager"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        {/* End Google Tag Manager */}
        <JsonLd data={getProfessionalServiceSchema()} />
        <JsonLd data={getWebSiteSchema()} />
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-paper text-ink font-sans antialiased flex flex-col selection:bg-saffron selection:text-ink">
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue focus:text-white focus:rounded-full"
        >
          Skip to content
        </a>

        <Header />
        <main id="main-content" className="flex-1 w-full pb-[calc(56px+env(safe-area-inset-bottom,0px))] md:pb-0">
          {children}
        </main>
        <Footer />
        {/* ClientDeferred: FloatingActions + CookieNotice loaded lazily after hydration */}
        <ClientDeferred gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
