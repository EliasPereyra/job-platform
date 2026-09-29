import Link from "next/link";

import { getSiteSettings } from "@/modules/cms";
import { TransitionLink } from "@/shared/components/transition-link/transition-link";
import { SiteLogo } from "../site-logo";
import { WhatsappIcon } from "@/shared/components/icons/whatsapp";
import { FacebookIcon } from "@/shared/components/icons/facebook";
import { InstagramIcon } from "@/shared/components/icons/instagram";

import styles from "./footer.module.css";

const PAGES = [
  { href: "/todos-los-trabajos", label: "Trabajos" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className={styles.footer}>
      <div className={styles["footer__brand"]}>
        <Link href="/">
          <SiteLogo settings={settings} size="lg" />
        </Link>
        <p className={styles["footer__description"]}>
          Ofertas de trabajo sin experiencia en Argentina. Sin registro y con
          contacto directo con cada empresa.
        </p>
        <ul className={styles["footer__social"]}>
          <li>
            <Link className={styles["footer__social-link"]} href="#" aria-label="WhatsApp">
              <WhatsappIcon size={22} />
            </Link>
          </li>
          <li>
            <Link className={styles["footer__social-link"]} href="#" aria-label="Facebook">
              <FacebookIcon size={22} />
            </Link>
          </li>
          <li>
            <Link className={styles["footer__social-link"]} href="#" aria-label="Instagram">
              <InstagramIcon size={22} />
            </Link>
          </li>
        </ul>
      </div>

      <nav className={styles["footer__pages"]} aria-label="Páginas">
        <h2 className={styles["footer__title"]}>Páginas</h2>
        <ul className={styles["footer__list"]}>
          {PAGES.map((page) => (
            <li key={page.href}>
              <TransitionLink className={styles["footer__link"]} href={page.href} transitionType="nav-lateral">
                {page.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>

      <small className={styles["footer__credits"]}>
        Diseñado y desarrollado por{" "}
        <Link className={styles["footer__credits-link"]} href="https://github.com/EliasPereyra">
          Elias Pereyra
        </Link>
      </small>
    </footer>
  );
}
