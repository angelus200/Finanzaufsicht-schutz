import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, ArrowRight, Shield } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles("wissen").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug("wissen", slug);
  if (!article) return {};
  return {
    title: `${article.seo?.title ?? article.title} | Finanzaufsicht-Schutz`,
    description: article.seo?.description ?? article.description,
    keywords: article.seo?.keywords,
  };
}

export default async function WissenArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug("wissen", slug);

  if (!article) notFound();

  const { default: Content } = await import(
    `@/content/wissen/${slug}.mdx`
  );

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Zurück-Link */}
      <Link
        href="/wissen"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Zur Wissensdatenbank
      </Link>

      {/* Artikel-Header — Metadaten; H1 kommt aus dem MDX-Inhalt */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {article.featured && (
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 border">
              Featured
            </Badge>
          )}
          {article.category && (
            <Badge variant="secondary">{article.category}</Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
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
          {article.updatedAt && article.updatedAt !== article.date && (
            <span className="text-xs">
              Aktualisiert{" "}
              {new Date(article.updatedAt).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </header>

      {/* MDX-Inhalt */}
      <article className="prose-content">
        <Content />
      </article>

      {/* Schnellcheck-CTA */}
      <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Shield className="h-8 w-8 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Wie kritisch ist Ihre Situation?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Unser Schnellcheck bewertet in 20 Fragen Ihren Fall mit
              Ampel-Ergebnis und konkreten Handlungsempfehlungen.
            </p>
            <Button
              size="sm"
              className="bg-blue-900 hover:bg-blue-800"
              render={<Link href="/schnellcheck" />}
            >
              Schnellcheck starten — EUR 149
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
