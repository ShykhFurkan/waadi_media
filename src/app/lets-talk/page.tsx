import { Metadata } from 'next';
import LetsTalkPage from './LetsTalkContent';

export const metadata: Metadata = {
    title: 'Consultation | Waadi Media',
    description: 'Book a consultation with Waadi Media to discuss your business growth, website needs, or brand identity.',
};

export default function LetsTalk() {
    return <LetsTalkPage />;
}
