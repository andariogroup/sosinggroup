import Link from "next/link";
import LayoutComponents from "@/components/LayoutComponents";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Tratamiento de Datos Personales | SOSING S.A.S.",
  description:
    "Política de tratamiento de datos personales de SOSING S.A.S. conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015.",
};

export default function PoliticaDatosPage() {
  return (
    <div className="min-h-screen bg-white">
      <LayoutComponents />

      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">

          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6">
            <span className="text-sm font-semibold">Legal</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Política de Tratamiento de Datos Personales
          </h1>
          <p className="text-gray-500 mb-12">
            Última actualización: agosto de 2026 · Versión 1.0
          </p>

          <div className="prose prose-lg max-w-none text-gray-700">

            <Seccion titulo="1. Responsable del tratamiento">
              <Dato label="Razón social" valor="SOSING S.A.S. — Soluciones Sostenibles de Ingeniería" />
              <Dato label="NIT" valor="900.342.838-7" />
              <Dato label="Dirección" valor="Cra. 9 #13B-35 Local 3, Barrio Cañahuate, Valledupar, Cesar" />
              <Dato label="Correo electrónico" valor="comercial@sosinggroup.com" />
              <Dato label="Teléfono" valor="311 660 8217" />
            </Seccion>

            <Seccion titulo="2. Marco legal">
              <p>
                Esta política se adopta en cumplimiento de la Ley 1581 de 2012, el Decreto 1074
                de 2015 y demás normas concordantes sobre protección de datos personales en Colombia,
                así como del derecho constitucional de hábeas data consagrado en el artículo 15 de
                la Constitución Política.
              </p>
            </Seccion>

            <Seccion titulo="3. Datos que recolectamos">
              <p>Según el servicio que utilice, podemos recolectar:</p>
              <Lista items={[
                "Datos de identificación: nombre completo, número de documento, correo electrónico, teléfono.",
                "Datos de la empresa: razón social, NIT, actividad económica, dirección, municipio y departamento.",
                "Datos operativos ambientales: registros de generación de residuos, entregas a gestores, certificados de disposición y demás información que usted cargue en la plataforma.",
                "Datos de transacciones: registro de pagos realizados a través de la pasarela Wompi.",
              ]} />
              <Nota>
                No recolectamos datos sensibles (origen racial o étnico, orientación política,
                convicciones religiosas, datos de salud o biométricos). Si en algún momento fuera
                necesario, se solicitará autorización expresa e informada, y usted no estará
                obligado a suministrarlos.
              </Nota>
            </Seccion>

            <Seccion titulo="4. Finalidades del tratamiento">
              <Lista items={[
                "Prestar los servicios de diagnóstico, consultoría y acompañamiento ambiental contratados.",
                "Operar la plataforma SOSING Ambiental 24/7 y generar los informes de cumplimiento.",
                "Identificar la autoridad ambiental competente según la ubicación de su empresa.",
                "Emitir alertas sobre vencimientos y obligaciones ambientales aplicables.",
                "Gestionar la facturación, el cobro y el soporte de las transacciones.",
                "Atender solicitudes, consultas y reclamos.",
                "Enviar comunicaciones relacionadas con el servicio contratado.",
              ]} />
              <Nota>
                No vendemos, arrendamos ni cedemos su información a terceros con fines comerciales.
              </Nota>
            </Seccion>

            <Seccion titulo="5. Encargados del tratamiento">
              <p>
                Para operar el servicio utilizamos proveedores tecnológicos que actúan como
                encargados del tratamiento:
              </p>
              <Lista items={[
                "Supabase — almacenamiento de la base de datos y gestión de cuentas de usuario.",
                "Vercel — alojamiento del sitio web y la plataforma.",
                "Wompi (Bancolombia) — procesamiento de pagos. SOSING no almacena datos de tarjetas ni credenciales bancarias.",
              ]} />
              <p>
                Estos proveedores pueden almacenar información en servidores ubicados fuera de
                Colombia. Al aceptar esta política, usted autoriza dicha transferencia
                internacional en los términos del artículo 26 de la Ley 1581 de 2012.
              </p>
            </Seccion>

            <Seccion titulo="6. Sus derechos como titular">
              <p>De acuerdo con el artículo 8 de la Ley 1581 de 2012, usted tiene derecho a:</p>
              <Lista items={[
                "Conocer, actualizar y rectificar sus datos personales.",
                "Solicitar prueba de la autorización otorgada.",
                "Ser informado sobre el uso que se ha dado a sus datos.",
                "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.",
                "Revocar la autorización y solicitar la supresión de sus datos, cuando no exista un deber legal o contractual que lo impida.",
                "Acceder de forma gratuita a sus datos personales.",
              ]} />
            </Seccion>

            <Seccion titulo="7. Cómo ejercer sus derechos">
              <p>
                Puede ejercer cualquiera de estos derechos escribiendo a{" "}
                <a href="mailto:comercial@sosinggroup.com" className="text-green-700 font-semibold">
                  comercial@sosinggroup.com
                </a>{" "}
                o al WhatsApp 311 660 8217, indicando su nombre, documento de identidad, el derecho
                que desea ejercer y una descripción clara de su solicitud.
              </p>
              <p>
                Las consultas se atienden en un plazo máximo de <strong>diez (10) días hábiles</strong>.
                Los reclamos, en un plazo máximo de <strong>quince (15) días hábiles</strong>, conforme
                a los artículos 14 y 15 de la Ley 1581 de 2012.
              </p>
            </Seccion>

            <Seccion titulo="8. Seguridad de la información">
              <p>
                Aplicamos medidas técnicas y administrativas para proteger sus datos: cifrado de
                las comunicaciones (HTTPS), autenticación de usuarios, y control de acceso a nivel
                de base de datos que garantiza que cada empresa cliente solo pueda acceder a su
                propia información.
              </p>
              <p>
                Ninguna medida de seguridad es infalible. Si llegara a presentarse un incidente que
                comprometa sus datos, le informaremos oportunamente y reportaremos el hecho a la
                autoridad competente conforme a la normativa vigente.
              </p>
            </Seccion>

            <Seccion titulo="9. Vigencia y conservación">
              <p>
                Sus datos se conservarán mientras exista la relación comercial y, posteriormente,
                durante el término necesario para atender obligaciones legales, contables y
                tributarias. Los registros ambientales pueden conservarse por períodos más
                prolongados cuando la normativa ambiental así lo exija.
              </p>
              <p>Esta política rige a partir de agosto de 2026 y podrá ser actualizada. Los cambios
                sustanciales serán comunicados a través de este sitio web.</p>
            </Seccion>

            <Seccion titulo="10. Autoridad de vigilancia">
              <p>
                La <strong>Superintendencia de Industria y Comercio (SIC)</strong> es la autoridad
                encargada de vigilar el cumplimiento de la normativa de protección de datos
                personales en Colombia. Puede presentar quejas ante dicha entidad, previa
                reclamación directa ante SOSING S.A.S.
              </p>
            </Seccion>
          </div>

          <div className="mt-14 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
            <Link href="/" className="btn-secondary">Volver al inicio</Link>
            <Link href="/contact" className="btn-primary">Contactarnos</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-green-600 inline-block">
        {titulo}
      </h2>
      <div className="space-y-4 mt-4">{children}</div>
    </section>
  );
}

function Dato({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex flex-wrap gap-2 py-1.5 border-b border-gray-100">
      <span className="font-semibold text-gray-900 min-w-[170px]">{label}:</span>
      <span>{valor}</span>
    </div>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 my-4">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">•</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Nota({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-green-50 border-l-4 border-green-600 px-5 py-4 rounded-r-lg text-base my-4">
      {children}
    </div>
  );
}
