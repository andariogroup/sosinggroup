"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { crearClienteNavegador } from "@/lib/supabase";
import { CARS, DEPARTAMENTOS, TIPOS_NEGOCIO } from "@/lib/autoridades";

export default function RegistroPage() {
  const router = useRouter();

  const [paso, setPaso] = useState<1 | 2>(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Paso 1 — cuenta
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // Paso 2 — empresa
  const [razonSocial, setRazonSocial] = useState("");
  const [nit, setNit] = useState("");
  const [tipoNegocio, setTipoNegocio] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [aceptaDatos, setAceptaDatos] = useState(false);

  const autoridad = departamento ? CARS[departamento] : "";

  const validarPaso1 = () => {
    if (!nombre.trim()) return "Escriba su nombre.";
    if (!email.includes("@")) return "Correo electrónico inválido.";
    if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (password !== password2) return "Las contraseñas no coinciden.";
    return "";
  };

  const siguiente = () => {
    const e = validarPaso1();
    if (e) { setError(e); return; }
    setError("");
    setPaso(2);
  };

  const registrar = async () => {
    if (!razonSocial.trim()) { setError("Escriba la razón social de su empresa."); return; }
    if (!departamento) { setError("Seleccione el departamento donde opera."); return; }
    if (!aceptaDatos) { setError("Debe autorizar el tratamiento de sus datos personales."); return; }

    setError("");
    setCargando(true);

    try {
      // 1. Crear usuario
      const supabase = crearClienteNavegador();
      const { data: auth, error: errAuth } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nombre } },
      });
      if (errAuth) throw errAuth;
      if (!auth.user) throw new Error("No se pudo crear la cuenta.");

      // 2. Crear empresa
      const { data: empresa, error: errEmpresa } = await supabase
        .from("empresas")
        .insert({
          razon_social: razonSocial,
          nit: nit || null,
          tipo_negocio: tipoNegocio || null,
          departamento,
          municipio: municipio || null,
          autoridad_ambiental: autoridad,
          telefono: telefono || null,
        })
        .select()
        .single();
      if (errEmpresa) throw errEmpresa;

      // 3. Vincular el perfil (creado por trigger) con la empresa
      const { error: errPerfil } = await supabase
        .from("perfiles")
        .update({ empresa_id: empresa.id, nombre })
        .eq("id", auth.user.id);
      if (errPerfil) throw errPerfil;

      router.push("/plataforma");
      router.refresh();
    } catch (e: any) {
      const msg = e?.message || "Ocurrió un error al crear la cuenta.";
      setError(
        msg.includes("already registered")
          ? "Ya existe una cuenta con este correo. Inicie sesión."
          : msg
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Encabezado */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-green-600" />
            <span className="text-sm font-bold tracking-[2px] text-gray-600 uppercase">
              SOSING · ECOCHECK
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cree su cuenta</h1>
          <p className="text-gray-600">
            Acceda a la plataforma de cumplimiento ambiental de su negocio.
          </p>
        </div>

        {/* Progreso */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map((n) => (
            <div key={n} className="flex-1">
              <div className={`h-1.5 rounded-full ${paso >= n ? "bg-green-600" : "bg-gray-200"}`} />
              <div className={`text-xs mt-2 font-semibold ${paso >= n ? "text-green-700" : "text-gray-400"}`}>
                {n === 1 ? "1. Su cuenta" : "2. Su empresa"}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          {/* ---------- PASO 1 ---------- */}
          {paso === 1 && (
            <div className="space-y-5">
              <Campo label="Nombre completo">
                <input className={inputCls} value={nombre} onChange={(e) => setNombre(e.target.value)}
                  placeholder="Su nombre" autoComplete="name" />
              </Campo>

              <Campo label="Correo electrónico">
                <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@empresa.com" autoComplete="email" />
              </Campo>

              <Campo label="Contraseña" ayuda="Mínimo 8 caracteres">
                <input className={inputCls} type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
              </Campo>

              <Campo label="Confirmar contraseña">
                <input className={inputCls} type="password" value={password2}
                  onChange={(e) => setPassword2(e.target.value)} autoComplete="new-password"
                  onKeyDown={(e) => e.key === "Enter" && siguiente()} />
              </Campo>

              <button onClick={siguiente} className="w-full btn-primary">
                Continuar →
              </button>
            </div>
          )}

          {/* ---------- PASO 2 ---------- */}
          {paso === 2 && (
            <div className="space-y-5">
              <Campo label="Razón social">
                <input className={inputCls} value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)}
                  placeholder="Nombre de su empresa" />
              </Campo>

              <div className="grid grid-cols-2 gap-4">
                <Campo label="NIT / CC" opcional>
                  <input className={inputCls} value={nit} onChange={(e) => setNit(e.target.value)} />
                </Campo>
                <Campo label="Teléfono" opcional>
                  <input className={inputCls} value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </Campo>
              </div>

              <Campo label="Tipo de negocio">
                <select className={inputCls} value={tipoNegocio} onChange={(e) => setTipoNegocio(e.target.value)}>
                  <option value="">Seleccione…</option>
                  {TIPOS_NEGOCIO.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Campo>

              <div className="grid grid-cols-2 gap-4">
                <Campo label="Departamento">
                  <select className={inputCls} value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                    <option value="">Seleccione…</option>
                    {DEPARTAMENTOS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Campo>
                <Campo label="Municipio" opcional>
                  <input className={inputCls} value={municipio} onChange={(e) => setMunicipio(e.target.value)} />
                </Campo>
              </div>

              {autoridad && (
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <div className="text-xs text-green-700 font-semibold uppercase tracking-wide mb-1">
                    Autoridad ambiental competente
                  </div>
                  <div className="font-bold text-green-900">{autoridad}</div>
                </div>
              )}

              <label className="flex gap-3 items-start cursor-pointer pt-2">
                <input type="checkbox" checked={aceptaDatos} onChange={(e) => setAceptaDatos(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-green-600 flex-shrink-0" />
                <span className="text-xs text-gray-600 leading-relaxed">
                  Autorizo a SOSING S.A.S. (NIT 900.342.838-7) el tratamiento de mis datos personales
                  conforme a la Ley 1581 de 2012 y a su{" "}
                  <Link href="/politica-datos" className="text-green-700 underline font-semibold">
                    Política de Tratamiento de Datos
                  </Link>, con la finalidad de prestar los servicios de la plataforma.
                </span>
              </label>

              <div className="flex gap-3 pt-2">
                <button onClick={() => { setPaso(1); setError(""); }}
                  className="px-5 py-3 rounded-xl border-2 border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition">
                  Atrás
                </button>
                <button onClick={registrar} disabled={cargando} className="flex-1 btn-primary disabled:opacity-50">
                  {cargando ? "Creando cuenta…" : "Crear cuenta"}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tiene cuenta?{" "}
          <Link href="/ingresar" className="text-green-700 font-semibold hover:underline">
            Inicie sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition text-gray-900";

function Campo({ label, children, ayuda, opcional }: {
  label: string; children: React.ReactNode; ayuda?: string; opcional?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {opcional && <span className="text-gray-400 font-normal ml-1">(opcional)</span>}
      </label>
      {children}
      {ayuda && <p className="text-xs text-gray-500 mt-1.5">{ayuda}</p>}
    </div>
  );
}
