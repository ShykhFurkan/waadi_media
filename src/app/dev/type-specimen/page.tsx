import { Metadata } from 'next';
import { Bodoni_Moda } from 'next/font/google';
import { SpecimenViewer } from './SpecimenViewer';

export const metadata: Metadata = {
  title: 'Dev Typography Specimen - Waadi Media',
  robots: {
    index: false,
    follow: false,
  },
};

// Bodoni Moda loaded ONLY on this specimen page
const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bodoni',
});

export default function TypeSpecimenPage() {
  return (
    <div className={`${bodoniModa.variable} min-h-screen bg-snow text-graphite py-12 px-4`}>
      <SpecimenViewer />
    </div>
  );
}
