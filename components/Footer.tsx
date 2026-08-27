import Link from "next/link";
import Image from "next/image";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "Quiénes Somos", href: "/about" },
      { name: "Nuestra Historia", href: "/about#history" },
      { name: "Misión y Visión", href: "/about#mission" },
      { name: "Equipo", href: "/about#team" },
    ],
    services: [
      { name: "Todos los Servicios", href: "/services" },
      { name: "Ingeniería Ambiental", href: "/services/ingenieria-ambiental" },
      { name: "Agua Potable", href: "/services/agua-potable-saneamiento" },
      { name: "Consultoría", href: "/services/consultoria-tecnica" },
    ],
    resources: [
      { name: "Portafolio", href: "/portfolio" },
      { name: "Diagnóstico gratis", href: "/#ecocheck" },
      { name: "Tienda de servicios", href: "/#ecocheck" },
      { name: "Plataforma 24/7", href: "/ingresar" },
    ],
    legal: [
      { name: "Tratamiento de Datos", href: "/politica-datos" },
      { name: "Contacto", href: "/contact" },
    ],
  };

  const contactInfo = [
    { tipo: "mail", label: "Correo electrónico", value: "comercial@sosinggroup.com", href: "mailto:comercial@sosinggroup.com" },
    { tipo: "whatsapp", label: "WhatsApp", value: "+57 311 660 8217", href: "https://wa.me/573116608217?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20de%20SOSING" },
    { tipo: "mapa", label: "Oficina", value: "Av. Simón Bolívar 21-44, Valledupar - Cesar", href: "https://maps.google.com/?q=Av+Simon+Bolivar+21-44+Valledupar+Cesar" },
    { tipo: "reloj", label: "Horario de atención", value: "Lun a Vie · 8:00 a.m. – 6:00 p.m.", href: "" },
  ];

  return (
    <footer className="bg-gray-dark text-white">
      <div className="bg-primary/10 border-b border-gray-600">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Mantente Informado</h3>
            <p className="text-gray-300 mb-6">
              Suscríbete para recibir noticias sobre nuestros proyectos y soluciones de ingeniería sostenible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/20 transition-colors"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo de SOSING S.A.S."
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold leading-tight">SOSING S.A.S.</h4>
                <p className="text-xs text-gray-400">Ingeniería Sostenible</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Soluciones Sostenibles de Ingeniería S.A.S.
            </p>

            <ul className="text-sm text-gray-400 space-y-1.5 mb-6">
              <li>NIT 900.342.838-7</li>
              <li>Valledupar - Cesar, Colombia</li>
            </ul>

            <SocialIcons />
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">
                      
                    </span>
                    <span className="ml-2">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">
                      
                    </span>
                    <span className="ml-2">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Contacto</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact) => {
                const contenido = (
                  <>
                    <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/30">
                      <IconoContacto tipo={contact.tipo} />
                    </span>
                    <span className="text-sm leading-snug pt-1.5 group-hover:text-white transition-colors">
                      {contact.value}
                    </span>
                  </>
                );
                return (
                  <li key={contact.label}>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={contact.href.startsWith("http") ? "_blank" : undefined}
                        rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={contact.label}
                        className="text-gray-300 flex items-start gap-3 group"
                      >
                        {contenido}
                      </a>
                    ) : (
                      <div className="text-gray-300 flex items-start gap-3 group">{contenido}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-gray-400 text-center">
            <span>&copy; {currentYear} SOSING S.A.S.</span>
            <span className="text-gray-600">·</span>
            <span>NIT 900.342.838-7</span>
            <span className="text-gray-600">·</span>
            <Link href="/politica-datos" className="hover:text-white transition-colors">
              Política de tratamiento de datos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};


/* Iconos de contacto */
function IconoContacto({ tipo }: { tipo: string }) {
  const cls = "w-4 h-4 text-white";
  if (tipo === "whatsapp")
    return (
      <svg viewBox="0 0 32 32" className="w-4 h-4 fill-white" aria-hidden="true">
        <path d="M16.004 0h-.008C7.174 0 .001 7.176.001 16c0 3.5 1.128 6.742 3.045 9.377L1.05 31.29l6.117-1.955A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.822 32 16S24.83 0 16.004 0zm9.31 22.594c-.386 1.09-1.92 1.995-3.142 2.259-.836.178-1.928.32-5.604-1.203-4.702-1.948-7.73-6.727-7.966-7.037-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.425 1.636-3.905.386-.394.98-.574 1.55-.574.184 0 .35.01.498.017.47.02.706.048 1.016.79.386.93 1.326 3.226 1.438 3.462.114.236.228.556.068.866-.15.32-.282.462-.518.734-.236.272-.46.48-.696.772-.216.254-.46.526-.188.996.272.46 1.21 1.994 2.59 3.224 1.782 1.586 3.226 2.092 3.744 2.308.386.16.846.122 1.128-.178.358-.386.8-1.026 1.25-1.656.32-.452.724-.508 1.148-.348.432.15 2.718 1.28 3.188 1.514.47.236.78.35.894.546.112.198.112 1.128-.274 2.219z" />
      </svg>
    );
  const paths: Record<string, string> = {
    mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    tel: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    mapa: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
    reloj: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  };
  return (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[tipo] || paths.mail} />
    </svg>
  );
}

export default Footer;