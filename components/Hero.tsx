"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-primary to-primary-dark"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading leading-tight">
            Soluciones Sostenibles de
            <span className="block text-secondary">Ingeniería</span>
            para el Desarrollo de Colombia
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed max-w-3xl mx-auto">
            Especialistas en ingeniería ambiental, civil y sanitaria. 
            Agua potable, saneamiento, gestión de residuos y consultoría técnica 
            con compromiso ambiental y excelencia profesional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
              Cotizar Proyecto
            </Link>
            <Link href="/services" className="bg-white text-primary hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-300 text-lg">
              Nuestros Servicios
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">10+</div>
              <div className="text-gray-200">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-gray-200">Proyectos Completados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">100%</div>
              <div className="text-gray-200">Compromiso Ambiental</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
