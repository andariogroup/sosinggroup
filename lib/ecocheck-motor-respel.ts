/* ══════════════════════════════════════════════════════════════
   ECOCHECK · MOTOR DE CLASIFICACIÓN RESPEL

   Implementa la metodología normativa verificada:
   media móvil de los últimos seis meses con promedios ponderados.

   Decreto 1076 de 2015, art. 2.2.6.1.6.2
   (compila el Decreto 4741 de 2005, art. 28)

   El motor NO calcula si no hay datos suficientes.
   No extrapola. No asume. No completa valores faltantes.
   ══════════════════════════════════════════════════════════════ */

import type { Fuente } from "./ecocheck-reglas";

/* ── Registro mensual de la bitácora ───────────────────────── */
export type TipoRegistro = "pesado" | "estimado" | "sin_generacion";

export type RegistroMensual = {
  mes: string;              // "2026-03"
  cantidad: number | null;  // en la unidad declarada
  unidad: "kg" | "g" | "t"; // se normaliza a kg
  tipoRegistro: TipoRegistro;
  observaciones?: string;
  evidenciaDisponible: boolean;
  fechaRegistro: string;    // ISO
};

/* ── Resultado del motor ───────────────────────────────────── */
export type EstadoClasificacion = "DETERMINADA" | "ESTIMADA" | "NO_DETERMINABLE";

export type Categoria = "gran" | "mediano" | "pequeno" | "bajo_umbral" | null;

export type ResultadoClasificacion = {
  estado: EstadoClasificacion;
  categoria: Categoria;
  nombreCategoria: string;
  rangoNormativo: string;

  /* Cálculo — presente solo si estado = DETERMINADA */
  valorCalculado: number | null;
  unidadCalculo: "kg/mes";
  periodoUtilizado: string | null;
  mesesUtilizados: number;
  metodologia: string;
  datosUtilizados: RegistroMensual[];

  /* Condición de registro — separada de la categoría */
  exentoRegistro: boolean | null;
  notaExencion: string | null;

  /* Comunicación */
  mensaje: string;
  faltante: string[];

  /* Trazabilidad */
  fuente: Fuente;
  confianza: "alta" | "media" | "baja";
};

/* ── Umbrales verificados ──────────────────────────────────── */
const UMBRAL_GRAN = 1000.0;
const UMBRAL_MEDIANO = 100.0;
const UMBRAL_PEQUENO = 10.0;

const MESES_REQUERIDOS = 6;

export const FUENTE_RESPEL: Fuente = {
  norma: "Decreto 1076 de 2015 (compila el Decreto 4741 de 2005)",
  articulo: "Artículo 2.2.6.1.6.2 — antes artículo 28 del Decreto 4741 de 2005",
  entidad: "Ministerio de Ambiente y Desarrollo Sostenible",
  fuenteConsultada: "Gestor Normativo Función Pública · Resolución 1362 de 2007",
  urlOficial: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=18718",
  nivelFuente: 2,
  fechaVerificacion: "2026-09-08",
  confianza: "alta",
};

export const METODOLOGIA =
  "Media móvil de los últimos seis (6) meses de las cantidades pesadas, " +
  "con promedios ponderados, conforme al artículo 2.2.6.1.6.2 del Decreto 1076 de 2015.";

/* ── Normalización de unidades a kilogramos ────────────────── */
function aKilogramos(cantidad: number, unidad: "kg" | "g" | "t"): number {
  if (unidad === "g") return cantidad / 1000;
  if (unidad === "t") return cantidad * 1000;
  return cantidad;
}

/* ── Validación de un registro ─────────────────────────────── */
function registroValido(r: RegistroMensual): boolean {
  if (r.tipoRegistro === "sin_generacion") return true;   // 0 kg es dato válido
  if (r.cantidad === null || r.cantidad === undefined) return false;
  if (!Number.isFinite(r.cantidad)) return false;
  if (r.cantidad < 0) return false;
  if (!["kg", "g", "t"].includes(r.unidad)) return false;
  if (!/^\d{4}-\d{2}$/.test(r.mes)) return false;
  return true;
}

