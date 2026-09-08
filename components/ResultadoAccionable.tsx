"use client";

import { useState } from "react";
import {
  datosAutoridad, CATEGORIA_RESPEL, RADICACION, POSCONSUMO,
  accionesACU, accionesRespel, accionesResiduos,
  accionesVertimientos, accionesPGIRASA,
  type Accion, type CategoriaRespel,
} from "@/lib/ecocheck-acciones";

/* ══════════════════════════════════════════════════════════════
   Resultado accionable del diagnóstico

   No describe el riesgo: dice qué hacer, ante quién y cómo.
   ══════════════════════════════════════════════════════════════ */

type Props = {
  autoridad: string;
  departamento: string;
  tipoNegocio: string;
  categoriaRespel: CategoriaRespel | "no_se";
  generaACU: boolean;
  generaResiduos: boolean;
  vierteAlAlcantarillado: boolean | null;
  esSalud: boolean;
};

const C = {
  tinta: "#16211B", verde: "#1F5C38", mint: "#9FD9B6",
  hueso: "#F4F6F2", linea: "#DDE3DC", gris: "#68756D",
  ambar: "#B4872F", ambarFondo: "#FBF3E2",
  rojo: "#A8402C", rojoFondo: "#FAEDE9", verdeFondo: "#EDF4EF",
};

export default function ResultadoAccionable(p: Props) {
  const [abierta, setAbierta] = useState<string | null>(null);
  const aut = datosAutoridad(p.autoridad);

  /* Acciones derivadas de lo que respondió */
  const acciones: Accion[] = [
    ...(p.generaACU ? accionesACU() : []),
    ...(p.categoriaRespel !== "no_se"
      ? accionesRespel(p.categoriaRespel as CategoriaRespel)
      : []),
    ...(p.generaResiduos ? accionesResiduos() : []),
    ...(p.vierteAlAlcantarillado !== null
      ? accionesVertimientos(p.vierteAlAlcantarillado)
      : []),
    ...(p.esSalud ? accionesPGIRASA() : []),
  ];

  const inmediatas = acciones.filter((a) => a.urgencia === "inmediata");
  const corto = acciones.filter((a) => a.urgencia === "corto");
  const medio = acciones.filter((a) => a.urgencia === "medio");

  const categoria =
    p.categoriaRespel !== "no_se" && p.categoriaRespel !== "no_genera"
      ? CATEGORIA_RESPEL[p.categoriaRespel]
      : null;

  return (
    <div className="space-y-4">

      {/* ── Su situación en una frase ── */}
      <div style={{ background: C.tinta, borderRadius: 12, padding: "20px 22px", color: "#fff" }}>
        <div style={{ fontSize: 12, color: C.mint, marginBottom: 6 }}>Su situación</div>

        {categoria && (
          <div style={{ fontSize: 21, fontWeight: 700, marginBottom: 8 }}>
            Usted es {categoria.nombre.toLowerCase()} de residuos peligrosos
            <span style={{ fontSize: 13, fontWeight: 400, color: "#9FA9A3", marginLeft: 8 }}>
              {categoria.nota}
            </span>
          </div>
        )}

        <div style={{ fontSize: 15, lineHeight: 1.6, color: "#C9D6CF" }}>
          Su autoridad competente es <strong style={{ color: "#fff" }}>{aut.sigla}</strong>
          {p.departamento && ` para ${p.departamento}`}. Tiene{" "}
          <strong style={{ color: "#fff" }}>{acciones.length} obligaciones</strong> identificadas,
          de las cuales <strong style={{ color: C.mint }}>{inmediatas.length}</strong> conviene
          atender de inmediato.
        </div>
      </div>

      {/* ── Datos de la autoridad ── */}
      <div style={{ background: "#fff", border: `1px solid ${C.linea}`, borderRadius: 12, padding: "18px 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.gris, marginBottom: 10 }}>
          Dónde debe responder
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.verde, marginBottom: 4 }}>
          {aut.nombre}
        </div>

        {aut.verificado ? (
          <div style={{ fontSize: 13.5, color: C.gris, lineHeight: 1.7 }}>
            {aut.direccion && <div>{aut.direccion}</div>}
            {aut.telefono && (
              <div>
                Teléfono {aut.telefono}
                {aut.lineaGratuita && ` · línea gratuita ${aut.lineaGratuita}`}
              </div>
            )}
            {aut.horario && <div>{aut.horario}</div>}
          </div>
        ) : (
          <div style={{ fontSize: 13.5, color: C.gris, lineHeight: 1.6 }}>
            Consulte los datos de contacto y horarios en{" "}
            <strong>{aut.web}</strong>.
          </div>
        )}

        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.hueso}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
            Cómo se radica
          </div>
          <div style={{ fontSize: 13, color: C.gris, lineHeight: 1.6 }}>
            La mayoría de trámites se gestionan por <strong>{RADICACION.plataforma}</strong>:{" "}
            {RADICACION.url}
          </div>
          <ol style={{ fontSize: 13, color: C.gris, lineHeight: 1.7, margin: "8px 0 0", paddingLeft: 18 }}>
            {RADICACION.pasos.map((s) => <li key={s}>{s}</li>)}
          </ol>
          <div style={{ fontSize: 12, color: "#8A9188", marginTop: 8, fontStyle: "italic" }}>
            {RADICACION.nota}
          </div>
        </div>
      </div>

      {/* ── Plan de acción ── */}
      {inmediatas.length > 0 && (
        <Bloque
          titulo="Empiece por aquí"
          subtitulo="Obligaciones exigibles desde ya"
          color={C.rojo}
          fondo={C.rojoFondo}
          acciones={inmediatas}
          abierta={abierta}
          setAbierta={setAbierta}
        />
      )}

      {corto.length > 0 && (
        <Bloque
          titulo="En las próximas semanas"
          subtitulo="Conviene resolverlo pronto"
          color={C.ambar}
          fondo={C.ambarFondo}
          acciones={corto}
          abierta={abierta}
          setAbierta={setAbierta}
        />
      )}

      {medio.length > 0 && (
        <Bloque
          titulo="Para el mediano plazo"
          subtitulo="Planifíquelo con tiempo"
          color={C.verde}
          fondo={C.verdeFondo}
          acciones={medio}
          abierta={abierta}
          setAbierta={setAbierta}
        />
      )}

      {/* ── Vía gratuita para pequeños generadores ── */}
      {(p.categoriaRespel === "micro" || p.categoriaRespel === "pequeño") && (
        <div style={{ background: C.verdeFondo, border: `1px solid #CBE0D3`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: C.verde, marginBottom: 6 }}>
            Vía gratuita para su volumen
          </div>
          <p style={{ fontSize: 13.5, color: C.gris, lineHeight: 1.6, margin: "0 0 12px" }}>
            Por la cantidad que genera, varios de sus residuos los reciben sin costo
            los programas posconsumo autorizados:
          </p>
          <div style={{ display: "grid", gap: 6 }}>
            {POSCONSUMO.map((x) => (
              <div key={x.nombre} style={{ fontSize: 13, color: C.tinta }}>
                <strong>{x.nombre}</strong>
                <span style={{ color: C.gris }}> — {x.recibe}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: C.gris, marginTop: 12, marginBottom: 0 }}>
            Las alcaldías también hacen campañas de recolección una o dos veces al año.
          </p>
        </div>
      )}

      {/* ── Si no conoce su volumen ── */}
      {p.categoriaRespel === "no_se" && (
        <div style={{ background: C.ambarFondo, border: `1px solid #F0DFBE`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: C.ambar, marginBottom: 6 }}>
            No sabemos su categoría de generador
          </div>
          <p style={{ fontSize: 13.5, color: C.gris, lineHeight: 1.6, margin: 0 }}>
            La categoría define qué obligaciones le aplican, y depende de cuántos kilos
            de residuos peligrosos genera al mes. Pese lo que genera durante un mes:
            con ese dato podemos decirle exactamente qué le exige la norma.
          </p>
        </div>
      )}

      <p style={{ fontSize: 12, color: "#8A9188", lineHeight: 1.6, textAlign: "center", margin: "6px 0 0" }}>
        Este resultado es orientativo y se basa en lo que usted respondió. No constituye
        concepto técnico ni certifica el cumplimiento de su establecimiento.
      </p>
    </div>
  );
}

