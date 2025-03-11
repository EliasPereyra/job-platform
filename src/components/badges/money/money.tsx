import { MoneyIcon } from "../../icons/money";

import styles from "./money.module.css";

export default function Money({
  color = "#c7ffc7",
  salary,
}: {
  color?: string;
  salary: string;
}) {
  return (
    <div className={styles.salary}>
      <MoneyIcon color={color} arialabel="Icono de dinero" />
      <p style={{ color: color }} className={styles.salaryText}>
        {salary}
      </p>
    </div>
  );
}
