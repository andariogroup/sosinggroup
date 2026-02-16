import { Metadata } from "next";
import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SOSING S.A.S",
  url: "https://www.sosing.com.co",
  logo: "https://www.sosing.com.co/logo.png",
  description: "Líderes en ingeniería sostenible en Colombia con más de 10 años de experiencia",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle 100 # 50-50",
    addressLocality: "Bogotá",
    addressRegion: "Cundinamarca",
    postalCode: "110111",
    addressCountry: "CO",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+57-1-300-555-0123",
    contactType: "customer service",
    availableLanguage: ["Spanish"],
  },
  sameAs: [
    "https://www.linkedin.com/company/sosing",
    "https://www.facebook.com/sosing",
    "https://twitter.com/sosing",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Ingeniería",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ingeniería Ambiental",
          description: "Estudios de impacto ambiental, licencias, permisos y soluciones sostenibles",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agua Potable y Saneamiento",
          description: "Diseño, construcción y operación de sistemas de agua y saneamiento",
        },
      },
    ],
  },
};

export const metadata: Metadata = {
  title: "SOSING S.A.S - Soluciones Sostenibles de Ingeniería | Colombia",
  description: "Líderes en ingeniería sostenible en Colombia con más de 10 años de experiencia. Especialistas en ingeniería ambiental, civil, saneamiento y gestión de residuos. 150+ proyectos completados.",
  keywords: [
    "SOSING S.A.S",
    "ingeniería sostenible Colombia",
    "ingeniería ambiental",
    "ingeniería civil",
    "tratamiento de aguas",
    "gestión de residuos",
    "consultoría ambiental",
    "interventoría de obras",
    "proyectos sostenibles",
    "ISO 9001",
    "ISO 14001"
  ],
  authors: [{ name: "SOSING S.A.S" }],
  creator: "SOSING S.A.S",
  publisher: "SOSING S.A.S",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.sosing.com.co"),
  alternates: {
    canonical: "https://www.sosing.com.co",
    languages: {
      "es-CO": "https://www.sosing.com.co",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.sosing.com.co",
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
      </body>
    </html>
  );
}