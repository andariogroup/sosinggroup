/* ══════════════════════════════════════════════════════════════
   ECOCHECK · RULE GOVERNANCE SYSTEM v1

   Toda regla normativa conserva: norma, artículo, fuente, fecha
   de verificación, condición de aplicabilidad y nivel de confianza.

   Ninguna regla se implementa sin fuente verificable. Las que no
   la tienen quedan bloqueadas y visibles como tales.
   ══════════════════════════════════════════════════════════════ */

export type Naturaleza =
  | "obligacion_verificada"
  | "requisito_potencial"
  | "recomendacion_tecnica"
  | "buena_practica"
  | "requiere_verificacion"
  | "informacion_declarada";

export const NATURALEZA_META: Record<
  Naturaleza,
  { etiqueta: string; color: string; fondo: string }
> = {
  obligacion_verificada: { etiqueta: "Obligación verificada",       color: "#A8402C", fondo: "#FAEDE9" },
  requisito_potencial:   { etiqueta: "Requisito potencial",         color: "#B4872F", fondo: "#FBF3E2" },
  recomendacion_tecnica: { etiqueta: "Recomendación técnica",       color: "#2C5F8A", fondo: "#EAF1F7" },
  buena_practica:        { etiqueta: "Buena práctica",              color: "#1F5C38", fondo: "#EDF4EF" },
  requiere_verificacion: { etiqueta: "Requiere verificación",       color: "#6B4C8A", fondo: "#F1ECF7" },
  informacion_declarada: { etiqueta: "Según lo que usted declaró",  color: "#68756D", fondo: "#F4F6F2" },
};

export type Fuente = {
  norma: string;
  articulo: string;
  entidad: string;
  fuenteConsultada: string;
  nivelFuente: 1 | 2 | 3 | 4 | 5;
  fechaVerificacion: string;
  confianza: "alta" | "media" | "baja";
};

/* OBLIGACIÓN → ACCIONES → EVIDENCIAS → FRECUENCIA → PLAZO → FUENTE */
export type Obligacion = {
  id: string;
  ruleId: string;
  titulo: string;
  naturaleza: Naturaleza;
  urgencia: "inmediata" | "corto" | "medio";
  acciones: string[];
  evidencias: string[];
  frecuencia: string;
  plazo?: string;
  costo?: { valor: string; fuente: string | null };
  fuente: Fuente | null;
  guia?: string;
  advertencia?: string;
};

/* ══════════════════════════════════════════════════════════════
   AUTORIDADES
   ══════════════════════════════════════════════════════════════ */
export type DatosAutoridad = {
  sigla: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  lineaGratuita?: string;
  horario?: string;
  web?: string;
  fuenteDatos?: string;
  fechaVerificacion?: string;
  nivelFuente?: 1 | 2 | 3 | 4 | 5;
  verificado: boolean;
};

export const AUTORIDADES_DATOS: Record<string, DatosAutoridad> = {
  CORPOCESAR: {
    sigla: "CORPOCESAR",
    nombre: "Corporación Autónoma Regional del Cesar",
    direccion:
      "Km 2 vía La Paz, Lote 1 U.I.C Casa e' Campo, frente a la feria ganadera, Valledupar",
    telefono: "605 574 8960",
    lineaGratuita: "01 8000 915306",
    horario: "Lunes a viernes, 8:00 a.m. – 5:00 p.m. Correspondencia hasta 4:30 p.m.",
    web: "corpocesar.gov.co",
    fuenteDatos: "Portal institucional CORPOCESAR",
    fechaVerificacion: "2026-09-08",
    nivelFuente: 2,
    verificado: true,
  },
  CORPOGUAJIRA: {
    sigla: "CORPOGUAJIRA",
    nombre: "Corporación Autónoma Regional de La Guajira",
    web: "corpoguajira.gov.co",
    verificado: false,
  },
};

export function datosAutoridad(sigla: string): DatosAutoridad {
  return AUTORIDADES_DATOS[sigla] || { sigla, nombre: sigla, verificado: false };
}

