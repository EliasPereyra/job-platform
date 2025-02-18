import styles from "./PageTemplate.module.css";

export default function ContactTemplate() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Contact</h2>
      <p className={styles.description}>
        ¿Tienes dudas, consultas o quieres publicar una oferta laboral en
        Xperience? ¡Estamos aquí para ayudarte!
      </p>
      <p className={styles.description}>
        Escribínos vía{" "}
        <a className={styles.link} href="mailto:contacto@xperience.com">
          email
        </a>{" "}
        o háblanos a nuestro{" "}
        <a className={styles.link} href="https://wa.me/549115555-5555">
          Whasapp
        </a>
      </p>
    </section>
  );
}
