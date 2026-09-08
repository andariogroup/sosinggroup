/* ══════════════════════════════════════════════════════════════
   ECOCHECK · Base de conocimiento para el resultado accionable

   Convierte el semáforo en instrucciones concretas: qué debe
   hacer, ante quién, por dónde y con qué plazo.

   Los datos de contacto solo se incluyen cuando están
   verificados. Donde no hay, se indica dónde consultarlos.
   ══════════════════════════════════════════════════════════════ */

export type DatosAutoridad = {
  sigla: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  lineaGratuita?: string;
  horario?: string;
  web?: string;
  verificado: boolean;
};

/* ── Autoridades con datos verificados ──────────────────────
   Solo Cesar y La Guajira, que es donde SOSING opera.
   El resto se resuelve con el mapeo departamento → sigla y se
   remite al portal de la corporación.
   ─────────────────────────────────────────────────────────── */
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
    verificado: true,
  },
  CORPOGUAJIRA: {
    sigla: "CORPOGUAJIRA",
    nombre: "Corporación Autónoma Regional de La Guajira",
    direccion: "Riohacha, La Guajira",
    web: "corpoguajira.gov.co",
    verificado: false,
  },
};

export function datosAutoridad(sigla: string): DatosAutoridad {
  return (
    AUTORIDADES_DATOS[sigla] || {
      sigla,
      nombre: sigla,
      web: "consulte el portal de su corporación",
      verificado: false,
    }
  );
}

/* ══════════════════════════════════════════════════════════════
   CATEGORIZACIÓN POR VOLUMEN
   El volumen define la categoría, y la categoría define las
   obligaciones. Sin esto el diagnóstico solo describe.
   ══════════════════════════════════════════════════════════════ */

export type CategoriaRespel =
  | "no_genera"
  | "micro"
  | "pequeño"
  | "mediano"
  | "grande";

export const RANGOS_RESPEL = [
  { valor: "no_genera", texto: "No genero residuos peligrosos" },
  { valor: "micro",     texto: "Menos de 10 kg al mes" },
  { valor: "pequeño",   texto: "Entre 10 y 100 kg al mes" },
  { valor: "mediano",   texto: "Entre 100 y 1.000 kg al mes" },
  { valor: "grande",    texto: "Más de 1.000 kg al mes" },
  { valor: "no_se",     texto: "No sé cuánto genero" },
] as const;

export const CATEGORIA_RESPEL: Record<string, { nombre: string; nota: string }> = {
  micro:   { nombre: "Microgenerador",       nota: "Menos de 10 kg/mes" },
  pequeño: { nombre: "Pequeño generador",    nota: "Entre 10 y 100 kg/mes" },
  mediano: { nombre: "Mediano generador",    nota: "Entre 100 y 1.000 kg/mes" },
  grande:  { nombre: "Gran generador",       nota: "Más de 1.000 kg/mes" },
};

/* ══════════════════════════════════════════════════════════════
   ACCIONES CONCRETAS
   Cada obligación detectada produce pasos ejecutables.
   ══════════════════════════════════════════════════════════════ */

export type Accion = {
  id: string;
  titulo: string;
  norma: string;
  urgencia: "inmediata" | "corto" | "medio";
  pasos: string[];
  plazo?: string;
  costo?: string;
  guia?: string;          // enlace a la guía gratuita correspondiente
};

