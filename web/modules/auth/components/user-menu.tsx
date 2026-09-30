"use client";

import Link from "next/link";

import { authClient } from "../auth-client";
import { Avatar } from "./avatar";
import { SignOutButton } from "./sign-out-button";
import styles from "./user-menu.module.css";

export function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending)
    return (
      <span className={styles["user-menu__placeholder"]} aria-hidden="true" />
    );

  if (!session) {
    return (
      <div className={styles["user-menu"]}>
        <Link className={styles["user-menu__sign-in"]} href="/ingresar/">
          Ingresar
        </Link>
        <Link className={styles["user-menu__sign-up"]} href="/registrarse/">
          Crear cuenta
        </Link>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className={styles["user-menu"]}>
      <button
        className={styles["user-menu__trigger"]}
        type="button"
        popoverTarget="user-menu"
        aria-label={`Menú de ${user.name}`}
      >
        <Avatar name={user.name} image={user.image} />
      </button>
      <div
        className={styles["user-menu__popover"]}
        id="user-menu"
        popover="auto"
      >
        <p className={styles["user-menu__name"]}>{user.name}</p>
        <p className={styles["user-menu__email"]}>{user.email}</p>
        <hr className={styles["user-menu__separator"]} />
        <Link
          className={styles["user-menu__item"]}
          href="/perfil/"
          onClick={closeMenu}
        >
          Ver perfil
        </Link>
        <SignOutButton className={styles["user-menu__item"]}>
          Cerrar sesión
        </SignOutButton>
      </div>
    </div>
  );
}

function closeMenu() {
  document.getElementById("user-menu")?.hidePopover();
}
