import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://waadimedia.com'),
  title: {
    default: 'Waadi Media | Growth Systems for Brands',
    template: '%s | Waadi Media'
  },
  description: 'Waadi Media is a creative growth agency in Kashmir building digital systems, brands, and automation for growing businesses.',
  keywords: ['Web Design Kashmir', 'Digital Marketing Srinagar', 'Branding Agency', 'Waadi Media', 'Growth Agency'],
  authors: [{ name: 'Waadi Media Team' }],
  creator: 'Waadi Media',
  publisher: 'Waadi Media',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waadimedia.com',
    title: 'Waadi Media | Growth Systems for Brands',
    description: 'We build digital assets and systems for businesses ready to scale.',
    siteName: 'Waadi Media',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Waadi Media Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waadi Media | Growth Systems for Brands',
    description: 'We build digital assets and systems for businesses ready to scale.',
    images: ['/logo.png'],
    creator: '@waadi_media',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-800 bg-slate-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Waadi Media',
              url: 'https://waadimedia.com',
              logo: 'https://waadimedia.com/logo.png',
              sameAs: [
                'https://x.com/shykh_furkan?s=21',
                'https://www.instagram.com/waadi_media?igsh=dmQ3eXV2ejRuMWsx',
                'https://www.linkedin.com/in/shykh-furkan-1193b4249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-9876543210',
                contactType: 'customer service',
                areaServed: 'IN',
                availableLanguage: 'en'
              }
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