/* ══════════════════════════════════════════════════════════════
   CLASIFICACIÓN RESPEL

   Decreto 1076 de 2015, art. 2.2.6.1.6.2
   (compila el Decreto 4741 de 2005, art. 28)

   El método normativo exige media móvil de los últimos SEIS meses
   con promedios ponderados. No es un dato que el usuario declare:
   es un cálculo. Sin ese registro no hay categoría definitiva.
   ══════════════════════════════════════════════════════════════ */

export type EstadoCategoria = "DETERMINADA" | "ESTIMADA" | "NO_DETERMINABLE";

export type ResultadoCategoria = {
  estado: EstadoCategoria;
  categoria: "gran" | "mediano" | "pequeno" | "exento" | null;
  nombre: string;
  detalle: string;
  mensaje: string;
  exentoRegistro: boolean;
  mesesDisponibles: string;
  fuente: Fuente;
};

const FUENTE_RESPEL: Fuente = {
  norma: "Decreto 1076 de 2015 (compila el Decreto 4741 de 2005)",
  articulo: "Artículo 2.2.6.1.6.2 — antes artículo 28 del Decreto 4741 de 2005",
  entidad: "Ministerio de Ambiente y Desarrollo Sostenible",
  fuenteConsultada: "Gestor Normativo Función Pública · Resolución 1362 de 2007",
  nivelFuente: 2,
  fechaVerificacion: "2026-09-08",
  confianza: "alta",
};

export const MESES_REGISTRO = [
  { valor: "1",     texto: "1 mes" },
  { valor: "2_3",   texto: "2 a 3 meses" },
  { valor: "4_5",   texto: "4 a 5 meses" },
  { valor: "6_mas", texto: "6 meses o más" },
  { valor: "sin",   texto: "No tengo registros" },
];

export const RANGOS_RESPEL = [
  { valor: "bajo",     texto: "Menos de 10 kg" },
  { valor: "pequeno",  texto: "Entre 10 y 100 kg" },
  { valor: "mediano",  texto: "Entre 100 y 1.000 kg" },
  { valor: "gran",     texto: "Más de 1.000 kg" },
  { valor: "no_se",    texto: "No sé cuánto genero" },
];

const MAPA_CATEGORIA: Record<
  string,
  { cat: "gran" | "mediano" | "pequeno" | "exento"; nombre: string; detalle: string; exento: boolean }
> = {
  bajo:    { cat: "exento",  nombre: "Por debajo del umbral de registro",
             detalle: "Generación inferior a 10,0 kg/mes", exento: true },
  pequeno: { cat: "pequeno", nombre: "Pequeño generador",
             detalle: "Igual o mayor a 10,0 y menor a 100,0 kg/mes", exento: false },
  mediano: { cat: "mediano", nombre: "Mediano generador",
             detalle: "Igual o mayor a 100,0 y menor a 1.000,0 kg/mes", exento: false },
  gran:    { cat: "gran",    nombre: "Gran generador",
             detalle: "Igual o mayor a 1.000,0 kg/mes", exento: false },
};

const MSG_NO_DETERMINABLE =
  "Con la información disponible no es posible determinar de manera definitiva " +
  "la categoría. Se requiere información adicional para aplicar la metodología " +
  "correspondiente.";

export function clasificarRespel(
  rangoDeclarado: string,
  mesesRegistro: string
): ResultadoCategoria {

  if (rangoDeclarado === "no_genera") {
    return {
      estado: "DETERMINADA", categoria: null,
      nombre: "No genera residuos peligrosos", detalle: "", mensaje: "",
      exentoRegistro: true, mesesDisponibles: mesesRegistro, fuente: FUENTE_RESPEL,
    };
  }

  const m = MAPA_CATEGORIA[rangoDeclarado];

  /* No conoce su generación, o valor no reconocido */
  if (!m) {
    return {
      estado: "NO_DETERMINABLE", categoria: null,
      nombre: "Categoría no determinable", detalle: "",
      mensaje: MSG_NO_DETERMINABLE,
      exentoRegistro: false, mesesDisponibles: mesesRegistro, fuente: FUENTE_RESPEL,
    };
  }

  /* Sin registros: no hay base para estimar */
  if (mesesRegistro === "sin" || mesesRegistro === "") {
    return {
      estado: "NO_DETERMINABLE", categoria: null,
      nombre: "Categoría no determinable", detalle: "",
      mensaje: MSG_NO_DETERMINABLE,
      exentoRegistro: false, mesesDisponibles: mesesRegistro, fuente: FUENTE_RESPEL,
    };
  }

  /* Con registros, la salida es siempre ESTIMADA:
     el sistema no calcula la media móvil, la declara el usuario. */
  const seisOMas = mesesRegistro === "6_mas";

  return {
    estado: "ESTIMADA",
    categoria: m.cat,
    nombre: m.nombre,
    detalle: m.detalle,
    mensaje: seisOMas
      ? `Su generación sugiere la categoría de ${m.nombre.toLowerCase()}, sujeta a ` +
        "verificación con el registro de los últimos seis meses."
      : `Su generación sugiere la categoría de ${m.nombre.toLowerCase()}, sujeta a ` +
        "verificación con la información requerida por la metodología normativa, " +
        "que exige la media móvil de los últimos seis meses.",
    exentoRegistro: m.exento,
    mesesDisponibles: mesesRegistro,
    fuente: FUENTE_RESPEL,
  };
}

