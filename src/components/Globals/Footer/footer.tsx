import Image from "next/image";
import Link from "next/link";

import { getData } from "@/utils/fetchPrimaryMenu";
import { WhatsappIcon } from "../../icons/whatsapp";
import { FacebookIcon } from "../../icons/facebook";
import { InstagramIcon } from "../../icons/instagram";

import styles from "./footer.module.css";

export default async function Footer() {
  const { mediaItems } = await getData();

  return (
    <footer className={styles.footer}>
      <div className={styles.firstCol}>
        <Link href="/">
          <Image
            style={{ objectFit: "contain", width: "4em", height: "4em" }}
            src={mediaItems.nodes[2].sourceUrl || ""}
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        <p className={styles.footerDescription}>
          Encuentra oportunidades laborales sin experiencia en nuestra bolsa de
          empleo.
        </p>
        <div className={styles.socialMedia}>
          <Link href="#">
            <WhatsappIcon
              arialabel="Icono de whatsapp"
              color="#eee"
              size={30}
            />
          </Link>
          <Link href="#">
            <FacebookIcon
              arialabel="Icono de facebook"
              color="#eee"
              size={30}
            />
          </Link>
          <Link href="#">
            <InstagramIcon
              arialabel="Icono de instagram"
              color="#eee"
              size={30}
            />
          </Link>
        </div>
        <small className={styles.developedBy}>
          Diseñado & Desarrollado por{" "}
          <Link className={styles.link} href="https://github.com/EliasPereyra">
            Elias Pereyra
          </Link>
        </small>
      </div>
      <div className={styles.secondCol}>
        <div className={styles.pages}>
          <h4 className={styles.pagesTitle}>Páginas</h4>
          <Link className={styles.socialMedia} href="/todos-los-trabajos">
            Trabajos
          </Link>
          <Link className={styles.socialMedia} href="/nosotros">
            Sobre nosotros
          </Link>
          <Link className={styles.socialMedia} href="/contacto">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}
