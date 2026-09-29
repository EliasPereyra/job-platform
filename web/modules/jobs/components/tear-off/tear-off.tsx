import Link from "next/link";
import { Envelope } from "reicon-react";

import { CopyEmailButton } from "./copy-email-button";

import styles from "./tear-off.module.css";

const TABS = 7;

// The contact card is a street flyer: while the offer is open you can "tear" a
// tab with the company email; once it ends, every tab is already gone.
export function TearOff({ email, available }: { email: string; available: boolean }) {
  return (
    <section
      className={`${styles["tear-off"]} ${available ? "" : styles["tear-off--closed"]}`}
      aria-labelledby="tear-off-title"
    >
      <div className={styles["tear-off__body"]}>
        <h2 id="tear-off-title" className={styles["tear-off__title"]}>
          {available ? "Postulate por correo" : "Esta búsqueda ya finalizó"}
        </h2>
        {available ? (
          <>
            <p className={styles["tear-off__text"]}>
              Mandá tu CV directo a la empresa. Contá en el asunto a qué puesto te postulás.
            </p>
            <a className={styles["tear-off__email"]} href={`mailto:${email}`}>
              <Envelope size={20} aria-hidden />
              {email}
            </a>
            <CopyEmailButton email={email} />
          </>
        ) : (
          <p className={styles["tear-off__text"]}>
            La empresa ya no recibe postulaciones para este puesto.{" "}
            <Link className={styles["tear-off__link"]} href="/todos-los-trabajos">
              Ver ofertas disponibles
            </Link>
          </p>
        )}
      </div>

      <div className={styles["tear-off__fringe"]} aria-hidden>
        {Array.from({ length: TABS }, (_, index) => (
          <span key={index} className={styles["tear-off__tab"]} />
        ))}
      </div>
    </section>
  );
}
