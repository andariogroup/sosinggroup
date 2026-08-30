"use client";

import { useState } from "react";

/* =========================================================
   SOSING ECOCHECK — Sección para sosinggroup.com
   Uso: importar en app/page.tsx y colocar donde se desee
        import EcocheckSection from "@/components/EcocheckSection";
        <EcocheckSection />
   ========================================================= */

const CARS: Record<string, string> = {
  "Amazonas": "CORPOAMAZONIA", "Antioquia": "CORANTIOQUIA / CORNARE / CORPOURABÁ",
  "Arauca": "CORPORINOQUIA", "Atlántico": "CRA", "Bogotá D.C.": "Secretaría Distrital de Ambiente",
  "Bolívar": "CARDIQUE / CSB", "Boyacá": "CORPOBOYACÁ / CORPOCHIVOR", "Caldas": "CORPOCALDAS",
  "Caquetá": "CORPOAMAZONIA", "Casanare": "CORPORINOQUIA", "Cauca": "CRC", "Cesar": "CORPOCESAR",
  "Córdoba": "CVS", "Cundinamarca": "CAR Cundinamarca / CORPOGUAVIO", "Chocó": "CODECHOCÓ",
  "Guainía": "CDA", "Guaviare": "CDA", "Huila": "CAM", "La Guajira": "CORPOGUAJIRA",
  "Magdalena": "CORPAMAG", "Meta": "CORMACARENA", "Nariño": "CORPONARIÑO",
  "Norte de Santander": "CORPONOR", "Putumayo": "CORPOAMAZONIA", "Quindío": "CRQ",
  "Risaralda": "CARDER", "San Andrés y Providencia": "CORALINA", "Santander": "CAS / CDMB",
  "Sucre": "CARSUCRE", "Tolima": "CORTOLIMA", "Valle del Cauca": "CVC / DAGMA",
  "Vaupés": "CDA", "Vichada": "CORPORINOQUIA",
};

const BUSINESS_TYPES = [
  "Restaurante", "Taller automotriz", "Hotel", "Comercio", "Industria",
  "Estación de servicio", "Finca / agro", "Constructora", "Consultorio / salud", "Otro negocio",
];

type Q = { id: string; text: string; tag: string; inverse?: boolean };
const QUESTIONS: Q[] = [
  { id: "q1", text: "¿Generas residuos peligrosos (aceites, químicos, pilas, luminarias)?", tag: "RESPEL" },
  { id: "q2", text: "¿Usas o generas Aceite de Cocina Usado (ACU)?", tag: "ACU" },
  { id: "q3", text: "¿Viertes aguas residuales a alcantarillado, río o suelo?", tag: "Vertimientos" },
  { id: "q4", text: "¿Captas agua de pozo, aljibe o fuente natural?", tag: "Concesión de aguas" },
  { id: "q5", text: "¿Generas más de 1 m³ de residuos sólidos ordinarios al día?", tag: "PGIRS" },
  { id: "q6", text: "¿Tu negocio realiza obra civil, remodelación o movimiento de tierra?", tag: "RCD" },
  { id: "q7", text: "¿Usas o almacenas sustancias químicas o combustibles?", tag: "RUA" },
  { id: "q8", text: "¿Has recibido alguna vez una visita o requerimiento de la autoridad ambiental?", tag: "Antecedentes" },
  { id: "q9", text: "¿Cuentas con algún documento ambiental vigente (PMA, concepto, permiso)?", tag: "Documentación", inverse: true },
  { id: "q10", text: "¿Sabes con certeza qué trámites ambientales aplican a tu negocio?", tag: "Conocimiento", inverse: true },
];

type Item = { id: string; name: string; desc: string; price: number; cat: string; link?: string };

