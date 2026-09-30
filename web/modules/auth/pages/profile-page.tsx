import { redirect } from "next/navigation";

import { Avatar } from "../components/avatar";
import { PasskeyList } from "../components/passkey-list";
import { SignOutButton } from "../components/sign-out-button";
import { getSession } from "../utils/session";
import formStyles from "../components/auth-form.module.css";
import styles from "./profile-page.module.css";

const dateFormat = new Intl.DateTimeFormat("es-AR", { dateStyle: "long" });

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/ingresar/?next=/perfil/");

  const { user } = session;

  return (
    <section className={styles.profile}>
      <header className={styles["profile__header"]}>
        <Avatar name={user.name} image={user.image} size="lg" />
        <div>
          <h1 className={styles["profile__name"]}>{user.name}</h1>
          <p className={styles["profile__muted"]}>
            Miembro desde el {dateFormat.format(user.createdAt)}
          </p>
        </div>
      </header>

      <section className={styles["profile__section"]}>
        <h2 className={styles["profile__section-title"]}>Datos de la cuenta</h2>
        <dl className={styles["profile__details"]}>
          <dt>Email</dt>
          <dd>{user.email}</dd>
          {user.username && (
            <>
              <dt>Usuario</dt>
              <dd>{user.displayUsername || user.username}</dd>
            </>
          )}
        </dl>
      </section>

      <section className={styles["profile__section"]}>
        <h2 className={styles["profile__section-title"]}>Passkeys</h2>
        <PasskeyList />
      </section>

      <SignOutButton
        className={`${formStyles.button} ${formStyles["button--ghost"]}`}
      >
        Cerrar sesión
      </SignOutButton>
    </section>
  );
}