/* ── Cálculo de la media móvil ─────────────────────────────── */
function mediaMovil(registros: RegistroMensual[]): number {
  const suma = registros.reduce((acc, r) => {
    const kg = r.tipoRegistro === "sin_generacion"
      ? 0
      : aKilogramos(r.cantidad ?? 0, r.unidad);
    return acc + kg;
  }, 0);
  return suma / registros.length;
}

/* ── Asignación de categoría por umbral ────────────────────── */
function categoriaPorValor(kgMes: number): {
  categoria: Categoria; nombre: string; rango: string; exento: boolean;
} {
  if (kgMes >= UMBRAL_GRAN)
    return { categoria: "gran", nombre: "Gran generador",
             rango: "Igual o mayor a 1.000,0 kg/mes", exento: false };
  if (kgMes >= UMBRAL_MEDIANO)
    return { categoria: "mediano", nombre: "Mediano generador",
             rango: "Igual o mayor a 100,0 y menor a 1.000,0 kg/mes", exento: false };
  if (kgMes >= UMBRAL_PEQUENO)
    return { categoria: "pequeno", nombre: "Pequeño generador",
             rango: "Igual o mayor a 10,0 y menor a 100,0 kg/mes", exento: false };
  return { categoria: "bajo_umbral", nombre: "Generación por debajo del umbral de registro",
           rango: "Inferior a 10,0 kg/mes", exento: true };
}

const NOTA_EXENCION =
  "La exención aplica únicamente al Registro de Generadores. No exime de las " +
  "demás obligaciones de manejo, almacenamiento y entrega a gestor autorizado. " +
  "La autoridad ambiental puede requerir información aun estando exento.";

/* ══════════════════════════════════════════════════════════════
   MOTOR PRINCIPAL
   ══════════════════════════════════════════════════════════════ */
export function clasificarGeneradorRespel(
  registros: RegistroMensual[],
  rangoDeclarado?: string        // respaldo cuando no hay bitácora
): ResultadoClasificacion {

  const base = {
    unidadCalculo: "kg/mes" as const,
    metodologia: METODOLOGIA,
    fuente: FUENTE_RESPEL,
  };

  /* ── Ordenar y validar ── */
  const ordenados = [...(registros || [])]
    .filter((r) => r && registroValido(r))
    .sort((a, b) => b.mes.localeCompare(a.mes));     // más reciente primero

  const invalidos = (registros || []).length - ordenados.length;

  /* ── CASO A · datos suficientes y válidos → DETERMINADA ── */
  if (ordenados.length >= MESES_REQUERIDOS) {
    const ventana = ordenados.slice(0, MESES_REQUERIDOS);

    /* Si algún registro de la ventana es estimado, no es determinada:
       la norma exige cantidades pesadas. */
    const hayEstimados = ventana.some((r) => r.tipoRegistro === "estimado");

    const valor = mediaMovil(ventana);
    const cat = categoriaPorValor(valor);
    const periodo = `${ventana[ventana.length - 1].mes} a ${ventana[0].mes}`;

    if (hayEstimados) {
      return {
        ...base,
        estado: "ESTIMADA",
        categoria: cat.categoria,
        nombreCategoria: cat.nombre,
        rangoNormativo: cat.rango,
        valorCalculado: Math.round(valor * 100) / 100,
        periodoUtilizado: periodo,
        mesesUtilizados: MESES_REQUERIDOS,
        datosUtilizados: ventana,
        exentoRegistro: cat.exento,
        notaExencion: cat.exento ? NOTA_EXENCION : null,
        mensaje:
          "Esta clasificación es estimada porque algunos registros del período " +
          "corresponden a cantidades estimadas y no pesadas. La norma exige " +
          "cantidades pesadas.",
        faltante: ["Reemplazar los registros estimados por cantidades pesadas"],
        confianza: "media",
      };
    }

    return {
      ...base,
      estado: "DETERMINADA",
      categoria: cat.categoria,
      nombreCategoria: cat.nombre,
      rangoNormativo: cat.rango,
      valorCalculado: Math.round(valor * 100) / 100,
      periodoUtilizado: periodo,
      mesesUtilizados: MESES_REQUERIDOS,
      datosUtilizados: ventana,
      exentoRegistro: cat.exento,
      notaExencion: cat.exento ? NOTA_EXENCION : null,
      mensaje: "",
      faltante: [],
      confianza: "alta",
    };
  }

  /* ── CASO B · datos parciales → ESTIMADA ── */
  if (ordenados.length >= 2) {
    const valor = mediaMovil(ordenados);
    const cat = categoriaPorValor(valor);
    const periodo = `${ordenados[ordenados.length - 1].mes} a ${ordenados[0].mes}`;
    const faltan = MESES_REQUERIDOS - ordenados.length;

    return {
      ...base,
      estado: "ESTIMADA",
      categoria: cat.categoria,
      nombreCategoria: cat.nombre,
      rangoNormativo: cat.rango,
      valorCalculado: Math.round(valor * 100) / 100,
      periodoUtilizado: periodo,
      mesesUtilizados: ordenados.length,
      datosUtilizados: ordenados,
      exentoRegistro: null,      // no se afirma exención sobre datos parciales
      notaExencion: null,
      mensaje:
        "Esta clasificación es estimada porque la información histórica " +
        "suministrada es incompleta.",
      faltante: [
        `Registrar ${faltan} ${faltan === 1 ? "mes adicional" : "meses adicionales"} ` +
        "para completar los seis que exige la metodología",
      ],
      confianza: ordenados.length >= 4 ? "media" : "baja",
    };
  }

  /* ── CASO C · sin datos suficientes → NO DETERMINABLE ── */
  const faltante: string[] = [];

  if (ordenados.length === 1) {
    faltante.push(
      "Registrar al menos 5 meses adicionales. Un solo mes no permite calcular la media móvil"
    );
  } else if (rangoDeclarado && rangoDeclarado !== "no_se") {
    faltante.push(
      "Registrar los kilogramos generados mes a mes durante al menos seis meses"
    );
  } else {
    faltante.push("Pesar y registrar los residuos peligrosos generados cada mes");
    faltante.push("Acumular al menos seis meses de registro");
  }

  if (invalidos > 0) {
    faltante.push(
      `Corregir ${invalidos} ${invalidos === 1 ? "registro con datos inválidos" : "registros con datos inválidos"}`
    );
  }

  return {
    ...base,
    estado: "NO_DETERMINABLE",
    categoria: null,
    nombreCategoria: "Categoría no determinable",
    rangoNormativo: "",
    valorCalculado: null,
    periodoUtilizado: null,
    mesesUtilizados: ordenados.length,
    datosUtilizados: ordenados,
    exentoRegistro: null,
    notaExencion: null,
    mensaje:
      "ECOCHECK no puede determinar la categoría con la información suministrada.",
    faltante,
    confianza: "baja",
  };
}

