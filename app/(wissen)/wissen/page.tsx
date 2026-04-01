import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Wissensdatenbank – BaFin-Verfahren verstehen | Finanzaufsicht-Schutz",
  description:
    "Kostenlose Fachbeiträge zu BaFin-Verfahren, Erlaubnispflicht, Tatbeständen und Verteidigungsstrategien. Juristisch fundiert, verständlich aufbereitet.",
};

export default function WissenPage() {
  const articles = getAllArticles("wissen");

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-6 w-6 text-blue-700" />
          <span className="text-sm font-medium text-blue-700 uppercase tracking-wide">
            Wissensdatenbank
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Kostenlos informieren
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Fachbeiträge zu BaFin-Verfahren, Erlaubnispflicht, Tatbeständen und
          wirksamen Verteidigungsstrategien — ohne Rechtsberatung, aber mit
          fundiertem Hintergrundwissen.
        </p>
      </div>

      {/* Artikel-Raster */}
      {articles.length === 0 ? (
        <p className="text-gray-400">Beiträge werden bald veröffentlicht.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Card
              key={article.slug}
              className="group hover:shadow-md transition-shadow border-gray-200"
            >
              <CardHeader className="pb-2">
                {article.category && (
                  <Badge
                    variant="secondary"
                    className="w-fit text-xs mb-2"
                  >
                    {article.category}
                  </Badge>
                )}
                <CardTitle className="text-lg leading-snug group-hover:text-blue-900 transition-colors">
                  <Link href={`/wissen/${article.slug}`}>
                    {article.title}
                  </Link>
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
                    href={`/wissen/${article.slug}`}
                    className="flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900"
                  >
                    Lesen
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-16 text-xs text-gray-400 text-center">
        Alle Inhalte dienen der allgemeinen Information und stellen keine
        Rechtsberatung dar.
      </p>
    </div>
  );
}