/* ── Aceite de cocina usado ─────────────────────────────── */
export function accionesACU(): Accion[] {
  return [
    {
      id: "acu-inscripcion",
      titulo: "Inscribirse como generador de ACU ante la autoridad ambiental",
      norma: "Resolución 0316 de 2018, artículo 3",
      urgencia: "inmediata",
      plazo: "Sin plazo definido, pero es exigible desde ya",
      costo: "Trámite gratuito",
      pasos: [
        "Reunir: RUT, cámara de comercio y datos del establecimiento",
        "Radicar la solicitud de inscripción ante su autoridad ambiental",
        "Conservar el radicado como soporte ante una visita",
      ],
      guia: "/kits/kit-acu-40eb10495cbc.pdf",
    },
    {
      id: "acu-almacenamiento",
      titulo: "Adecuar el almacenamiento del aceite usado",
      norma: "Resolución 0316 de 2018",
      urgencia: "inmediata",
      costo: "Un recipiente con tapa y un rótulo",
      pasos: [
        "Destinar un recipiente exclusivo, con tapa y rotulado «ACEITE DE COCINA USADO»",
        "Ubicarlo sobre estiba, bajo cubierta y lejos del área de alimentos",
        "Nunca verterlo al desagüe ni mezclarlo con agua",
      ],
      guia: "/kits/kit-acu-40eb10495cbc.pdf",
    },
    {
      id: "acu-gestor",
      titulo: "Entregar el ACU a un gestor autorizado y guardar el comprobante",
      norma: "Resolución 0316 de 2018",
      urgencia: "corto",
      pasos: [
        "Pedirle al recolector copia del acto que lo acredita como gestor",
        "Verificar que la autorización esté vigente",
        "Archivar el comprobante de cada entrega",
      ],
      guia: "/kits/kit-acu-40eb10495cbc.pdf",
    },
    {
      id: "acu-informe",
      titulo: "Presentar el informe anual de gestión",
      norma: "Resolución 0316 de 2018",
      urgencia: "medio",
      plazo: "Dentro de los primeros 15 días de enero",
      pasos: [
        "Llevar registro mensual de litros generados y entregados",
        "Consolidar el cuadro anual con fecha, cantidad y gestor",
        "Radicarlo ante la autoridad en enero",
      ],
      guia: "/kits/kit-acu-40eb10495cbc.pdf",
    },
  ];
}

/* ── Residuos peligrosos ────────────────────────────────── */
export function accionesRespel(categoria: CategoriaRespel): Accion[] {
  if (categoria === "no_genera") return [];

  const base: Accion[] = [
    {
      id: "respel-almacenamiento",
      titulo: "Adecuar el sitio de almacenamiento de residuos peligrosos",
      norma: "Decreto 1076 de 2015 (compila el Decreto 4741 de 2005)",
      urgencia: "inmediata",
      pasos: [
        "Área cubierta, ventilada, con piso impermeable y acceso restringido",
        "Envases rotulados con la identificación del residuo",
        "Separado de materias primas y de zonas de alimentos",
      ],
      guia: "/kits/kit-respel-7018a31d9c3f.pdf",
    },
    {
      id: "respel-gestor",
      titulo: "Entregar a gestor autorizado y conservar los certificados",
      norma: "Decreto 1076 de 2015",
      urgencia: "corto",
      pasos: [
        "Solicitar la licencia ambiental del gestor y verificar su vigencia",
        "Exigir certificado de disposición final por cada entrega",
        "Archivarlos por al menos cinco años",
      ],
      guia: "/kits/kit-respel-7018a31d9c3f.pdf",
    },
  ];

  // La inscripción en el registro depende de la categoría
  if (categoria !== "micro") {
    base.unshift({
      id: "respel-registro",
      titulo: "Inscribirse en el Registro de Generadores de RESPEL",
      norma: "Resolución 1362 de 2007",
      urgencia: "inmediata",
      plazo: "Actualización anual, dentro de los primeros tres meses del año",
      costo: "Trámite gratuito",
      pasos: [
        "Registrarse en la plataforma de la autoridad ambiental",
        "Diligenciar el formulario con las cantidades del año anterior",
        "Actualizar el registro cada año",
      ],
      guia: "/kits/kit-respel-7018a31d9c3f.pdf",
    });
  }

  if (categoria === "grande" || categoria === "mediano") {
    base.push({
      id: "respel-plan",
      titulo: "Formular el Plan de Gestión Integral de RESPEL",
      norma: "Decreto 1076 de 2015",
      urgencia: "medio",
      costo: "Requiere elaboración técnica",
      pasos: [
        "Caracterizar los residuos que genera y sus cantidades",
        "Definir rutas internas, almacenamiento y contingencias",
        "Documentarlo y mantenerlo disponible para las visitas",
      ],
      guia: "/kits/kit-respel-7018a31d9c3f.pdf",
    });
  }

  return base;
}

