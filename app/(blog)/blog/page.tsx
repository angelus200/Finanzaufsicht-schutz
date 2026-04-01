import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog – Analysen & Kommentare | Finanzaufsicht-Schutz",
  description:
    "Aktuelle Analysen, Kommentare und Hintergrundberichte zur Finanzaufsicht in Deutschland, Österreich und der Schweiz.",
};

export default function BlogPage() {
  const articles = getAllArticles("blog");

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-lg text-gray-500">
          Analysen, Kommentare und Hintergrundinformationen zur Finanzaufsicht.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-400">Artikel werden bald veröffentlicht.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Card
              key={article.slug}
              className="group hover:shadow-md transition-shadow border-gray-200"
            >
              <CardHeader className="pb-2">
                {article.category && (
                  <Badge variant="secondary" className="w-fit text-xs mb-2">
                    {article.category}
                  </Badge>
                )}
                <CardTitle className="text-lg leading-snug group-hover:text-blue-900 transition-colors">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {article.readingTimeText}
                  </span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900"
                  >
                    Lesen
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