export const METODO_RESPEL = {
  titulo: "Cómo se determina oficialmente la categoría",
  texto:
    "La norma no clasifica por lo generado en un solo mes. Exige el promedio " +
    "ponderado y la media móvil de los últimos seis meses de las cantidades " +
    "pesadas. Un establecimiento que genera 150 kg en un mes y 30 kg en los otros " +
    "cinco tiene una media de 50 kg/mes: es pequeño generador, no mediano.",
  umbrales: [
    "Gran generador: igual o mayor a 1.000,0 kg/mes",
    "Mediano generador: igual o mayor a 100,0 y menor a 1.000,0 kg/mes",
    "Pequeño generador: igual o mayor a 10,0 y menor a 100,0 kg/mes",
    "Inferior a 10,0 kg/mes: exento del registro",
  ],
  comoObtenerla: [
    "Llevar bitácora mensual de kilogramos generados por corriente de residuo",
    "Pesar las cantidades, no estimarlas",
    "Acumular al menos seis meses de registro",
    "Calcular el promedio de esos seis meses",
  ],
  fuente: FUENTE_RESPEL,
};

/* ══════════════════════════════════════════════════════════════
   ACU · Resolución 316 de 2018
   Verificado en SUIN-Juriscol y normogramas oficiales
   ══════════════════════════════════════════════════════════════ */

const F_ACU_BASE: Fuente = {
  norma: "Resolución 316 de 2018",
  articulo: "Artículo 9 literal a) — procedimiento en el artículo 5",
  entidad: "Ministerio de Ambiente y Desarrollo Sostenible",
  fuenteConsultada: "SUIN-Juriscol · Normograma Invima · Normograma Cancillería",
  nivelFuente: 1,
  fechaVerificacion: "2026-09-08",
  confianza: "alta",
};