/* ── Residuos sólidos ordinarios ────────────────────────── */
export function accionesResiduos(): Accion[] {
  return [
    {
      id: "pgirs-colores",
      titulo: "Adoptar el código de colores vigente",
      norma: "Resolución 2184 de 2019",
      urgencia: "inmediata",
      costo: "Tres recipientes rotulados",
      pasos: [
        "Blanco para aprovechables limpios y secos",
        "Verde para orgánicos",
        "Negro para no aprovechables",
      ],
      guia: "/kits/kit-pgirs-dbcbf9658d62.pdf",
    },
    {
      id: "pgirs-registro",
      titulo: "Llevar registro de generación y entrega",
      norma: "Decreto 1077 de 2015",
      urgencia: "corto",
      pasos: [
        "Pesar los residuos durante una semana típica para tener línea base",
        "Registrar mensualmente lo generado por categoría",
        "Conservar los comprobantes de entrega a aprovechadores",
      ],
      guia: "/kits/kit-pgirs-dbcbf9658d62.pdf",
    },
  ];
}

/* ── Vertimientos ───────────────────────────────────────── */
export function accionesVertimientos(alAlcantarillado: boolean): Accion[] {
  if (alAlcantarillado) {
    return [
      {
        id: "vert-trampa",
        titulo: "Instalar y mantener trampa de grasas",
        norma: "Decreto 1077 de 2015",
        urgencia: "inmediata",
        pasos: [
          "Instalarla antes de la conexión al alcantarillado",
          "Limpiarla con frecuencia acorde al volumen, rara vez más de 15 días",
          "Registrar cada limpieza y disponer las grasas con gestor autorizado",
        ],
        guia: "/kits/kit-restaurantes-a974fe13db91.pdf",
      },
    ];
  }
  return [
    {
      id: "vert-permiso",
      titulo: "Tramitar permiso de vertimiento",
      norma: "Decreto 1076 de 2015 · Resolución 0631 de 2015",
      urgencia: "inmediata",
      plazo: "El trámite puede tomar varios meses",
      costo: "Tiene costo de evaluación y requiere estudios técnicos",
      pasos: [
        "Caracterizar el vertimiento con laboratorio acreditado",
        "Elaborar el plan de gestión del riesgo del vertimiento",
        "Radicar la solicitud ante la autoridad ambiental",
      ],
    },
  ];
}

/* ── Sector salud ───────────────────────────────────────── */
export function accionesPGIRASA(): Accion[] {
  return [
    {
      id: "pgirasa-plan",
      titulo: "Formular el PGIRASA del establecimiento",
      norma: "Decreto 780 de 2016 · Resolución 1164 de 2002",
      urgencia: "inmediata",
      plazo: "Exigible para el concepto sanitario favorable",
      costo: "Requiere elaboración técnica",
      pasos: [
        "Caracterizar los residuos generados en la atención",
        "Definir segregación, rutas internas y almacenamiento",
        "Capacitar al personal y documentar la capacitación",
      ],
    },
    {
      id: "pgirasa-gestor",
      titulo: "Contratar gestor de residuos biosanitarios",
      norma: "Decreto 780 de 2016",
      urgencia: "inmediata",
      pasos: [
        "Verificar la licencia ambiental del gestor",
        "Exigir manifiesto de recolección por cada entrega",
        "Archivar los certificados de tratamiento",
      ],
    },
  ];
}

/* ══════════════════════════════════════════════════════════════
   Cómo radicar ante la autoridad
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
    "Algunas corporaciones aún reciben por ventanilla física. Verifique antes de desplazarse.",
};

/* ══════════════════════════════════════════════════════════════
   Programas posconsumo — la vía gratuita para pequeños generadores
   ══════════════════════════════════════════════════════════════ */
export const POSCONSUMO = [
  { nombre: "Lúmina",              recibe: "Bombillas y luminarias usadas" },
  { nombre: "Pilas con el Ambiente", recibe: "Pilas y baterías portátiles" },
  { nombre: "Punto Azul",          recibe: "Medicamentos vencidos y sus empaques" },
  { nombre: "Recopila",            recibe: "Aparatos eléctricos y electrónicos" },
  { nombre: "Rueda Verde",         recibe: "Llantas usadas" },
];
