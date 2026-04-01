import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface ArticleSeo {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date string — normalised from `publishedAt` or `date` */
  date: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  readingTimeText: string;
  seo?: ArticleSeo;
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

  // Normalise date: prefer publishedAt, fall back to date
  const date: string = data.publishedAt ?? data.date ?? "";

  // Reading time: use frontmatter number if provided, else compute
  const readingTimeText =
    typeof data.readingTime === "number"
      ? `${data.readingTime} min Lesezeit`
      : readingTime(content).text;

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date,
    updatedAt: data.updatedAt,
    category: data.category,
    tags: data.tags ?? [],
    author: data.author,
    featured: data.featured === true,
    readingTimeText,
    seo: data.seo,
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
