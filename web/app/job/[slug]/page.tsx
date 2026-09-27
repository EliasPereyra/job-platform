import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJob } from "@/modules/cms";
import { CmsImage } from "@/modules/cms/cms-image";
import { RichText } from "@/modules/cms/rich-text";
import Location from "@/modules/jobs/components/badges/location/location";
import Time from "@/modules/jobs/components/badges/time/time";
import Money from "@/modules/jobs/components/badges/money/money";
import Modality from "@/modules/jobs/components/badges/modality/modality";
import JobAvailable from "@/modules/jobs/components/badges/job-available/job-available";
import { Date } from "@/modules/jobs/components/badges/date/date";
import { formatLocation, modalityLabel, workingDayLabel } from "@/modules/jobs/labels";
import { WhatsappIcon } from "@/shared/components/icons/whatsapp";
import { FacebookIcon } from "@/shared/components/icons/facebook";
import { InstagramIcon } from "@/shared/components/icons/instagram";
import { LeftArrow } from "@/shared/components/icons/left-arrow";
import { buildMetadata } from "@/shared/utils/metadata";

import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug, { stega: false });
  if (!job) return {};

  return buildMetadata({
    seo: job.seo,
    fallbackTitle: `${job.title} en ${job.company.name}`,
    fallbackDescription: `${job.title} · ${formatLocation(job)} · ${modalityLabel(job.modality)}. Sin experiencia previa.`,
    fallbackImage: job.company.logo,
    path: `/job/${slug}/`,
  });
}

function DetailList({ title, items }: { title: string; items: string[] | null }) {
  if (!items?.length) return null;

  return (
    <div>
      <h3>{title}</h3>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) notFound();

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <Link href="/todos-los-trabajos">
          <LeftArrow color="#fff" arialabel="Icono de flecha a la izquierda" />
        </Link>
        <div className={styles.company}>
          <Link href={`/companias/${job.company.slug}`} title={job.company.name}>
            <CmsImage
              className={styles.companyLogo}
              value={job.company.logo}
              alt={job.company.name}
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className={styles.available}>
          <JobAvailable available={job.available ?? false} />
        </div>
        <h3 className={styles.title}>{job.title}</h3>
        <Date color="#fff" modified={job.publishedAt} />
        <div className={styles.info}>
          <Location location={formatLocation(job)} />
          <Modality modality={modalityLabel(job.modality)} />
          {job.salary && <Money salary={job.salary} />}
          <Time workingDay={workingDayLabel(job.workingDay)} />
        </div>
        <h4 className={styles.shareTitle}>Compartir</h4>
        <div className={styles.share}>
          <Link href="#">
            <WhatsappIcon size={30} color="#fff" arialabel="Icono de whatsapp" />
          </Link>
          <Link href="#">
            <FacebookIcon size={30} arialabel="Icono de facebook" color="#fff" />
          </Link>
          <Link href="#">
            <InstagramIcon size={30} arialabel="Icono de instagram" color="#fff" />
          </Link>
        </div>
      </section>
      <section className={styles.content}>
        <div className={styles.description}>
          <RichText value={job.description} />
        </div>

        <DetailList title="Tareas a realizar" items={job.tasks} />
        <DetailList title="Requisitos excluyentes" items={job.mandatoryRequirements} />
        <DetailList title="Requisitos no excluyentes" items={job.optionalRequirements} />
        <DetailList title="Beneficios" items={job.benefits} />

        <div className={styles.contact}>
          <h3>Contacta a la empresa</h3>
          {job.available ? (
            <>
              <p>¿Te ha gustado el trabajo y quieres contactar con la empresa?</p>
              <p>
                Envía un correo a:{" "}
                <a className={styles.link} href={`mailto:${job.contactEmail}`}>
                  <strong>{job.contactEmail}</strong>
                </a>
              </p>
            </>
          ) : (
            <p>
              Esta búsqueda ya finalizó.{" "}
              <Link className={styles.link} href="/todos-los-trabajos">
                Mirá otras ofertas disponibles
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
