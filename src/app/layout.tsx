import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.waadimedia.com'),
  title: {
    default: 'Digital Marketing & Web Agency in Kashmir | Waadi Media',
    template: '%s | Waadi Media'
  },
  description: 'Kashmir-based digital agency offering websites, content creation, automations, and ads for local businesses, hotels, cafés, and startups.',
  authors: [{ name: 'Waadi Media Team' }],
  creator: 'Waadi Media',
  publisher: 'Waadi Media',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Waadi Media',
    url: 'https://www.waadimedia.com/',
    title: 'Digital Marketing & Web Agency in Kashmir | Waadi Media',
    description: 'Kashmir-based digital agency offering websites, content creation, automations, and ads for local businesses.',
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
    title: 'Digital Marketing & Web Agency in Kashmir | Waadi Media',
    description: 'Websites, content, automations, and digital growth systems for Kashmir-based businesses.',
    images: ['/logo.png'],
    creator: '@waadi_media',
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
  alternates: {
    canonical: 'https://www.waadimedia.com/',
  }
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
              '@type': 'ProfessionalService',
              name: 'Waadi Media',
              url: 'https://www.waadimedia.com',
              logo: 'https://www.waadimedia.com/logo.png',
              image: 'https://www.waadimedia.com/logo.png',
              description: 'Waadi Media is a Kashmir-based digital agency providing structured digital services for local businesses, hospitality brands, cafés, restaurants, startups, and service providers.',
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Jammu & Kashmir',
                addressCountry: 'IN'
              },
              areaServed: {
                '@type': 'Place',
                name: 'Kashmir, Jammu & Kashmir, India'
              },
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
              },
              knowsAbout: [
                'Website design and development',
                'Internal management tools',
                'Content creation',
                'Social media strategy',
                'Digital advertising campaigns',
                'Brand positioning'
              ]
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
