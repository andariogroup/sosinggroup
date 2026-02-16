import Link from "next/link";
import LayoutComponents from "@/components/LayoutComponents";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <LayoutComponents />
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-dark mb-4">Página No Encontrada</h2>
            <p className="text-lg text-gray-tech max-w-md mx-auto mb-8">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Volver al Inicio
            </Link>
            <Link href="/services" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Ver Servicios
            </Link>
          </div>
          
          <div className="mt-12">
            <div className="text-4xl mb-4">🏗️</div>
            <p className="text-sm text-gray-tech">
              SOSING S.A.S - Soluciones Sostenibles de Ingeniería
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
