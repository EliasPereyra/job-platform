import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { print } from "graphql/language/printer";

import Navigation from "@/components/Globals/Navigation/Navigation";
import Footer from "@/components/Globals/Footer/footer";
import { Benefit } from "@/components/benefit";
import { companies } from "@/queries/general/CompanyQuery";
import { RootQueryToCompanyConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Trabajos exclusivos que no requieren experiencia laboral previa. Mira la lista de trabajos publicados y postula en aquellos en que destacas.",
};

const benefits = [
  {
    id: 1,
    title: "Sin necesidad de registro",
    description:
      "Olvídate de crear cuentas, recordar contraseñas o llenar formularios innecesarios. En nuestra plataforma, puedes acceder a todas las ofertas de empleo de manera instantánea, sin barreras ni procesos complicados. Encuentra el trabajo ideal sin perder tiempo en registros.",
    img: "/assets/imgs/no-register.svg",
    reverse: false,
  },
  {
    id: 2,
    title: "Contacto directo",
    description:
      "No hay intermediarios ni formularios de postulación dentro de la plataforma. Cada oferta de empleo incluye el correo de la empresa para que puedas enviar tu CV directamente, sin demoras ni filtros adicionales. Esto te permite establecer comunicación inmediata con los reclutadores y aumentar tus posibilidades de respuesta.",
    img: "/assets/imgs/contact.svg",
    reverse: true,
  },
  {
    id: 3,
    title: "100% gratuito",
    description:
      "Buscar trabajo no debería costarte nada. Nuestra plataforma es completamente gratuita tanto para quienes buscan empleo como para las empresas que publican sus ofertas. No hay suscripciones, tarifas ocultas ni pagos por destacar tu perfil.",
    img: "/assets/imgs/free.svg",
    reverse: false,
  },
  {
    id: 4,
    title: "Transparencia total",
    description:
      "Toda la información relevante sobre el empleo está disponible de forma clara y detallada. Desde el salario (cuando la empresa lo proporciona) hasta los requisitos y beneficios del puesto, tendrás acceso a todos los detalles sin necesidad de registrarte ni completar formularios.",
    img: "/assets/imgs/info.svg",
    reverse: true,
  },
];

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
          {benefits.map(({ id, title, description, img, reverse }) => (
            <Benefit
              key={id}
              title={title}
              description={description}
              img={img}
              reverse={reverse}
            />
          ))}
        </ul>
      </section>

      <section className={styles.secondJob}>
        <div>
          <Image
            src="/assets/imgs/computer.png"
            alt="Image of the computer"
            width={320}
            height={200}
          />
        </div>
        <div className={styles.secondCol}>
          <h2 className={styles.secondJobTitle}>
            <span className={styles.secondJobTitleHighlight}>WorkStart</span>{" "}
            arma tu CV y mucho más
          </h2>
          <div className={styles.secondJobContent}>
            <p className={styles.secondJobDescription}>
              Armamos tu CV y simulamos entrevistas de trabajo para que estés
              preparado. Solicitá este servicio a nuestros profesionales de
              RR.HH.
            </p>
            <a className={styles.secondJobButton} href="#">
              Más sobre nuestros servicios
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
