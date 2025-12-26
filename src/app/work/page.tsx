import { Metadata } from 'next';
import OurWorkPage from './WorkContent';

export const metadata: Metadata = {
    title: 'Our Work | Waadi Media',
    description: 'Explore our portfolio of digital systems, websites, and branding projects for businesses in Kashmir.',
};

export default function Work() {
    return <OurWorkPage />;
}
