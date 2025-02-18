import styles from "./PageTemplate.module.css";

export default function AboutTemplate() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Sobre Nosotros</h2>
      <div className={styles.description}>
        <p>
          <strong>
            Creemos que todos merecen la oportunidad de trabajar, y dar el
            primer paso en el mundo laboral es clave para ganar experiencia.
          </strong>
        </p>
        <p>
          Por eso, en 2016, creamos Xperience con la misión de ofrecer
          exclusivamente oportunidades de empleo que no requieran experiencia
          previa.
        </p>
        <p>
          A lo largo de los años, decenas de empresas, organismos públicos y
          emprendedores han confiado en nosotros para conectar con nuevos
          talentos. Nos llena de orgullo ver cómo cada vez más compañías se
          suman a esta iniciativa.
        </p>
        <p>
          Pero lo que más nos motiva es saber que vos, que estás buscando tu
          primera oportunidad, la encuentres pronto.
        </p>
      </div>
    </section>
  );
}
