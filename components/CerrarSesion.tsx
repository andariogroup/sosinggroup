"use client";

import { useRouter } from "next/navigation";
import { crearClienteNavegador } from "@/lib/supabase";

export default function CerrarSesion() {
  const router = useRouter();

  const salir = async () => {
    const supabase = crearClienteNavegador();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button onClick={salir}
      className="text-xs font-semibold text-gray-300 hover:text-white border border-white/20 hover:border-white/40 px-3.5 py-2 rounded-lg transition whitespace-nowrap">
      Salir
    </button>
  );
}