export function obligacionesACU(): Obligacion[] {
  return [
    {
      id: "acu-inscripcion",
      ruleId: "ACU-INSC-001",
      titulo: "Inscribirse ante la autoridad ambiental competente",
      naturaleza: "obligacion_verificada",
      urgencia: "inmediata",
      acciones: [
        "Reunir RUT, cámara de comercio y datos del o los establecimientos",
        "Diligenciar el formato de inscripción como generador de ACU",
        "Radicar ante la autoridad ambiental del área donde se realiza la generación",
      ],
      evidencias: [
        "Radicado de la solicitud de inscripción",
        "Acto de inscripción, cuando la autoridad lo expida",
      ],
      frecuencia: "Una sola vez",
      fuente: F_ACU_BASE,
      guia: "/kits/kit-acu-40eb10495cbc.pdf",
    },
    {
      id: "acu-gestor",
      ruleId: "ACU-GEST-001",
      titulo: "Entregar el ACU a gestores inscritos ante la autoridad ambiental",
      naturaleza: "obligacion_verificada",
      urgencia: "inmediata",
      acciones: [
        "Verificar que el gestor esté inscrito ante la autoridad ambiental competente",
        "Solicitar copia de su inscripción y confirmar vigencia",
        "Exigir constancia por cada entrega",
      ],
      evidencias: [
        "Copia de la inscripción del gestor",
        "Constancias de entrega con fecha y cantidad",
      ],
      frecuencia: "En cada entrega",
      fuente: { ...F_ACU_BASE, articulo: "Artículo 9 literal b)" },
      guia: "/kits/kit-acu-40eb10495cbc.pdf",
      advertencia:
        "La norma exige gestor INSCRITO ante la autoridad ambiental competente, " +
        "no simplemente autorizado.",
    },
    {
      id: "acu-capacitacion",
      ruleId: "ACU-CAPA-001",
      titulo: "Capacitar al personal encargado de la gestión del ACU",
      naturaleza: "obligacion_verificada",
      urgencia: "corto",
      acciones: [
        "Capacitar al personal sobre el riesgo que estos residuos representan para el ambiente",
        "Documentar cada capacitación con fecha, contenido y asistentes",
      ],
      evidencias: [
        "Registro de asistencia firmado",
        "Contenido o material de la capacitación",
        "Registro fotográfico",
      ],
      frecuencia: "Periódica, según rotación del personal",
      fuente: { ...F_ACU_BASE, articulo: "Artículo 9 literal c)" },
      guia: "/kits/kit-acu-40eb10495cbc.pdf",
      advertencia:
        "Las evidencias de capacitación hacen parte del reporte anual.",
    },
    {
      id: "acu-reporte",
      ruleId: "ACU-REP-001",
      titulo: "Presentar el reporte anual ante la autoridad ambiental",
      naturaleza: "obligacion_verificada",
      urgencia: "medio",
      plazo: "Dentro de los primeros quince (15) días del mes de enero de cada año",
      acciones: [
        "Consolidar los KILOGRAMOS totales de ACU generados durante el período",
        "Reunir las copias de las constancias expedidas por el gestor",
        "Reunir las evidencias de las capacitaciones realizadas al personal",
        "Radicar los tres componentes ante la autoridad ambiental competente",
      ],
      evidencias: [
        "Consolidado anual en kilogramos",
        "Copia de constancias del gestor",
        "Evidencias de capacitación",
        "Radicado del reporte",
      ],
      frecuencia: "Anual",
      fuente: {
        ...F_ACU_BASE,
        articulo: "Artículo 9",
        fuenteConsultada: "SUIN-Juriscol · Corpoboyacá (autoridad ambiental)",
        nivelFuente: 2,
      },
      guia: "/kits/kit-acu-40eb10495cbc.pdf",
      advertencia:
        "El reporte tiene TRES componentes. Presentar solo el consolidado de " +
        "cantidades deja la obligación incompleta. La unidad exigida es " +
        "kilogramos, no litros.",
    },
    {
      id: "acu-almacenamiento",
      ruleId: "ACU-ALMA-001",
      titulo: "Almacenamiento del ACU en recipiente exclusivo y rotulado",
      naturaleza: "requiere_verificacion",
      urgencia: "inmediata",
      acciones: [
        "Destinar un recipiente exclusivo con tapa y rotulado",
        "Ubicarlo protegido de la lluvia y separado del área de alimentos",
        "No verterlo al desagüe ni mezclarlo con agua",
      ],
      evidencias: ["Registro fotográfico del sitio de almacenamiento"],
      frecuencia: "Permanente",
      fuente: null,
      guia: "/kits/kit-acu-40eb10495cbc.pdf",
      advertencia:
        "Los artículos 8 y 9 de la Resolución 316 de 2018 no establecen " +
        "condiciones de almacenamiento para el generador industrial, comercial " +
        "y de servicios. Puede existir exigencia en norma sanitaria. Pendiente " +
        "de verificación profesional antes de presentarla como obligación.",
    },
  ];
}

/* ══════════════════════════════════════════════════════════════
   RESPEL · obligaciones
   ══════════════════════════════════════════════════════════════ */

const F_RESPEL_MANEJO: Fuente = {
  norma: "Decreto 1076 de 2015 (compila el Decreto 4741 de 2005)",
  articulo: "Artículo 2.2.6.1.3.1",
  entidad: "Ministerio de Ambiente y Desarrollo Sostenible",
  fuenteConsultada: "Gestor Normativo Función Pública",
  nivelFuente: 2,
  fechaVerificacion: "2026-09-08",
  confianza: "media",
};

