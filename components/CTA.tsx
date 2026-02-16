"use client";

import Link from "next/link";

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryText?: string;
  primaryLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
}

export default function CTA({
  title = "¿Listo para iniciar tu proyecto?",
  subtitle = "Contáctanos hoy mismo para una consulta técnica sin compromiso",
  primaryText = "Cotizar Proyecto",
  primaryLink = "/contact",
  secondaryText = "Ver Servicios",
  secondaryLink = "/services"
}: CTAProps) {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark text-white section-padding">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">{title}</h2>
        <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">{subtitle}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryLink} className="btn-secondary text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100">
            {primaryText}
          </Link>
          <Link href={secondaryLink} className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg">
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}
