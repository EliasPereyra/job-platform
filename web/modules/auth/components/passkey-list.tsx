"use client";

import { useState } from "react";

import { authClient } from "../auth-client";
import { getErrorMessage } from "../utils/error-messages";
import formStyles from "./auth-form.module.css";
import styles from "./passkey-list.module.css";

const dateFormat = new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" });

export function PasskeyList() {
  const { data: passkeys, isPending } = authClient.useListPasskeys();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleAdd() {
    setPending(true);
    setError(null);

    const { error } = await authClient.passkey.addPasskey();

    setPending(false);
    if (error) setError(getErrorMessage(error));
  }

  async function handleDelete(id: string) {
    setError(null);

    const { error } = await authClient.passkey.deletePasskey({ id });
    if (error) setError(getErrorMessage(error));
  }

  return (
    <div className={styles["passkey-list"]}>
      {isPending ? (
        <p className={styles["passkey-list__muted"]}>Cargando…</p>
      ) : passkeys?.length ? (
        <ul className={styles["passkey-list__items"]}>
          {passkeys.map((passkey) => (
            <li className={styles["passkey-list__item"]} key={passkey.id}>
              <span>
                {passkey.name || "Passkey"}
                <span className={styles["passkey-list__muted"]}>
                  {" "}
                  · creada el {dateFormat.format(new Date(passkey.createdAt))}
                </span>
              </span>
              <button
                className={styles["passkey-list__delete"]}
                type="button"
                onClick={() => handleDelete(passkey.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles["passkey-list__muted"]}>
          Todavía no agregaste ninguna passkey.
        </p>
      )}
      {error && (
        <p className={formStyles["auth-form__error"]} role="alert">
          {error}
        </p>
      )}
      <button
        className={`${formStyles.button} ${formStyles["button--ghost"]}`}
        type="button"
        onClick={handleAdd}
        disabled={pending}
      >
        Agregar passkey
      </button>
    </div>
  );
}
