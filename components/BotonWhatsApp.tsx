"use client";

import { useEffect, useState } from "react";

/* ============================================================
   Botón flotante de WhatsApp
   Aparece en todas las páginas, esquina inferior derecha.
   ============================================================ */

const NUMERO = "573116608217";
const MENSAJE = "Hola, vengo de la página web de SOSING y quisiera más información.";

export default function BotonWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    // Aparece tras un momento para no competir con la carga inicial
    const t1 = setTimeout(() => setVisible(true), 1200);
    // Muestra el globo una sola vez, brevemente
    const t2 = setTimeout(() => setTooltip(true), 2600);
    const t3 = setTimeout(() => setTooltip(false), 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const url = `https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAJE)}`;

  return (
    <div
      className={`fixed z-50 bottom-5 right-5 flex items-center gap-3 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Globo de mensaje */}
      <div
        className={`hidden sm:block bg-white text-gray-800 text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ${
          tooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3 pointer-events-none"
        }`}
      >
        ¿Necesita asesoría ambiental?
        <button
          onClick={() => setTooltip(false)}
          aria-label="Cerrar mensaje"
          className="ml-3 text-gray-400 hover:text-gray-600 font-bold"
        >
          ×
        </button>
      </div>

      {/* Botón */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp a SOSING"
        onMouseEnter={() => setTooltip(true)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-transform hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Onda de pulso */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-40"
          style={{ backgroundColor: "#25D366", animationDuration: "2.5s" }}
        />
        <svg
          viewBox="0 0 32 32"
          className="relative w-8 h-8 fill-white"
          aria-hidden="true"
        >
          <path d="M16.004 0h-.008C7.174 0 .001 7.176.001 16c0 3.5 1.128 6.742 3.045 9.377L1.05 31.29l6.117-1.955A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.822 32 16S24.83 0 16.004 0zm9.31 22.594c-.386 1.09-1.92 1.995-3.142 2.259-.836.178-1.928.32-5.604-1.203-4.702-1.948-7.73-6.727-7.966-7.037-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.425 1.636-3.905.386-.394.98-.574 1.55-.574.184 0 .35.01.498.017.47.02.706.048 1.016.79.386.93 1.326 3.226 1.438 3.462.114.236.228.556.068.866-.15.32-.282.462-.518.734-.236.272-.46.48-.696.772-.216.254-.46.526-.188.996.272.46 1.21 1.994 2.59 3.224 1.782 1.586 3.226 2.092 3.744 2.308.386.16.846.122 1.128-.178.358-.386.8-1.026 1.25-1.656.32-.452.724-.508 1.148-.348.432.15 2.718 1.28 3.188 1.514.47.236.78.35.894.546.112.198.112 1.128-.274 2.219z" />
        </svg>
      </a>
    </div>
  );
}
