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
      { name: "Casos de Éxito", href: "/portfolio#cases" },
      { name: "Blog", href: "/blog" },
      { name: "Certificaciones", href: "/certifications" },
    ],
    legal: [
      { name: "Política de Privacidad", href: "/privacy" },
      { name: "Términos y Condiciones", href: "/terms" },
      { name: "Política de Calidad", href: "/quality" },
      { name: "Sostenibilidad", href: "/sustainability" },
    ],
  };

  const contactInfo = [
    { icon: "", label: "Email", value: "contact@sosinggroup.com", href: "mailto:contact@sosinggroup.com" },
    { icon: "", label: "Teléfono", value: "+57 311 6608217", href: "tel:+573116608217" },
    { icon: "", label: "WhatsApp", value: "+57 311 6608217", href: "https://wa.me/573116608217", action: "Enviar mensaje" },
    { icon: "", label: "Llamar", value: "+57 311 6608217", href: "tel:+573116608217", action: "Llamar ahora" },
    { icon: "", label: "Dirección", value: "Av Simón Bolívar 21-44, Valledupar, Cesar", href: "#" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50">
                <Image 
                  src="/logo.png" 
                  alt="SOSING Group Logo" 
                  width={48} 
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold">SOSING Group</h4>
                <p className="text-sm text-gray-300">Ingeniería Sostenible</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Líderes en soluciones sostenibles de ingeniería para el desarrollo de Colombia. 
              Más de 10 años de experiencia transformando desafíos en oportunidades sostenibles.
            </p>
            
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
            <ul className="space-y-4">
              {contactInfo.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-start space-x-3 group"
                  >
                    <span className="text-lg mt-0.5">{contact.icon}</span>
                    <div>
                      <div className="text-sm text-gray-400">{contact.label}</div>
                      <div className="group-hover:text-primary transition-colors">
                        {contact.value}
                      </div>
                      {contact.action && (
                        <div className="mt-1">
                          <span className="text-xs text-green-400 group-hover:text-green-300 transition-colors">
                            {contact.action}
                          </span>
                        </div>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-center md:text-left">
              <p>&copy; {currentYear} SOSING Group. Todos los derechos reservados.</p>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;