const CATALOG: Item[] = [
  { id: "test", name: "Test de cumplimiento ambiental", desc: "Evaluación rápida de 5 preguntas.", price: 19900, cat: "Diagnósticos", link: "https://checkout.wompi.co/l/CNdStv" },
  { id: "diagnostico", name: "Diagnóstico Ambiental Express", desc: "Informe con obligaciones, riesgos y checklist.", price: 49900, cat: "Diagnósticos", link: "https://checkout.wompi.co/l/65IJJb" },
  { id: "diag-vert", name: "Diagnóstico de vertimientos", desc: "Evaluación de tus vertimientos y su manejo.", price: 149900, cat: "Diagnósticos", link: "https://checkout.wompi.co/l/nYpbJV" },
  { id: "diag-estab", name: "Diagnóstico ambiental de establecimiento", desc: "Evaluación integral en sitio.", price: 199900, cat: "Diagnósticos", link: "https://checkout.wompi.co/l/evBpHn" },
  { id: "check-rest", name: "Checklist ambiental para restaurantes", desc: "Lista de verificación sectorial.", price: 29900, cat: "Kits sectoriales", link: "https://checkout.wompi.co/l/AUzNQx" },
  { id: "kit-respel", name: "Kit RESPEL para pequeña empresa", desc: "Formatos y guía de residuos peligrosos.", price: 79900, cat: "Kits sectoriales", link: "https://checkout.wompi.co/l/siVRGR" },
  { id: "kit-pgirs", name: "Kit PGIRS empresarial", desc: "Plan de gestión integral de residuos sólidos.", price: 69900, cat: "Kits sectoriales", link: "https://checkout.wompi.co/l/uif1wa" },
  { id: "kit-acu", name: "Kit manejo de ACU", desc: "Guía y formatos para aceite de cocina usado.", price: 39900, cat: "Kits sectoriales", link: "https://checkout.wompi.co/l/ruO8DY" },
  { id: "kit-rest", name: "Kit ambiental para restaurantes", desc: "Checklist + formatos + buenas prácticas.", price: 79900, cat: "Kits sectoriales", link: "https://checkout.wompi.co/l/Am0tUT" },
  { id: "kit-contra", name: "Kit ambiental para contratistas", desc: "Checklist de obra + RCD + bitácora.", price: 149900, cat: "Kits sectoriales", link: "https://checkout.wompi.co/l/o1Uaqe" },
  { id: "rev-rua", name: "Revisión de RUA", desc: "Revisión técnica de tu Registro Único Ambiental.", price: 99900, cat: "Trámites", link: "https://checkout.wompi.co/l/Cdl91B" },
  { id: "prep-rua", name: "Preparación de información para RUA", desc: "Tu información lista para radicar.", price: 149900, cat: "Trámites", link: "https://checkout.wompi.co/l/gR3mQd" },
  { id: "rev-req", name: "Revisión de requerimiento ambiental", desc: "Análisis de oficios, actas o autos.", price: 99900, cat: "Trámites", link: "https://checkout.wompi.co/l/46mleK" },
  { id: "concepto", name: "Concepto ambiental express", desc: "Concepto técnico preliminar.", price: 149900, cat: "Trámites", link: "https://checkout.wompi.co/l/6ZpKGZ" },
  { id: "rev-pma", name: "Revisión de PMA", desc: "Revisión de tu Plan de Manejo Ambiental.", price: 199900, cat: "Trámites", link: "https://checkout.wompi.co/l/P3EeMT" },
  { id: "matriz", name: "Matriz de requisitos legales ambientales", desc: "Normograma aplicable a tu actividad.", price: 99900, cat: "Trámites", link: "https://checkout.wompi.co/l/aNwE6m" },
  { id: "revisa-doc", name: "Revisa este documento", desc: "Sube un oficio o resolución y te decimos qué hacer.", price: 49900, cat: "Trámites", link: "https://checkout.wompi.co/l/wDgbvX" },
];

