import Image from "next/image";
import styles from "./benefit.module.css";

export function Benefit({
  key,
  img,
  title,
  description,
  reverse = false,
}: {
  key: number;
  img: string;
  title: string;
  description: string;
  reverse: boolean;
}) {
  return (
    <li key={key} className={reverse ? styles.listLeft : styles.listRight}>
      <div
        className={
          reverse ? styles.benefitContainerLeft : styles.benefitContainerRight
        }
      >
        <Image src={img} alt="" width={40} height={40} />
        <div className={styles.benefitContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </li>
  );
}
