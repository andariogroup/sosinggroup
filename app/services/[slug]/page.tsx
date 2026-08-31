import { Metadata } from "next";
import LayoutComponents from "@/components/LayoutComponents";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import CTA from "@/components/CTA";
import Link from "next/link";
import Image from "next/image";
import { Leaf, Droplets, Recycle, HardHat, LineChart, ClipboardCheck, Ruler, Check } from "lucide-react";

const serviceData = {
  "ingenieria-ambiental": {
    title: "Ingeniería Ambiental",
    description: "Soluciones integrales para el manejo sostenible del entorno natural y construido.",
    icon: "🌿",
    image: "/images/paneles-solares.jpg",
    lucide: "Leaf",
    problem: "Las empresas y municipios enfrentan desafíos crecientes para cumplir con la normativa ambiental mientras desarrollan sus proyectos de manera sostenible.",
    solution: "Ofrecemos estudios de impacto ambiental, licenciamiento, planes de manejo ambiental y auditorías para garantizar el cumplimiento normativo y la sostenibilidad de sus proyectos.",
    benefits: [
      "Cumplimiento de normativa ambiental vigente",
      "Reducción de riesgos ambientales y legales",
      "Mejora de la reputación corporativa",
      "Acceso a incentivos y certificaciones ambientales"
    ],
    services: [
      "Estudios de Impacto Ambiental (EIA)",
      "Licencias Ambientales y Permisos",
      "Planes de Manejo Ambiental (PMA)",
      "Auditorías Ambientales",
      "Consultoría en Normativa Ambiental",
      "Diagnósticos Ambientales",
      "Planes de Compensación Ambiental"
    ]
  },
  "agua-potable-saneamiento": {
    title: "Agua Potable y Saneamiento",
    description: "Diseño, construcción y optimización de sistemas de agua potable y saneamiento básico.",
    icon: "💧",
    image: "/images/planta-osmosis.jpg",
    lucide: "Droplets",
    problem: "Muchas comunidades y empresas carecen de sistemas adecuados de agua potable y saneamiento, afectando la salud pública y el desarrollo económico.",
    solution: "Desarrollamos soluciones integrales para acueductos, alcantarillado, tratamiento de agua y aguas residuales con tecnología de vanguardia y enfoque sostenible.",
    benefits: [
      "Garantía de agua segura para consumo humano",
      "Protección de fuentes hídricas",
      "Mejora en salud pública y calidad de vida",
      "Cumplimiento de metas de desarrollo sostenible"
    ],
    services: [
      "Diseño de Acueductos y Redes de Distribución",
      "Plantas de Tratamiento de Agua Potable",
      "Sistemas de Alcantarillado",
      "Plantas de Tratamiento de Aguas Residuales",
      "Optimización y Rehabilitación de Redes",
      "Estudios Hidráulicos y Sanitarios",
      "Modelación de Sistemas"
    ]
  },
  "gestion-residuos": {
    title: "Gestión de Residuos",
    description: "Soluciones integrales para la gestión sostenible de residuos sólidos y peligrosos.",
    icon: "♻️",
    image: "/images/trampa-grasas.jpg",
    lucide: "Recycle",
    problem: "El manejo inadecuado de residuos genera contaminación, riesgos sanitarios y pérdida de oportunidades de valorización.",
    solution: "Implementamos sistemas integrales de gestión de residuos que incluyen minimización, recolección, tratamiento, disposición final y valorización.",
    benefits: [
      "Reducción de impacto ambiental",
      "Cumplimiento normativo en gestión de residuos",
      "Generación de valor a partir de residuos",
      "Mejora en salud y seguridad ocupacional"
    ],
    services: [
      "Diagnóstico y Caracterización de Residuos",
      "Planes de Gestión Integral de Residuos Sólidos (PGIRS)",
      "Diseño de Rellenos Sanitarios",
      "Plantas de Compostaje y Tratamiento Biológico",
      "Estudios de Valorización de Residuos",
      "Consultoría en Normativa de Residuos",
      "Programas de Minimización y Reciclaje"
    ]
  },
  "ingenieria-civil": {
    title: "Ingeniería Civil",
    description: "Diseño y supervisión de obras civiles con estándares internacionales de calidad y seguridad.",
    icon: "🏗️",
    image: "/images/equipo-muro-gaviones.jpg",
    lucide: "HardHat",
    problem: "Los proyectos de infraestructura requieren diseño técnico preciso, supervisión rigurosa y cumplimiento de normativas para garantizar su viabilidad y durabilidad.",
    solution: "Ofrecemos servicios completos de diseño estructural, supervisión de obras, control de calidad y gestión de proyectos de ingeniería civil.",
    benefits: [
      "Infraestructura segura y duradera",
      "Optimización de recursos y costos",
      "Cumplimiento de normativas técnicas",
      "Reducción de riesgos en construcción"
    ],
    services: [
      "Diseño Estructural y Arquitectónico",
      "Infraestructura Vial y Transporte",
      "Obras Hidráulicas y de Drenaje",
      "Edificaciones y Construcción Civil",
      "Geotecnia y Mecánica de Suelos",
      "Supervisión Técnica de Obras",
      "Control de Calidad en Construcción"
    ]
  },
  "consultoria-tecnica": {
    title: "Consultoría Técnica",
    description: "Asesoría experta y estudios técnicos especializados para la toma de decisiones informadas.",
    icon: "📊",
    image: "/images/toma-muestras.jpg",
    lucide: "LineChart",
    problem: "Las organizaciones necesitan análisis técnicos objetivos y especializados para tomar decisiones estratégicas y optimizar sus operaciones.",
    solution: "Proporcionamos consultoría técnica especializada, estudios de prefactibilidad, informes periciales y auditorías técnicas para apoyar la toma de decisiones.",
    benefits: [
      "Decisiones basadas en análisis técnico riguroso",
      "Reducción de riesgos operativos y financieros",
      "Optimización de procesos y recursos",
      "Cumplimiento de estándares técnicos y normativos"
    ],
    services: [
      "Estudios de Prefactibilidad y Factibilidad",
      "Informes Técnicos y Peritajes",
      "Auditorías Técnicas y de Procesos",
      "Asesoría en Ingeniería Especializada",
      "Evaluación de Riesgos Técnicos",
      "Optimización de Procesos Industriales",
      "Consultoría en Normativas Técnicas"
    ]
  },
  "interventoria-supervision": {
    title: "Interventoría y Supervisión",
    description: "Control técnico y seguimiento riguroso de obras y proyectos para garantizar calidad y cumplimiento.",
    icon: "👁️",
    image: "/images/equipo-inspeccion-ptap.jpg",
    lucide: "ClipboardCheck",
    problem: "Los proyectos de construcción requieren supervisión técnica independiente para garantizar el cumplimiento de especificaciones, plazos y estándares de calidad.",
    solution: "Ofrecemos servicios de interventoría técnica, supervisión de obras, control de calidad y gestión contractual para asegurar el éxito de los proyectos.",
    benefits: [
      "Garantía de calidad en ejecución",
      "Cumplimiento de especificaciones técnicas",
      "Control de plazos y costos",
      "Reducción de riesgos contractuales"
    ],
    services: [
      "Interventoría Técnica de Obras",
      "Supervisión de Construcción",
      "Control de Calidad y Ensayos",
      "Gestión Contractual y Administrativa",
      "Seguimiento Ambiental y Social",
      "Control de Avances y Medición",
      "Verificación de Cumplimiento Normativo"
    ]
  },
  "topografia": {
    title: "Topografía",
    description: "Levantamientos topográficos precisos y servicios de geomática para proyectos de ingeniería.",
    icon: "📐",
    image: "/images/equipo-muro-gaviones.jpg",
    lucide: "Ruler",
    problem: "Los proyectos de ingeniería requieren información topográfica precisa para el diseño, planificación y control de obras.",
    solution: "Realizamos levantamientos topográficos, georreferenciación, cartografía digital y control de obras con tecnología de precisión y software especializado.",
    benefits: [
      "Información geográfica precisa y actualizada",
      "Optimización en diseño de proyectos",
      "Control preciso de ejecución de obras",
      "Base para modelado y simulación"
    ],
    services: [
      "Levantamientos Topográficos",
      "Georreferenciación y Cartografía",
      "Control Topográfico de Obras",
      "Modelado Digital de Terrenos",
      "Batimetría y Levantamientos Hidrográficos",
      "Redes Geodésicas y Control",
      "Procesamiento de Información Geográfica"
    ]
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = serviceData[params.slug as keyof typeof serviceData];
  
  if (!service) {
    return {
      title: "Servicio No Encontrado - SOSING S.A.S",
      description: "El servicio que buscas no está disponible."
    };
  }

  return {
    title: `${service.title} - SOSING S.A.S`,
    description: service.description,
    keywords: `${service.title}, ingeniería, SOSING, Colombia, soluciones sostenibles`,
    openGraph: {
      title: `${service.title} - SOSING S.A.S`,
      description: service.description,
      type: "article",
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceData[params.slug as keyof typeof serviceData];

  if (!service) {
    return (
      <>
        <LayoutComponents />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-dark mb-4">Servicio No Encontrado</h1>
            <p className="text-gray-tech mb-8">El servicio que buscas no está disponible.</p>
            <Link href="/services" className="btn-primary">
              Ver Todos los Servicios
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <LayoutComponents />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[420px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.title + " — SOSING S.A.S."}
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F241A] via-[#0F241A]/80 to-[#0F241A]/30"></div>
          </div>

          <div className="relative z-10 container-custom pb-14 pt-28 text-white">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-green-200 hover:text-white mb-5 transition-colors">
              ← Todos los servicios
            </Link>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-5">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm font-semibold text-green-100">Servicio SOSING</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-4">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-red-50 p-8 rounded-xl border border-red-100">
                <h2 className="text-2xl font-bold text-red-600 mb-4 font-heading">Problema</h2>
                <p className="text-gray-dark leading-relaxed">{service.problem}</p>
              </div>
              <div className="bg-green-50 p-8 rounded-xl border border-green-100">
                <h2 className="text-2xl font-bold text-green-600 mb-4 font-heading">Solución</h2>
                <p className="text-gray-dark leading-relaxed">{service.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <SectionTitle 
              title="Beneficios" 
              subtitle="Las ventajas que obtienes con nuestros servicios"
              centered={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-dark leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Included */}
        <section className="section-padding">
          <div className="container-custom">
            <SectionTitle 
              title="Servicios Incluidos" 
              subtitle="Todo lo que ofrecemos en esta categoría"
              centered={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {service.services.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    </div>
                    <h4 className="font-semibold text-gray-dark leading-snug pt-1.5">{item}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <SectionTitle 
              title="Nuestro Proceso" 
              subtitle="Cómo trabajamos contigo"
              centered={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
                <h4 className="font-semibold text-gray-dark mb-2">Consulta Inicial</h4>
                <p className="text-sm text-gray-tech">Evaluamos tus necesidades y objetivos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                <h4 className="font-semibold text-gray-dark mb-2">Diagnóstico</h4>
                <p className="text-sm text-gray-tech">Análisis detallado del proyecto</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
                <h4 className="font-semibold text-gray-dark mb-2">Propuesta</h4>
                <p className="text-sm text-gray-tech">Presentamos soluciones personalizadas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                <h4 className="font-semibold text-gray-dark mb-2">Ejecución</h4>
                <p className="text-sm text-gray-tech">Implementación con seguimiento continuo</p>
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
