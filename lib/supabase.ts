/* ============================================================
   Cliente de Supabase para el NAVEGADOR
   Ubicación: /lib/supabase.ts
   ============================================================ */

import { createBrowserClient } from "@supabase/ssr";

let _cliente: ReturnType<typeof createBrowserClient> | null = null;

export function crearClienteNavegador() {
  if (_cliente) return _cliente;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase no está configurado. Defina NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  _cliente = createBrowserClient(url, key);
  return _cliente;
}

export function supabaseConfigurado() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/* ============================================================
   TIPOS
   ============================================================ */

export type Empresa = {
  id: string;
  razon_social: string;
  nit: string | null;
  tipo_negocio: string | null;
  municipio: string | null;
  departamento: string;
  autoridad_ambiental: string | null;
  telefono: string | null;
  plan: "gratis" | "mensual" | "anual";
  suscripcion_activa: boolean;
  suscripcion_vence: string | null;
};

export type RespelRegistro = {
  id: string;
  empresa_id: string;
  residuo: string;
  corriente: string;
  cantidad_kg: number;
  fecha: string;
  observacion: string | null;
};

export type RespelEntrega = {
  id: string;
  empresa_id: string;
  fecha: string;
  gestor: string;
  licencia_ambiental: string | null;
  cantidad_kg: number;
  numero_manifiesto: string | null;
  certificado_recibido: boolean;
};

export type PgirsRegistro = {
  id: string;
  empresa_id: string;
  tipo: "Aprovechable" | "Orgánico" | "No aprovechable";
  material: string;
  cantidad_kg: number;
  fecha: string;
};

export type AcuEntrega = {
  id: string;
  empresa_id: string;
  fecha: string;
  litros: number;
  gestor: string | null;
  certificado_recibido: boolean;
};

export type RcdRegistro = {
  id: string;
  empresa_id: string;
  obra: string;
  material: string;
  volumen_m3: number;
  destino: string | null;
  fecha: string;
  certificado_recibido: boolean;
};

/* ============================================================
   FUNCIONES DE DATOS
   ============================================================ */

export async function obtenerMiEmpresa(supabase: any): Promise<Empresa | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("empresa_id")
    .eq("id", user.id)
    .single();

  if (!perfil?.empresa_id) return null;

  const { data: empresa } = await supabase
    .from("empresas")
    .select("*")
    .eq("id", perfil.empresa_id)
    .single();

  return empresa;
}

export async function obtenerRespel(supabase: any, empresaId: string) {
  const { data, error } = await supabase
    .from("respel_registros")
    .select("*")
    .eq("empresa_id", empresaId)
    .order("fecha", { ascending: false });
  if (error) throw error;
  return data as RespelRegistro[];
}

export async function crearRespel(
  supabase: any,
  empresaId: string,
  registro: { residuo: string; corriente: string; cantidad_kg: number; fecha?: string }
) {
  const { data, error } = await supabase
    .from("respel_registros")
    .insert({ ...registro, empresa_id: empresaId })
    .select()
    .single();
  if (error) throw error;
  return data as RespelRegistro;
}

export async function obtenerCategoriaRespel(supabase: any, empresaId: string) {
  const { data, error } = await supabase
    .from("v_respel_categoria")
    .select("*")
    .eq("empresa_id", empresaId)
    .single();
  if (error) throw error;
  return data as { promedio_mensual_kg: number; categoria: string };
}

export async function obtenerPgirs(supabase: any, empresaId: string) {
  const { data, error } = await supabase
    .from("pgirs_registros").select("*")
    .eq("empresa_id", empresaId).order("fecha", { ascending: false });
  if (error) throw error;
  return data as PgirsRegistro[];
}

export async function obtenerAcu(supabase: any, empresaId: string) {
  const { data, error } = await supabase
    .from("acu_entregas").select("*")
    .eq("empresa_id", empresaId).order("fecha", { ascending: false });
  if (error) throw error;
  return data as AcuEntrega[];
}

export async function obtenerRcd(supabase: any, empresaId: string) {
  const { data, error } = await supabase
    .from("rcd_registros").select("*")
    .eq("empresa_id", empresaId).order("fecha", { ascending: false });
  if (error) throw error;
  return data as RcdRegistro[];
}

/* ============================================================
   CONTROL DE SUSCRIPCIÓN
   ============================================================ */

export function suscripcionVigente(empresa: Empresa | null): boolean {
  if (!empresa) return false;
  if (!empresa.suscripcion_activa) return false;
  if (!empresa.suscripcion_vence) return true;
  return new Date(empresa.suscripcion_vence) >= new Date();
}
