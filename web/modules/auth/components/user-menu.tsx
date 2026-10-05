"use client";

import Link from "next/link";
import { Activity } from "react";
import { Heart, Logout, User as UserIcon } from "reicon-react";

import { SAVED_JOBS_HREF } from "@/modules/favorites/utils/routes";
import { Loader } from "@/shared/components/loader/loader";
import { authClient } from "../auth-client";
import { Avatar } from "./avatar";
import { SignOutButton } from "./sign-out-button";
import styles from "./user-menu.module.css";

type User = { name: string; email: string; image?: string | null };

export function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <>
      <Activity mode={isPending ? "visible" : "hidden"}>
        <span className={styles["user-menu__placeholder"]}>
          <Loader size={28} label="Cargando sesión" />
        </span>
      </Activity>
      <Activity mode={isPending ? "hidden" : "visible"}>
        {session ? <SignedInMenu user={session.user} /> : <SignedOutMenu />}
      </Activity>
    </>
  );
}

function SignedOutMenu() {
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

function SignedInMenu({ user }: { user: User }) {
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
          <UserIcon size={18} aria-hidden />
          Ver perfil
        </Link>
        <Link
          className={styles["user-menu__item"]}
          href={SAVED_JOBS_HREF}
          onClick={closeMenu}
        >
          <Heart size={18} aria-hidden />
          Empleos guardados
        </Link>
        <SignOutButton className={styles["user-menu__item"]}>
          <Logout size={18} aria-hidden />
          Cerrar sesión
        </SignOutButton>
      </div>
    </div>
  );
}

function closeMenu() {
  document.getElementById("user-menu")?.hidePopover();
}
