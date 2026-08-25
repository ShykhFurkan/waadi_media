import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LegacyMatchPage({ params }: Props) {
  const resolvedParams = await params;
  redirect(`/sports/matches/${resolvedParams.id}`);
}
