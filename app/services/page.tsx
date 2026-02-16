import LayoutComponents from "@/components/LayoutComponents";
import Footer from "@/components/Footer";
import Link from "next/link";

const services = [
  {
    slug: "ingenieria-ambiental",
    title: "Ingeniería Ambiental",
    description: "Soluciones integrales para el manejo sostenible del entorno natural y construido.",
    icon: "🌿",
    image: "/images/servicios/ingenieria-ambiental.webp",
    features: [
      "Estudios de Impacto Ambiental (EIA)",
      "Licencias Ambientales y Permisos",
      "Planes de Manejo Ambiental (PMA)",
      "Auditorías Ambientales",
      "Consultoría en Normativa Ambiental"
    ],
    benefits: [
      "Cumplimiento de normativa ambiental",
      "Reducción de riesgos ambientales",
      "Mejora de reputación corporativa",
      "Acceso a incentivos verdes"
    ]
  },
  {
    slug: "agua-potable-saneamiento",
    title: "Agua Potable y Saneamiento",
    description: "Diseño, construcción y optimización de sistemas de agua potable y saneamiento básico.",
    icon: "💧",
    image: "/images/servicios/agua-potable.webp",
    features: [
      "Diseño de Acueductos y Redes",
      "Plantas de Tratamiento de Agua",
      "Sistemas de Alcantarillado",
      "Plantas de Tratamiento de Aguas Residuales",
      "Optimización y Rehabilitación de Redes"
    ],
    benefits: [
      "Agua segura para consumo humano",
      "Protección de fuentes hídricas",
      "Mejora en salud pública",
      "Cumplimiento de metas ODS"
    ]
  },
  {
    slug: "gestion-residuos",
    title: "Gestión de Residuos",
    description: "Soluciones integrales para la gestión sostenible de residuos sólidos y peligrosos.",
    icon: "♻️",
    image: "/images/servicios/gestion-residuos.webp",
    features: [
      "Diagnóstico y Caracterización",
      "Planes de Gestión Integral (PGIRS)",
      "Diseño de Rellenos Sanitarios",
      "Plantas de Compostaje y Tratamiento",
      "Programas de Minimización y Reciclaje"
    ],
    benefits: [
      "Reducción de impacto ambiental",
      "Cumplimiento normativo",
      "Generación de valor residual",
      "Mejora en salud ocupacional"
    ]
  },
  {
    slug: "ingenieria-civil",
    title: "Ingeniería Civil",
    description: "Diseño y supervisión de obras civiles con estándares internacionales de calidad.",
    icon: "🏗️",
    image: "/images/servicios/ingenieria-civil.webp",
    features: [
      "Diseño Estructural y Arquitectónico",
      "Infraestructura Vial y Transporte",
      "Obras Hidráulicas y de Drenaje",
      "Edificaciones y Construcción Civil",
      "Geotecnia y Mecánica de Suelos"
    ],
    benefits: [
      "Infraestructura segura y duradera",
      "Optimización de recursos",
      "Cumplimiento de normativas técnicas",
      "Reducción de riesgos constructivos"
    ]
  },
  {
    slug: "consultoria-tecnica",
    title: "Consultoría Técnica",
    description: "Asesoría experta y estudios técnicos especializados para toma de decisiones informadas.",
    icon: "📊",
    image: "/images/servicios/consultoria-tecnica.webp",
    features: [
      "Estudios de Prefactibilidad y Factibilidad",
      "Informes Técnicos y Peritajes",
      "Auditorías Técnicas y de Procesos",
      "Asesoría en Ingeniería Especializada",
      "Evaluación de Riesgos Técnicos"
    ],
    benefits: [
      "Decisiones basadas en análisis riguroso",
      "Reducción de riesgos operativos",
      "Optimización de procesos",
      "Cumplimiento de estándares técnicos"
    ]
  },
  {
    slug: "interventoria-supervision",
    title: "Interventoría y Supervisión",
    description: "Control técnico y seguimiento riguroso de obras y proyectos para garantizar calidad.",
    icon: "👁️",
    image: "/images/servicios/consultoria-tecnica.webp",
    features: [
      "Interventoría Técnica de Obras",
      "Supervisión de Construcción",
      "Control de Calidad y Ensayos",
      "Gestión Contractual y Administrativa",
      "Verificación de Cumplimiento Normativo"
    ],
    benefits: [
      "Garantía de calidad en ejecución",
      "Cumplimiento de especificaciones",
      "Control de plazos y costos",
      "Reducción de riesgos contractuales"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <LayoutComponents />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/images/services-hero.webp')`
              }}
            ></div>
          </div>
          
          <div className="relative z-10 container-custom text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-heading leading-tight">
                Nuestros
                <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Servicios
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
                Soluciones integrales de ingeniería adaptadas a las necesidades específicas de cada proyecto
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2">
                        <div className="text-2xl">{service.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-dark mb-3">Servicios Incluidos:</h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-dark mb-3">Beneficios:</h4>
                      <ul className="space-y-2">
                        {service.benefits.slice(0, 2).map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* CTA Button */}
                    <Link 
                      href={`/services/${service.slug}`}
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 group"
                    >
                      <span>Ver Detalles</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Nuestro
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Proceso
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Metodología probada para garantizar el éxito de cada proyecto
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Diagnóstico</h3>
                <p className="text-gray-600">Análisis detallado de necesidades y evaluación inicial del proyecto</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Diseño</h3>
                <p className="text-gray-600">Desarrollo de soluciones personalizadas y planificación detallada</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Implementación</h3>
                <p className="text-gray-600">Ejecución del proyecto con control de calidad y supervisión constante</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Seguimiento</h3>
                <p className="text-gray-600">Monitoreo post-implementación y soporte continuo</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
          <div className="container-custom text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                ¿Listo para Iniciar tu
                <span className="block text-green-100">Proyecto Sostenible?</span>
              </h2>
              <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Contáctanos para una consulta gratuita y descubre cómo podemos ayudarte a 
                transformar tus ideas en realidad sostenible.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact" className="group px-10 py-5 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Consultar Gratis</span>
                </Link>
                <Link href="/portfolio" className="px-10 py-5 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                  Ver Proyectos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}