import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export type BlogPostMetadata = {
  title: string;
  metaTitle?: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  keyword: string;
  cover?: string;
  draft?: boolean;
  author: string;
  readingTime: string;
  wordCount: number;
};

export type BlogPost = {
  metadata: BlogPostMetadata;
  content: string;
  headings: { id: string; text: string; level: number }[];
};

export function getAllPosts(includeDrafts = process.env.NODE_ENV !== 'production'): BlogPostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const readStats = readingTime(content);
      const wordCount = content.trim().split(/\s+/).length;

      return {
        title: data.title || '',
        metaTitle: data.metaTitle || (data.title && data.title.length <= 60 ? data.title : undefined),
        slug: data.slug || slug,
        description: data.description || '',
        date: data.date || '',
        updated: data.updated,
        category: data.category || 'General',
        keyword: data.keyword || '',
        cover: data.cover,
        draft: Boolean(data.draft),
        author: data.author || 'Furkan Mushtaq',
        readingTime: readStats.text,
        wordCount,
      } as BlogPostMetadata;
    })
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string, includeDrafts = process.env.NODE_ENV !== 'production'): BlogPost | null {
  if (!fs.existsSync(postsDirectory)) return null;

  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!fullPath) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const isDraft = Boolean(data.draft);
  if (!includeDrafts && isDraft) {
    return null;
  }

  const readStats = readingTime(content);
  const wordCount = content.trim().split(/\s+/).length;

  // Extract ## headings for Table of Contents
  const headings: { id: string; text: string; level: number }[] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }

  return {
    metadata: {
      title: data.title || '',
      metaTitle: data.metaTitle || (data.title && data.title.length <= 60 ? data.title : undefined),
      slug: data.slug || slug,
      description: data.description || '',
      date: data.date || '',
      updated: data.updated,
      category: data.category || 'General',
      keyword: data.keyword || '',
      cover: data.cover,
      draft: isDraft,
      author: data.author || 'Furkan Mushtaq',
      readingTime: readStats.text,
      wordCount,
    },
    content,
    headings,
  };
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 2): BlogPostMetadata[] {
  const all = getAllPosts();
  const others = all.filter((p) => p.slug !== currentSlug);

  const sameCategory = others.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  const differentCategory = others.filter((p) => p.category.toLowerCase() !== category.toLowerCase());

  return [...sameCategory, ...differentCategory].slice(0, limit);
}
