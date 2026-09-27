import Link from "next/link";

import { getSiteSettings } from "@/modules/cms";
import { SiteLogo } from "../site-logo";
import styles from "./navigation.module.css";

const DEFAULT_NAVIGATION = [
  { _key: "jobs", label: "Trabajos", href: "/todos-los-trabajos" },
  { _key: "about", label: "Sobre nosotros", href: "/sobre-nosotros" },
  { _key: "contact", label: "Contacto", href: "/contacto" },
];

export default async function Navigation() {
  const settings = await getSiteSettings();
  const items = settings?.navigation?.length ? settings.navigation : DEFAULT_NAVIGATION;

  return (
    <nav
      className={styles.navigation}
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <Link href="/">
        <SiteLogo settings={settings} />
      </Link>
      <ul className={styles.menu}>
        {items.map((item) => (
          <li key={item._key}>
            <Link className={styles.menuItem} itemProp="url" href={item.href}>
              <span itemProp="name">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
