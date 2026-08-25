import { getNews } from './news';
import { getStories } from './stories';
import { getVideos } from './videos';

export async function getSportsContent() {
  const [news, stories, videos] = await Promise.all([getNews(), getStories(), getVideos()]);
  return { news, stories, videos };
}
