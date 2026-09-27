import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { type Job } from "@/gql/graphql";
import { print } from "graphql/language/printer";

import Location from "@/components/badges/location/location";
import Time from "@/components/badges/time/time";
import Money from "@/components/badges/money/money";
import Modality from "@/components/badges/modality/modality";
import JobAvailable from "@/components/badges/job-available/job-available";
import { WhatsappIcon } from "@/components/icons/whatsapp";
import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { LeftArrow } from "@/components/icons/left-arrow";
import { Date } from "@/components/badges/date/date";
import { setSeoData } from "@/utils/seoData";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { job } from "./job-query";

import styles from "./job.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { job: jobSeo } = await fetchGraphQL<{ job: Job }>(print(job), {
    id: `/job/${slug}`,
  });

  const metadata = setSeoData({ seo: jobSeo?.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      }/job/${slug}`,
    },
  } as Metadata;
}

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const { job: jobDetails } = await fetchGraphQL<{ job: Job }>(print(job), {
    id: `/job/${slug}`,
  });

  const { title, content, modified, jobs } = jobDetails;

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <Link href="/todos-los-trabajos">
          <LeftArrow color="#fff" arialabel="Icono de flecha a la izquierda" />
        </Link>
        <div className={styles.company}>
          <Link href={`/companias/${jobDetails.jobs?.company?.node.slug}`}>
            <Image
              className={styles.companyLogo}
              src={jobs?.company?.node.companies?.logo?.node.sourceUrl || ""}
              alt={jobs?.company?.node.companies?.logo?.node.altText || ""}
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className={styles.available}>
          <JobAvailable available={jobs?.available || false} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <Date color="#fff" modified={modified || ""} />
        <div className={styles.info}>
          <Location location={jobs?.location || ""} />
          <Modality modality={jobs?.modality || ""} />
          <Money salary={jobs?.salary || ""} />
          <Time workingDay={jobs?.workingDay || ""} />
        </div>
        <h4 className={styles.shareTitle}>Compartir</h4>
        <div className={styles.share}>
          <Link href="#">
            <WhatsappIcon
              size={30}
              color="#fff"
              arialabel="Icono de whatsapp"
            />
          </Link>
          <Link href="#">
            <FacebookIcon
              size={30}
              arialabel="Icono de facebook"
              color="#fff"
            />
          </Link>
          <Link href="#">
            <InstagramIcon
              size={30}
              arialabel="Icono de instagram"
              color="#fff"
            />
          </Link>
        </div>
      </section>
      <section className={styles.content}>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />

        <div>
          <h3>Tareas a realizar</h3>
          <ul className={styles.list}>
            {jobs?.tasks?.split("\n").map((task: string, index: number) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Requerimientos excluyentes</h3>
          <ul className={styles.list}>
            {jobs?.manadatoryRequirements
              ?.split("\n")
              .map((requirement: string, index: number) => (
                <li key={index}>{requirement}</li>
              ))}
          </ul>
        </div>

        <div>
          <h3>Requerimientos no exclutentes</h3>
          <ul className={styles.list}>
            {jobs?.optionalRequirements
              ?.split("\n")
              .map((requirement: string, index: number) => (
                <li key={index}>{requirement}</li>
              ))}
          </ul>
        </div>

        <div>
          <h3>Beneficios</h3>
          <ul className={styles.list}>
            {jobs?.benefits
              ?.split("\n")
              .map((benefit: string, index: number) => (
                <li key={index}>{benefit}</li>
              ))}
          </ul>
        </div>
        <div className={styles.contact}>
          <h3>Contacta a la empresa</h3>
          <p>¿Te ha gustado el trabajo y quieres contactar con la empresa?</p>
          <p>
            Envía un correo a:{" "}
            <a
              className={styles.link}
              href={`mailto:${jobs?.company?.node.companies?.contact}`}
            >
              <strong>{jobs?.company?.node.companies?.contact}</strong>
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
