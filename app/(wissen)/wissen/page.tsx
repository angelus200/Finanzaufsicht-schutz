import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, ArrowRight, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Wissensdatenbank – BaFin-Verfahren verstehen | Finanzaufsicht-Schutz",
  description:
    "Kostenlose Fachbeiträge zu BaFin-Verfahren, Erlaubnispflicht, Tatbeständen und Verteidigungsstrategien. Juristisch fundiert, verständlich aufbereitet.",
};

export default function WissenPage() {
  const articles = getAllArticles("wissen");
  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

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

      {/* Featured-Artikel */}
      {featured.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Empfohlen</span>
          </div>
          <div className="space-y-4">
            {featured.map((article) => (
              <Link key={article.slug} href={`/wissen/${article.slug}`}>
                <div className="group flex flex-col sm:flex-row gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200 border text-xs">
                        Featured
                      </Badge>
                      {article.category && (
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors mb-1 leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-3 shrink-0">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {article.readingTimeText}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-blue-700 group-hover:text-blue-900">
                      Lesen
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Alle weiteren Artikel */}
      {rest.length === 0 && featured.length === 0 ? (
        <p className="text-gray-400">Beiträge werden bald veröffentlicht.</p>
      ) : rest.length > 0 ? (
        <div>
          {featured.length > 0 && (
            <h2 className="text-sm font-medium text-gray-700 mb-4">Alle Artikel</h2>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((article) => (
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
                    <Link href={`/wissen/${article.slug}`}>{article.title}</Link>
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
        </div>
      ) : null}

      {/* Disclaimer */}
      <p className="mt-16 text-xs text-gray-400 text-center">
        Alle Inhalte dienen der allgemeinen Information und stellen keine
        Rechtsberatung dar.
      </p>
    </div>
  );
}
