# 🚀 TUTORIAL COMPLETO - CORRER SOSINGV1 EN LOCAL

---

## 📋 **REQUISITOS PREVIOS**

### **🔧 Software necesario:**
- **Node.js** (versión 18 o superior) ✅
- **npm** (viene con Node.js) ✅
- **Git** (opcional, para control de versiones) ✅

### **📁 Estructura del proyecto:**
```
sosingv1/
├── 📄 package.json (dependencias y scripts)
├── 📄 vercel.json (configuración Vercel)
├── 📄 next.config.js (configuración Next.js)
├── 📄 .env.local.example (variables de entorno)
├── 📁 src/ (código fuente)
├── 📁 components/ (componentes React)
├── 📁 app/ (páginas Next.js 14)
├── 📁 public/ (assets estáticos)
└── 📁 node_modules/ (dependencias instaladas)
```

---

## 🛠️ **PASO 1: INSTALACIÓN DE DEPENDENCIAS**

### **Abrir terminal y navegar al proyecto:**
```bash
# Usar Command Prompt, PowerShell o Git Bash
cd C:\Users\lucasian\Downloads\sosingv1
```

### **Instalar dependencias:**
```bash
# Opción 1: npm (recomendado)
npm install

# Opción 2: yarn (si lo prefieres)
yarn install

# Opción 3: pnpm (más rápido)
pnpm install
```

### **Verificar instalación:**
```bash
# Debería ver node_modules/ creada
dir node_modules

# Verificar versión de Next.js
npx next --version
```

---

## 🔧 **PASO 2: CONFIGURAR VARIABLES DE ENTORNO**

### **Crear archivo .env.local:**
```bash
# Copiar archivo de ejemplo
copy .env.local.example .env.local

# O crear manualmente
```

### **Editar .env.local con tu configuración:**
```bash
# Variables de entorno para desarrollo local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=SOSING GROUP
NEXT_PUBLIC_CONTACT_EMAIL=contacto@sosinggroup.com
NEXT_PUBLIC_DOMAIN=localhost
```

### **Importante:**
- **NEXT_PUBLIC_** hace que las variables estén disponibles en el navegador
- **Sin NEXT_PUBLIC_** solo disponibles en servidor (Node.js)

---

## 🚀 **PASO 3: INICIAR SERVIDOR DE DESARROLLO**

### **Opción 1: Usar npm scripts (recomendado):**
```bash
# Iniciar servidor de desarrollo
npm run dev

# Verás salida similar a:
#   - ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

### **Opción 2: Usar npx directamente:**
```bash
# Iniciar sin usar package.json
npx next dev

# Especificar puerto personalizado
npx next dev -p 3001
```

### **Opción 3: Usar yarn:**
```bash
# Si instalaste con yarn
yarn dev
```

---

## 🌐 **PASO 4: ACCEDER AL SITIO WEB**

### **URLs disponibles:**
- **Principal:** `http://localhost:3000`
- **Con puerto personalizado:** `http://localhost:3001`
- **En red local:** `http://192.168.1.100:3000` (tu IP local)

### **Páginas disponibles:**
```
http://localhost:3000/              → Home
http://localhost:3000/about           → About
http://localhost:3000/services        → Services
http://localhost:3000/portfolio       → Portfolio
http://localhost:3000/contact         → Contact
```

---

## 🎨 **PASO 5: VERIFICAR FUNCIONALIDAD**

### **Checklist de verificación:**

#### **✅ Carga correcta:**
- [ ] Página principal carga sin errores
- [ ] Todas las imágenes se muestran
- [ ] CSS y Tailwind funcionan
- [ ] Navegación entre páginas funciona

#### **✅ Herramientas de desarrollador:**
- [ ] Abrir Chrome DevTools (F12)
- [ ] Verificar Console sin errores
- [ ] Revisar Network para recursos cargados
- [ ] Probar responsive con Device Mode

#### **✅ Hot Reload:**
- [ ] Modificar un archivo .tsx o .css
- [ ] Guardar cambios
- [ ] Ver actualización automática en navegador

---

