'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSportsOrCMS = pathname?.startsWith('/sports') || pathname?.startsWith('/cms');

  if (isSportsOrCMS) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider>
      <Navbar />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
