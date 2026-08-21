/* ============================================================
   Cliente de Supabase para SERVIDOR (Server Components y rutas API)
   Ubicación: /lib/supabase-server.ts
   ============================================================ */

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function crearClienteServidor() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions)
            );
          } catch {
            // Server Component sin permiso de escritura: lo maneja el middleware
          }
        },
      },
    }
  );
}