## 🛠️ **COMANDOS ÚTILES DURANTE DESARROLLO**

### **Comandos de package.json:**
```bash
# Iniciar desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm run start

# Verificar código con ESLint
npm run lint
```

### **Comandos de Next.js:**
```bash
# Crear nueva página
npx create-next-app@latest

# Exportar sitio estático
npx next export

# Limpiar caché de Next.js
npx next clean
```

---

## 🔧 **CONFIGURACIÓN AVANZADA**

### **Personalizar puerto:**
```bash
# Método 1: Línea de comandos
npm run dev -- -p 3001

# Método 2: Archivo next.config.js
const nextConfig = {
  devServer: {
    port: 3001
  }
}
```

### **Configurar host para acceso en red:**
```bash
# Permitir acceso desde otros dispositivos
npm run dev -- -H 0.0.0.0

# O en next.config.js
const nextConfig = {
  devServer: {
    host: '0.0.0.0'
  }
}
```

---

## 🐛 **SOLUCIÓN DE PROBLEMAS COMUNES**

---

## **PROBLEMA 1: "Command not found: npm"**

### **Causa:** Node.js no instalado o no en PATH

### **Solución:**
```bash
# Verificar instalación
node --version
npm --version

# Si no está instalado, descargar desde:
# https://nodejs.org/
```

---

## **PROBLEMA 2: "Error: Cannot find module"**

### **Causa:** Dependencias no instaladas

### **Solución:**
```bash
# Limpiar caché e instalar nuevamente
npm cache clean --force
npm install

# O eliminar node_modules y reinstalar
rmdir /s node_modules
npm install
```

---

## **PROBLEMA 3: Puerto ya está en uso**

### **Causa:** Puerto 3000 ocupado por otro proceso

### **Solución:**
```bash
# Método 1: Usar otro puerto
npm run dev -- -p 3001

# Método 2: Matar proceso en puerto 3000
# En Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# En PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
Stop-Process -Id <PID>
```

---

## **PROBLEMA 4: Cambios no se reflejan**

### **Causa:** Hot reload no funcionando

### **Solución:**
```bash
# Reiniciar servidor
Ctrl + C  # Detener
npm run dev  # Iniciar nuevamente

# Limpiar caché del navegador
# Ctrl + Shift + R (Chrome)
# o abrir en ventana incógnito
```

---

## **PROBLEMA 5: Error de TypeScript**

### **Causa:** Error de tipado en el código

### **Solución:**
```bash
# Ver errores en consola
# Corregir errores tipográficos
# Usar Ctrl + Click en VS Code para ir a definición
```

---

## **🚨 PROBLEMA 6: Image Optimization Error**

### **Error:**
```
Error: Image Optimization using the default loader is not compatible with { output: 'export' }
```

### **Causa:** `output: 'export'` es incompatible con Image Optimization API

### **✅ Solución aplicada:**
- **Eliminado** `output: 'export'` y `trailingSlash: true`
- **Configurado** `images: { unoptimized: true }`
- **Mantiene compatibilidad** con Vercel y despliegue estático

### **Configuración actual en next.config.js:**
```javascript
const nextConfig = {
  images: {
    domains: ['www.sosinggroup.com', 'sosinggroup.com'],
    unoptimized: true  // ✅ Solución al error
  }
}
```

---

## 📱 **PRUEBA EN MÓVILES Y TABLETS**

### **Opciones de prueba:**

#### **1. Chrome DevTools:**
1. **Abrir DevTools** (F12)
2. **Click en ícono de dispositivo** (Toggle device toolbar)
3. **Seleccionar dispositivo:** iPhone, iPad, Android, etc.
4. **Probar diferentes resoluciones**

#### **2. Navegador en móvil:**
- **Chrome móvil** y visitar `http://<tu-ip>:3000`
- **Safari en iOS** y visitar misma URL
- **Chrome en Android** y visitar misma URL

#### **3. Obtener IP local:**
```bash
# En Windows CMD
ipconfig

# Buscar "Dirección IPv4"
# Generalmente: 192.168.1.XXX
```

---

## 🔧 **PERSONALIZACIÓN Y DESARROLLO**

