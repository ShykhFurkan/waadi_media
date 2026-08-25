import { supabase } from '@/lib/supabase';
import { SportStory } from '../types';
import { SPORTS_DEMO_MODE } from '../constants';
import { MOCK_STORIES } from '../mock-data';

export async function getTopStories(): Promise<SportStory[]> {
  try {
    const { data } = await supabase.from('stories').select('*');
    if (data && data.length > 0) {
      return data.map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug || s.id,
        category: s.category || 'Sports',
        imageUrl: s.image_url || '',
        excerpt: s.excerpt || '',
        publishedAt: s.published_at || new Date().toISOString(),
        readTime: s.read_time || '3 min read',
      }));
    }
  } catch (e) {}
  return [];
}

export async function getStories(): Promise<SportStory[]> {
  return await getTopStories();
}

export async function getStoryBySlug(slug: string): Promise<SportStory | null> {
  const stories = await getTopStories();
  return stories.find((s) => s.slug === slug || s.id === slug) || null;
}
