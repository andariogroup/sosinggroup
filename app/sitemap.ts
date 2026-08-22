import type { MetadataRoute } from "next";

const BASE = "https://www.sosinggroup.com";

const SERVICIOS = [
  "ingenieria-ambiental",
  "agua-potable-saneamiento",
  "gestion-residuos",
  "ingenieria-civil",
  "consultoria-tecnica",
  "interventoria-supervision",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const principales: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: ahora, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services`, lastModified: ahora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: ahora, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/portfolio`, lastModified: ahora, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: ahora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/politica-datos`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicios: MetadataRoute.Sitemap = SERVICIOS.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: ahora,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...principales, ...servicios];
}
