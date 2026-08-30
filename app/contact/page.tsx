import LayoutComponents from "@/components/LayoutComponents";
import Footer from "@/components/Footer";
import FormularioContacto from "@/components/FormularioContacto";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <LayoutComponents />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full contact-hero-bg">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
            </div>
          </div>
          
          <div className="relative z-10 container-custom text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading leading-tight">
                Hablemos de{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  su proyecto
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
                Inicia tu proyecto sostenible con el equipo líder en ingeniería ambiental
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-dark mb-6">Conecta con Nosotros</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Estamos listos para ayudarte a transformar tus ideas en proyectos sostenibles. 
                    Contáctanos para una consulta gratuita y descubre cómo podemos colaborar.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  <a
                    href="https://maps.google.com/?q=Av+Simon+Bolivar+21-44+Valledupar+Cesar"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver ubicación de SOSING en Google Maps"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-dark mb-1 group-hover:text-green-700 transition-colors">Oficina</h3>
                      <p className="text-gray-600">Av. Simón Bolívar 21-44</p>
                      <p className="text-gray-600">Valledupar, Cesar</p>
                      <span className="text-sm text-green-700 font-medium">Ver en el mapa →</span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/573116608217?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20de%20SOSING"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escribir a SOSING por WhatsApp"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform" style={{ backgroundColor: "#25D366" }}>
                      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white">
                        <path d="M16.004 0h-.008C7.174 0 .001 7.176.001 16c0 3.5 1.128 6.742 3.045 9.377L1.05 31.29l6.117-1.955A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.822 32 16S24.83 0 16.004 0zm9.31 22.594c-.386 1.09-1.92 1.995-3.142 2.259-.836.178-1.928.32-5.604-1.203-4.702-1.948-7.73-6.727-7.966-7.037-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.425 1.636-3.905.386-.394.98-.574 1.55-.574.184 0 .35.01.498.017.47.02.706.048 1.016.79.386.93 1.326 3.226 1.438 3.462.114.236.228.556.068.866-.15.32-.282.462-.518.734-.236.272-.46.48-.696.772-.216.254-.46.526-.188.996.272.46 1.21 1.994 2.59 3.224 1.782 1.586 3.226 2.092 3.744 2.308.386.16.846.122 1.128-.178.358-.386.8-1.026 1.25-1.656.32-.452.724-.508 1.148-.348.432.15 2.718 1.28 3.188 1.514.47.236.78.35.894.546.112.198.112 1.128-.274 2.219z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-dark mb-1 group-hover:text-green-700 transition-colors">WhatsApp</h3>
                      <p className="text-gray-600">+57 311 660 8217</p>
                      <span className="text-sm text-green-700 font-medium">Escribir ahora →</span>
                    </div>
                  </a>

                  <a
                    href="tel:+573116608217"
                    aria-label="Llamar a SOSING"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-dark mb-1 group-hover:text-green-700 transition-colors">Teléfono</h3>
                      <p className="text-gray-600">+57 311 660 8217</p>
                      <span className="text-sm text-green-700 font-medium">Llamar ahora →</span>
                    </div>
                  </a>

                  <a
                    href="mailto:comercial@sosinggroup.com"
                    aria-label="Escribir a SOSING por correo electrónico"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-dark mb-1 group-hover:text-green-700 transition-colors">Correo</h3>
                      <p className="text-gray-600 break-all">comercial@sosinggroup.com</p>
                      <span className="text-sm text-green-700 font-medium">Enviar correo →</span>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 pt-2 border-t border-gray-100">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-4">
                      <svg className="w-6 h-6 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-dark mb-1">Horario de atención</h3>
                      <p className="text-gray-600">Lunes a viernes: 8:00 a.m. – 6:00 p.m.</p>
                      <p className="text-gray-600">Sábados: 8:00 a.m. – 12:00 m.</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-dark mb-4">Síguenos</h3>
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/company/43282677/"
                aria-label="SOSING en LinkedIn" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="https://www.facebook.com/sosing2010/"
                aria-label="SOSING en Facebook" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/sosing_sas/"
                aria-label="SOSING en Instagram" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Mapa de ubicación */}
                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-gray-dark mb-4">Cómo llegar</h3>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                    <iframe
                      title="Ubicación de SOSING S.A.S. en Valledupar"
                      src="https://www.google.com/maps?q=Av+Simon+Bolivar+21-44,+Valledupar,+Cesar,+Colombia&output=embed"
                      width="100%"
                      height="280"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                  <a
                    href="https://maps.google.com/?q=Av+Simon+Bolivar+21-44+Valledupar+Cesar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
                  >
                    Abrir en Google Maps
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <FormularioContacto />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Preguntas{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Frecuentes
                </span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-dark mb-3">¿Cuánto tiempo toma un estudio de impacto ambiental?</h3>
                <p className="text-gray-600">El tiempo varía según la complejidad del proyecto, pero generalmente entre 3-6 meses desde el inicio hasta la obtención de la licencia ambiental.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-dark mb-3">¿Trabajan en todo el territorio colombiano?</h3>
                <p className="text-gray-600">Sí, tenemos presencia en más de 32 departamentos y experiencia trabajando en diferentes regiones del país.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-dark mb-3">¿Qué certificaciones tienen?</h3>
                <p className="text-gray-600">Contamos con certificaciones ISO 9001, ISO 14001, OHSAS 18001 y estamos inscritos en el RUC con categoría A+.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-dark mb-3">¿Ofrecen garantía en sus proyectos?</h3>
                <p className="text-gray-600">Sí, todos nuestros proyectos incluyen garantía legal y adicional según el tipo de servicio y alcance del proyecto.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}