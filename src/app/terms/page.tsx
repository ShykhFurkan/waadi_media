import { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
    title: 'Terms of Service | Waadi Media',
    description: 'Terms of Service for Waadi Media. Read our terms and conditions for using our services.',
    openGraph: {
        title: 'Terms of Service | Waadi Media',
        description: 'Terms of Service for Waadi Media.',
        url: 'https://waadimedia.com/terms',
    },
};

export default function TermsPage() {
    return <TermsContent />;
}
