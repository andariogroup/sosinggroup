"use client";

import { useState } from "react";
import type { RegistroMensual, TipoRegistro } from "@/lib/ecocheck-motor-respel";

/* ══════════════════════════════════════════════════════════════
   Captura de bitácora RESPEL

   Paso OPCIONAL. Alimenta el motor de clasificación con los
   valores mensuales que exige la metodología normativa.

   Sin este paso el diagnóstico continúa: la categoría queda
   estimada o no determinable, nunca se bloquea.
   ══════════════════════════════════════════════════════════════ */

const C = {
  tinta: "#16211B", verde: "#1F5C38", hueso: "#F4F6F2",
  linea: "#E1E7E2", gris: "#5C6A62", grisClaro: "#8A9188",
  ambar: "#B4872F", rojo: "#A8402C", verdeFondo: "#F0F7F2",
};

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/* Genera los últimos 18 meses como opciones */
function mesesDisponibles(): { valor: string; texto: string }[] {
  const hoy = new Date(2026, 8, 1);           // septiembre 2026
  const out: { valor: string; texto: string }[] = [];
  for (let i = 0; i < 18; i++) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    out.push({
      valor: `${d.getFullYear()}-${mm}`,
      texto: `${MESES[d.getMonth()]} ${d.getFullYear()}`,
    });
  }
  return out;
}

type Fila = {
  key: number;
  mes: string;
  cantidad: string;
  unidad: "kg" | "g" | "t";
  tipoRegistro: TipoRegistro;
};

const filaVacia = (key: number, mes = ""): Fila => ({
  key, mes, cantidad: "", unidad: "kg", tipoRegistro: "pesado",
});

type Props = {
  onListo: (registros: RegistroMensual[]) => void;
  onOmitir: () => void;
};

