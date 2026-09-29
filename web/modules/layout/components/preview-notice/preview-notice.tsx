"use client";
import styles from "./preview-notice.module.css";
import { usePathname } from "next/navigation";

export const PreviewNotice = () => {
  const pathname = usePathname();

  return (
    <aside className={styles["preview-notice"]}>
      Modo borrador activado
      <a
        className={styles["preview-notice__link"]}
        href={`/api/draft-mode/disable?path=${encodeURIComponent(pathname)}`}
      >
        Salir
      </a>
    </aside>
  );
};
