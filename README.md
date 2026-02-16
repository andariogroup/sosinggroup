# SOSING S.A.S - Corporate Website

## Descripción
Sitio web corporativo para SOSING S.A.S, empresa líder en ingeniería sostenible en Colombia.

## Tecnologías
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **TailwindCSS** - Framework CSS
- **Lucide React** - Iconos

## Características
- ✅ SEO optimizado con metadata completa
- ✅ Diseño responsive y moderno
- ✅ Componentes reutilizables
- ✅ Optimización de imágenes
- ✅ Estructura de navegación clara

## Estructura del Proyecto
```
├── app/                    # App Router de Next.js
│   ├── about/             # Página About
│   ├── contact/           # Página Contacto
│   ├── portfolio/         # Página Portafolio
│   ├── services/          # Página de Servicios
│   │   └── [slug]/       # Páginas dinámicas de servicios
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Homepage
├── components/            # Componentes React
├── public/               # Assets estáticos
└── vercel.json          # Configuración de Vercel
```

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```
Visita http://localhost:3000

## Build
```bash
npm run build
```

## Despliegue en Vercel
1. Conectar repositorio a Vercel
2. La configuración se detecta automáticamente desde `vercel.json`
3. Variables de entorno (si aplica):
   - `CUSTOM_KEY` - Clave personalizada

## Optimizaciones Aplicadas
- ✅ Compresión de imágenes (WebP/AVIF)
- ✅ Cache de headers para assets estáticos
- ✅ Build optimizado para producción
- ✅ Componentes con "use client" donde es necesario
- ✅ Estructura de carpetas limpia

## Páginas Disponibles
- `/` - Homepage
- `/about` - Sobre Nosotros
- `/services` - Servicios
- `/services/[slug]` - Detalle de servicio
- `/portfolio` - Portafolio
- `/contact` - Contacto
