"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Activity, useState, useSyncExternalStore, type FormEvent } from "react";

import { Loader } from "@/shared/components/loader/loader";
import { authClient } from "../auth-client";
import { getErrorMessage, safeRedirect } from "../utils/error-messages";
import { serializePasskeySignUp } from "../utils/passkey-sign-up";
import styles from "./auth-form.module.css";

type Method = "passkey" | "password";

const subscribeNoop = () => () => {};
const hasWebAuthn = () => Boolean(window.PublicKeyCredential);

export function SignUpForm() {
  const router = useRouter();
  const next = safeRedirect(useSearchParams().get("next"));
  const passkeySupported = useSyncExternalStore(
    subscribeNoop,
    hasWebAuthn,
    () => true,
  );
  const [chosenMethod, setMethod] = useState<Method>("passkey");
  const method = passkeySupported ? chosenMethod : "password";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();

    setPending(true);
    setError(null);
    const { error } =
      method === "passkey"
        ? await authClient.passkey.addPasskey({
            context: serializePasskeySignUp({ name, email }),
            createSession: true,
          })
        : await authClient.signUp.email({
            name,
            email,
            password: String(form.get("password")),
            username: String(form.get("username")).trim() || undefined,
          });
    setPending(false);

    if (error) {
      setError(getErrorMessage(error));
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className={styles["auth-card"]}>
      <div>
        <h1 className={styles["auth-card__title"]}>Crear cuenta</h1>
        <p className={styles["auth-card__lead"]}>
          Ver empleos es libre; con una cuenta vas a poder hacer más.
        </p>
      </div>

      {passkeySupported && (
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Método de registro"
        >
          <button
            className={styles.tabs__tab}
            type="button"
            role="tab"
            aria-selected={method === "passkey"}
            onClick={() => setMethod("passkey")}
          >
            Sin contraseña
          </button>
          <button
            className={styles.tabs__tab}
            type="button"
            role="tab"
            aria-selected={method === "password"}
            onClick={() => setMethod("password")}
          >
            Con contraseña
          </button>
        </div>
      )}

      <form className={styles["auth-form"]} onSubmit={handleSubmit}>
        <label className={styles["auth-form__field"]}>
          Nombre
          <input
            className={styles["auth-form__input"]}
            name="name"
            autoComplete="name"
            required
          />
        </label>
        <label className={styles["auth-form__field"]}>
          Email
          <input
            className={styles["auth-form__input"]}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>

        {/* Kept mounted so typed values survive switching tabs; disabled inputs
            skip validation and are left out of the form data. */}
        <Activity mode={method === "password" ? "visible" : "hidden"}>
          <label className={styles["auth-form__field"]}>
            <span>
              Usuario{" "}
              <span className={styles["auth-form__hint"]}>(opcional)</span>
            </span>
            <input
              className={styles["auth-form__input"]}
              name="username"
              autoComplete="username"
              minLength={3}
              pattern="[A-Za-z0-9_.]+"
              disabled={method !== "password"}
            />
          </label>
          <label className={styles["auth-form__field"]}>
            Contraseña
            <input
              className={styles["auth-form__input"]}
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              disabled={method !== "password"}
            />
          </label>
        </Activity>

        <Activity mode={method === "passkey" ? "visible" : "hidden"}>
          <p className={styles["auth-form__hint"]}>
            Vas a usar la huella, el rostro o el PIN de tu dispositivo para
            ingresar. No hace falta recordar nada.
          </p>
        </Activity>

        {error && (
          <p className={styles["auth-form__error"]} role="alert">
            {error}
          </p>
        )}
        <button className={styles.button} type="submit" disabled={pending}>
          <Activity mode={pending ? "visible" : "hidden"}>
            <Loader size={20} tone="on-action" />
          </Activity>
          {method === "passkey" ? "Crear cuenta con passkey" : "Crear cuenta"}
        </button>
      </form>

      <p className={styles["auth-card__footer"]}>
        ¿Ya tenés cuenta?{" "}
        <Link
          className={styles.link}
          href={`/ingresar/?next=${encodeURIComponent(next)}`}
        >
          Ingresá
        </Link>
      </p>
    </div>
  );
}
