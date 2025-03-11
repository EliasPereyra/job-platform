import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { print } from "graphql/language/printer";

import Navigation from "@/components/Globals/Navigation/Navigation";
import Footer from "@/components/Globals/Footer/footer";
import { companies } from "@/queries/general/CompanyQuery";
import { RootQueryToCompanyConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Trabajos exclusivos que no requieren experiencia laboral previa. Mira la lista de trabajos publicados y postula en aquellos en que destacas.",
};

export default async function Home() {
  const { companies: companiesLogo } = await fetchGraphQL<{
    companies: RootQueryToCompanyConnection;
  }>(print(companies));

  return (
    <div className={styles.home}>
      <Navigation />

      <section className={styles.container}>
        <div className={styles.element} />
        <h1 className={styles.title}>
          Ofertas de trabajo{" "}
          <span className={styles.highlight}>sin experiencia</span>
        </h1>
        <p className={styles.description}>
          Explora oportunidades laborales y contacta directamente con las
          empresas. Sin registros, sin intermediarios
        </p>
        <a className={styles.button} href="/todos-los-trabajos">
          Ver Ofertas de Trabajos
        </a>

        <div className={styles.argentina} />
      </section>

      <section className={styles.companies}>
        <h2 className={styles.companiesTitle}>Confían en nosotros</h2>
        <div className={styles.companiesContainer}>
          {companiesLogo.nodes.map((company: any) => (
            <div key={company.id} className={styles.circle}>
              <Link href="#">
                <Image
                  className={styles.logo}
                  src={company.companies.logo?.node.sourceUrl || ""}
                  alt={company.companies.logo?.node.altText || ""}
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.benefitsContainer}>
        <h2 className={styles.benefitTitle}>¿Por qué usar esta plataforma?</h2>
        <ul className={styles.benefitItems}>
          <li className={styles.benefitItem}>
            <Image
              src="/assets/imgs/no-register.svg"
              alt="Icono de sin registro"
              width={45}
              height={45}
            />
            <h3>Sin necesidad de registro</h3>
            <p>
              Olvídate de crear cuentas, recordar contraseñas o llenar
              formularios innecesarios. En nuestra plataforma, puedes acceder a
              todas las ofertas de empleo de manera instantánea, sin barreras ni
              procesos complicados. Encuentra el trabajo ideal sin perder tiempo
              en registros.
            </p>
          </li>

          <li className={styles.benefitItem}>
            <Image
              src="/assets/imgs/contact.svg"
              alt="Icono de sin registro"
              width={45}
              height={45}
            />
            <h3>Contacto directo</h3>
            <p>
              No hay intermediarios ni formularios de postulación dentro de la
              plataforma. Cada oferta de empleo incluye el correo de la empresa
              para que puedas enviar tu CV directamente, sin demoras ni filtros
              adicionales. Esto te permite establecer comunicación inmediata con
              los reclutadores y aumentar tus posibilidades de respuesta.
            </p>
          </li>

          <li className={styles.benefitItem}>
            <Image
              src="/assets/imgs/free.svg"
              alt="Icono de sin registro"
              width={45}
              height={45}
            />
            <h3>100% gratuito</h3>
            <p>
              Buscar trabajo no debería costarte nada. Nuestra plataforma es
              completamente gratuita tanto para quienes buscan empleo como para
              las empresas que publican sus ofertas. No hay suscripciones,
              tarifas ocultas ni pagos por destacar tu perfil.
            </p>
          </li>

          <li className={styles.benefitItem}>
            <Image
              src="/assets/imgs/info.svg"
              alt="Icono de sin registro"
              width={45}
              height={45}
            />
            <h3>Transparencia total</h3>
            <p>
              Toda la información relevante sobre el empleo está disponible de
              forma clara y detallada. Desde el salario (cuando la empresa lo
              proporciona) hasta los requisitos y beneficios del puesto, tendrás
              acceso a todos los detalles sin necesidad de registrarte ni
              completar formularios.
            </p>
          </li>
        </ul>
      </section>

      <section className={styles.howItWorks}>
        <h2>Cómo Funciona</h2>
        <div className={styles.howItWorksContainer}>
          <div className={styles.howItWorksItemRight}>
            <Image
              className={styles.howItWorksImage}
              src="/assets/imgs/jobs.jpg"
              alt="Lista de trabajos de la plataforma"
              width={1604}
              height={854}
            />
            <div>
              <h3 className={styles.howItWorksTitle}>
                Explora las oportunidades laborales
              </h3>
              <p className={styles.howItWorksDescription}>
                Revisa nuestra lista actualizada de ofertas de trabajo en
                distintas industrias y categorías.
              </p>
            </div>
          </div>

          <div className={styles.howItWorksItemLeft}>
            <Image
              className={styles.howItWorksImage}
              src="/assets/imgs/job.jpg"
              alt="Texto que describe los detalles del puesto"
              width={1604}
              height={854}
            />
            <div>
              <h3 className={styles.howItWorksTitle}>
                Consulta todos los detalles del puesto
              </h3>
              <p className={styles.howItWorksDescription}>
                Cada oferta incluye información clara sobre el cargo,
                requisitos, beneficios y detalles del empleador. No necesitas
                registrarte para ver toda la información relevante y tomar una
                decisión informada.
              </p>
            </div>
          </div>

          <div className={styles.howItWorksItemRight}>
            <Image
              className={styles.howItWorksImage}
              src="/assets/imgs/contact.jpg"
              alt="Contacto directo con la empresa"
              width={1604}
              height={854}
            />
            <div>
              <h3 className={styles.howItWorksTitle}>
                Contacta directamente con la empresa
              </h3>
              <p className={styles.howItWorksDescription}>
                Cuando encuentres un empleo que te interese, simplemente copia
                el correo proporcionado en la oferta y envía tu postulación sin
                intermediarios. Escribe directamente a la empresa y agiliza el
                proceso de aplicación.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.callToAction}>
        <h2 className={styles.callToActionTitle}>
          Empieza a buscar tu próximo trabajo{" "}
          <span className={styles.highlight}>hoy mismo</span>
        </h2>
        <a className={styles.button} href="/todos-los-trabajos">
          Ver Ofertas de Trabajos
        </a>
      </section>
      <Footer />
    </div>
  );
}
