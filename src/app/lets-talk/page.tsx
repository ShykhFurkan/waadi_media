import { Metadata } from 'next';
import LetsTalkPage from './LetsTalkContent';

export const metadata: Metadata = {
    title: 'Contact a Digital Agency in Kashmir | Waadi Media',
    description: 'Get in touch with a Kashmir-based digital agency for websites, content creation, and business growth systems.',
    alternates: {
        canonical: 'https://www.waadimedia.com/lets-talk',
    },
    openGraph: {
        title: 'Contact a Digital Agency in Kashmir | Waadi Media',
        description: 'Get in touch with a Kashmir-based digital agency for websites, content creation, and business growth systems.',
        url: 'https://www.waadimedia.com/lets-talk',
    }
};

export default function LetsTalk() {
    return <LetsTalkPage />;
}
