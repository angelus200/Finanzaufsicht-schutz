import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles("blog").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug("blog", slug);
  if (!article) return {};
  return {
    title: `${article.title} | Finanzaufsicht-Schutz`,
    description: article.description,
  };
}

export default async function BlogArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug("blog", slug);

  if (!article) notFound();

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Zum Blog
      </Link>

      <header className="mb-10">
        {article.category && (
          <Badge variant="secondary" className="mb-3">
            {article.category}
          </Badge>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readingTimeText}
          </span>
          {article.date && (
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </header>

      <article className="prose-content">
        <Content />
      </article>

      <div className="mt-12 flex gap-3">
        <Button variant="outline" render={<Link href="/blog" />}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Weitere Artikel
        </Button>
        <Button
          className="bg-blue-900 hover:bg-blue-800"
          render={<Link href="/schnellcheck" />}
        >
          Schnellcheck starten
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
