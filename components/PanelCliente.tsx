"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { crearClienteNavegador } from "@/lib/supabase";

const C = {
  green: "#1F5C38", dark: "#16211B", gray: "#5C6A62", line: "#E1E7E2",
  amber: "#C99A3A", red: "#C1442E", mint: "#9FD9B6",
};
const MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

const OBLIGACIONES_CAL = [
  { mes: 2, titulo: "Reporte anual RESPEL", detalle: "Radicar el consolidado del año anterior ante la autoridad ambiental.", critico: true },
  { mes: 3, titulo: "Actualización RUA", detalle: "Actualizar el Registro Único Ambiental si aplica a su actividad.", critico: true },
  { mes: 5, titulo: "Caracterización de vertimientos", detalle: "Muestreo semestral si cuenta con permiso de vertimiento.", critico: false },
  { mes: 8, titulo: "Inspección de almacenamiento", detalle: "Verificación trimestral del sitio de RESPEL.", critico: false },
  { mes: 11, titulo: "Caracterización de vertimientos", detalle: "Segundo muestreo semestral del año.", critico: false },
];

export default function PanelCliente({
  empresa, suscripcionActiva, categoria, respel, entregasRespel, pgirs, acu, rcd,
}: any) {
  const router = useRouter();
  const [tab, setTab] = useState("panel");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [fR, setFR] = useState({ residuo: "", corriente: "Y8", cantidad_kg: "" });
  const [fA, setFA] = useState({ litros: "", gestor: "" });
  const [fP, setFP] = useState({ tipo: "Aprovechable", material: "", cantidad_kg: "" });

  const mesActual = new Date().getMonth();

  /* ---------- Cálculos ---------- */
  const respelStats = useMemo(() => {
    const porMes: Record<number, number> = {};
    respel.forEach((r: any) => {
      const m = new Date(r.fecha + "T00:00:00").getMonth();
      porMes[m] = (porMes[m] || 0) + Number(r.cantidad_kg);
    });
    const ult6 = [];
    for (let i = 5; i >= 0; i--) { const m = (mesActual - i + 12) % 12; ult6.push({ mes: m, total: porMes[m] || 0 }); }
    const generado = respel.reduce((s: number, r: any) => s + Number(r.cantidad_kg), 0);
    const entregado = entregasRespel.reduce((s: number, e: any) => s + Number(e.cantidad_kg), 0);
    return { ult6, max: Math.max(...ult6.map(x => x.total), 1), almacenado: generado - entregado };
  }, [respel, entregasRespel, mesActual]);

  const promedio = Number(categoria?.promedio_mensual_kg ?? 0);
  const nombreCat = categoria?.categoria ?? "Sin datos";
  const colorCat = promedio >= 1000 ? C.red : promedio >= 10 ? C.amber : C.green;
  const requiereRegistro = promedio >= 10;

  const pgirsStats = useMemo(() => {
    const total = pgirs.reduce((s: number, p: any) => s + Number(p.cantidad_kg), 0);
    const aprov = pgirs.filter((p: any) => p.tipo !== "No aprovechable")
      .reduce((s: number, p: any) => s + Number(p.cantidad_kg), 0);
    return { total, aprov, tasa: total ? (aprov / total) * 100 : 0 };
  }, [pgirs]);

  const acuStats = useMemo(() => ({
    total: acu.reduce((s: number, a: any) => s + Number(a.litros), 0),
    sinCert: acu.filter((a: any) => !a.certificado_recibido).length,
  }), [acu]);

  const rcdStats = useMemo(() => ({
    total: rcd.reduce((s: number, r: any) => s + Number(r.volumen_m3), 0),
    sinCert: rcd.filter((r: any) => !r.certificado_recibido).length,
  }), [rcd]);

  /* ---------- Alertas ---------- */
  const alertas: any[] = [];
  if (respel.length === 0 && pgirs.length === 0 && acu.length === 0) {
    alertas.push({ n: "Inicio", t: "Aún no ha registrado datos. Empiece por el módulo que aplique a su negocio.", crit: false });
  }
  if (requiereRegistro) alertas.push({ n: "RESPEL", t: `Como ${nombreCat.toLowerCase()} debe estar registrado ante ${empresa.autoridad_ambiental} y presentar reporte anual.`, crit: true });
  if (respelStats.almacenado > 0) alertas.push({ n: "RESPEL", t: `Tiene ${respelStats.almacenado.toFixed(1)} kg almacenados pendientes de entrega a gestor autorizado.`, crit: false });
  if (acuStats.sinCert) alertas.push({ n: "ACU", t: `${acuStats.sinCert} entrega(s) de aceite usado sin certificado de disposición final.`, crit: true });
  if (rcdStats.sinCert) alertas.push({ n: "RCD", t: `${rcdStats.sinCert} disposición(es) de escombros sin certificado.`, crit: true });
  if (pgirs.length > 0 && pgirsStats.tasa < 30) alertas.push({ n: "PGIRS", t: `Su tasa de aprovechamiento es ${pgirsStats.tasa.toFixed(0)}%. Se recomienda superar el 30%.`, crit: false });
  const proxima = OBLIGACIONES_CAL.find(o => o.mes >= mesActual);
  if (proxima) alertas.push({ n: "Calendario", t: `Próximo vencimiento: ${proxima.titulo} (${MESES[proxima.mes]}).`, crit: false });

  /* ---------- Guardar ---------- */
  const guardar = async (tabla: string, datos: any, limpiar: () => void) => {
    if (!suscripcionActiva) { setError("Active su suscripción para registrar datos."); return; }
    setError(""); setGuardando(true);
    const supabase = crearClienteNavegador();
    const { error: err } = await supabase.from(tabla).insert({ ...datos, empresa_id: empresa.id });
    setGuardando(false);
    if (err) { setError(err.message); return; }
    limpiar();
    router.refresh();
  };

  const TABS = [["panel","Panel"],["respel","RESPEL"],["pgirs","Residuos sólidos"],["acu","Aceite usado"],["rcd","Obra / RCD"],["calendario","Calendario"]];
  const bloqueado = !suscripcionActiva;

  return (
    <div>
      {/* Pestañas */}
      <div className="bg-white border-b sticky top-0 z-10" style={{ borderColor: C.line }}>
        <div className="max-w-6xl mx-auto px-5 flex gap-1 overflow-x-auto">
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className="px-4 py-3.5 text-sm font-bold whitespace-nowrap transition"
              style={{
                color: tab === id ? C.green : C.gray,
                borderBottom: tab === id ? `2.5px solid ${C.green}` : "2.5px solid transparent",
              }}>{label}</button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-6 pb-16">
        {error && (
          <div className="mb-5 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded text-sm">{error}</div>
        )}

        {/* PANEL */}
        {tab === "panel" && (
          <>
            <div className="grid gap-3.5 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
              <KPI label="Categoría RESPEL" value={nombreCat} sub={`${promedio.toFixed(1)} kg/mes`} color={colorCat} />
              <KPI label="Aprovechamiento" value={`${pgirsStats.tasa.toFixed(0)}%`} sub={`${pgirsStats.total.toFixed(0)} kg totales`} color={pgirsStats.tasa >= 30 ? C.green : C.amber} />
              <KPI label="ACU entregado" value={`${acuStats.total.toFixed(0)} L`} sub={acuStats.sinCert ? `${acuStats.sinCert} sin certificado` : "Todo certificado"} color={acuStats.sinCert ? C.red : C.green} />
              <KPI label="RCD dispuesto" value={`${rcdStats.total.toFixed(0)} m³`} sub={rcdStats.sinCert ? `${rcdStats.sinCert} sin certificado` : "Todo certificado"} color={rcdStats.sinCert ? C.red : C.green} />
            </div>

            <Card title="Estado de cumplimiento" sub="El sistema revisa sus datos y le indica qué falta.">
              {alertas.map((a, i) => (
                <div key={i} className="flex gap-3 items-start rounded-lg px-3.5 py-3 mb-2"
                  style={{ background: a.crit ? "#FDF1EF" : "#F2F5F2", borderLeft: `4px solid ${a.crit ? C.red : C.green}` }}>
                  <span className="text-[10px] font-extrabold bg-white px-2 py-0.5 rounded whitespace-nowrap"
                    style={{ color: a.crit ? C.red : C.green }}>{a.n}</span>
                  <span className="text-sm">{a.t}</span>
                </div>
              ))}
            </Card>

            <div className="rounded-2xl p-6 text-white flex justify-between items-center flex-wrap gap-4"
              style={{ background: `linear-gradient(135deg, ${C.green}, #123C25)` }}>
              <div>
                <div className="text-lg font-extrabold mb-1">Informe consolidado de cumplimiento</div>
                <div className="text-sm text-gray-200 max-w-lg">
                  Genere el informe con todos sus módulos, revisado y firmado por un ingeniero de SOSING.
                </div>
              </div>
              <a href="https://wa.me/573116608217?text=Solicito%20mi%20informe%20consolidado%20de%20cumplimiento%20ambiental"
                target="_blank" rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg font-extrabold text-sm whitespace-nowrap"
                style={{ background: C.amber, color: "#241804" }}>
                Solicitar informe →
              </a>
            </div>
          </>
        )}

        {/* RESPEL */}
        {tab === "respel" && (
          <>
            <div className="rounded-2xl p-5 text-white mb-5" style={{ background: C.dark }}>
              <div className="flex justify-between items-center flex-wrap gap-3.5">
                <div>
                  <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: C.mint }}>
                    Categoría calculada automáticamente
                  </div>
                  <div className="text-2xl font-extrabold" style={{ color: colorCat === C.green ? C.mint : colorCat }}>
                    {nombreCat}
                  </div>
                  <div className="text-sm text-gray-300 mt-1">
                    Promedio 6 meses: <strong>{promedio.toFixed(1)} kg/mes</strong>
                  </div>
                </div>
                <div className="flex gap-1.5 items-end h-16">
                  {respelStats.ult6.map(m => (
                    <div key={m.mes} className="text-center w-9">
                      <div style={{ height: Math.max(4, (m.total / respelStats.max) * 48), background: C.mint, borderRadius: 3, marginBottom: 5 }} />
                      <div className="text-[10px] text-gray-400">{MESES[m.mes]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card title="Registrar generación" sub="Cada registro recalcula su categoría y sus obligaciones.">
              <div className="grid gap-2.5 items-end mb-4" style={{ gridTemplateColumns: "2fr 1fr 1fr auto" }}>
                <Campo label="Residuo">
                  <input className={inp} disabled={bloqueado} value={fR.residuo} placeholder="Ej: Aceite usado"
                    onChange={e => setFR({ ...fR, residuo: e.target.value })} />
                </Campo>
                <Campo label="Corriente">
                  <select className={inp} disabled={bloqueado} value={fR.corriente}
                    onChange={e => setFR({ ...fR, corriente: e.target.value })}>
                    {["Y8","Y9","Y12","Y18","Y31","Y34","A1180","Y1"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </Campo>
                <Campo label="Kg">
                  <input className={inp} disabled={bloqueado} type="number" value={fR.cantidad_kg}
                    onChange={e => setFR({ ...fR, cantidad_kg: e.target.value })} />
                </Campo>
                <button disabled={bloqueado || guardando}
                  onClick={() => guardar("respel_registros",
                    { residuo: fR.residuo, corriente: fR.corriente, cantidad_kg: Number(fR.cantidad_kg) },
                    () => setFR({ residuo: "", corriente: "Y8", cantidad_kg: "" }))}
                  className="rounded-lg px-4 h-10 font-bold text-sm text-white disabled:opacity-40"
                  style={{ background: C.green }}>
                  {guardando ? "…" : "Agregar"}
                </button>
              </div>
              <Tabla head={["Residuo","Corriente","Cantidad","Fecha"]}
                rows={respel.map((r: any) => [r.residuo, r.corriente, `${r.cantidad_kg} kg`, r.fecha])}
                vacio="Aún no ha registrado residuos peligrosos." />
            </Card>
          </>
        )}

        {/* PGIRS */}
        {tab === "pgirs" && (
          <>
            <div className="grid gap-3.5 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
              <KPI label="Total generado" value={`${pgirsStats.total.toFixed(0)} kg`} sub="Acumulado" color={C.dark} />
              <KPI label="Aprovechable" value={`${pgirsStats.aprov.toFixed(0)} kg`} sub="Reciclable + orgánico" color={C.green} />
              <KPI label="Tasa aprovechamiento" value={`${pgirsStats.tasa.toFixed(0)}%`} sub={pgirsStats.tasa >= 30 ? "Buen desempeño" : "Por debajo del 30%"} color={pgirsStats.tasa >= 30 ? C.green : C.amber} />
            </div>
            <Card title="Registrar residuos sólidos" sub="Base para su Plan de Gestión Integral de Residuos Sólidos.">
              <div className="grid gap-2.5 items-end mb-4" style={{ gridTemplateColumns: "1.3fr 2fr 1fr auto" }}>
                <Campo label="Tipo">
                  <select className={inp} disabled={bloqueado} value={fP.tipo} onChange={e => setFP({ ...fP, tipo: e.target.value })}>
                    <option>Aprovechable</option><option>Orgánico</option><option>No aprovechable</option>
                  </select>
                </Campo>
                <Campo label="Material">
                  <input className={inp} disabled={bloqueado} value={fP.material} placeholder="Ej: Cartón y papel"
                    onChange={e => setFP({ ...fP, material: e.target.value })} />
                </Campo>
                <Campo label="Kg">
                  <input className={inp} disabled={bloqueado} type="number" value={fP.cantidad_kg}
                    onChange={e => setFP({ ...fP, cantidad_kg: e.target.value })} />
                </Campo>
                <button disabled={bloqueado || guardando}
                  onClick={() => guardar("pgirs_registros",
                    { tipo: fP.tipo, material: fP.material, cantidad_kg: Number(fP.cantidad_kg) },
                    () => setFP({ tipo: "Aprovechable", material: "", cantidad_kg: "" }))}
                  className="rounded-lg px-4 h-10 font-bold text-sm text-white disabled:opacity-40"
                  style={{ background: C.green }}>Agregar</button>
              </div>
              <Tabla head={["Tipo","Material","Cantidad","Fecha"]}
                rows={pgirs.map((p: any) => [p.tipo, p.material, `${p.cantidad_kg} kg`, p.fecha])}
                vacio="Aún no ha registrado residuos sólidos." />
            </Card>
          </>
        )}

        {/* ACU */}
        {tab === "acu" && (
          <>
            <div className="grid gap-3.5 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
              <KPI label="Total entregado" value={`${acuStats.total.toFixed(0)} L`} sub="Histórico" color={C.dark} />
              <KPI label="Certificados" value={`${acu.length - acuStats.sinCert}/${acu.length}`} sub={acuStats.sinCert ? "Faltan certificados" : "Al día"} color={acuStats.sinCert ? C.red : C.green} />
            </div>
            <Card title="Registrar entrega de aceite de cocina usado" sub="Debe entregarse a un gestor autorizado y conservar el certificado.">
              <div className="grid gap-2.5 items-end mb-4" style={{ gridTemplateColumns: "1fr 2fr auto" }}>
                <Campo label="Litros">
                  <input className={inp} disabled={bloqueado} type="number" value={fA.litros}
                    onChange={e => setFA({ ...fA, litros: e.target.value })} />
                </Campo>
                <Campo label="Gestor autorizado">
                  <input className={inp} disabled={bloqueado} value={fA.gestor} placeholder="Nombre del gestor"
                    onChange={e => setFA({ ...fA, gestor: e.target.value })} />
                </Campo>
                <button disabled={bloqueado || guardando}
                  onClick={() => guardar("acu_entregas",
                    { litros: Number(fA.litros), gestor: fA.gestor },
                    () => setFA({ litros: "", gestor: "" }))}
                  className="rounded-lg px-4 h-10 font-bold text-sm text-white disabled:opacity-40"
                  style={{ background: C.green }}>Registrar</button>
              </div>
              <Tabla head={["Fecha","Litros","Gestor","Certificado"]}
                rows={acu.map((a: any) => [a.fecha, `${a.litros} L`, a.gestor ?? "—",
                  <Badge key={a.id} ok={a.certificado_recibido}>{a.certificado_recibido ? "Recibido" : "Pendiente"}</Badge>])}
                vacio="Aún no ha registrado entregas de ACU." />
            </Card>
          </>
        )}

        {/* RCD */}
        {tab === "rcd" && (
          <>
            <div className="grid gap-3.5 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
              <KPI label="Volumen dispuesto" value={`${rcdStats.total.toFixed(0)} m³`} sub="Total en obra" color={C.dark} />
              <KPI label="Certificados" value={`${rcd.length - rcdStats.sinCert}/${rcd.length}`} sub={rcdStats.sinCert ? "Faltan certificados" : "Al día"} color={rcdStats.sinCert ? C.red : C.green} />
            </div>
            <Card title="Residuos de construcción y demolición" sub="Trazabilidad exigida para obras y contratos de infraestructura.">
              <Tabla head={["Obra","Material","Volumen","Destino","Certificado"]}
                rows={rcd.map((r: any) => [r.obra, r.material, `${r.volumen_m3} m³`, r.destino ?? "—",
                  <Badge key={r.id} ok={r.certificado_recibido}>{r.certificado_recibido ? "Recibido" : "Pendiente"}</Badge>])}
                vacio="Aún no ha registrado residuos de obra." />
            </Card>
          </>
        )}

        {/* CALENDARIO */}
        {tab === "calendario" && (
          <Card title="Calendario de obligaciones ambientales" sub="El sistema le avisa antes de cada vencimiento.">
            {OBLIGACIONES_CAL.map((o, i) => {
              const pasado = o.mes < mesActual;
              const esActual = o.mes === mesActual;
              return (
                <div key={i} className="flex gap-3.5 items-start py-3.5"
                  style={{ borderBottom: i < OBLIGACIONES_CAL.length - 1 ? `1px solid ${C.line}` : "none", opacity: pasado ? 0.5 : 1 }}>
                  <div className="rounded-lg px-3 py-2 font-extrabold text-xs text-center min-w-[52px]"
                    style={{
                      background: esActual ? C.amber : (o.critico ? "#FDF1EF" : "#F2F5F2"),
                      color: esActual ? "#241804" : (o.critico ? C.red : C.green),
                    }}>{MESES[o.mes]}</div>
                  <div>
                    <div className="font-bold text-sm mb-0.5">
                      {o.titulo} {esActual && <span className="text-xs" style={{ color: C.amber }}>· Este mes</span>}
                    </div>
                    <div className="text-sm" style={{ color: C.gray }}>{o.detalle}</div>
                  </div>
                </div>
              );
            })}
          </Card>
        )}

        <p className="text-xs mt-5 leading-relaxed" style={{ color: "#8A9188" }}>
          Esta plataforma es una herramienta de apoyo a la gestión ambiental. No constituye un concepto
          técnico oficial ni sustituye los actos administrativos de la autoridad ambiental competente.
          Los informes firmados son elaborados y revisados por profesionales de SOSING S.A.S.
        </p>
      </div>
    </div>
  );
}

/* ---------- Auxiliares ---------- */
const KPI = ({ label, value, sub, color }: any) => (
  <div className="bg-white rounded-xl p-4" style={{ border: `1px solid ${C.line}` }}>
    <div className="text-[11px] uppercase tracking-wide font-bold mb-1.5" style={{ color: C.gray }}>{label}</div>
    <div className="text-xl font-extrabold leading-tight" style={{ color }}>{value}</div>
    <div className="text-xs mt-1" style={{ color: C.gray }}>{sub}</div>
  </div>
);

const Card = ({ title, sub, children }: any) => (
  <div className="bg-white rounded-2xl p-5 mb-5" style={{ border: `1px solid ${C.line}` }}>
    <h2 className="text-base font-extrabold m-0">{title}</h2>
    {sub && <p className="text-sm mt-1 mb-4" style={{ color: C.gray }}>{sub}</p>}
    {children}
  </div>
);

const Campo = ({ label, children }: any) => (
  <div>
    <label className="block text-[11px] font-bold mb-1.5 uppercase tracking-wide" style={{ color: C.gray }}>{label}</label>
    {children}
  </div>
);

const Tabla = ({ head, rows, vacio }: any) => (
  <div className="overflow-x-auto">
    {rows.length === 0 ? (
      <p className="text-sm py-6 text-center" style={{ color: C.gray }}>{vacio}</p>
    ) : (
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ background: "#F2F5F2" }}>
            {head.map((h: string) => (
              <th key={h} className="text-left px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: C.gray }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any[], i: number) => (
            <tr key={i} style={{ borderBottom: "1px solid #EDF1EE" }}>
              {r.map((c, j) => <td key={j} className="px-3 py-2.5">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

const Badge = ({ ok, children }: any) => (
  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
    style={{ background: ok ? "#E7F2EB" : "#FDF1EF", color: ok ? C.green : C.red }}>{children}</span>
);

const inp = "w-full px-3 py-2.5 rounded-lg border text-sm bg-white disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300 focus:border-green-600 outline-none";
