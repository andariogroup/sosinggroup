# Configurar dominio www.prestigiomkafe.com (Hostinger) con Vercel

## 1. Estado del proyecto

- **Dominio:** `www.prestigiomkafe.com` y `prestigiomkafe.com`
- **Configuración en el repo:**
  - `vercel.json` → `images.domains` incluye `www.prestigiomkafe.com` y `prestigiomkafe.com`
  - `next.config.js` → `images.remotePatterns` incluye ambos hostnames para optimización de imágenes

No hace falta más configuración en el código. El dominio se asigna y verifica desde el dashboard de Vercel y con DNS en Hostinger.

---

## 2. Qué hacer en Vercel

1. Entra a **[vercel.com](https://vercel.com)** e inicia sesión.
2. Abre el **proyecto** que corresponde a este repositorio (sosing / prestigiomkafe).
3. Ve a **Settings** → **Domains**.
4. En "Add domain" escribe:
   - `www.prestigiomkafe.com`
   - Pulsa **Add**.
5. Añade también (opcional pero recomendado):
   - `prestigiomkafe.com`
   - Así tendrás el sitio en `www` y en la raíz.
6. Vercel te mostrará cómo configurar el DNS:
   - Para **www.prestigiomkafe.com**: un registro **CNAME** apuntando al valor que te indique Vercel (suele ser `cname.vercel-dns.com` o algo como `tu-proyecto.vercel.app`).
   - Para **prestigiomkafe.com** (sin www): un registro **A** a la IP de Vercel (ej. `76.76.21.21`) o, si Hostinger lo permite, un **CNAME** al mismo destino que www (Vercel te lo indicará).
7. Anota exactamente:
   - Tipo de registro (CNAME o A).
   - Nombre/host (ej. `www` o `@`).
   - Valor/destino (lo que pone Vercel).
8. Deja que Vercel verifique el dominio (puede tardar unos minutos hasta 48 h). Cuando el estado pase a "Valid Configuration", el dominio quedará listo.

---

## 3. Qué hacer en Hostinger

1. Entra a **[hostinger.com](https://www.hostinger.com)** → **Iniciar sesión**.
2. En el panel, busca **Dominios** (o **Domains**) y selecciona **prestigiomkafe.com**.
3. Abre la sección **DNS / DNS Zone / Administrar DNS** (nombre similar según la interfaz).
4. Crea o edita registros según lo que te indicó Vercel:

   **Para www (www.prestigiomkafe.com):**
   - Tipo: **CNAME**
   - Nombre/Host: `www` (o `www.prestigiomkafe.com` si te pide el nombre completo)
   - Apunta a / Valor: el que te dio Vercel (ej. `cname.vercel-dns.com` o la URL de tu proyecto)
   - TTL: por defecto (ej. 14400)

   **Para la raíz (prestigiomkafe.com, sin www):**
   - Si Vercel pide un **A**:
     - Tipo: **A**
     - Nombre/Host: `@` (o vacío, según Hostinger)
     - Valor: IP que te dio Vercel (ej. `76.76.21.21`)
   - Si Vercel permite CNAME para la raíz (ALIAS/ANAME):
     - Tipo: **ALIAS** o **ANAME** si Hostinger lo tiene; si no, usa el **A** a la IP de Vercel.

5. **Guarda** los cambios. La propagación DNS puede tardar desde unos minutos hasta 24–48 horas.
6. Si ya tenías **A** o **CNAME** apuntando a Hostinger (hosting web), puedes cambiarlos por los valores de Vercel; el sitio pasará a servirse desde Vercel.

---

## 4. Resumen rápido

| Dónde   | Acción |
|--------|--------|
| **Vercel** | Settings → Domains → Añadir `www.prestigiomkafe.com` y `prestigiomkafe.com` → Copiar instrucciones de DNS. |
| **Hostinger** | DNS del dominio → Crear/editar CNAME para `www` y A (o ALIAS) para la raíz según lo que indique Vercel. |
| **Proyecto** | Ya está listo: dominio incluido en `vercel.json` y `next.config.js`. |

Cuando el DNS esté bien configurado y Vercel marque el dominio como verificado, el sitio se verá en **https://www.prestigiomkafe.com** (y en **https://prestigiomkafe.com** si configuraste la raíz). Vercel asigna el certificado SSL automáticamente.