const F_BITACORA: Fuente = {
  norma: "Resolución 1362 de 2007",
  articulo: "Obligaciones del generador para el registro",
  entidad: "Ministerio de Ambiente, Vivienda y Desarrollo Territorial",
  fuenteConsultada: "Normograma MinCIT · ICBF",
  nivelFuente: 2,
  fechaVerificacion: "2026-09-08",
  confianza: "alta",
};

export function obligacionesRespel(r: ResultadoCategoria): Obligacion[] {
  if (r.estado === "DETERMINADA" && r.categoria === null) return [];

  const lista: Obligacion[] = [
    {
      id: "respel-manejo",
      ruleId: "RESPEL-MANEJO-001",
      titulo: "Garantizar el manejo seguro de los residuos peligrosos",
      naturaleza: "obligacion_verificada",
      urgencia: "inmediata",
      acciones: [
        "Área cubierta, ventilada, con piso impermeable y acceso restringido",
        "Envases rotulados con la identificación del residuo",
        "Separado de materias primas y de zonas de alimentos",
      ],
      evidencias: ["Registro fotográfico del sitio", "Rótulos de identificación"],
      frecuencia: "Permanente",
      fuente: F_RESPEL_MANEJO,
      guia: "/kits/kit-respel-7018a31d9c3f.pdf",
      advertencia:
        "Aplica sin importar la categoría, incluso si está por debajo del " +
        "umbral de registro.",
    },
    {
      id: "respel-gestor",
      ruleId: "RESPEL-GEST-001",
      titulo: "Entregar a gestor autorizado y conservar los certificados",
      naturaleza: "obligacion_verificada",
      urgencia: "corto",
      acciones: [
        "Solicitar la licencia ambiental del gestor y verificar su vigencia",
        "Exigir certificado de disposición final por cada entrega",
      ],
      evidencias: [
        "Copia de la licencia del gestor",
        "Certificados de disposición final",
        "Manifiestos de carga",
      ],
      frecuencia: "En cada entrega",
      fuente: F_RESPEL_MANEJO,
      guia: "/kits/kit-respel-7018a31d9c3f.pdf",
    },
    {
      id: "respel-bitacora",
      ruleId: "RESPEL-BITA-001",
      titulo: "Llevar bitácora mensual de cantidades generadas",
      naturaleza: "obligacion_verificada",
      urgencia: "inmediata",
      acciones: [
        "Registrar mensualmente los kilogramos generados por corriente de residuo",
        "Pesar las cantidades, no estimarlas",
        "Conservar los soportes que permitan a la autoridad verificar la clasificación",
      ],
      evidencias: ["Bitácora mensual", "Soportes de pesaje"],
      frecuencia: "Mensual",
      fuente: F_BITACORA,
      guia: "/kits/kit-respel-7018a31d9c3f.pdf",
      advertencia:
        "La bitácora es lo que permite determinar la categoría con el método " +
        "que exige la norma.",
    },
  ];

  /* Registro: solo con categoría estimada, no exento */
  if (r.estado === "ESTIMADA" && !r.exentoRegistro && r.categoria) {
    lista.unshift({
      id: "respel-registro",
      ruleId: "RESPEL-REG-001",
      titulo: "Inscribirse en el Registro de Generadores de RESPEL",
      naturaleza: "obligacion_verificada",
      urgencia: "inmediata",
      plazo: "Actualización anual",
      acciones: [
        "Registrarse ante la autoridad ambiental competente de la jurisdicción",
        "Diligenciar el formulario con las cantidades del período",
        "Mantener actualizada la información",
      ],
      evidencias: ["Constancia de inscripción", "Constancia de actualización anual"],
      frecuencia: "Inscripción única, actualización anual",
      costo: { valor: "Consultar con la autoridad ambiental", fuente: null },
      fuente: {
        ...FUENTE_RESPEL,
        norma: "Decreto 1076 de 2015 · Resolución 1362 de 2007",
      },
      guia: "/kits/kit-respel-7018a31d9c3f.pdf",
      advertencia:
        "Esta obligación depende de la categoría, que aquí es estimada. " +
        "Confirme su categoría con el registro de seis meses antes de asumir plazos.",
    });
  }

  /* Exención: aclarar alcance */
  if (r.estado === "ESTIMADA" && r.exentoRegistro && r.categoria === "exento") {
    lista.unshift({
      id: "respel-exencion",
      ruleId: "RESPEL-EXEN-001",
      titulo: "Su generación estaría por debajo del umbral de registro",
      naturaleza: "informacion_declarada",
      urgencia: "inmediata",
      acciones: [
        "Conservar el soporte de sus cantidades para demostrar que está bajo el umbral",
        "Cumplir las demás obligaciones de manejo, que sí le aplican",
      ],
      evidencias: ["Bitácora mensual de cantidades"],
      frecuencia: "Permanente",
      fuente: {
        norma: "Decreto 4741 de 2005",
        articulo: "Artículo 28, parágrafo 1°",
        entidad: "Ministerio de Ambiente, Vivienda y Desarrollo Territorial",
        fuenteConsultada: "Resolución 1362 de 2007, considerandos · Normograma MinCIT",
        nivelFuente: 2,
        fechaVerificacion: "2026-09-08",
        confianza: "alta",
      },
      advertencia:
        "La exención aplica al REGISTRO, no a las demás obligaciones de manejo. " +
        "La autoridad ambiental puede requerir información aun estando exento.",
    });
  }

  /* Categoría no determinable: no derivar obligaciones dependientes */
  if (r.estado === "NO_DETERMINABLE") {
    lista.unshift({
      id: "respel-indeterminado",
      ruleId: "RESPEL-INDET-001",
      titulo: "Determinar su categoría de generador",
      naturaleza: "requiere_verificacion",
      urgencia: "inmediata",
      acciones: [
        "Llevar bitácora mensual de kilogramos generados por corriente de residuo",
        "Pesar las cantidades durante al menos seis meses",
        "Calcular el promedio de esos seis meses",
        "Con ese dato, verificar la categoría ante la autoridad ambiental",
      ],
      evidencias: ["Bitácora de seis meses", "Soportes de pesaje"],
      frecuencia: "Mensual hasta completar seis meses",
      fuente: FUENTE_RESPEL,
      guia: "/kits/kit-respel-7018a31d9c3f.pdf",
      advertencia:
        "Sin la categoría no es posible establecer si le corresponde el registro " +
        "ni qué plazos aplican. Las obligaciones de manejo sí aplican desde ya.",
    });
  }

  return lista;
}

