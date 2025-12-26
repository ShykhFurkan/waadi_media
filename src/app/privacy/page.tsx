import { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
    title: 'Privacy Policy | Waadi Media',
    description: 'Privacy Policy for Waadi Media. Learn how we handle your data and protect your privacy.',
    openGraph: {
        title: 'Privacy Policy | Waadi Media',
        description: 'Privacy Policy for Waadi Media. Learn how we handle your data.',
        url: 'https://waadimedia.com/privacy',
    },
};

export default function PrivacyPage() {
    return <PrivacyContent />;
}
