import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  author?: string;
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string;
  readingTimeText: string;
}

const contentDir = path.join(process.cwd(), "content");

export function getArticleBySlug(
  collection: "wissen" | "blog",
  slug: string
): ArticleMeta | null {
  const filePath = path.join(contentDir, collection, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category,
    tags: data.tags ?? [],
    author: data.author,
    readingTimeText: stats.text,
  };
}

export function getAllArticles(collection: "wissen" | "blog"): ArticleMeta[] {
  const dir = path.join(contentDir, collection);

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.(mdx|md)$/, "");
      return getArticleBySlug(collection, slug);
    })
    .filter((a): a is ArticleMeta => a !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
