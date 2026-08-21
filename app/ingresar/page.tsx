"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { crearClienteNavegador } from "@/lib/supabase";

export default function IngresarPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const ingresar = async () => {
    if (!email || !password) { setError("Escriba su correo y contraseña."); return; }
    setError(""); setMensaje(""); setCargando(true);

    const supabase = crearClienteNavegador();

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });

    if (err) {
      setError(
        err.message.includes("Invalid login credentials")
          ? "Correo o contraseña incorrectos."
          : err.message
      );
      setCargando(false);
      return;
    }

    router.push("/plataforma");
    router.refresh();
  };

  const recuperar = async () => {
    if (!email) { setError("Escriba su correo para enviarle el enlace de recuperación."); return; }
    setError(""); setCargando(true);

    const supabase = crearClienteNavegador();

    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nueva-clave`,
    });

    setCargando(false);
    if (err) setError(err.message);
    else setMensaje("Le enviamos un enlace a su correo para restablecer la contraseña.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-green-600" />
            <span className="text-sm font-bold tracking-[2px] text-gray-600 uppercase">
              SOSING · ECOCHECK
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inicie sesión</h1>
          <p className="text-gray-600">Acceda al panel de cumplimiento de su empresa.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}
          {mensaje && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-600 text-green-800 px-4 py-3 rounded text-sm">
              {mensaje}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
              <input className={inputCls} type="email" value={email} autoComplete="email"
                onChange={(e) => setEmail(e.target.value)} placeholder="correo@empresa.com" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
                <button onClick={recuperar} type="button"
                  className="text-xs text-green-700 font-semibold hover:underline">
                  ¿La olvidó?
                </button>
              </div>
              <input className={inputCls} type="password" value={password} autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ingresar()} />
            </div>

            <button onClick={ingresar} disabled={cargando} className="w-full btn-primary disabled:opacity-50">
              {cargando ? "Ingresando…" : "Ingresar"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tiene cuenta?{" "}
          <Link href="/registro" className="text-green-700 font-semibold hover:underline">
            Regístrese
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition text-gray-900";
