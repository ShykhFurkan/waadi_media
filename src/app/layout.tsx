import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://waadimedia.com'), // Replace with actual domain
  title: {
    default: "Waadi Media | Growth Systems for Brands",
    template: "%s | Waadi Media"
  },
  description: "Creative growth agency in Kashmir building digital systems, brands, and automation for growing businesses.",
  keywords: ["Waadi Media", "Digital Agency Kashmir", "Web Design", "Branding", "Growth Marketing", "Business Automation"],
  authors: [{ name: "Waadi Media Team" }],
  creator: "Waadi Media",
  publisher: "Waadi Media",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waadimedia.com",
    title: "Waadi Media | Growth Systems for Brands",
    description: "Creative growth agency in Kashmir building digital systems, brands, and automation for growing businesses.",
    siteName: "Waadi Media",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Waadi Media Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waadi Media | Growth Systems for Brands",
    description: "Creative growth agency in Kashmir building digital systems, brands, and automation for growing businesses.",
    images: ["/logo.png"],
    creator: "@waadimedia",
  },
  icons: {
    icon: '/logo.png',
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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
