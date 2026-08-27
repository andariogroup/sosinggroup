"use client";

import { Linkedin, Facebook, Instagram } from "lucide-react";

/* ============================================================
   Iconos de redes sociales de SOSING S.A.S.
   Enlaces oficiales verificados. Abren en pestaña nueva.
   ============================================================ */

export const REDES = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/sosing2010/",
    icon: Facebook,
    color: "#1877F2",
    label: "SOSING en Facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/sosing_sas/",
    icon: Instagram,
    color: "#E4405F",
    label: "SOSING en Instagram",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/43282677/",
    icon: Linkedin,
    color: "#0A66C2",
    label: "SOSING en LinkedIn",
  },
];

const SocialIcons = () => (
  <div className="flex flex-wrap gap-3">
    {REDES.map((r) => {
      const Icon = r.icon;
      return (
        <a
          key={r.name}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={r.label}
          title={r.label}
          className="w-11 h-11 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-transparent"
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = r.color; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
        >
          <Icon className="w-5 h-5 text-white" />
        </a>
      );
    })}
  </div>
);

export default SocialIcons;
