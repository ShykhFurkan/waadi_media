import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export type BlogPostMetadata = {
  title: string;
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
};

export type BlogPost = {
  metadata: BlogPostMetadata;
  content: string;
};

export function getAllPosts(): BlogPostMetadata[] {
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

      return {
        title: data.title || '',
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
      } as BlogPostMetadata;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!fullPath) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const readStats = readingTime(content);

  return {
    metadata: {
      title: data.title || '',
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
    },
    content,
  };
}