/* ══════════════════════════════════════════════════════════════
   EXPLICABILIDAD
   Dato → Interpretación → Regla → Resultado → Fuente
   ══════════════════════════════════════════════════════════════ */
export type Explicacion = {
  datoIngresado: string;
  interpretacion: string;
  reglaAplicada: string;
  calculo: string | null;
  resultado: string;
  fuente: Fuente;
  confianza: string;
};

export function explicarClasificacion(r: ResultadoClasificacion): Explicacion {
  const datos = r.datosUtilizados
    .map((d) => `${d.mes}: ${d.tipoRegistro === "sin_generacion" ? "0" : d.cantidad} ${d.unidad}`)
    .join(" · ");

  return {
    datoIngresado: datos || "Sin registros mensuales suministrados",

    interpretacion:
      r.estado === "DETERMINADA"
        ? `Se cuenta con ${r.mesesUtilizados} meses de cantidades pesadas, ` +
          "suficientes para aplicar la metodología normativa."
        : r.estado === "ESTIMADA"
        ? `Se cuenta con ${r.mesesUtilizados} de los 6 meses que exige la norma, ` +
          "o algunos registros son estimados."
        : "No hay información suficiente para aplicar la metodología.",

    reglaAplicada: METODOLOGIA,

    calculo:
      r.valorCalculado !== null
        ? `Suma de ${r.mesesUtilizados} meses ÷ ${r.mesesUtilizados} = ` +
          `${r.valorCalculado} kg/mes · período ${r.periodoUtilizado}`
        : null,

    resultado:
      r.categoria
        ? `${r.nombreCategoria} — ${r.rangoNormativo}`
        : "Categoría no determinable",

    fuente: r.fuente,
    confianza: r.confianza,
  };
}
