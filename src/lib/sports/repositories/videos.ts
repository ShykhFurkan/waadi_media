import { supabase } from '@/lib/supabase';
import { SportVideo } from '../types';

export async function getFeaturedVideos(): Promise<SportVideo[]> {
  try {
    const { data } = await supabase.from('videos').select('*');
    if (data && data.length > 0) {
      return data.map((v) => ({
        id: v.id,
        title: v.title,
        thumbnailUrl: v.thumbnail_url || '',
        duration: v.duration || '00:00',
        views: v.views || '0',
        publishedAt: v.published_at || new Date().toISOString(),
        videoUrl: v.video_url || undefined,
      }));
    }
  } catch (e) {}
  return [];
}

export async function getVideos(): Promise<SportVideo[]> {
  return await getFeaturedVideos();
}

export async function getVideoById(id: string): Promise<SportVideo | null> {
  const videos = await getFeaturedVideos();
  return videos.find((v) => v.id === id) || null;
}
