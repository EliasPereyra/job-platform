"use client";
import styles from "./preview-notice.module.css";
import { usePathname } from "next/navigation";

export const PreviewNotice = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.preview}>
      Modo borrador activado
      <a
        className={styles.link}
        href={`/api/draft-mode/disable?path=${encodeURIComponent(pathname)}`}
      >
        Salir
      </a>
    </aside>
  );
};