const PLANS = [
  { id: "basico", name: "Plan Básico", tagline: "Conoce tus obligaciones ambientales.", price: 49900, period: "pago único", features: ["Diagnóstico completo", "Informe en PDF", "Checklist de documentos"], link: "https://checkout.wompi.co/l/TSdYdJ" },
  { id: "pro", name: "Plan Pro", tagline: "Diagnóstico + documentos + plan de acción.", price: 149900, period: "pago único", features: ["Todo lo del Plan Básico", "Documentos básicos", "Plan de acción priorizado"], link: "https://checkout.wompi.co/l/7Bx9rM" },
  { id: "empresa", name: "Plan Empresa", tagline: "Cobertura completa para tu operación.", price: 299900, period: "pago único", features: ["Todo lo del Plan Pro", "Matriz legal ambiental", "Asesoría personalizada"], link: "https://checkout.wompi.co/l/rDtokH" },
  { id: "anual", name: "SOSING Ambiental 24/7", tagline: "Vigilancia continua de tu cumplimiento.", price: 39900, period: "/mes", features: ["Monitoreo permanente", "Alertas normativas", "Soporte prioritario"], featured: true, link: "https://checkout.wompi.co/l/3dDrd4" },
];

const fmt = (n: number) => "$" + n.toLocaleString("es-CO");

function Semaforo({ level }: { level: "rojo" | "amarillo" | "verde" }) {
  const colors = { rojo: "#C1442E", amarillo: "#C99A3A", verde: "#1F5C38" };
  return (
    <div className="flex flex-col gap-2 bg-[#16211B] p-3 rounded-2xl w-fit">
      {(["rojo", "amarillo", "verde"] as const).map((c) => (
        <span key={c} className="w-6 h-6 rounded-full block transition-opacity"
          style={{ background: colors[c], opacity: level === c ? 1 : 0.18 }} />
      ))}
    </div>
  );
}

