import { Metadata } from 'next';
import DeskashContent from '@/app/deskash/DeskashContent';

export const metadata: Metadata = {
    title: 'Deskash - The All-In-One Hotel Operating System | Waadi Media',
    description: 'Deskash is an upcoming comprehensive hotel management solution. Join the wishlist for version 0.0.1.1.',
};

export default function DeskashPage() {
    return <DeskashContent />;
}
