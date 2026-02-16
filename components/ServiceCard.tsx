"use client";

import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export default function ServiceCard({ title, description, icon, slug }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <div className="text-2xl">{icon}</div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-dark mb-3 font-heading">{title}</h3>
        <p className="text-gray-tech mb-4 leading-relaxed">{description}</p>
        
        <Link 
          href={`/services/${slug}`}
          className="inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors"
        >
          Ver más
          <svg className="w-4 h-4 ml-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
