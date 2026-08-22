"use client";

import { useState } from "react";
import Link from "next/link";

/* ============================================================
   Formulario de contacto funcional
   Envía el mensaje directo al WhatsApp de SOSING.
   Sin backend, sin configuración, 100% confiable.
   ============================================================ */

const NUMERO = "573116608217";

const SERVICIOS = [
  "Ingeniería Ambiental",
  "Agua Potable y Saneamiento",
  "Gestión de Residuos",
  "Ingeniería Civil",
  "Consultoría Técnica",
  "Interventoría y Supervisión",
  "ECOCHECK — Diagnóstico ambiental",
  "Consulta general",
];

export default function FormularioContacto() {
  const [datos, setDatos] = useState({
    nombre: "", empresa: "", email: "", telefono: "", servicio: "", mensaje: "",
  });
  const [acepta, setAcepta] = useState(false);
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const cambiar = (campo: string, valor: string) =>
    setDatos((d) => ({ ...d, [campo]: valor }));

  const enviar = () => {
    if (!datos.nombre.trim()) return setError("Escriba su nombre.");
    if (!datos.email.includes("@")) return setError("Escriba un correo válido.");
    if (!datos.mensaje.trim()) return setError("Escriba su mensaje.");
    if (!acepta) return setError("Debe autorizar el tratamiento de sus datos.");

    setError("");

    const texto =
      `*Nuevo mensaje desde sosinggroup.com*\n\n` +
      `*Nombre:* ${datos.nombre}\n` +
      (datos.empresa ? `*Empresa:* ${datos.empresa}\n` : "") +
      `*Correo:* ${datos.email}\n` +
      (datos.telefono ? `*Teléfono:* ${datos.telefono}\n` : "") +
      (datos.servicio ? `*Servicio de interés:* ${datos.servicio}\n` : "") +
      `\n*Mensaje:*\n${datos.mensaje}`;

    window.open(`https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`, "_blank");
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-dark mb-3">Mensaje preparado</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Se abrió WhatsApp con su mensaje listo. Solo debe presionar enviar.
          Si no se abrió, escríbanos directamente al{" "}
          <a href={`https://wa.me/${NUMERO}`} target="_blank" rel="noopener noreferrer"
            className="text-green-700 font-semibold">311 660 8217</a>.
        </p>
        <button
          onClick={() => { setEnviado(false); setDatos({ nombre:"", empresa:"", email:"", telefono:"", servicio:"", mensaje:"" }); setAcepta(false); }}
          className="text-green-700 font-semibold hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-dark mb-2">Envíenos un mensaje</h2>
      <p className="text-gray-500 text-sm mb-6">
        Le responderemos por WhatsApp lo antes posible.
      </p>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Campo label="Nombre completo" requerido>
            <input type="text" className={input} placeholder="Su nombre completo"
              value={datos.nombre} onChange={(e) => cambiar("nombre", e.target.value)} />
          </Campo>
          <Campo label="Empresa">
            <input type="text" className={input} placeholder="Nombre de su empresa"
              value={datos.empresa} onChange={(e) => cambiar("empresa", e.target.value)} />
          </Campo>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Campo label="Correo electrónico" requerido>
            <input type="email" className={input} placeholder="correo@empresa.com"
              value={datos.email} onChange={(e) => cambiar("email", e.target.value)} />
          </Campo>
          <Campo label="Teléfono">
            <input type="tel" className={input} placeholder="+57 300 000 0000"
              value={datos.telefono} onChange={(e) => cambiar("telefono", e.target.value)} />
          </Campo>
        </div>

        <Campo label="Servicio de interés">
          <select className={input} value={datos.servicio}
            onChange={(e) => cambiar("servicio", e.target.value)}>
            <option value="">Seleccione un servicio</option>
            {SERVICIOS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Campo>

        <Campo label="Mensaje" requerido>
          <textarea rows={5} className={input} placeholder="Cuéntenos sobre su proyecto o necesidad…"
            value={datos.mensaje} onChange={(e) => cambiar("mensaje", e.target.value)} />
        </Campo>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)}
            className="mt-1 w-4 h-4 accent-green-600 flex-shrink-0" />
          <span className="text-sm text-gray-600 leading-relaxed">
            Autorizo el tratamiento de mis datos personales conforme a la{" "}
            <Link href="/politica-datos" className="text-green-700 font-semibold hover:underline">
              Política de Tratamiento de Datos
            </Link>{" "}
            de SOSING S.A.S.
          </span>
        </label>

        <button onClick={enviar}
          className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-3">
          <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white">
            <path d="M16.004 0h-.008C7.174 0 .001 7.176.001 16c0 3.5 1.128 6.742 3.045 9.377L1.05 31.29l6.117-1.955A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.822 32 16S24.83 0 16.004 0zm9.31 22.594c-.386 1.09-1.92 1.995-3.142 2.259-.836.178-1.928.32-5.604-1.203-4.702-1.948-7.73-6.727-7.966-7.037-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.425 1.636-3.905.386-.394.98-.574 1.55-.574.184 0 .35.01.498.017.47.02.706.048 1.016.79.386.93 1.326 3.226 1.438 3.462.114.236.228.556.068.866-.15.32-.282.462-.518.734-.236.272-.46.48-.696.772-.216.254-.46.526-.188.996.272.46 1.21 1.994 2.59 3.224 1.782 1.586 3.226 2.092 3.744 2.308.386.16.846.122 1.128-.178.358-.386.8-1.026 1.25-1.656.32-.452.724-.508 1.148-.348.432.15 2.718 1.28 3.188 1.514.47.236.78.35.894.546.112.198.112 1.128-.274 2.219z" />
          </svg>
          Enviar por WhatsApp
        </button>

        <p className="text-xs text-gray-400 text-center">
          Al enviar se abrirá WhatsApp con su mensaje listo para confirmar.
        </p>
      </div>
    </div>
  );
}

const input =
  "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300";

function Campo({ label, children, requerido }: {
  label: string; children: React.ReactNode; requerido?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {requerido && <span className="text-green-600">*</span>}
      </label>
      {children}
    </div>
  );
}
