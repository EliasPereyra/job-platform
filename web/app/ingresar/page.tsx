import type { Metadata } from "next";

import SignInPage from "@/modules/auth/pages/sign-in-page";

export const metadata: Metadata = {
  title: "Ingresar",
  robots: { index: false },
};

export default function Page() {
  return <SignInPage />;
}