/* ── Bloque de acciones por urgencia ────────────────────── */
function Bloque({
  titulo, subtitulo, color, fondo, acciones, abierta, setAbierta,
}: {
  titulo: string; subtitulo: string; color: string; fondo: string;
  acciones: Accion[]; abierta: string | null;
  setAbierta: (v: string | null) => void;
}) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.linea}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: fondo, padding: "14px 20px", borderBottom: `1px solid ${C.linea}` }}>
        <div style={{ fontSize: 15, fontWeight: 700, color }}>{titulo}</div>
        <div style={{ fontSize: 12.5, color: C.gris, marginTop: 2 }}>{subtitulo}</div>
      </div>

      {acciones.map((a) => {
        const open = abierta === a.id;
        return (
          <div key={a.id} style={{ borderBottom: `1px solid ${C.hueso}` }}>
            <button
              onClick={() => setAbierta(open ? null : a.id)}
              style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                padding: "14px 20px", textAlign: "left", fontFamily: "inherit",
                display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: C.tinta, lineHeight: 1.4 }}>
                  {a.titulo}
                </div>
                <div style={{ fontSize: 12, color: C.gris, marginTop: 4 }}>{a.norma}</div>
                {a.plazo && (
                  <div style={{ fontSize: 12, color, marginTop: 3, fontWeight: 600 }}>
                    {a.plazo}
                  </div>
                )}
              </div>
              <span style={{ fontSize: 18, color: C.gris, lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform .2s" }}>
                +
              </span>
            </button>

            {open && (
              <div style={{ padding: "0 20px 16px" }}>
                <ol style={{ fontSize: 13.5, color: C.gris, lineHeight: 1.75, margin: "0 0 10px", paddingLeft: 18 }}>
                  {a.pasos.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
                {a.costo && (
                  <div style={{ fontSize: 12.5, color: C.gris, marginBottom: 8 }}>
                    <strong>Costo:</strong> {a.costo}
                  </div>
                )}
                {a.guia && (
                  <a
                    href={a.guia}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block", fontSize: 13, fontWeight: 700,
                      color: C.verde, textDecoration: "none",
                    }}
                  >
                    Descargar la guía completa →
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
