import { Metadata } from 'next';
import ServicesPage from './ServicesContent';

export const metadata: Metadata = {
    title: 'Digital Services for Businesses in Kashmir | Waadi Media',
    description: 'Professional digital services in Kashmir including website development, social media, content production, automations, and advertising.',
    alternates: {
        canonical: 'https://www.waadimedia.com/services',
    },
    openGraph: {
        title: 'Digital Services for Businesses in Kashmir | Waadi Media',
        description: 'Professional digital services in Kashmir including website development, social media, content production, automations, and advertising.',
        url: 'https://www.waadimedia.com/services',
    }
};

export default function Services() {
    return <ServicesPage />;
}
