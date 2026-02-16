import LayoutComponents from "@/components/LayoutComponents";
import Footer from "@/components/Footer";
import Link from "next/link";

const teamMembers = [
  {
    name: "Ing. Carlos Rodríguez",
    position: "CEO & Fundador",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Ingeniero Civil con más de 15 años de experiencia en proyectos sostenibles."
  },
  {
    name: "Ing. María González",
    position: "Directora de Ingeniería Ambiental",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Experta en estudios de impacto ambiental y licenciamiento."
  },
  {
    name: "Ing. Javier Martínez",
    position: "Gerente de Proyectos",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Especialista en gestión y supervisión de obras de infraestructura."
  },
  {
    name: "Ing. Laura Sánchez",
    position: "Directora de Sostenibilidad",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Líder en implementación de prácticas sostenibles en proyectos de ingeniería."
  }
];

const certifications = [
  { name: "ISO 9001", description: "Sistema de Gestión de Calidad", icon: "" },
  { name: "ISO 14001", description: "Sistema de Gestión Ambiental", icon: "" },
  { name: "OHSAS 18001", description: "Seguridad y Salud Ocupacional", icon: "" },
  { name: "RUC", description: "Registro Único de Proponentes", icon: "" }
];

const milestones = [
  { year: "2014", title: "Fundación", description: "SOSING S.A.S nace con la visión de transformar la ingeniería en Colombia" },
  { year: "2017", title: "Primer Gran Proyecto", description: "Planta de tratamiento para 50,000 habitantes" },
  { year: "2020", title: "Expansión Nacional", description: "Presencia en más de 15 departamentos del país" },
  { year: "2024", title: "Líderes en Sostenibilidad", description: "Reconocidos como la mejor empresa de ingeniería sostenible" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <LayoutComponents />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full about-hero-bg">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
            </div>
          </div>
          
          <div className="relative z-10 container-custom text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-heading leading-tight">
                Quiénes
                <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Somos
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
                Transformando desafíos ambientales en oportunidades de desarrollo sostenible
              </p>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Misión */}
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-dark">Misión</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ser líderes en la provisión de soluciones integrales de ingeniería sostenible, 
                  transformando desafíos ambientales en oportunidades de desarrollo que beneficien 
                  a las comunidades y al planeta, manteniendo los más altos estándares de calidad 
                  y responsabilidad social.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-8 lg:p-12 border border-green-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-dark">Visión</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Consolidarnos como la empresa de ingeniería más influyente de América Latina 
                  para 2030, siendo reconocidos por nuestra innovación en soluciones sostenibles 
                  y nuestro impacto positivo en el desarrollo de comunidades y la protección del medio ambiente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Nuestros
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Valores
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Responsabilidad</h3>
                <p className="text-gray-600">Compromiso con el medio ambiente y las comunidades</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Innovación</h3>
                <p className="text-gray-600">Soluciones creativas y tecnología de vanguardia</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Integridad</h3>
                <p className="text-gray-600">Ética profesional y transparencia en todo lo que hacemos</p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-dark mb-3">Excelencia</h3>
                <p className="text-gray-600">Calidad superior en cada proyecto y servicio</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Nuestro
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Equipo
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Profesionales altamente calificados comprometidos con la excelencia y sostenibilidad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="group text-center">
                  <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-dark mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificaciones */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Certificaciones y
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Reconocimientos
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="text-5xl mb-4">{cert.icon}</div>
                  <h3 className="text-xl font-bold text-gray-dark mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Línea de Tiempo */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Nuestra
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Historia
                </span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Línea vertical */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-emerald-600"></div>
                
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    {/* Círculo en la línea */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-green-500 rounded-full z-10"></div>
                    
                    {/* Contenido */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 ml-auto'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="text-2xl font-bold text-green-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-gray-dark mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
          <div className="container-custom text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Únete a Nuestra
                <span className="block text-green-100">Historia de Éxito</span>
              </h2>
              <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Descubre cómo podemos ayudarte a transformar tus proyectos en soluciones sostenibles 
                que marquen la diferencia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact" className="group px-10 py-5 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Contactar Expertos</span>
                </Link>
                <Link href="/portfolio" className="px-10 py-5 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                  Ver Nuestro Trabajo
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