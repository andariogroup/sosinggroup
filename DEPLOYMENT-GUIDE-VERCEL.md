# 🚀 GUÍA COMPLETA DE DESPLIEGUE - SOSINGV1 EN VERCEL

---

## 📋 **PREPARACIÓN DEL PROYECTO PARA VERCEL**

### **✅ Estado actual del proyecto:**
- **Framework:** Next.js 14.2.5 ✅ (Compatible con Vercel)
- **TypeScript:** Configurado ✅
- **Tailwind CSS:** Configurado ✅
- **Build:** `next build` ✅
- **Start:** `next start` ✅

---

## 🛠️ **CONFIGURACIONES PREVIAS AL DESPLIEGUE**

### **1. Verificar configuración de Next.js**

#### **✅ package.json (ya configurado):**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### **✅ tsconfig.json (ya configurado):**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "baseUrl": ".",
    "paths": {"@/*": ["./*"]}
  }
}
```

### **2. Optimizar imágenes para Vercel**

#### **Crear vercel.json (opcional pero recomendado):**
```json
{
  "images": {
    "domains": ["localhost"],
    "formats": ["image/webp", "image/avif"]
  },
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### **3. Variables de entorno (si aplica)**

#### **Crear .env.local.example:**
```bash
# Variables de entorno para producción
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_COMPANY_NAME=SOSING SAS
NEXT_PUBLIC_CONTACT_EMAIL=contacto@sosing.com
```

---

## 📋 **PASO A PASO - DESPLIEGUE EN VERCEL**

---

## **PASO 1: PREPARAR REPOSITORIO**

### **Opción A: Usar GitHub (Recomendado)**

1. **Inicializar Git en el proyecto:**
```bash
cd C:\Users\lucasian\Downloads\sosingv1
git init
git add .
git commit -m "Initial commit - SOSING Corporate Website"
```

2. **Crear repositorio en GitHub:**
   - Ve a [github.com](https://github.com)
   - Crea nuevo repositorio: `sosingv1`
   - Copia URL del repositorio

3. **Conectar con GitHub:**
```bash
git remote add origin https://github.com/tu-usuario/sosingv1.git
git branch -M main
git push -u origin main
```

### **Opción B: Subir directamente a Vercel**

- Omitir Git y subir archivos directamente
- Menos recomendado para mantenimiento

---

## **PASO 2: CONFIGURAR CUENTA VERCEL**

1. **Crear cuenta en [vercel.com](https://vercel.com)**
   - Usar cuenta GitHub (recomendado)
   - Verificar email

2. **Instalar Vercel CLI (opcional):**
```bash
npm i -g vercel
```

---

## **PASO 3: IMPORTAR PROYECTO**

### **Método 1: Desde Dashboard Vercel**

1. **Iniciar sesión en Vercel**
2. **Click "Add New..." → "Project"**
3. **Seleccionar repositorio GitHub**
4. **Configurar proyecto:**
   - **Framework Preset:** Next.js (detectado automáticamente)
   - **Root Directory:** `./` (por defecto)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### **Método 2: Usando Vercel CLI**

```bash
# En la carpeta del proyecto
cd C:\Users\lucasian\Downloads\sosingv1
vercel

# Seguir instrucciones:
# 1. Link to existing project? N
# 2. What's your project's name? sosingv1
# 3. Which scope do you want to link to? Tu cuenta
# 4. Link to existing project? N
# 5. In which directory is your code located? ./
# 6. Want to override the settings? N
```

---

## **PASO 4: CONFIGURAR VARIABLES DE ENTORNO**

### **En Dashboard Vercel:**

1. **Ir a "Settings" → "Environment Variables"**
2. **Agregar variables (si aplica):**
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_COMPANY_NAME`
   - `NEXT_PUBLIC_CONTACT_EMAIL`

### **Usando Vercel CLI:**
```bash
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_COMPANY_NAME production
vercel env add NEXT_PUBLIC_CONTACT_EMAIL production
```

---

## **PASO 5: DESPLEGAR**

### **Despliegue automático:**
1. **Vercel detectará Next.js automáticamente**
2. **Ejecutará `npm install`**
3. **Ejecutará `npm run build`**
4. **Desplegará en URL aleatoria**

### **Despliegue manual con CLI:**
```bash
vercel --prod
```

---

## **PASO 6: CONFIGURAR DOMINIO PERSONALIZADO**

### **Dominio configurado: www.sosinggroup.com**

1. **En Vercel Dashboard → "Settings" → "Domains"**
2. **Agregar dominio:**
   - `www.sosinggroup.com` 
   - `sosinggroup.com` 
3. **Configurar DNS en tu proveedor de dominio:**
   ```
   Tipo: CNAME
   Nombre: www
   Valor: cname.vercel-dns.com
   
   Tipo: CNAME
   Nombre: @
   Valor: cname.vercel-dns.com
   ```

### **Configuración ya realizada en el proyecto:**
- **vercel.json** - Dominios configurados para imágenes
- **next.config.js** - Dominios configurados para Next.js
- **.env.local.example** - Variables de entorno actualizadas

---

## 🎯 **POST-DESPLIEGUE - VERIFICACIONES**

---

## **VERIFICACIÓN 1: FUNCIONALIDAD BÁSICA**

### **Test manual:**
1. **Visitar URL del despliegue**
2. **Verificar carga correcta**
3. **Revisar todas las páginas:**
   - Home (/)
   - About (/about)
   - Services (/services)
   - Portfolio (/portfolio)
   - Contact (/contact)

### **Verificar en móvil:**
- Usar Chrome DevTools (Ctrl+Shift+M)
- Probar diferentes tamaños de pantalla

---

## **VERIFICACIÓN 2: PERFORMANCE**

### **Herramientas de testing:**
1. **PageSpeed Insights:** [pagespeed.web.dev](https://pagespeed.web.dev)
2. **Vercel Analytics:** Dashboard Vercel
3. **Lighthouse:** Chrome DevTools

### **Métricas objetivo:**
- **Performance:** >90
- **Accessibility:** >95
- **Best Practices:** >90
- **SEO:** >90

---

## **VERIFICACIÓN 3: SEO Y META TAGS**

### **Verificar meta tags:**
1. **View Page Source** en navegador
2. **Buscar:**
   - `<title>`
   - `<meta name="description">`
   - `<meta property="og:title">`

### **Testing SEO:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

## 🛠️ **CONFIGURACIONES AVANZADAS**

---

## **OPTIMIZACIÓN DE IMÁGENES**

### **vercel.json optimizado:**
```json
{
  "images": {
    "domains": ["localhost"],
    "formats": ["image/webp", "image/avif"],
    "minimumCacheTTL": 60
  },
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## **CONFIGURACIÓN DE BUILD**

### **next.config.js (crear si no existe):**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

---

## **AUTOMATIZACIÓN DEPLOYMENT**

### **GitHub Actions (opcional):**

#### **Crear .github/workflows/deploy.yml:**
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📊 **MONITOREO Y MANTENIMIENTO**

---

## **ANALYTICS**

### **Vercel Analytics:**
1. **Dashboard Vercel → "Analytics"**
2. **Métricas disponibles:**
   - Page Views
   - Unique Visitors
   - Web Vitals
   - Top Pages

### **Google Analytics 4 (opcional):**
1. **Crear cuenta GA4**
2. **Agregar a layout.tsx:**
```jsx
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `
}} />
```

---

## **BACKUPS Y ROLLOUTS**

### **Automatic Deployments:**
- **Push a main branch** → Deploy automático
- **Preview Deployments** → Cada PR crea preview
- **Rollbacks** → Volver a versión anterior

### **Manual Deployments:**
```bash
# Deploy específico
vercel --prod

# Deploy con mensaje
vercel --prod --message "Fix navigation bug"
```

---

## 🚨 **SOLUCIÓN DE PROBLEMAS COMUNES**

---

## **PROBLEMA 1: Build Fallido**

### **Causas comunes:**
- Error en código TypeScript
- Dependencias faltantes
- Variables de entorno incorrectas

### **Solución:**
```bash
# Build local para testing
npm run build

# Si funciona, problema es en Vercel
npm install
npm run build
```

---

## **PROBLEMA 2: Imágenes no cargan**

### **Causa:** Configuración de dominios en next.config.js

### **Solución:**
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['tu-dominio.com', 'www.tu-dominio.com']
  }
}
```

---

## **PROBLEMA 3: CSS no aplica**

### **Causa:** Tailwind no está importado

### **Solución:**
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📋 **CHECKLIST FINAL DE DESPLIEGUE**

---

## **✅ PRE-DESPLIEGUE:**
- [ ] Código funciona en local (`npm run dev`)
- [ ] Build exitoso en local (`npm run build`)
- [ ] Todas las páginas funcionan
- [ ] Imágenes optimizadas
- [ ] Meta tags configurados
- [ ] Repository en GitHub listo

## **✅ DURANTE DESPLIEGUE:**
- [ ] Proyecto importado en Vercel
- [ ] Framework detectado correctamente
- [ ] Variables de entorno configuradas
- [ ] Build exitoso en Vercel
- [ ] Deploy completado sin errores

## **✅ POST-DESPLIEGUE:**
- [ ] Sitio accesible en URL
- [ ] Todas las páginas funcionan
- [ ] Performance >90 en PageSpeed
- [ ] SEO optimizado
- [ ] Dominio configurado (si aplica)
- [ ] Analytics configurados
- [ ] Deploy automático activado

---

## 🎉 **¡PROYECTO LISTO PARA PRODUCCIÓN!**

### **URL esperada:**
- **Gratis:** `https://sosingv1-tu-usuario.vercel.app`
- **Personalizado:** `https://www.sosing.com`

### **Próximos pasos:**
1. **Monitorear analytics**
2. **Actualizar contenido regularmente**
3. **Optimizar basado en métricas**
4. **Agregar nuevas funcionalidades**

---

**🚀 SOSINGV1 desplegado y listo para recibir visitantes!**