---

## **MODIFICAR CONTENIDO:**

### **Editar página principal:**
```bash
# Abrir en VS Code
code app/page.tsx

# O editar en cualquier editor
notepad app/page.tsx
```

### **Cambiar información de la empresa:**
```typescript
// En app/page.tsx
const stats = [
  { number: "15+", label: "Años de Experiencia" },    // Modificar
  { number: "200+", label: "Proyectos Completados" }, // Modificar
  { number: "75+", label: "Clientes Satisfechos" },     // Modificar
  { number: "99%", label: "Satisfacción" }           // Modificar
];
```

### **Agregar nuevos servicios:**
```typescript
// En app/page.tsx
const services = [
  // ... servicios existentes ...
  { 
    title: "Nuevo Servicio", 
    description: "Descripción del nuevo servicio", 
    icon: "🔧" 
  }
];
```

---

## **CAMBIAR COLORES Y ESTILOS:**

### **Personalizar Tailwind:**
```css
/* En app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Colores personalizados */
:root {
  --primary-color: #1e40af;
  --secondary-color: #10b981;
}
```

### **Usar colores personalizados:**
```tsx
// En componentes
<div className="bg-[var(--primary-color)] text-white">
  Contenido con color personalizado
</div>
```

---

## 📊 **HERRAMIENTAS DE DESARROLLO**

---

## **EXTENSIONES DE VS CODE RECOMENDADAS:**

### **Para Next.js/React:**
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

### **Para Tailwind CSS:**
- **Tailwind CSS IntelliSense**
- **Tailwind CSS class completion**
- **Headwind**

### **Para desarrollo general:**
- **Live Server** (para proyectos no Next.js)
- **GitLens**
- **Thunder Client** (para API testing)
- **JSON Viewer**

---

## **🚀 FLUJO DE TRABAJO RECOMENDADO**

---

## **DESARROLLO DIARIO:**

### **1. Iniciar sesión:**
```bash
cd C:\Users\lucasian\Downloads\sosingv1
npm run dev
```

### **2. Abrir VS Code:**
```bash
# En otra terminal
code .
```

### **3. Flujo de trabajo:**
1. **Crear rama para nueva feature:** `git checkout -b nueva-feature`
2. **Hacer cambios** en código
3. **Ver cambios en tiempo real** con hot reload
4. **Commit cambios:** `git commit -m "Add new service"`
5. **Push a GitHub:** `git push origin nueva-feature`
6. **Crear Pull Request** para revisión

---

## **📋 CHECKLIST DE DESARROLLO COMPLETO**

---

## **✅ FUNCIONALIDAD BÁSICA:**
- [ ] Sitio carga en `http://localhost:3000`
- [ ] Todas las páginas funcionan
- [ ] Navegación entre páginas correcta
- [ ] Imágenes cargan correctamente
- [ ] Responsive design funciona

## **✅ DESARROLLO:**
- [ ] Hot reload funcionando
- [ ] Sin errores en consola
- [ ] TypeScript compilando correctamente
- [ ] ESLint sin advertencias críticas

## **✅ PERSONALIZACIÓN:**
- [ ] Contenido actualizado con información real
- [ ] Colores y estilos personalizados
- [ ] Servicios y portfolio actualizados
- [ ] Contacto funcional

---

## **🎉 ¡SITIO LISTO PARA DESARROLLO!**

### **URL de desarrollo:**
**http://localhost:3000**

### **Próximos pasos:**
1. **Personalizar contenido** con información real de SOSING GROUP
2. **Probar en diferentes dispositivos**
3. **Optimizar performance**
4. **Preparar para despliegue en Vercel**

---

## **📞 SOPORTE Y AYUDA**

### **Recursos útiles:**
- **Documentación Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Documentación Tailwind:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Comunidad Next.js:** [github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)

### **Comandos de emergencia:**
```bash
# Si todo falla, limpiar y empezar de nuevo
rmdir /s /q node_modules
del package-lock.json
npm install
npm run dev
```

---

**🚀 ¡SOSINGV1 corriendo exitosamente en local!**
