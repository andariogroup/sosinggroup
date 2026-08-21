import { redirect } from "next/navigation";
import Link from "next/link";
import { crearClienteServidor } from "@/lib/supabase-server";
import { obtenerMiEmpresa, suscripcionVigente } from "@/lib/supabase";
import PanelCliente from "@/components/PanelCliente";
import CerrarSesion from "@/components/CerrarSesion";

export const dynamic = "force-dynamic";

export default async function PlataformaPage() {
  // Si Supabase aún no está configurado, mostrar aviso en vez de reventar
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-3">Plataforma en preparación</h1>
          <p className="text-gray-600 mb-6">
            Estamos terminando de configurar el acceso de clientes. Mientras tanto, puede
            hacer su diagnóstico ambiental gratuito o escribirnos directamente.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/#ecocheck" className="btn-primary">Diagnóstico gratis</Link>
            <Link href="/contact" className="btn-secondary">Contactarnos</Link>
          </div>
        </div>
      </div>
    );
  }

  const supabase = await crearClienteServidor();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/ingresar");

  const empresa = await obtenerMiEmpresa(supabase);

  // Cuenta creada pero sin empresa asociada (caso borde)
  if (!empresa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-3">Complete su registro</h1>
          <p className="text-gray-600 mb-6">
            Su cuenta existe pero aún no tiene una empresa asociada. Regístrela para acceder
            a la plataforma.
          </p>
          <Link href="/registro" className="btn-primary inline-block">Completar registro</Link>
        </div>
      </div>
    );
  }

  const activa = suscripcionVigente(empresa);

  // Datos de todos los módulos
  const [respel, entregas, pgirs, acu, rcd, categoria] = await Promise.all([
    supabase.from("respel_registros").select("*").eq("empresa_id", empresa.id).order("fecha", { ascending: false }),
    supabase.from("respel_entregas").select("*").eq("empresa_id", empresa.id).order("fecha", { ascending: false }),
    supabase.from("pgirs_registros").select("*").eq("empresa_id", empresa.id).order("fecha", { ascending: false }),
    supabase.from("acu_entregas").select("*").eq("empresa_id", empresa.id).order("fecha", { ascending: false }),
    supabase.from("rcd_registros").select("*").eq("empresa_id", empresa.id).order("fecha", { ascending: false }),
    supabase.from("v_respel_categoria").select("*").eq("empresa_id", empresa.id).maybeSingle(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra superior */}
      <div className="bg-[#16211B] text-white">
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center flex-wrap gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div>
              <div className="text-[10px] tracking-[2px] uppercase text-green-300 font-bold">SOSING</div>
              <div className="text-lg font-extrabold leading-tight">Ambiental 24/7</div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right text-xs text-gray-300">
              <div className="font-bold text-white">{empresa.razon_social}</div>
              <div>
                {empresa.municipio ? `${empresa.municipio}, ` : ""}
                {empresa.departamento} · {empresa.autoridad_ambiental}
              </div>
            </div>
            <CerrarSesion />
          </div>
        </div>
      </div>

      {/* Aviso de suscripción */}
      {!activa && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center flex-wrap gap-3">
            <div className="text-sm text-amber-900">
              <strong>Modo consulta.</strong> Active su suscripción para registrar datos,
              recibir alertas y generar informes firmados.
            </div>
            <a href="https://checkout.wompi.co/l/3dDrd4" target="_blank" rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-amber-950 px-5 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition">
              Activar por $39.900/mes →
            </a>
          </div>
        </div>
      )}

      <PanelCliente
        empresa={empresa}
        suscripcionActiva={activa}
        categoria={categoria.data}
        respel={respel.data ?? []}
        entregasRespel={entregas.data ?? []}
        pgirs={pgirs.data ?? []}
        acu={acu.data ?? []}
        rcd={rcd.data ?? []}
      />
    </div>
  );
}
