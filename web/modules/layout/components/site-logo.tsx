import { CmsImage } from "@/modules/cms/cms-image";
import type { SiteSettingsResult } from "@/modules/cms";

import styles from "./site-logo.module.css";

export function SiteLogo({
  settings,
  size = "sm",
}: {
  settings: SiteSettingsResult;
  size?: "sm" | "lg";
}) {
  const title = settings?.title ?? "WorkStart";

  if (settings?.logo?.asset) {
    return <CmsImage value={settings.logo} alt={title} width={size === "lg" ? 64 : 48} height={32} />;
  }

  return <span className={`${styles.wordmark} ${styles[size]}`}>{title}</span>;
}
