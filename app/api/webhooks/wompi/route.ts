/* ============================================================
   WEBHOOK DE WOMPI — activación automática de suscripciones
   Ubicación: /app/api/webhooks/wompi/route.ts

   Configurar en Wompi → Desarrollo → Eventos:
   URL: https://sosinggroup.com/api/webhooks/wompi
   ============================================================ */

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Cliente con service key: omite RLS. NUNCA exponerlo al navegador.
// Se crea bajo demanda para no romper el build cuando aún no hay variables de entorno.
function obtenerSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

/* ---------- Verificación de firma de Wompi ---------- */
function firmaValida(evento: any): boolean {
  const secreto = process.env.WOMPI_EVENTS_SECRET;
  if (!secreto) return false;

  const { signature, timestamp, data } = evento;
  if (!signature?.properties || !signature?.checksum) return false;

  // Concatenar los valores de las propiedades indicadas por Wompi
  const valores = signature.properties
    .map((prop: string) =>
      prop.split(".").reduce((obj: any, k: string) => obj?.[k], data)
    )
    .join("");

  const cadena = `${valores}${timestamp}${secreto}`;
  const checksum = crypto.createHash("sha256").update(cadena).digest("hex");

  return checksum.toUpperCase() === signature.checksum.toUpperCase();
}

/* ---------- Mapa: monto pagado → producto y efecto ---------- */
const PRODUCTOS: Record<number, { nombre: string; activaSuscripcion: boolean; meses?: number }> = {
  19900:  { nombre: "Test de cumplimiento ambiental", activaSuscripcion: false },
  29900:  { nombre: "Checklist ambiental restaurantes", activaSuscripcion: false },
  39900:  { nombre: "SOSING Ambiental 24/7", activaSuscripcion: true, meses: 1 },
  49900:  { nombre: "Diagnóstico Ambiental Express", activaSuscripcion: false },
  69900:  { nombre: "Kit PGIRS empresarial", activaSuscripcion: false },
  79900:  { nombre: "Kit RESPEL / Kit restaurantes", activaSuscripcion: false },
  99900:  { nombre: "Revisión (RUA / requerimiento / matriz legal)", activaSuscripcion: false },
  149900: { nombre: "Servicio nivel medio", activaSuscripcion: false },
  199900: { nombre: "Servicio nivel alto", activaSuscripcion: false },
  299900: { nombre: "Plan Empresa", activaSuscripcion: false },
};

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabaseAdmin = obtenerSupabaseAdmin();
    const evento = await request.json();

    // 1. Validar firma — sin esto cualquiera podría activar suscripciones gratis
    if (!firmaValida(evento)) {
      console.error("Webhook Wompi: firma inválida");
      return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }

    // 2. Solo interesan las transacciones actualizadas
    if (evento.event !== "transaction.updated") {
      return NextResponse.json({ ok: true, ignorado: evento.event });
    }

    const tx = evento.data.transaction;
    const montoPesos = Math.round(tx.amount_in_cents / 100);
    const email = tx.customer_email;
    const producto = PRODUCTOS[montoPesos];

    // 3. Guardar el pago siempre (aprobado o no)
    await supabaseAdmin.from("pagos").upsert({
      referencia: tx.reference,
      transaccion_id: tx.id,
      producto: producto?.nombre ?? `Monto ${montoPesos}`,
      monto: montoPesos,
      estado: tx.status,
      metodo_pago: tx.payment_method_type,
      email_comprador: email,
      datos_wompi: tx,
    }, { onConflict: "referencia" });

    // 4. Si no fue aprobado, terminar aquí
    if (tx.status !== "APPROVED") {
      return NextResponse.json({ ok: true, estado: tx.status });
    }

    // 5. Si el producto activa suscripción, buscar/crear empresa y activarla
    if (producto?.activaSuscripcion && email) {
      const { data: perfil } = await supabaseAdmin
        .from("perfiles")
        .select("empresa_id")
        .eq("email", email)
        .maybeSingle();

      if (perfil?.empresa_id) {
        const vence = new Date();
        vence.setMonth(vence.getMonth() + (producto.meses ?? 1));

        await supabaseAdmin
          .from("empresas")
          .update({
            plan: "mensual",
            suscripcion_activa: true,
            suscripcion_vence: vence.toISOString().slice(0, 10),
          })
          .eq("id", perfil.empresa_id);

        await supabaseAdmin
          .from("pagos")
          .update({ empresa_id: perfil.empresa_id })
          .eq("referencia", tx.reference);

        console.log(`Suscripción activada para ${email} hasta ${vence.toISOString().slice(0,10)}`);
      } else {
        // Pagó pero aún no tiene cuenta: queda registrado y se le invita a crearla
        console.log(`Pago de suscripción sin cuenta asociada: ${email}`);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Error en webhook Wompi:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
