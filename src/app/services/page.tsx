import { Metadata } from 'next';
import ServicesPage from './ServicesContent';

export const metadata: Metadata = {
    title: 'Our Services | Waadi Media',
    description: 'Full-spectrum digital services including Web Design, Social Media Management, Content Creation, and Automation.',
};

export default function Services() {
    return <ServicesPage />;
}
