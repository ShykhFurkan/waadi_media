import { Metadata } from 'next';
import HomePageContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Waadi Media | Growth Systems for Brands',
  description: 'Creative growth agency in Kashmir building digital systems, brands, and automation for growing businesses.',
};

export default function Home() {
  return <HomePageContent />;
}
