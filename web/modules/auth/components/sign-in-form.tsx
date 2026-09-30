"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Activity, useEffect, useState, type FormEvent } from "react";

import { Loader } from "@/shared/components/loader/loader";
import { authClient } from "../auth-client";
import { getErrorMessage, safeRedirect } from "../utils/error-messages";
import styles from "./auth-form.module.css";

export function SignInForm() {
  const router = useRouter();
  const next = safeRedirect(useSearchParams().get("next"));
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<"passkey" | "password" | null>(null);

  const onSuccess = () => {
    router.push(next);
    router.refresh();
  };

  useEffect(() => {
    if (!window.PublicKeyCredential?.isConditionalMediationAvailable) return;
    let active = true;

    window.PublicKeyCredential.isConditionalMediationAvailable().then(
      async (available) => {
        if (!available || !active) return;

        const { data } = await authClient.signIn.passkey({ autoFill: true });
        if (data && active) onSuccess();
      },
    );
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const identifier = String(form.get("identifier")).trim();
    const password = String(form.get("password"));

    setPending("password");
    setError(null);
    const { error } = identifier.includes("@")
      ? await authClient.signIn.email({ email: identifier, password })
      : await authClient.signIn.username({ username: identifier, password });
    setPending(null);

    if (error) setError(getErrorMessage(error));
    else onSuccess();
  }

  async function handlePasskey() {
    setPending("passkey");
    setError(null);
    const { error } = await authClient.signIn.passkey();
    setPending(null);

    if (error) setError(getErrorMessage(error));
    else onSuccess();
  }

  return (
    <div className={styles["auth-card"]}>
      <div>
        <h1 className={styles["auth-card__title"]}>Ingresar</h1>
        <p className={styles["auth-card__lead"]}>
          Bienvenido de nuevo a WorkStart.
        </p>
      </div>

      <button
        className={styles.button}
        type="button"
        onClick={handlePasskey}
        disabled={pending !== null}
      >
        <Activity mode={pending === "passkey" ? "visible" : "hidden"}>
          <Loader size={20} tone="on-action" />
        </Activity>
        Ingresar con passkey
      </button>

      <p className={styles.divider}>o con tu contraseña</p>

      <form className={styles["auth-form"]} onSubmit={handlePassword}>
        <label className={styles["auth-form__field"]}>
          Email o usuario
          <input
            className={styles["auth-form__input"]}
            name="identifier"
            autoComplete="username webauthn"
            required
          />
        </label>
        <label className={styles["auth-form__field"]}>
          Contraseña
          <input
            className={styles["auth-form__input"]}
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        {error && (
          <p className={styles["auth-form__error"]} role="alert">
            {error}
          </p>
        )}
        <button
          className={`${styles.button} ${styles["button--ghost"]}`}
          type="submit"
          disabled={pending !== null}
        >
          <Activity mode={pending === "password" ? "visible" : "hidden"}>
            <Loader size={20} tone="inherit" />
          </Activity>
          Ingresar
        </button>
      </form>

      <p className={styles["auth-card__footer"]}>
        ¿No tenés cuenta?{" "}
        <Link
          className={styles.link}
          href={`/registrarse/?next=${encodeURIComponent(next)}`}
        >
          Creá una
        </Link>
      </p>
    </div>
  );
}
