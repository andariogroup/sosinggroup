-- ============================================================
-- SOSING AMBIENTAL 24/7 — Esquema de base de datos
-- Plataforma: Supabase (PostgreSQL)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ------------------------------------------------------------
-- 1. EMPRESAS (cada usuario pertenece a una empresa)
-- ------------------------------------------------------------
create table public.empresas (
  id uuid primary key default gen_random_uuid(),
  razon_social text not null,
  nit text,
  tipo_negocio text,
  municipio text,
  departamento text not null,
  autoridad_ambiental text,
  telefono text,
  direccion text,
  -- Suscripción
  plan text not null default 'gratis',          -- gratis | mensual | anual
  suscripcion_activa boolean not null default false,
  suscripcion_vence date,
  creado_en timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 2. PERFILES (vincula usuarios de Supabase Auth con empresas)
-- ------------------------------------------------------------
create table public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  empresa_id uuid references public.empresas(id) on delete cascade,
  nombre text,
  email text,
  rol text not null default 'cliente',          -- cliente | sosing_admin
  creado_en timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 3. MÓDULO RESPEL — registros de generación
-- ------------------------------------------------------------
create table public.respel_registros (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  residuo text not null,
  corriente text not null,                      -- Y8, Y9, Y12, Y31, A1180...
  cantidad_kg numeric(10,2) not null check (cantidad_kg >= 0),
  fecha date not null default current_date,
  observacion text,
  creado_en timestamptz not null default now()
);

-- 3b. RESPEL — entregas a gestor autorizado
create table public.respel_entregas (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  fecha date not null default current_date,
  gestor text not null,
  licencia_ambiental text,
  cantidad_kg numeric(10,2) not null check (cantidad_kg >= 0),
  numero_manifiesto text,
  certificado_recibido boolean not null default false,
  certificado_url text,
  creado_en timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 4. MÓDULO PGIRS — residuos sólidos
-- ------------------------------------------------------------
create table public.pgirs_registros (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  tipo text not null,                           -- Aprovechable | Orgánico | No aprovechable
  material text not null,
  cantidad_kg numeric(10,2) not null check (cantidad_kg >= 0),
  fecha date not null default current_date,
  creado_en timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 5. MÓDULO ACU — aceite de cocina usado
-- ------------------------------------------------------------
create table public.acu_entregas (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  fecha date not null default current_date,
  litros numeric(10,2) not null check (litros >= 0),
  gestor text,
  certificado_recibido boolean not null default false,
  certificado_url text,
  creado_en timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 6. MÓDULO RCD — residuos de construcción y demolición
-- ------------------------------------------------------------
create table public.rcd_registros (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  obra text not null,
  material text not null,
  volumen_m3 numeric(10,2) not null check (volumen_m3 >= 0),
  destino text,
  fecha date not null default current_date,
  certificado_recibido boolean not null default false,
  certificado_url text,
  creado_en timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 7. DIAGNÓSTICOS realizados (incluye los del formulario público)
-- ------------------------------------------------------------
create table public.diagnosticos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references public.empresas(id) on delete set null,
  -- datos del lead aunque no tenga cuenta
  contacto_nombre text,
  contacto_email text,
  contacto_telefono text,
  tipo_negocio text,
  departamento text,
  autoridad_ambiental text,
  respuestas jsonb not null,                    -- {q1:"si", q2:"no", ...}
  nivel_riesgo text,                            -- ALTO | MEDIO | BAJO
  obligaciones jsonb,                           -- resultado del motor IA
  informe_url text,
  pagado boolean not null default false,
  revisado_por_profesional boolean not null default false,
  creado_en timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 8. PAGOS (registro de transacciones Wompi)
-- ------------------------------------------------------------
create table public.pagos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references public.empresas(id) on delete set null,
  referencia text unique,                       -- referencia de Wompi
  transaccion_id text,
  producto text,
  monto numeric(12,2),
  estado text,                                  -- APPROVED | DECLINED | PENDING
  metodo_pago text,
  email_comprador text,
  datos_wompi jsonb,
  creado_en timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 9. ÍNDICES
-- ------------------------------------------------------------
create index idx_respel_empresa on public.respel_registros(empresa_id, fecha desc);
create index idx_respel_ent_empresa on public.respel_entregas(empresa_id, fecha desc);
create index idx_pgirs_empresa on public.pgirs_registros(empresa_id, fecha desc);
create index idx_acu_empresa on public.acu_entregas(empresa_id, fecha desc);
create index idx_rcd_empresa on public.rcd_registros(empresa_id, fecha desc);
create index idx_perfiles_empresa on public.perfiles(empresa_id);
create index idx_diag_empresa on public.diagnosticos(empresa_id, creado_en desc);

-- ============================================================
-- SEGURIDAD (Row Level Security)
-- Cada empresa solo ve sus propios datos. Crítico.
-- ============================================================

alter table public.empresas          enable row level security;
alter table public.perfiles          enable row level security;
alter table public.respel_registros  enable row level security;
alter table public.respel_entregas   enable row level security;
alter table public.pgirs_registros   enable row level security;
alter table public.acu_entregas      enable row level security;
alter table public.rcd_registros     enable row level security;
alter table public.diagnosticos      enable row level security;
alter table public.pagos             enable row level security;

-- Función auxiliar: empresa del usuario autenticado
create or replace function public.mi_empresa_id()
returns uuid
language sql stable security definer
set search_path = public
as $$
  select empresa_id from public.perfiles where id = auth.uid();
$$;

-- Función auxiliar: ¿es administrador de SOSING?
create or replace function public.es_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce((select rol = 'sosing_admin' from public.perfiles where id = auth.uid()), false);
$$;

-- --- PERFILES ---
create policy "perfil propio: ver" on public.perfiles
  for select using (id = auth.uid() or public.es_admin());
create policy "perfil propio: actualizar" on public.perfiles
  for update using (id = auth.uid());
create policy "perfil propio: crear" on public.perfiles
  for insert with check (id = auth.uid());

-- --- EMPRESAS ---
create policy "empresa propia: ver" on public.empresas
  for select using (id = public.mi_empresa_id() or public.es_admin());
create policy "empresa propia: actualizar" on public.empresas
  for update using (id = public.mi_empresa_id() or public.es_admin());
create policy "empresa: crear" on public.empresas
  for insert with check (auth.uid() is not null);

-- --- MÓDULOS OPERATIVOS (mismo patrón para las 5 tablas) ---
do $$
declare t text;
begin
  foreach t in array array[
    'respel_registros','respel_entregas','pgirs_registros','acu_entregas','rcd_registros'
  ] loop
    execute format($f$
      create policy "ver datos de mi empresa" on public.%I
        for select using (empresa_id = public.mi_empresa_id() or public.es_admin());
      create policy "crear en mi empresa" on public.%I
        for insert with check (empresa_id = public.mi_empresa_id());
      create policy "actualizar en mi empresa" on public.%I
        for update using (empresa_id = public.mi_empresa_id() or public.es_admin());
      create policy "borrar en mi empresa" on public.%I
        for delete using (empresa_id = public.mi_empresa_id());
    $f$, t, t, t, t);
  end loop;
end $$;

-- --- DIAGNÓSTICOS ---
create policy "diag: ver los míos" on public.diagnosticos
  for select using (empresa_id = public.mi_empresa_id() or public.es_admin());
create policy "diag: cualquiera puede crear" on public.diagnosticos
  for insert with check (true);   -- el formulario público debe poder guardar leads
create policy "diag: solo admin actualiza" on public.diagnosticos
  for update using (public.es_admin());

-- --- PAGOS (solo lectura para el cliente; los escribe el webhook con service key) ---
create policy "pagos: ver los míos" on public.pagos
  for select using (empresa_id = public.mi_empresa_id() or public.es_admin());

-- ============================================================
-- AUTOMATIZACIÓN: crear perfil al registrarse
-- ============================================================
create or replace function public.manejar_nuevo_usuario()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.perfiles (id, email, nombre)
  values (new.id, new.email, new.raw_user_meta_data->>'nombre');
  return new;
end;
$$;

create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function public.manejar_nuevo_usuario();

-- ============================================================
-- VISTA: categoría de generador RESPEL calculada en la base
-- ============================================================
create or replace view public.v_respel_categoria as
select
  e.id as empresa_id,
  e.razon_social,
  coalesce(sum(r.cantidad_kg) filter (
    where r.fecha >= date_trunc('month', current_date) - interval '5 months'
  ), 0) / 6 as promedio_mensual_kg,
  case
    when coalesce(sum(r.cantidad_kg) filter (
      where r.fecha >= date_trunc('month', current_date) - interval '5 months'
    ), 0) / 6 >= 1000 then 'Gran generador'
    when coalesce(sum(r.cantidad_kg) filter (
      where r.fecha >= date_trunc('month', current_date) - interval '5 months'
    ), 0) / 6 >= 100 then 'Mediano generador'
    when coalesce(sum(r.cantidad_kg) filter (
      where r.fecha >= date_trunc('month', current_date) - interval '5 months'
    ), 0) / 6 >= 10 then 'Pequeño generador'
    else 'Microgenerador'
  end as categoria
from public.empresas e
left join public.respel_registros r on r.empresa_id = e.id
group by e.id, e.razon_social;
