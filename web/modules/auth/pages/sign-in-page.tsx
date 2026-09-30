import { redirect } from "next/navigation";

import { SignInForm } from "../components/sign-in-form";
import { getSession } from "../utils/session";
import styles from "./auth-page.module.css";

export default async function SignInPage() {
  if (await getSession()) redirect("/perfil/");

  return (
    <section className={styles["auth-page"]}>
      <SignInForm />
    </section>
  );
}
