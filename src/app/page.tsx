import { Metadata } from 'next';
import HomePageContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Digital Marketing & Web Agency in Kashmir | Waadi Media',
  description: 'Kashmir-based digital agency offering websites, content creation, automations, and ads for local businesses, hotels, cafés, and startups.',
  alternates: {
    canonical: 'https://www.waadimedia.com/',
  },
  openGraph: {
    title: 'Digital Marketing & Web Agency in Kashmir | Waadi Media',
    description: 'Kashmir-based digital agency offering websites, content creation, automations, and ads for local businesses.',
    url: 'https://www.waadimedia.com/',
  }
};

export default function Home() {
  return <HomePageContent />;
}
