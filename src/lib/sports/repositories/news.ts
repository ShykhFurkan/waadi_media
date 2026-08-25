import { supabase } from '@/lib/supabase';
import { SportNews } from '../types';

export async function getNewsUpdates(): Promise<SportNews[]> {
  try {
    const { data } = await supabase.from('news').select('*');
    if (data && data.length > 0) {
      return data.map((n) => ({
        id: n.id,
        title: n.title,
        slug: n.slug || n.id,
        category: n.category || 'Local Sports',
        thumbnailUrl: n.thumbnail_url || '',
        publishedAt: n.published_at || new Date().toISOString(),
        summary: n.summary || '',
      }));
    }
  } catch (e) {}
  return [];
}

export async function getNews(): Promise<SportNews[]> {
  return await getNewsUpdates();
}

export async function getNewsBySlug(slug: string): Promise<SportNews | null> {
  const newsList = await getNewsUpdates();
  return newsList.find((n) => n.slug === slug || n.id === slug) || null;
}
