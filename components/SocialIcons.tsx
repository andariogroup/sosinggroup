"use client";

import { Linkedin, Facebook, Instagram } from "lucide-react";

const SocialIcons = () => {
  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/company/sosing", icon: Linkedin },
    { name: "Facebook", href: "https://facebook.com/sosing", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com/sosing", icon: Instagram },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors group"
            aria-label={social.name}
          >
            <IconComponent className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
