/* ============================================================
   Autoridades ambientales de Colombia por departamento
   Fuente compartida entre ECOCHECK, registro y plataforma.
   ============================================================ */

export const CARS: Record<string, string> = {
  "Amazonas": "CORPOAMAZONIA",
  "Antioquia": "CORANTIOQUIA / CORNARE / CORPOURABÁ",
  "Arauca": "CORPORINOQUIA",
  "Atlántico": "CRA",
  "Bogotá D.C.": "Secretaría Distrital de Ambiente",
  "Bolívar": "CARDIQUE / CSB",
  "Boyacá": "CORPOBOYACÁ / CORPOCHIVOR",
  "Caldas": "CORPOCALDAS",
  "Caquetá": "CORPOAMAZONIA",
  "Casanare": "CORPORINOQUIA",
  "Cauca": "CRC",
  "Cesar": "CORPOCESAR",
  "Córdoba": "CVS",
  "Cundinamarca": "CAR Cundinamarca / CORPOGUAVIO",
  "Chocó": "CODECHOCÓ",
  "Guainía": "CDA",
  "Guaviare": "CDA",
  "Huila": "CAM",
  "La Guajira": "CORPOGUAJIRA",
  "Magdalena": "CORPAMAG",
  "Meta": "CORMACARENA",
  "Nariño": "CORPONARIÑO",
  "Norte de Santander": "CORPONOR",
  "Putumayo": "CORPOAMAZONIA",
  "Quindío": "CRQ",
  "Risaralda": "CARDER",
  "San Andrés y Providencia": "CORALINA",
  "Santander": "CAS / CDMB",
  "Sucre": "CARSUCRE",
  "Tolima": "CORTOLIMA",
  "Valle del Cauca": "CVC / DAGMA",
  "Vaupés": "CDA",
  "Vichada": "CORPORINOQUIA",
};

export const DEPARTAMENTOS = Object.keys(CARS).sort();

export const TIPOS_NEGOCIO = [
  "Restaurante",
  "Taller automotriz",
  "Hotel",
  "Comercio",
  "Industria / manufactura",
  "Estación de servicio",
  "Finca / agro",
  "Constructora",
  "Consultorio / salud",
  "Institución educativa",
  "Otro",
];
