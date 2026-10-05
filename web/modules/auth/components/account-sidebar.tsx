"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Setting2 } from "reicon-react";

import { useFavorites } from "@/modules/favorites/context/favorites-context";
import { SAVED_JOBS_HREF } from "@/modules/favorites/utils/routes";
import { CountBadge } from "@/shared/components/count-badge/count-badge";
import styles from "./account-sidebar.module.css";

const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

export function AccountSidebar() {
  const pathname = withSlash(usePathname());
  const { ready, count } = useFavorites();

  const items = [
    { href: "/perfil/", label: "Configuración", icon: Setting2 },
    { href: SAVED_JOBS_HREF, label: "Empleos guardados", icon: Heart, count: ready ? count : null },
  ];

  return (
    <nav className={styles["account-sidebar"]} aria-label="Mi cuenta">
      <p className={styles["account-sidebar__title"]}>Mi cuenta</p>
      <ul className={styles["account-sidebar__list"]}>
        {items.map(({ href, label, icon: Icon, count }) => (
          <li key={href}>
            <Link
              className={styles["account-sidebar__link"]}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon size={20} aria-hidden />
              <span className={styles["account-sidebar__label"]}>{label}</span>
              {count ? <CountBadge count={count} /> : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
