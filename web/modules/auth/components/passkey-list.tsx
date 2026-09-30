"use client";

import { Activity, useState } from "react";

import { Loader } from "@/shared/components/loader/loader";
import { authClient } from "../auth-client";
import { getErrorMessage } from "../utils/error-messages";
import formStyles from "./auth-form.module.css";
import styles from "./passkey-list.module.css";

const dateFormat = new Intl.DateTimeFormat("es-AR", { dateStyle: "medium" });

export function PasskeyList() {
  const { data: passkeys, isPending } = authClient.useListPasskeys();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleAdd() {
    setPending(true);
    setError(null);

    const { error } = await authClient.passkey.addPasskey();

    setPending(false);
    if (error) setError(getErrorMessage(error));
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError(null);

    const { error } = await authClient.passkey.deletePasskey({ id });

    setDeletingId(null);
    if (error) setError(getErrorMessage(error));
  }

  return (
    <div className={styles["passkey-list"]}>
      <Activity mode={isPending ? "visible" : "hidden"}>
        <Loader size={32} label="Cargando passkeys" />
      </Activity>
      <Activity mode={isPending ? "hidden" : "visible"}>
        {passkeys?.length ? (
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
                  disabled={deletingId !== null}
                >
                  <Activity mode={deletingId === passkey.id ? "visible" : "hidden"}>
                    <Loader size={16} tone="inherit" label="Eliminando" />
                  </Activity>
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
      </Activity>
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
        <Activity mode={pending ? "visible" : "hidden"}>
          <Loader size={20} tone="inherit" />
        </Activity>
        Agregar passkey
      </button>
    </div>
  );
}
