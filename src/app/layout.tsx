import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020617",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://waadimedia.com"),
  title: {
    default: "Waadi Media | Web Development, AI & Digital Agency in Jammu & Kashmir, India",
    template: "%s | Waadi Media",
  },
  description:
    "Waadi Media is Jammu & Kashmir's premier freelance digital engineering and creative agency based in Anantnag and Srinagar. Led by Furkan Mushtaq, delivering high-performance Next.js web applications, custom AI automation pipelines, and high-impact social media brand management across India and globally.",
  keywords: [
    "Web development company in Kashmir",
    "Website design Anantnag",
    "Web developer Srinagar",
    "Digital marketing agency Jammu and Kashmir",
    "AI automation pipelines India",
    "Kashmir tourism website design",
    "Next.js web agency India",
    "Furkan Mushtaq software engineer",
    "Social media management Kashmir",
    "E-commerce website development Kashmir",
  ],
  authors: [{ name: "Furkan Mushtaq", url: "https://waadimedia.com/about" }],
  creator: "Furkan Mushtaq",
  publisher: "Waadi Media",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Waadi Media | Web Development, AI & Digital Agency in Jammu & Kashmir, India",
    description:
      "Premier digital engineering studio in Kashmir. Next.js websites, custom AI pipelines, and strategic brand growth for businesses in Srinagar, Anantnag, and across India.",
    url: "https://waadimedia.com",
    siteName: "Waadi Media",
    images: [
      {
        url: "/kashmir_hero_bg.jpg",
        width: 1200,
        height: 630,
        alt: "Waadi Media - Web Development & AI Agency in Jammu and Kashmir, India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waadi Media | Web Development, AI & Digital Agency in Jammu & Kashmir",
    description:
      "Premier digital engineering studio in Kashmir. Next.js websites, custom AI pipelines, and brand growth.",
    images: ["/kashmir_hero_bg.jpg"],
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Waadi Media",
  image: "https://waadimedia.com/logo.png",
  url: "https://waadimedia.com",
  telephone: "+91-7780940317",
  email: "contact@waadimedia.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Town, KP Road",
    addressLocality: "Anantnag",
    addressRegion: "Jammu and Kashmir",
    postalCode: "192101",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "33.7311",
    longitude: "75.1487",
  },
  areaServed: [
    { "@type": "City", name: "Anantnag" },
    { "@type": "City", name: "Srinagar" },
    { "@type": "AdministrativeArea", name: "Jammu and Kashmir" },
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Worldwide" },
  ],
  sameAs: [
    "https://www.instagram.com/waadimedia",
    "https://www.linkedin.com/company/waadimedia",
    "https://www.facebook.com/waadimedia",
  ],
  founder: {
    "@type": "Person",
    name: "Furkan Mushtaq",
    jobTitle: "Founder & Lead Software Engineer",
    alumniOf: "Computer Science & Technology",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Waadi Media",
  url: "https://waadimedia.com",
  logo: "https://waadimedia.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7780940317",
    contactType: "customer service",
    email: "contact@waadimedia.com",
    areaServed: ["IN", "Worldwide"],
    availableLanguage: ["English", "Urdu", "Kashmiri", "Hindi"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${cormorantGaramond.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PLACEHOLDER"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PLACEHOLDER');
          `}
        </Script>

        {/* Site-wide Schemas */}
        <JsonLd data={professionalServiceSchema} />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
