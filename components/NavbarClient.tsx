"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Quiénes Somos", href: "/about" },
    { name: "Servicios", href: "/services" },
    { name: "Portafolio", href: "/portfolio" },
    { name: "Contacto", href: "/contact" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav 
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
          : "bg-white shadow-md"
        }
      `}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link 
            href="/" 
            className="flex items-center space-x-3 group transition-transform hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-primary shadow-md group-hover:shadow-lg transition-shadow">
                <Image 
                  src="/logo.png" 
                  alt="SOSING S.A.S Logo" 
                  width={48} 
                  height={48}
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold text-gray-dark group-hover:text-primary transition-colors">
                SOSING S.A.S
              </span>
              <span className="text-xs lg:text-sm text-gray-tech hidden sm:block">
                Ingeniería Sostenible
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${isActiveLink(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-gray-dark hover:text-primary hover:bg-gray-50"
                  }
                `}
              >
                {item.name}
                {isActiveLink(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5">
              <div 
                className={`
                  w-full h-0.5 bg-gray-dark transition-all duration-300
                  ${isMenuOpen ? "rotate-45 translate-y-2" : ""}
                `}
              ></div>
              <div 
                className={`
                  w-full h-0.5 bg-gray-dark transition-all duration-300
                  ${isMenuOpen ? "opacity-0" : ""}
                `}
              ></div>
              <div 
                className={`
                  w-full h-0.5 bg-gray-dark transition-all duration-300
                  ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}
                `}
              ></div>
            </div>
          </button>
        </div>

        <div 
          className={`
            lg:hidden overflow-hidden transition-all duration-300
            ${isMenuOpen ? "max-h-96" : "max-h-0"}
          `}
        >
          <div className="py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-between
                    ${isActiveLink(item.href)
                      ? "text-primary bg-primary/10 border-l-4 border-primary"
                      : "text-gray-dark hover:text-primary hover:bg-gray-50"
                    }
                  `}
                >
                  <span>{item.name}</span>
                  {isActiveLink(item.href) && (
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;