import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // No indexar áreas privadas de clientes
        disallow: ["/plataforma", "/ingresar", "/registro", "/api/"],
      },
    ],
    sitemap: "https://www.sosinggroup.com/sitemap.xml",
    host: "https://www.sosinggroup.com",
  };
}
