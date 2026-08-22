"use client";

import { useState } from "react";
import Link from "next/link";

/* ============================================================
   Preguntas frecuentes
   Responde las objeciones reales antes de que el cliente se vaya.
   ============================================================ */

const PREGUNTAS = [
  {
    p: "¿El diagnóstico de ECOCHECK reemplaza a un consultor ambiental?",
    r: "No. ECOCHECK identifica qué obligaciones ambientales le aplican a su negocio y ante qué autoridad, con base en la información que usted suministra. Es una guía orientativa que le da claridad inmediata. Cuando se requiere un concepto técnico, la elaboración de documentos o la radicación de un trámite, ahí interviene nuestro equipo de ingenieros.",
  },
  {
    p: "¿El informe sirve para presentarlo ante la autoridad ambiental?",
    r: "El informe no es un acto administrativo ni una certificación oficial. Sirve para que usted sepa exactamente en qué situación está y qué debe hacer. Los documentos que sí se radican ante la autoridad (PMA, RUA, permisos, planes de gestión) los elaboramos aparte, firmados por un profesional con matrícula.",
  },
  {
    p: "¿Qué pasa si la autoridad ambiental visita mi negocio?",
    r: "Lo primero es no improvisar. Una visita suele terminar en un acta con requerimientos y plazos. Si ya recibió un requerimiento, tenemos el servicio 'Revisa este documento': nos lo envía y le explicamos qué le están pidiendo, qué plazo tiene y cómo responder.",
  },
  {
    p: "Mi negocio es pequeño, ¿de verdad me aplican obligaciones ambientales?",
    r: "Sí. La normativa ambiental colombiana no exime a los negocios pequeños. Un restaurante que genera aceite de cocina usado, un taller que cambia aceite de motor o un consultorio que produce residuos biosanitarios tienen obligaciones concretas, independientemente de su tamaño. Lo que cambia según el volumen es el nivel de exigencia, no la obligación.",
  },
  {
    p: "¿Cuánto puede costarme un incumplimiento?",
    r: "La Ley 1333 de 2009 contempla desde amonestación escrita hasta multas de 5.000 salarios mínimos, cierre temporal o definitivo del establecimiento y decomiso. El monto depende de la gravedad, la reincidencia y el beneficio económico obtenido por incumplir.",
  },
  {
    p: "¿Trabajan en todo Colombia o solo en el Cesar?",
    r: "Nuestra base está en Valledupar y operamos activamente en Cesar y La Guajira. ECOCHECK funciona en todo el país: reconoce las 33 autoridades ambientales regionales. Para trabajos en sitio fuera de nuestra zona habitual, coordinamos según el proyecto.",
  },
  {
    p: "¿Cómo son los pagos y qué garantía tengo?",
    r: "Los pagos se procesan por Wompi, la pasarela de Bancolombia, con tarjeta, PSE o Nequi. Nunca almacenamos datos de su tarjeta. Si el servicio contratado no corresponde a lo ofrecido, escríbanos y lo resolvemos.",
  },
  {
    p: "¿Qué diferencia hay entre comprar un servicio y la suscripción mensual?",
    r: "Un servicio puntual resuelve una necesidad de hoy. La suscripción SOSING Ambiental 24/7 lleva el control todo el año: calcula automáticamente su categoría de generador, controla que no falte ningún certificado y le avisa antes de cada vencimiento. Si su negocio genera obligaciones cada mes, la suscripción le sale más rentable.",
  },
];

export default function PreguntasFrecuentes() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gray-50" id="preguntas">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full mb-5">
            <span className="text-sm font-semibold">Preguntas frecuentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que nuestros clientes preguntan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Si su duda no está aquí, escríbanos por WhatsApp y le respondemos directamente.
          </p>
        </div>

        <div className="space-y-3">
          {PREGUNTAS.map((item, i) => {
            const activa = abierta === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  activa ? "border-green-300 shadow-md" : "border-gray-200 hover:border-green-200"
                }`}
              >
                <button
                  onClick={() => setAbierta(activa ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left"
                  aria-expanded={activa}
                >
                  <span className={`font-semibold leading-snug ${activa ? "text-green-800" : "text-gray-900"}`}>
                    {item.p}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activa ? "bg-green-600 rotate-45" : "bg-gray-100"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${activa ? "text-white" : "text-gray-500"}`}
                      fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    activa ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-gray-600 leading-relaxed">{item.r}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">¿Tiene otra pregunta?</h3>
          <p className="text-gray-600 mb-6">
            Escríbanos y un ingeniero le responde directamente.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/573116608217?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20sus%20servicios%20ambientales"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-colors"
              style={{ backgroundColor: "#25D366" }}
            >
              <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white">
                <path d="M16.004 0h-.008C7.174 0 .001 7.176.001 16c0 3.5 1.128 6.742 3.045 9.377L1.05 31.29l6.117-1.955A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.822 32 16S24.83 0 16.004 0zm9.31 22.594c-.386 1.09-1.92 1.995-3.142 2.259-.836.178-1.928.32-5.604-1.203-4.702-1.948-7.73-6.727-7.966-7.037-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.425 1.636-3.905.386-.394.98-.574 1.55-.574.184 0 .35.01.498.017.47.02.706.048 1.016.79.386.93 1.326 3.226 1.438 3.462.114.236.228.556.068.866-.15.32-.282.462-.518.734-.236.272-.46.48-.696.772-.216.254-.46.526-.188.996.272.46 1.21 1.994 2.59 3.224 1.782 1.586 3.226 2.092 3.744 2.308.386.16.846.122 1.128-.178.358-.386.8-1.026 1.25-1.656.32-.452.724-.508 1.148-.348.432.15 2.718 1.28 3.188 1.514.47.236.78.35.894.546.112.198.112 1.128-.274 2.219z" />
              </svg>
              Escribir por WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-700 transition-colors"
            >
              Formulario de contacto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
