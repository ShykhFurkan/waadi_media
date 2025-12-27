import { Metadata } from 'next';
import MethodPage from './MethodContent';

export const metadata: Metadata = {
    title: 'Our Process for Digital Projects in Kashmir | Waadi Media',
    description: 'A structured approach to building websites, digital systems, and content for businesses across Kashmir.',
    alternates: {
        canonical: 'https://www.waadimedia.com/method',
    },
    openGraph: {
        title: 'Our Process for Digital Projects in Kashmir | Waadi Media',
        description: 'A structured approach to building websites, digital systems, and content for businesses across Kashmir.',
        url: 'https://www.waadimedia.com/method',
    }
};

export default function Method() {
    return <MethodPage />;
}
