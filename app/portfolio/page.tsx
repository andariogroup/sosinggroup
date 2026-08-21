import LayoutComponents from "@/components/LayoutComponents";
import Footer from "@/components/Footer";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Reservorio y PTAP Anaripa",
    category: "Agua Potable",
    location: "La Guajira, Colombia",
    image: "/images/proyecto-ptap-tanque.jpg",
    description: "Construcción de reservorio y planta de tratamiento de agua potable para abastecimiento de comunidad rural en La Guajira.",
    features: ["Tanque de almacenamiento", "Sistema de potabilización", "Obra civil complementaria", "Supervisión técnica"],
    year: "2026",
    client: "Proyecto WASH",
    status: "En ejecución"
  },
  {
    id: 2,
    title: "Obra civil — Reservorio Anaripa",
    category: "Ingeniería Civil",
    location: "La Guajira, Colombia",
    image: "/images/proyecto-excavacion.jpg",
    description: "Excavación, cimentación y estructura para la instalación del sistema de almacenamiento de agua.",
    features: ["Movimiento de tierra", "Cimentación", "Estructura en concreto", "Control de calidad"],
    year: "2026",
    client: "Proyecto WASH",
    status: "En ejecución"
  },
  {
    id: 3,
    title: "Caseta de operación — PTAP Anaripa",
    category: "Ingeniería Civil",
    location: "La Guajira, Colombia",
    image: "/images/proyecto-ptap-caseta.jpg",
    description: "Construcción de caseta para equipos de operación y control del sistema de tratamiento.",
    features: ["Mampostería estructural", "Ventilación técnica", "Protección de equipos", "Acabados"],
    year: "2026",
    client: "Proyecto WASH",
    status: "En ejecución"
  },
  {
    id: 4,
    title: "Rehabilitación WASH — IE Kasutalain",
    category: "Saneamiento Básico",
    location: "Maicao, La Guajira",
    image: "/images/proyecto-kasutalain.jpg",
    description: "Rehabilitación de infraestructura de agua y saneamiento en institución educativa rural.",
    features: ["Caseta de bombeo", "Red hidráulica", "Unidades sanitarias", "Supervisión de obra"],
    year: "2026",
    client: "Institución educativa",
    status: "Completado"
  },
  {
    id: 5,
    title: "Sistema de bombeo — IE Kasutalain",
    category: "Agua Potable",
    location: "Maicao, La Guajira",
    image: "/images/proyecto-bombeo.jpg",
    description: "Instalación y puesta en marcha de sistema de bombeo con controlador para suministro de agua.",
    features: ["Electrobomba", "Controlador de operación", "Red de distribución", "Pruebas de funcionamiento"],
    year: "2026",
    client: "Institución educativa",
    status: "Completado"
  },
  {
    id: 6,
    title: "Interventoría de infraestructura WASH",
    category: "Interventoría",
    location: "Maicao, La Guajira",
    image: "/images/proyecto-ptap-anaripa.jpg",
    description: "Supervisión técnica, administrativa y financiera de contratos de rehabilitación de infraestructura de agua y saneamiento.",
    features: ["Verificación en campo", "Control de avance", "Informes técnicos", "Registro fotográfico"],
    year: "2026",
    client: "Cooperación internacional",
    status: "En ejecución"
  }
];

const categories = ["Todos", "Saneamiento Básico", "Gestión Ambiental", "Ingeniería Civil", "Consultoría Ambiental", "Agua Potable", "Interventoría"];

export default function PortfolioPage() {
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
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/images/portfolio-hero.jpg')`
              }}
            ></div>
          </div>
          
          <div className="relative z-10 container-custom text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-heading leading-tight">
                Nuestro
                <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Portafolio
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
                Proyectos que demuestran nuestro compromiso con la excelencia y sostenibilidad
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-gray-600">Proyectos Completados</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">32</div>
                <div className="text-gray-600">Municipios Beneficiados</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">500K</div>
                <div className="text-gray-600">Personas Impactadas</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600">Satisfacción del Cliente</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 leading-tight">
                Proyectos
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Destacados
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Descubre algunos de nuestros proyectos más representativos
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    category === "Todos"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                        {project.status}
                      </span>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-dark text-sm font-semibold rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      {project.location}
                      <span className="mx-2"></span>
                      <span>{project.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-dark mb-3 group-hover:text-green-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Client Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Cliente:</span>
                        <span className="text-sm font-semibold text-gray-dark ml-1">{project.client}</span>
                      </div>
                    </div>
                    
                    {/* Features Preview */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                        {project.features.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{project.features.length - 2} más
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* View Details Button */}
                    <button className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 group">
                      <span>Ver Detalles</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
          <div className="container-custom text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                ¿Listo para tu Próximo
                <span className="block text-green-100">Proyecto de Éxito?</span>
              </h2>
              <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Únete a más de 150 clientes que han confiado en nosotros para transformar 
                sus visiones en proyectos sostenibles y exitosos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact" className="group px-10 py-5 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Iniciar Proyecto</span>
                </Link>
                <Link href="/services" className="px-10 py-5 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
                  Ver Servicios
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