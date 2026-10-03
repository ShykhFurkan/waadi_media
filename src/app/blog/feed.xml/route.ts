import { getAllPosts } from '@/lib/mdx';
import { siteConfig } from '@/config/site';

export async function GET() {
  // Published posts only (drafts are excluded)
  const posts = getAllPosts(false);

  const rssItems = posts
    .map((post) => {
      const postUrl = `${siteConfig.url}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${siteConfig.contact.email} (${post.author})</author>
      <category>${post.category}</category>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} - Notes from the valley</title>
    <link>${siteConfig.url}/blog</link>
    <description>Plain-language guides on websites, search, branding and growing a business in Kashmir.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
