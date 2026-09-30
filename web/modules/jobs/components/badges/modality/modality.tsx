import { Buildings2, HomeWifi, Laptop } from "reicon-react";

import { cleanCmsValue } from "@/modules/cms/utils/clean";
import { modalityLabel } from "../../../utils/labels";
import styles from "../badge.module.css";

const ICONS = { presencial: Buildings2, remoto: Laptop, hibrido: HomeWifi };

export default function Modality({ modality }: { modality: string }) {
  const Icon = ICONS[cleanCmsValue(modality) as keyof typeof ICONS] ?? Buildings2;

  return (
    <span className={`${styles.badge} ${styles["badge--modality"]}`}>
      <Icon className={styles["badge__icon"]} size={16} aria-hidden />
      {modalityLabel(modality)}
    </span>
  );
}
