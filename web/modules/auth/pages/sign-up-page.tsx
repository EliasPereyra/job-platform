import { redirect } from "next/navigation";

import { SignUpForm } from "../components/sign-up-form";
import { getSession } from "../utils/session";
import styles from "./auth-page.module.css";

export default async function SignUpPage() {
  if (await getSession()) redirect("/perfil/");

  return (
    <section className={styles["auth-page"]}>
      <SignUpForm />
    </section>
  );
}
