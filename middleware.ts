import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/* ============================================================
   Middleware de sesión
   - Refresca el token de Supabase en cada petición
   - Protege /plataforma: sin sesión → redirige a /ingresar
   - Si ya tiene sesión y entra a /ingresar o /registro → /plataforma
   ============================================================ */

const RUTAS_PROTEGIDAS = ["/plataforma"];
const RUTAS_AUTH = ["/ingresar", "/registro"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Sin configuración de Supabase, el sitio público sigue funcionando normalmente
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options as CookieOptions)
        );
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const ruta = request.nextUrl.pathname;

  if (!user && RUTAS_PROTEGIDAS.some((r) => ruta.startsWith(r))) {
    const destino = request.nextUrl.clone();
    destino.pathname = "/ingresar";
    destino.searchParams.set("redirigir", ruta);
    return NextResponse.redirect(destino);
  }

  if (user && RUTAS_AUTH.some((r) => ruta.startsWith(r))) {
    const destino = request.nextUrl.clone();
    destino.pathname = "/plataforma";
    destino.search = "";
    return NextResponse.redirect(destino);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Todas las rutas excepto archivos estáticos e imágenes.
     */
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
