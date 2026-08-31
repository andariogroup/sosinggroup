"use client";

import Script from "next/script";
import { useEffect } from "react";

/* ============================================================
   Píxel de Meta (Facebook / Instagram)

   Mide qué hace la gente en el sitio para que la campaña pueda
   optimizarse hacia quienes realmente convierten.

   Configure NEXT_PUBLIC_META_PIXEL_ID en Vercel con el ID que
   le da el Administrador de Eventos de Meta.
   ============================================================ */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/* Función para registrar eventos desde cualquier parte del sitio */
export function evento(nombre: string, datos?: Record<string, any>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", nombre, datos);
  }
}

/* Eventos personalizados de ECOCHECK */
export function eventoPersonalizado(nombre: string, datos?: Record<string, any>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", nombre, datos);
  }
}

export default function MetaPixel() {
  useEffect(() => {
    // Registra la visita en cada cambio de página
    if (PIXEL_ID && typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
