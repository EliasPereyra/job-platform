import { BuildingIcon } from "./icons/building";
import WorldIcon from "./icons/world";

import styles from "./modality.module.css";

export default function Modality({
  color = "#fefff4",
  modality,
}: {
  color?: string;
  modality: string;
}) {
  return (
    <div className={styles.modality}>
      {modality.includes("Remoto") ? (
        <WorldIcon size={20} color={color} arialabel="Icono de mundo" />
      ) : (
        <BuildingIcon size={20} color={color} arialabel="Icono de edificio" />
      )}
      <p style={{ color: color }} className={styles.modalityText}>
        {modality}
      </p>
    </div>
  );
}