/* ══════════════════════════════════════════════════════════════
   VERTIMIENTOS
   ══════════════════════════════════════════════════════════════ */

export function obligacionesVertimientos(destino: string): Obligacion[] {
  if (destino === "alcantarillado") {
    return [
      {
        id: "vert-pretratamiento",
        ruleId: "VERT-GRASAS-001",
        titulo: "Pretratamiento de grasas antes del alcantarillado",
        naturaleza: "requisito_potencial",
        urgencia: "inmediata",
        acciones: [
          "Consultar el reglamento del prestador del servicio de alcantarillado de su municipio",
          "Verificar si su actividad está sujeta a instalar unidad separadora de grasas",
          "De existir la unidad, mantener registro de sus limpiezas",
        ],
        evidencias: [
          "Comunicación o reglamento del prestador",
          "Registro de mantenimientos",
          "Comprobantes de disposición de las grasas retiradas",
        ],
        frecuencia: "Mantenimiento periódico según volumen",
        fuente: {
          norma: "Decreto 3930 de 2010",
          articulo:
            "Artículo 39 — Responsabilidad del prestador del servicio de alcantarillado",
          entidad: "Ministerio de Ambiente, Vivienda y Desarrollo Territorial",
          fuenteConsultada: "Gestor Normativo Función Pública",
          nivelFuente: 2,
          fechaVerificacion: "2026-09-08",
          confianza: "alta",
        },
        guia: "/kits/kit-restaurantes-a974fe13db91.pdf",
        advertencia:
          "No es obligación de norma ambiental nacional. El prestador del servicio " +
          "es responsable de exigir el cumplimiento de la norma de vertimiento al " +
          "alcantarillado, y varias normas locales imponen el dispositivo. " +
          "Verifique el reglamento aplicable en su municipio.",
      },
    ];
  }

  if (destino === "fuente" || destino === "pozo") {
    return [
      {
        id: "vert-verificar",
        ruleId: "VERT-VERIF-001",
        titulo: "Verificar si su vertimiento requiere permiso",
        naturaleza: "requiere_verificacion",
        urgencia: "inmediata",
        acciones: [
          "Determinar si el vertimiento es doméstico o no doméstico",
          "Consultar con la autoridad ambiental si su caso requiere permiso",
          "De requerirlo, caracterizar el vertimiento con laboratorio acreditado",
        ],
        evidencias: [
          "Concepto o respuesta de la autoridad ambiental",
          "Caracterización de laboratorio, si aplica",
        ],
        frecuencia: "Una vez, con renovación según el acto que se expida",
        fuente: null,
        advertencia:
          "El régimen aplicable depende de si el vertimiento es doméstico o no " +
          "doméstico, del cuerpo receptor y de las condiciones del predio. " +
          "El artículo específico está pendiente de verificación profesional. " +
          "Consulte con la autoridad ambiental antes de asumir obligaciones.",
      },
    ];
  }

  return [
    {
      id: "vert-identificar",
      ruleId: "VERT-IDENT-001",
      titulo: "Identificar el destino de sus aguas residuales",
      naturaleza: "recomendacion_tecnica",
      urgencia: "inmediata",
      acciones: [
        "Verificar si el establecimiento está conectado al alcantarillado público",
        "Revisar la factura del servicio de acueducto y alcantarillado",
        "Si no hay conexión, identificar a dónde descargan las aguas",
      ],
      evidencias: ["Factura del servicio", "Esquema de la instalación sanitaria"],
      frecuencia: "Una vez",
      fuente: null,
      advertencia:
        "Sin conocer el destino de las aguas no es posible identificar qué " +
        "obligaciones aplican.",
    },
  ];
}

