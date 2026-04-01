import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/schnellcheck/fragebogen", "/schnellcheck/ergebnis"],
      },
    ],
    sitemap: "https://finanzaufsicht-schutz.de/sitemap.xml",
  };
}
