"use client";

import { useState } from "react";
import { Menu, Xmark } from "reicon-react";

import { TransitionLink } from "@/shared/components/transition-link/transition-link";
import styles from "./navigation.module.css";

type NavigationItem = { _key: string; label: string; href: string };

export function MobileMenu({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles["navigation__burger"]}
        type="button"
        popoverTarget="site-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        {open ? (
          <Xmark size={22} aria-hidden />
        ) : (
          <Menu size={22} aria-hidden />
        )}
      </button>
      <div
        className={styles["navigation__dropdown"]}
        id="site-menu"
        popover="auto"
        onToggle={(event) => setOpen(event.newState === "open")}
      >
        <ul className={styles["navigation__dropdown-list"]}>
          {items.map((item) => (
            <li key={item._key}>
              <TransitionLink
                className={styles["navigation__dropdown-link"]}
                href={item.href}
                transitionType="nav-lateral"
                onClick={closeMenu}
              >
                {item.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function closeMenu() {
  document.getElementById("site-menu")?.hidePopover();
}
