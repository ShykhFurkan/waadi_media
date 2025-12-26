import { Metadata } from 'next';
import MethodPage from './MethodContent';

export const metadata: Metadata = {
    title: 'The Waadi Method | Digital Branding Strategy',
    description: 'Our disciplined, proven process (Study, Strategize, Build, Iterate) used to grow businesses online.',
};

export default function Method() {
    return <MethodPage />;
}
