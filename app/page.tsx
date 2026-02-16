import LayoutComponents from "@/components/LayoutComponents";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const services = [
  { title: "Ingeniería Ambiental", description: "Estudios de impacto ambiental, licencias, permisos y soluciones sostenibles", icon: "🌿" },
  { title: "Agua Potable y Saneamiento", description: "Diseño, construcción y operación de sistemas de agua y saneamiento", icon: "💧" },
  { title: "Gestión de Residuos", description: "Soluciones integrales para la recolección y tratamiento de residuos", icon: "♻️" },
  { title: "Ingeniería Civil", description: "Diseño y supervisión de obras civiles e infraestructura", icon: "🏗️" },
  { title: "Consultoría Técnica", description: "Asesoría experta en proyectos de ingeniería", icon: "📊" },
  { title: "Interventoría y Supervisión", description: "Control y seguimiento de obras y proyectos", icon: "👁️" }
];

const stats = [
  { number: "10+", label: "Años de Experiencia" },
  { number: "150+", label: "Proyectos Completados" },
  { number: "50+", label: "Clientes Satisfechos" },
  { number: "98%", label: "Satisfacción" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LayoutComponents />
      
      <main className="pt-0">
        {/* Hero Section Optimizada */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Imagen de fondo optimizada con Next.js Image */}
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              <Image
                src="/images/hero-ingenieria-ambiental.webp"
                alt="Planta de tratamiento de agua moderna con tecnología sostenible e integración natural"
                fill
                priority
                quality={85}
                className="object-cover"
                sizes="100vw"
              />
              {/* Overlay optimizado para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/25"></div>
              
              {/* Efectos visuales sutiles y profesionales */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-32 left-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow animate-delay-1000"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl animate-pulse-slow animate-delay-500"></div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 container-custom text-center text-white px-4">
            <div className="max-w-6xl mx-auto">
              {/* Badge de confianza técnica */}
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 animate-fade-in">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-semibold text-green-100">10+ Años de Experiencia en Ingeniería Ambiental</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 font-heading leading-tight animate-slide-up text-center">
                <span className="block mb-2 text-white/95">Ingeniería que</span>
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Protege el Futuro
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto text-gray-100 leading-relaxed animate-slide-up animate-delay-200">
                Líderes en <span className="text-green-300 font-semibold">soluciones ambientales integrales</span> para 
                <span className="text-green-300 font-semibold"> agua potable, saneamiento y gestión sostenible</span> de recursos en Colombia
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-up animate-delay-300">
                <Link 
                  href="/services" 
                  className="btn-primary group flex items-center justify-center space-x-3 shadow-2xl"
                  aria-label="Explorar nuestros servicios de ingeniería ambiental"
                >
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                  <span>Explorar Servicios</span>
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-secondary group flex items-center justify-center space-x-3 shadow-2xl"
                  aria-label="Contactar expertos en ingeniería ambiental"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Contactar Expertos</span>
                </Link>
              </div>
              
              {/* Estadísticas de impacto optimizadas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto animate-fade-in animate-delay-500">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="glass-dark rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-200 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <nav className="absolute bottom-8 left-8 z-20" aria-label="Redes sociales">
            <div className="flex flex-col space-y-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 glass-dark rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
            </div>
          </nav>
        </section>

        {/* About Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full">
                  <span className="text-sm font-semibold">Sobre Nosotros</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-dark">Líderes en</span>
                  <span className="block text-gradient">
                    Ingeniería Sostenible
                  </span>
                </h2>
                
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    SOSING S.A.S es una empresa colombiana pionera en soluciones de ingeniería sostenible, 
                    con más de 10 años de experiencia transformando desafíos ambientales en oportunidades de desarrollo.
                  </p>
                  <p>
                    Nuestro equipo de expertos combina innovación técnica, responsabilidad ambiental y 
                    excelencia operativa para entregar proyectos que marcan la diferencia en Colombia.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/about" className="btn-primary group flex items-center justify-center space-x-2">
                    <span>Conocer Más</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <Link href="/portfolio" className="btn-secondary">
                    Ver Portafolio
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-hard group">
                  <img 
                    src="https://images.unsplash.com/photo-1581094794329-8c6305f9db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Ingeniería Sostenible - Proyectos de SOSING S.A.S"
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">SOSING S.A.S</h3>
                    <p className="text-lg">Ingeniería con Propósito</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full mb-8">
                <span className="text-sm font-semibold">Nuestros Servicios</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Soluciones Integrales de
                <span className="block text-gradient">
                  Ingeniería
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Ofrecemos soluciones integrales de ingeniería adaptadas a las necesidades específicas de cada proyecto, 
                combinando innovación tecnológica con sostenibilidad ambiental.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="card-hover group">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <div className="text-4xl">{service.icon}</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span>Soluciones personalizadas</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span>Estándares internacionales</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span>Impacto ambiental positivo</span>
                      </li>
                    </ul>
                    
                    <Link href="/services" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group">
                      <span>Explorar servicio</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/10 rounded-full animate-pulse-slow animate-delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/10 rounded-full animate-pulse-slow animate-delay-500"></div>
          </div>
          
          <div className="container-custom text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center px-6 py-3 glass rounded-full mb-8">
                <span className="text-sm font-semibold">Inicia tu Proyecto Sostenible</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                ¿Listo para Transformar
                <span className="block text-green-100">Ideas en Realidad?</span>
              </h2>
              <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Únete a más de 150 clientes que confían en nuestra experiencia para desarrollar 
                proyectos de ingeniería que marcan la diferencia en Colombia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact" className="btn-primary bg-white text-green-600 hover:bg-gray-50 group flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Contactar Expertos</span>
                </Link>
                <Link href="/services" className="btn-ghost border-2 border-white/30">
                  Ver Todos los Servicios
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
