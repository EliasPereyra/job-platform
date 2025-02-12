import { Metadata } from "next";
import Link from "next/link";
import { Company, type Job } from "@/gql/graphql";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";

import JobAvailable from "@/components/job-available";
import { Location } from "@/components/icons/location";
import WorldIcon from "@/components/icons/world";
import { MoneyIcon } from "@/components/icons/money";
import { TimeIcon } from "@/components/icons/time";
import { WhatsappIcon } from "@/components/icons/whatsapp";
import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { LeftArrow } from "@/components/icons/left-arrow";
import { setSeoData } from "@/utils/seoData";
import { formatDate } from "@/utils/formatDate";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./job.module.css";
import Image from "next/image";

const job = gql`
  query JobQuery($id: ID!) {
    job(id: $id, idType: URI) {
      modified
      title
      content
      jobs {
        available
        benefits
        company {
          nodes {
            slug
          }
        }
        jobcategory {
          nodes {
            slug
          }
        }
        contact
        manadatoryRequirements
        jobtime
        optionalRequirements
        modality
        location
        salary
        tasks
      }
      seo {
        canonical
        cornerstone
        focuskw
        fullHead
        metaDesc
        metaKeywords
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphSiteName
        opengraphTitle
        opengraphType
        opengraphUrl
        readingTime
        title
        twitterDescription
        twitterTitle
      }
    }
  }
`;

const company = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id, idType: URI) {
      title
      content
      companies {
        logo {
          node {
            id
            altText
            sourceUrl
          }
        }
        contact
      }
    }
  }
`;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { job: jobSeo } = await fetchGraphQL<{ job: Job }>(print(job), {
    id: `/job/${slug}`,
  });

  const metadata = setSeoData({ seo: jobSeo?.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/job/${slug}`,
    },
  } as Metadata;
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const { job: jobDetails } = await fetchGraphQL<{ job: Job }>(print(job), {
    id: `/job/${slug}`,
  });
  const { company: companyDetails } = await fetchGraphQL<{ company: Company }>(
    print(company),
    {
      id: `/companias/${jobDetails.jobs?.company?.nodes[0].slug}`,
    }
  );

  const { title, content, modified, jobs } = jobDetails;

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <Link href="/todos-los-trabajos">
          <LeftArrow color="#fff" arialabel="Icono de flecha a la izquierda" />
        </Link>
        <div className={styles.company}>
          <Link href={`/companias/${jobDetails.jobs?.company?.nodes[0].slug}`}>
            <Image
              className={styles.companyLogo}
              src={companyDetails.companies?.logo?.node.sourceUrl || ""}
              alt={companyDetails.companies?.logo?.node.altText || ""}
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className={styles.available}>
          <JobAvailable available={jobs?.available || false} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <small className={styles.date}>{formatDate(modified || "")}</small>
        <div className={styles.info}>
          <div className={styles.location}>
            <Location color="#fff" arialabel="Icono de ubicacion" />
            <p className={styles.locationText}>{jobs?.location}</p>
          </div>
          <div className={styles.modality}>
            <WorldIcon color="#fff" arialabel="Icono de internet" />
            <p className={styles.modalityText}>{jobs?.modality}</p>
          </div>
          <div className={styles.salary}>
            <MoneyIcon color="#fff" arialabel="Icono de dinero" />
            <p className={styles.salaryText}>{jobs?.salary}</p>
          </div>
          <div className={styles.time}>
            <TimeIcon color="#fff" arialabel="Icono de reloj" />
            <p className={styles.timeText}>
              <strong>{jobs?.jobtime}</strong>
            </p>
          </div>
        </div>
        <h4 className={styles.shareTitle}>Compartir</h4>
        <div className={styles.share}>
          <Link href="#">
            <WhatsappIcon size={30} color="#fff" arilabel="Icono de whatsapp" />
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
      </section>
    </div>
  );
}
