import { supabase, Sponsor, createSponsor as dbCreateSponsor, deleteSponsor as dbDeleteSponsor } from '@/lib/supabase';

export async function getSponsors(): Promise<Sponsor[]> {
  try {
    const { data } = await supabase.from('sponsors').select('*, tournaments(*)');
    if (data) return data;
    return [];
  } catch (err) {
    console.error('[SponsorsRepo] Exception fetching sponsors:', err);
    return [];
  }
}

export async function createSponsor(sponsorData: {
  tournament_id?: string;
  name: string;
  tier?: string;
  logo_url: string;
  website_url?: string;
}) {
  return await dbCreateSponsor(sponsorData);
}

export async function deleteSponsor(id: string) {
  return await dbDeleteSponsor(id);
}
