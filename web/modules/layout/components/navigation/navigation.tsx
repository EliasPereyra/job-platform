import { getSiteSettings } from "@/modules/cms";
import { TransitionLink } from "@/shared/components/transition-link/transition-link";
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
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <TransitionLink className={styles["navigation__brand"]} href="/" transitionType="nav-lateral">
        <SiteLogo settings={settings} />
      </TransitionLink>
      <ul className={styles["navigation__menu"]}>
        {items.map((item) => (
          <li key={item._key}>
            <TransitionLink
              className={styles["navigation__link"]}
              itemProp="url"
              href={item.href}
              transitionType="nav-lateral"
            >
              <span itemProp="name">{item.label}</span>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
