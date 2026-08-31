import { Metadata } from "next";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import MetaPixel from "@/components/MetaPixel";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.sosinggroup.com/#organizacion",
  name: "SOSING S.A.S.",
  alternateName: "Soluciones Sostenibles de Ingeniería",
  url: "https://www.sosinggroup.com",
  logo: "https://www.sosinggroup.com/icons/icon-512x512.png",
  image: "https://www.sosinggroup.com/images/proyecto-ptap-anaripa.jpg",
  description:
    "Consultoría e ingeniería ambiental en Valledupar, Cesar y La Guajira. Diagnóstico ambiental, trámites ante autoridades ambientales, agua potable, saneamiento, gestión de residuos e interventoría de obras.",
  taxID: "900342838-7",
  foundingDate: "2014",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av Simón Bolívar 21-44",
    addressLocality: "Valledupar",
    addressRegion: "Cesar",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.4631,
    longitude: -73.2532,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Cesar" },
    { "@type": "AdministrativeArea", name: "La Guajira" },
    { "@type": "Country", name: "Colombia" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+57-311-660-8217",
    email: "comercial@sosinggroup.com",
    contactType: "customer service",
    areaServed: "CO",
    availableLanguage: ["Spanish"],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "12:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/sosing2010/",
    "https://www.instagram.com/sosing_sas",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de ingeniería y consultoría ambiental",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diagnóstico Ambiental Express",
          description:
            "Informe con las obligaciones ambientales aplicables a su negocio, la autoridad competente, nivel de riesgo y plan de acción.",
        },
        price: "49900",
        priceCurrency: "COP",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SOSING Ambiental 24/7",
          description:
            "Plataforma de cumplimiento ambiental con control de RESPEL, residuos sólidos, ACU, RCD y alertas de vencimientos.",
        },
        price: "79900",
        priceCurrency: "COP",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ingeniería Ambiental",
          description: "Estudios de impacto ambiental, licencias, permisos y planes de manejo.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agua Potable y Saneamiento",
          description: "Diseño, construcción y operación de sistemas de acueducto y saneamiento básico.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interventoría y Supervisión",
          description: "Control técnico, administrativo y financiero de obras de infraestructura.",
        },
      },
    ],
  },
};


export const metadata: Metadata = {
  title: "SOSING S.A.S - Soluciones Sostenibles de Ingeniería | Colombia",
  description: "Consultoría e ingeniería ambiental en Valledupar, Cesar y La Guajira. Diagnóstico ambiental gratuito, trámites ante Corpocesar y Corpoguajira, RESPEL, PGIRS, RUA e interventoría. Más de 10 años y 150+ proyectos.",
  keywords: [
    "SOSING S.A.S",
    "consultoría ambiental Valledupar",
    "ingeniería ambiental Cesar",
    "consultoría ambiental La Guajira",
    "trámites ambientales Corpocesar",
    "trámites ambientales Corpoguajira",
    "diagnóstico ambiental empresas",
    "RESPEL residuos peligrosos",
    "PGIRS plan de residuos",
    "RUA registro único ambiental",
    "permiso de vertimientos",
    "plan de manejo ambiental PMA",
    "interventoría de obras Colombia",
    "agua potable y saneamiento",
    "cumplimiento ambiental pymes",
    "ECOCHECK"
  ],
  authors: [{ name: "SOSING S.A.S" }],
  creator: "SOSING S.A.S",
  publisher: "SOSING S.A.S",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.sosinggroup.com"),
  alternates: {
    canonical: "https://www.sosinggroup.com",
    languages: {
      "es-CO": "https://www.sosinggroup.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.sosinggroup.com",
    title: "SOSING S.A.S - Ingeniería Sostenible en Colombia",
    description: "Líderes en ingeniería sostenible con más de 10 años de experiencia. Transformamos desafíos ambientales en oportunidades de desarrollo.",
    siteName: "SOSING S.A.S",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581094794329-8c6305f9db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "SOSING S.A.S - Ingeniería Sostenible",
        type: "image/jpeg",
      },
      {
        url: "https://images.unsplash.com/photo-1581094794329-8c6305f9db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        width: 800,
        height: 600,
        alt: "SOSING S.A.S - Proyectos de Ingeniería",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOSING S.A.S - Ingeniería Sostenible",
    description: "Líderes en ingeniería sostenible en Colombia con más de 10 años de experiencia.",
    images: ["https://images.unsplash.com/photo-1581094794329-8c6305f9db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2E7D32" />
        <meta name="msapplication-TileColor" content="#2E7D32" />
        <meta name="theme-color" content="#2E7D32" />
        
        {/* Preconnect para optimización */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org structured data - Script nativo para evitar hydration mismatch */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <MetaPixel />
        <BotonWhatsApp />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}