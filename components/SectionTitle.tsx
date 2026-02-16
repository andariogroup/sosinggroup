"use client";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = false }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4 font-heading">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-tech max-w-3xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
