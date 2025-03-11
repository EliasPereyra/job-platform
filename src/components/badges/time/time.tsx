import { Maybe } from "graphql/jsutils/Maybe";
import { TimeIcon } from "../../icons/time";

import styles from "./time.module.css";

export default function Time({
  workingDay,
}: {
  workingDay: string | Maybe<string>[];
}) {
  return (
    <div className={styles.time}>
      <TimeIcon color="#fff" arialabel="Icono de reloj" />
      <p className={styles.timeText}>
        <strong>{workingDay}</strong>
      </p>
    </div>
  );
}
