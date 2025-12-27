import { Metadata } from 'next';
import OurWorkPage from './WorkContent';

export const metadata: Metadata = {
    title: 'Websites & Digital Projects in Kashmir | Our Work',
    description: 'A portfolio of websites, internal tools, and digital systems built for Kashmir-based businesses, restaurants, and hospitality brands.',
    alternates: {
        canonical: 'https://www.waadimedia.com/work',
    },
    openGraph: {
        title: 'Websites & Digital Projects in Kashmir | Our Work',
        description: 'A portfolio of websites, internal tools, and digital systems built for Kashmir-based businesses, restaurants, and hospitality brands.',
        url: 'https://www.waadimedia.com/work',
    }
};

export default function Work() {
    return <OurWorkPage />;
}
