import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft } from "reicon-react";

import { cleanCmsValue, getJob } from "@/modules/cms";
import { CmsImage } from "@/modules/cms/cms-image";
import { RichText } from "@/modules/cms/rich-text";
import Location from "@/modules/jobs/components/badges/location/location";
import Time from "@/modules/jobs/components/badges/time/time";
import Money from "@/modules/jobs/components/badges/money/money";
import Modality from "@/modules/jobs/components/badges/modality/modality";
import JobAvailable from "@/modules/jobs/components/badges/job-available/job-available";
import { Date } from "@/modules/jobs/components/badges/date/date";
import { TearOff } from "@/modules/jobs/components/tear-off/tear-off";
import { formatLocation, modalityLabel, workingDayLabel } from "@/modules/jobs/labels";
import { jobLogoName, jobTitleName } from "@/modules/jobs/transition-names";
import { WhatsappIcon } from "@/shared/components/icons/whatsapp";
import { FacebookIcon } from "@/shared/components/icons/facebook";
import { PageTransition } from "@/shared/components/page-transition/page-transition";
import { TransitionLink } from "@/shared/components/transition-link/transition-link";
import { buildMetadata } from "@/shared/utils/metadata";
import { siteUrl } from "@/shared/utils/site-url";

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
    <section className={styles["job-page__section"]}>
      <h2 className={styles["job-page__section-title"]}>{title}</h2>
      <ul className={styles["job-page__list"]}>
        {items.map((item, index) => (
          <li key={index} className={styles["job-page__list-item"]}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) notFound();

  const shareText = encodeURIComponent(`${cleanCmsValue(job.title)} en WorkStart: ${siteUrl}/job/${slug}/`);
  const shareUrl = encodeURIComponent(`${siteUrl}/job/${slug}/`);

  return (
    <PageTransition>
      <article className={styles["job-page"]}>
        <TransitionLink className={styles["job-page__back"]} href="/todos-los-trabajos" transitionType="nav-back">
          <ArrowLeft size={18} aria-hidden />
          Todas las ofertas
        </TransitionLink>

        <header className={styles["job-page__header"]}>
          <div className={styles["job-page__company"]}>
            <TransitionLink
              className={styles["job-page__company-link"]}
              href={`/companias/${job.company.slug}`}
              transitionType="nav-forward"
            >
              <ViewTransition name={jobLogoName(slug)} share="morph" default="none">
                <CmsImage
                  className={styles["job-page__logo"]}
                  value={job.company.logo}
                  alt=""
                  width={48}
                  height={48}
                />
              </ViewTransition>
              {job.company.name}
            </TransitionLink>
            <JobAvailable available={job.available ?? false} />
          </div>

          <ViewTransition name={jobTitleName(slug)} share="text-morph" default="none">
            <h1 className={styles["job-page__title"]}>{job.title}</h1>
          </ViewTransition>
          <Date modified={job.publishedAt} />

          <div className={styles["job-page__badges"]}>
            <Location location={formatLocation(job)} />
            <Modality modality={job.modality} />
            {job.salary && <Money salary={job.salary} />}
            <Time workingDay={workingDayLabel(job.workingDay)} />
          </div>
        </header>

        <div className={styles["job-page__layout"]}>
          <div className={styles["job-page__content"]}>
            <div className={styles["job-page__prose"]}>
              <RichText value={job.description} />
            </div>

            <DetailList title="Tareas a realizar" items={job.tasks} />
            <DetailList title="Requisitos excluyentes" items={job.mandatoryRequirements} />
            <DetailList title="Requisitos no excluyentes" items={job.optionalRequirements} />
            <DetailList title="Beneficios" items={job.benefits} />
          </div>

          <aside className={styles["job-page__aside"]}>
            <TearOff email={job.contactEmail} available={job.available ?? false} />

            <div className={styles["job-page__share"]}>
              <span className={styles["job-page__share-title"]}>Compartir oferta</span>
              <Link
                className={styles["job-page__share-link"]}
                href={`https://wa.me/?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir por WhatsApp"
              >
                <WhatsappIcon size={20} />
              </Link>
              <Link
                className={styles["job-page__share-link"]}
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en Facebook"
              >
                <FacebookIcon size={20} />
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </PageTransition>
  );
}
