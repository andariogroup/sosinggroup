"use client";

import { useState, useEffect } from "react";

interface AccessibilityProps {
  children: React.ReactNode;
}

export default function AccessibilityManager({ children }: AccessibilityProps) {
  const [fontSize, setFontSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar preferencias del sistema
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReducedMotion);

    // Detectar preferencia de alto contraste
    const prefersHighContrast = window.matchMedia("(prefers-contrast: high)").matches;
    setHighContrast(prefersHighContrast);
  }, []);

  useEffect(() => {
    // Aplicar clases al body
    document.body.className = document.body.className
      .replace(/text-\w+/, "")
      .replace(/contrast-\w+/, "")
      .replace(/motion-\w+/, "")
      .trim();

    if (fontSize !== "normal") {
      document.body.classList.add(`text-${fontSize}`);
    }

    if (highContrast) {
      document.body.classList.add("contrast-high");
    }

    if (reducedMotion) {
      document.body.classList.add("motion-reduced");
    }
  }, [fontSize, highContrast, reducedMotion]);

  const increaseFontSize = () => {
    setFontSize(prev => {
      if (prev === "normal") return "large";
      if (prev === "large") return "xl";
      return "normal";
    });
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
  };

  return (
    <>
      {children}
      
      {/* Panel de accesibilidad (solo visible cuando se activa) */}
      <div className="fixed top-20 right-4 bg-white rounded-lg shadow-lg p-4 z-40 border border-gray-200 w-64">
        <h3 className="font-semibold text-gray-dark mb-3">Accesibilidad</h3>
        
        <div className="space-y-3">
          <button
            onClick={increaseFontSize}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors text-sm"
          >
            Tamaño de texto: {fontSize === "normal" ? "Normal" : fontSize === "large" ? "Grande" : "Extra Grande"}
          </button>
          
          <button
            onClick={toggleHighContrast}
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors text-sm ${
              highContrast ? "bg-green-100 text-green-700" : ""
            }`}
          >
            Alto Contraste: {highContrast ? "Activo" : "Inactivo"}
          </button>
          
          <button
            onClick={toggleReducedMotion}
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors text-sm ${
              reducedMotion ? "bg-green-100 text-green-700" : ""
            }`}
          >
            Movimiento Reducido: {reducedMotion ? "Activo" : "Inactivo"}
          </button>
        </div>
      </div>
    </>
  );
}