export default function BitacoraRespel({ onListo, onOmitir }: Props) {
  const opciones = mesesDisponibles();

  /* Arranca con seis filas prellenadas con los últimos seis meses */
  const [filas, setFilas] = useState<Fila[]>(() =>
    Array.from({ length: 6 }, (_, i) => filaVacia(i, opciones[i].valor))
  );
  const [errores, setErrores] = useState<Record<number, string>>({});
  const [errorGeneral, setErrorGeneral] = useState("");

  const cambiar = (key: number, campo: keyof Fila, valor: string) => {
    setFilas((f) => f.map((x) => (x.key === key ? { ...x, [campo]: valor } : x)));
    setErrores((e) => { const n = { ...e }; delete n[key]; return n; });
    setErrorGeneral("");
  };

  const agregar = () => {
    if (filas.length >= 12) return;
    const usados = new Set(filas.map((f) => f.mes));
    const libre = opciones.find((o) => !usados.has(o.valor));
    setFilas((f) => [...f, filaVacia(Date.now(), libre?.valor || "")]);
  };

  const quitar = (key: number) => {
    if (filas.length <= 1) return;
    setFilas((f) => f.filter((x) => x.key !== key));
    setErrores((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  /* ── Validación ── */
  const validar = (): RegistroMensual[] | null => {
    const errs: Record<number, string> = {};
    const meses = new Set<string>();
    const registros: RegistroMensual[] = [];

    for (const f of filas) {
      /* Fila completamente vacía: se ignora */
      if (!f.mes && !f.cantidad.trim()) continue;

      if (!f.mes) { errs[f.key] = "Seleccione el mes"; continue; }

      if (meses.has(f.mes)) {
        errs[f.key] = "Este mes ya fue registrado";
        continue;
      }
      meses.add(f.mes);

      if (f.tipoRegistro === "sin_generacion") {
        registros.push({
          mes: f.mes, cantidad: 0, unidad: f.unidad,
          tipoRegistro: "sin_generacion", evidenciaDisponible: false,
          fechaRegistro: new Date().toISOString(),
        });
        continue;
      }

      const texto = f.cantidad.trim().replace(",", ".");
      if (texto === "") { errs[f.key] = "Ingrese la cantidad o marque «sin generación»"; continue; }

      const num = Number(texto);
      if (!Number.isFinite(num)) { errs[f.key] = "Ingrese un número válido"; continue; }
      if (num < 0) { errs[f.key] = "La cantidad no puede ser negativa"; continue; }

      registros.push({
        mes: f.mes, cantidad: num, unidad: f.unidad,
        tipoRegistro: f.tipoRegistro, evidenciaDisponible: false,
        fechaRegistro: new Date().toISOString(),
      });
    }

    if (Object.keys(errs).length > 0) { setErrores(errs); return null; }

    if (registros.length === 0) {
      setErrorGeneral("Ingrese al menos un mes, o continúe sin registros.");
      return null;
    }

    return registros;
  };

  const continuar = () => {
    const r = validar();
    if (r) onListo(r);
  };

  const completos = filas.filter(
    (f) => f.mes && (f.cantidad.trim() !== "" || f.tipoRegistro === "sin_generacion")
  ).length;

  return (
    <div>
      <div style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".8px",
                    color: C.grisClaro, marginBottom: 8 }}>
        Paso opcional
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, lineHeight: 1.3 }}>
        ¿Tiene registros de cuánto genera cada mes?
      </h3>

      <p style={{ fontSize: 14, color: C.gris, lineHeight: 1.6, marginBottom: 8 }}>
        Con seis meses de cantidades pesadas podemos determinar su categoría de
        generador con la metodología que exige la norma.
      </p>

      <div style={{ background: C.verdeFondo, border: `1px solid #CBE0D3`,
                    borderRadius: 8, padding: "12px 14px", marginBottom: 18 }}>
        <p style={{ fontSize: 13, color: C.gris, lineHeight: 1.55, margin: 0 }}>
          Si no los tiene, puede omitir este paso. El diagnóstico continúa igual
          y le indicaremos cómo empezar a llevarlos.
        </p>
      </div>

      {errorGeneral && (
        <div style={{ background: "#FAEDE9", borderLeft: `3px solid ${C.rojo}`,
                      padding: "10px 12px", borderRadius: 4, fontSize: 13.5,
                      color: C.rojo, marginBottom: 14 }}>
          {errorGeneral}
        </div>
      )}

      {/* ── Filas ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        {filas.map((f) => {
          const err = errores[f.key];
          const sinGen = f.tipoRegistro === "sin_generacion";
          return (
            <div key={f.key} style={{
              border: `1px solid ${err ? C.rojo : C.linea}`,
              borderRadius: 10, padding: "12px 13px", background: "#fff",
            }}>
              {/* Mes */}
              <select
                value={f.mes}
                onChange={(e) => cambiar(f.key, "mes", e.target.value)}
                style={{
                  width: "100%", padding: "11px 12px", fontSize: 15,
                  border: `1px solid ${C.linea}`, borderRadius: 8,
                  background: "#fff", fontFamily: "inherit", color: C.tinta,
                  marginBottom: 10,
                }}
              >
                <option value="">Seleccione el mes</option>
                {opciones.map((o) => (
                  <option key={o.valor} value={o.valor}>{o.texto}</option>
                ))}
              </select>

              {/* Cantidad y unidad */}
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder={sinGen ? "0" : "Cantidad"}
                  value={sinGen ? "" : f.cantidad}
                  disabled={sinGen}
                  onChange={(e) => cambiar(f.key, "cantidad", e.target.value)}
                  style={{
                    flex: 1, minWidth: 0, padding: "11px 12px", fontSize: 15,
                    border: `1px solid ${C.linea}`, borderRadius: 8,
                    fontFamily: "inherit", color: C.tinta,
                    background: sinGen ? C.hueso : "#fff",
                  }}
                />
                <select
                  value={f.unidad}
                  disabled={sinGen}
                  onChange={(e) => cambiar(f.key, "unidad", e.target.value)}
                  style={{
                    width: 84, padding: "11px 8px", fontSize: 15,
                    border: `1px solid ${C.linea}`, borderRadius: 8,
                    background: sinGen ? C.hueso : "#fff",
                    fontFamily: "inherit", color: C.tinta,
                  }}
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="t">t</option>
                </select>
              </div>

              {/* Tipo de registro */}
              <select
                value={f.tipoRegistro}
                onChange={(e) => cambiar(f.key, "tipoRegistro", e.target.value)}
                style={{
                  width: "100%", padding: "10px 12px", fontSize: 13.5,
                  border: `1px solid ${C.linea}`, borderRadius: 8,
                  background: "#fff", fontFamily: "inherit", color: C.gris,
                }}
              >
                <option value="pesado">Cantidad pesada</option>
                <option value="estimado">Cantidad estimada</option>
                <option value="sin_generacion">Ese mes no generé</option>
              </select>

              {err && (
                <div style={{ fontSize: 12.5, color: C.rojo, marginTop: 8 }}>{err}</div>
              )}

              {filas.length > 1 && (
                <button
                  onClick={() => quitar(f.key)}
                  style={{
                    marginTop: 10, background: "none", border: "none", padding: 0,
                    color: C.grisClaro, fontSize: 12.5, cursor: "pointer",
                    fontFamily: "inherit", textDecoration: "underline",
                  }}
                >
                  Quitar este mes
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Agregar ── */}
      {filas.length < 12 && (
        <button
          onClick={agregar}
          style={{
            width: "100%", padding: "12px", marginBottom: 16,
            border: `1px dashed ${C.linea}`, borderRadius: 8,
            background: "none", color: C.verde, fontSize: 14,
            fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}
        >
          + Agregar otro mes
        </button>
      )}

      {/* ── Contador ── */}
      <div style={{
        background: C.hueso, borderRadius: 8, padding: "11px 14px",
        marginBottom: 16, fontSize: 13, color: C.gris, lineHeight: 1.5,
      }}>
        {completos === 0 && "Aún no ha completado ningún mes."}
        {completos > 0 && completos < 6 &&
          `${completos} de 6 meses. Con ${6 - completos} más podremos determinar su categoría.`}
        {completos >= 6 && (
          <span style={{ color: C.verde, fontWeight: 600 }}>
            {completos} meses registrados. Suficiente para aplicar la metodología normativa.
          </span>
        )}
      </div>

      <p style={{ fontSize: 12.5, color: C.grisClaro, lineHeight: 1.6, marginBottom: 18 }}>
        La norma exige cantidades <strong>pesadas</strong>. Si marca alguna como
        estimada, el resultado se entregará como estimación, no como determinación.
      </p>

      {/* ── Acciones ── */}
      <button
        onClick={continuar}
        style={{
          width: "100%", background: C.verde, color: "#fff", border: "none",
          padding: "15px", borderRadius: 8, fontSize: 15.5, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit", marginBottom: 10,
        }}
      >
        Continuar con estos registros
      </button>

      <button
        onClick={onOmitir}
        style={{
          width: "100%", background: "none", border: `1px solid ${C.linea}`,
          padding: "13px", borderRadius: 8, fontSize: 14, fontWeight: 600,
          color: C.gris, cursor: "pointer", fontFamily: "inherit",
        }}
      >
        No tengo registros, continuar sin ellos
      </button>
    </div>
  );
}