export default function EcocheckSection() {
  const [tab, setTab] = useState<"diagnostico" | "tienda" | "planes">("diagnostico");
  const [step, setStep] = useState<"intro" | "tipo" | "depto" | "quiz" | "resultado">("intro");
  const [tipo, setTipo] = useState("");
  const [depto, setDepto] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [qIndex, setQIndex] = useState(0);

  let score = 0;
  const riesgos: string[] = [];
  QUESTIONS.forEach((q) => {
    const v = answers[q.id];
    const positive = q.inverse ? v === "no" : v === "si";
    if (positive) { score++; riesgos.push(q.tag); }
  });
  const level: "rojo" | "amarillo" | "verde" = score >= 6 ? "rojo" : score >= 3 ? "amarillo" : "verde";

  const answer = (v: string) => {
    const q = QUESTIONS[qIndex];
    setAnswers((a) => ({ ...a, [q.id]: v }));
    if (qIndex < QUESTIONS.length - 1) setQIndex(qIndex + 1);
    else setStep("resultado");
  };

  const reset = () => { setStep("intro"); setTipo(""); setDepto(""); setAnswers({}); setQIndex(0); };

  const grouped = CATALOG.reduce<Record<string, Item[]>>((acc, p) => {
    (acc[p.cat] = acc[p.cat] || []).push(p); return acc;
  }, {});

  return (
    <section id="ecocheck" className="py-24 bg-[#16211B] text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[#9FD9B6] text-xs font-bold tracking-[2px] uppercase mb-3">
            Automatización ambiental
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">SOSING ECOCHECK</h2>
          <p className="text-[#C9D6CF] text-lg max-w-2xl mx-auto">
            La plataforma que mantiene su negocio en regla con la autoridad ambiental —
            todo el año, en cualquier departamento de Colombia.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {([["diagnostico", "Diagnóstico gratis"], ["planes", "Suscripción 24/7"], ["tienda", "Servicios puntuales"]] as const).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                tab === id ? "bg-[#C99A3A] text-[#241804]" : "border border-white/25 text-white hover:bg-white/10"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* DIAGNÓSTICO */}
        {tab === "diagnostico" && (
          <div className="max-w-2xl mx-auto bg-[#F7F5EF] text-[#16211B] rounded-2xl p-8 shadow-2xl">
            {step === "intro" && (
              <div className="text-center">
                <div className="flex justify-center mb-6"><Semaforo level="rojo" /></div>
                <h3 className="text-2xl font-extrabold mb-3">¿Tu negocio está en regla?</h3>
                <p className="text-[#5C6A62] mb-7">
                  Responde 10 preguntas y obtén tu semáforo de riesgo ambiental, con la autoridad
                  competente identificada automáticamente.
                </p>
                <button onClick={() => setStep("tipo")}
                  className="w-full bg-[#1F5C38] text-white py-4 rounded-lg font-bold hover:bg-[#123C25] transition">
                  Empezar diagnóstico gratis →
                </button>
              </div>
            )}

            {step === "tipo" && (
              <div>
                <div className="text-xs uppercase tracking-wider text-[#8A9188] mb-2">Paso 1 de 3</div>
                <h3 className="text-xl font-extrabold mb-5">¿Qué tipo de negocio tienes?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {BUSINESS_TYPES.map((b) => (
                    <button key={b} onClick={() => { setTipo(b); setStep("depto"); }}
                      className="border border-[#E1E7E2] rounded-lg p-3.5 text-sm text-left hover:border-[#1F5C38] transition">
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "depto" && (
              <div>
                <div className="text-xs uppercase tracking-wider text-[#8A9188] mb-2">Paso 2 de 3</div>
                <h3 className="text-xl font-extrabold mb-5">¿En qué departamento operas?</h3>
                <select value={depto} onChange={(e) => setDepto(e.target.value)}
                  className="w-full border border-[#E1E7E2] rounded-lg p-3.5 text-base bg-white">
                  <option value="">Selecciona tu departamento</option>
                  {Object.keys(CARS).sort().map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {depto && (
                  <p className="text-sm text-[#5C6A62] mt-3">
                    Autoridad ambiental: <strong className="text-[#16211B]">{CARS[depto]}</strong>
                  </p>
                )}
                <button disabled={!depto} onClick={() => setStep("quiz")}
                  className="w-full mt-6 bg-[#1F5C38] text-white py-4 rounded-lg font-bold disabled:opacity-40 hover:bg-[#123C25] transition">
                  Continuar →
                </button>
              </div>
            )}

            {step === "quiz" && (
              <div>
                <div className="text-xs uppercase tracking-wider text-[#8A9188] mb-2">
                  Pregunta {qIndex + 1} de {QUESTIONS.length}
                </div>
                <div className="h-1 bg-[#E1E7E2] rounded mb-6">
                  <div className="h-1 bg-[#1F5C38] rounded transition-all"
                    style={{ width: `${(qIndex / QUESTIONS.length) * 100}%` }} />
                </div>
                <div className="text-xs uppercase tracking-wider text-[#C99A3A] font-bold mb-2">
                  {QUESTIONS[qIndex].tag}
                </div>
                <h3 className="text-xl font-extrabold mb-6">{QUESTIONS[qIndex].text}</h3>
                <div className="flex gap-3">
                  <button onClick={() => answer("si")}
                    className="flex-1 border border-[#E1E7E2] rounded-lg py-4 font-semibold hover:border-[#1F5C38] transition">Sí</button>
                  <button onClick={() => answer("no")}
                    className="flex-1 border border-[#E1E7E2] rounded-lg py-4 font-semibold hover:border-[#1F5C38] transition">No</button>
                </div>
              </div>
            )}

            {step === "resultado" && (
              <div>
                <div className="flex items-center gap-5 mb-6">
                  <Semaforo level={level} />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#5C6A62]">Tu perfil ambiental</div>
                    <div className="text-2xl font-extrabold">
                      {level === "verde" && "Riesgo bajo"}
                      {level === "amarillo" && "Riesgo medio"}
                      {level === "rojo" && "Riesgo alto"}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#E1E7E2] rounded-xl p-5 mb-5">
                  <div className="text-sm text-[#5C6A62] mb-1">Autoridad ambiental competente</div>
                  <div className="font-bold mb-4">{CARS[depto]}</div>
                  <div className="text-sm text-[#5C6A62] mb-2">
                    Obligaciones identificadas ({riesgos.length})
                  </div>
                  {riesgos.length === 0 ? (
                    <div className="text-sm">No se identificaron riesgos evidentes.</div>
                  ) : riesgos.map((r) => (
                    <div key={r} className="flex items-center gap-2 py-1.5 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C1442E]" />{r}
                    </div>
                  ))}
                </div>

                <div className="bg-[#16211B] text-white rounded-xl p-6 mb-4">
                  <div className="text-lg font-extrabold mb-1">Diagnóstico Ambiental Express</div>
                  <p className="text-sm text-[#C9D6CF] mb-4">
                    Informe completo en PDF con plazos, riesgo de sanción y checklist de documentos.
                  </p>
                  <div className="text-3xl font-extrabold mb-4">{fmt(49900)}</div>
                  <a href="https://checkout.wompi.co/l/65IJJb" target="_blank" rel="noopener noreferrer"
                    className="block text-center bg-[#C99A3A] text-[#241804] py-3.5 rounded-lg font-bold hover:bg-[#B4872F] transition">
                    Pagar con Wompi →
                  </a>
                </div>

                <div className="border-2 border-[#1F5C38] rounded-xl p-6 mb-4 bg-[#F2F5F2]">
                  <div className="inline-block bg-[#1F5C38] text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 tracking-wide">
                    LO MÁS RECOMENDADO
                  </div>
                  <div className="text-lg font-extrabold mb-1">¿Y el mes que viene?</div>
                  <p className="text-sm text-[#5C6A62] mb-4">
                    El diagnóstico le dice dónde está hoy. La plataforma <strong>SOSING Ambiental 24/7</strong> lleva
                    su cumplimiento todo el año: calcula su categoría de generador, controla certificados,
                    le avisa antes de cada vencimiento y genera sus informes firmados.
                  </p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-[#1F5C38]">{fmt(39900)}</span>
                    <span className="text-sm text-[#5C6A62]">/mes</span>
                  </div>
                  <button onClick={() => setTab("planes")}
                    className="w-full bg-[#1F5C38] text-white py-3.5 rounded-lg font-bold hover:bg-[#123C25] transition">
                    Ver cómo funciona →
                  </button>
                </div>

                <p className="text-xs text-[#8A9188] leading-relaxed mb-4">
                  Este diagnóstico es una guía orientativa y no constituye un concepto técnico oficial
                  ni una certificación ante la autoridad ambiental. En casos de riesgo alto, un
                  profesional de SOSING revisa el caso antes de la entrega final.
                </p>
                <button onClick={reset}
                  className="w-full border border-[#E1E7E2] rounded-lg py-3 text-sm font-semibold hover:border-[#1F5C38] transition">
                  Hacer otro diagnóstico
                </button>
              </div>
            )}
          </div>
        )}

        {/* TIENDA */}
        {tab === "tienda" && (
          <div className="space-y-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4">
              <span className="text-[#C99A3A] text-xl shrink-0">💡</span>
              <div>
                <div className="font-bold text-sm mb-1">Servicios puntuales, sin suscripción</div>
                <div className="text-sm text-[#C9D6CF]">
                  Ideales si necesita resolver algo específico hoy. Si su negocio genera obligaciones
                  todos los meses, la{" "}
                  <button onClick={() => setTab("planes")} className="text-[#C99A3A] font-bold underline">
                    suscripción 24/7
                  </button>{" "}
                  le sale más rentable y le evita tener que estar pendiente.
                </div>
              </div>
            </div>

            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <div className="text-xs uppercase tracking-[2px] text-[#C99A3A] font-bold mb-4">{cat}</div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((p) => (
                    <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col hover:bg-white/10 transition">
                      <div className="font-bold mb-1">{p.name}</div>
                      <div className="text-sm text-[#C9D6CF] mb-4 flex-1">{p.desc}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-extrabold">{fmt(p.price)}</span>
                        {p.link ? (
                          <a href={p.link} target="_blank" rel="noopener noreferrer"
                            className="bg-[#C99A3A] text-[#241804] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#B4872F] transition">
                            Comprar
                          </a>
                        ) : (
                          <a href="/contact"
                            className="border border-white/25 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition">
                            Solicitar
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PLANES */}
        {tab === "planes" && (
          <div>
            {/* HÉROE: suscripción */}
            <div className="bg-gradient-to-br from-[#1F5C38] to-[#123C25] rounded-2xl p-8 md:p-10 mb-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-[#C99A3A] text-[#241804] text-[11px] font-extrabold px-3 py-1 rounded-full mb-4 tracking-wide">
                    LA FORMA INTELIGENTE DE CUMPLIR
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-4">SOSING Ambiental 24/7</h3>
                  <p className="text-[#C9D6CF] mb-6 leading-relaxed">
                    No es un PDF que se archiva y se olvida. Es una plataforma que lleva el cumplimiento
                    ambiental de su negocio todo el año, le avisa antes de cada vencimiento y respalda
                    sus informes con la firma de un ingeniero.
                  </p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-extrabold">{fmt(39900)}</span>
                    <span className="text-[#9FD9B6]">/mes</span>
                  </div>
                  <p className="text-xs text-[#9FA9A3] mb-6">
                    Renovación mensual · le enviamos el enlace cada mes · sin permanencia
                  </p>
                  <a href="https://checkout.wompi.co/l/3dDrd4" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-[#C99A3A] text-[#241804] px-8 py-4 rounded-lg font-extrabold hover:bg-[#B4872F] transition">
                    Activar mi plataforma →
                  </a>
                </div>

                {/* Módulos */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-xs uppercase tracking-wider text-[#9FD9B6] font-bold mb-4">
                    Módulos incluidos
                  </div>
                  {[
                    ["RESPEL", "Calcula su categoría de generador automáticamente y controla certificados."],
                    ["Residuos sólidos", "Tasa de aprovechamiento y base para su PGIRS."],
                    ["Aceite de cocina usado", "Control de entregas a gestor autorizado."],
                    ["Obra / RCD", "Trazabilidad de escombros por obra."],
                    ["Calendario", "Alertas antes de cada vencimiento normativo."],
                    ["Informes firmados", "Consolidados revisados por un ingeniero de SOSING."],
                  ].map(([n, d]) => (
                    <div key={n} className="flex gap-3 py-2.5 border-b border-white/10 last:border-0">
                      <span className="text-[#C99A3A] font-bold shrink-0">✓</span>
                      <div>
                        <div className="font-bold text-sm">{n}</div>
                        <div className="text-xs text-[#C9D6CF] mt-0.5">{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alternativas de pago único */}
            <div className="text-center mb-6">
              <div className="text-sm text-[#9FA9A3]">
                ¿Prefiere un servicio puntual sin suscripción?
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {PLANS.filter((pl) => pl.id !== "anual").map((pl) => (
                <div key={pl.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
                  <div className="text-lg font-extrabold mb-1">{pl.name}</div>
                  <div className="text-sm text-[#C9D6CF] mb-5">{pl.tagline}</div>
                  <div className="text-3xl font-extrabold mb-1">{fmt(pl.price)}</div>
                  <div className="text-xs text-[#9FA9A3] mb-5">{pl.period}</div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {pl.features.map((f) => (
                      <li key={f} className="text-sm flex gap-2">
                        <span className="text-[#9FD9B6]">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <a href={(pl as any).link || "#contacto"}
                    {...((pl as any).link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-center py-3 rounded-lg font-bold text-sm bg-white text-[#16211B] hover:bg-[#EAF3EC] transition">
                    Contratar
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
