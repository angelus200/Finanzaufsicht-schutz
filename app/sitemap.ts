import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";

const baseUrl = "https://finanzaufsicht-schutz.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const wissenArtikel = getAllArticles("wissen").map((a) => ({
    url: `${baseUrl}/wissen/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogArtikel = getAllArticles("blog").map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticSeiten = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/wissen`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/faq`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/schnellcheck`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/leistungen`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/datenbank`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/statistik`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/ueber-uns`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/mein-fall`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/kooperation`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/kontakt`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/presse`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/rechtliches/impressum`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/rechtliches/datenschutz`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/rechtliches/agb`, priority: 0.3, changeFrequency: "yearly" as const },
  ].map((s) => ({
    ...s,
    lastModified: new Date(),
  }));

  return [...staticSeiten, ...wissenArtikel, ...blogArtikel];
}
