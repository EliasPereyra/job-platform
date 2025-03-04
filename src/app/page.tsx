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

      <section className={styles.firstJobContainer}>
        <h2 className={styles.firstJobTitle}>
          Conseguí tu{" "}
          <span className={styles.firstJobTitleHighlight}>primer empleo</span>
        </h2>
        <div className={styles.firstJobContent}>
          <div className={styles.firstColumn}>
            <p className={styles.columnText}>
              Encontrar el primer empleo puede ser un desafío, pero creemos que
              todos merecen la oportunidad de dar ese primer paso en el mundo
              laboral.
            </p>
            <p className={styles.columnText}>
              Esta es una plataforma que facilita el acceso a empleos sin
              experiencia previa, conectando a postulantes con empresas,
              organismos públicos y emprendedores/as que buscan talento nuevo. A
              través de nuestra plataforma, reunimos ofertas de trabajo
              accesibles para quienes están comenzando y brindamos herramientas
              para prepararte mejor en tu búsqueda laboral.
            </p>
            <p className={styles.columnText}>
              Nuestro compromiso es derribar la barrera de la falta de
              experiencia. Sabemos que empezar no siempre es fácil, por eso
              ofrecemos un espacio donde las oportunidades son reales y pensadas
              para quienes están dando sus primeros pasos en el mercado laboral.
            </p>

            <p className={styles.columnText}>
              Más que una bolsa de trabajo, somos un punto de partida. Lo que
              más nos motiva es saber que vos, que hoy estás buscando tu primera
              oportunidad, puedas encontrarla y empezar a construir tu futuro
              laboral.
            </p>
          </div>
          <div className={styles.secondColumn}></div>
        </div>
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
