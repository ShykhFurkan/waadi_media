import type { Metadata } from 'next';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

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
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
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
    <html lang="en" suppressHydrationWarning className="dark" data-theme="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('waadi_theme');
                  var theme = stored ? stored : 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 selection:bg-blue-500/30 selection:text-blue-500 transition-colors duration-200">
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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