/* ══════════════════════════════════════════════════════════════
   REGLAS BLOQUEADAS — no implementadas
   ══════════════════════════════════════════════════════════════ */
export const REGLAS_BLOQUEADAS = [
  { ruleId: "PGIRS-COLOR-001", tema: "Código de colores",
    motivo: "Artículo de la Resolución 2184 de 2019 no identificado. Vigencia por confirmar" },
  { ruleId: "VERT-PERMISO-001", tema: "Permiso de vertimiento",
    motivo: "Artículo del Decreto 1076 de 2015 no identificado" },
  { ruleId: "PGIRASA-001", tema: "PGIRASA sector salud",
    motivo: "Artículos del Decreto 780 de 2016 y Resolución 1164 de 2002 no identificados" },
  { ruleId: "RESPEL-PLAN-001", tema: "Plan de Gestión Integral de RESPEL",
    motivo: "No verificado que la obligación dependa de la categoría del generador" },
  { ruleId: "ACU-ALMA-001", tema: "Almacenamiento de ACU",
    motivo: "No hallado en los artículos 8 y 9 de la Resolución 316 de 2018" },
  { ruleId: "COSTO-GRATUITO", tema: "Afirmación «trámite gratuito»",
    motivo: "Sin fuente. Retirada del sistema" },
];

/* ══════════════════════════════════════════════════════════════
   RADICACIÓN Y POSCONSUMO
   ══════════════════════════════════════════════════════════════ */
export const RADICACION = {
  plataforma: "VITAL — Ventanilla Integral de Trámites Ambientales en Línea",
  url: "vital.anla.gov.co/ventanillasilpa/",
  pasos: [
    "Registrarse en la plataforma y esperar la aprobación del registro",
    "Seleccionar el trámite y la autoridad competente",
    "Diligenciar el formulario y adjuntar los documentos",
    "Guardar el número asignado al proceso: es su radicado",
  ],
  nota:
    "Algunas corporaciones reciben también por ventanilla física. " +
    "Verifique el canal con su autoridad antes de desplazarse.",
};

export const POSCONSUMO = [
  { nombre: "Lúmina", recibe: "Bombillas y luminarias usadas" },
  { nombre: "Pilas con el Ambiente", recibe: "Pilas y baterías portátiles" },
  { nombre: "Punto Azul", recibe: "Medicamentos vencidos y sus empaques" },
  { nombre: "Recopila", recibe: "Aparatos eléctricos y electrónicos" },
];
