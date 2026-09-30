import type { Metadata } from "next";

import SignUpPage from "@/modules/auth/pages/sign-up-page";

export const metadata: Metadata = {
  title: "Crear cuenta",
  robots: { index: false },
};

export default function Page() {
  return <SignUpPage />;
}
