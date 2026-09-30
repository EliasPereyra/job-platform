import type { Metadata } from "next";

import ProfilePage from "@/modules/auth/pages/profile-page";

export const metadata: Metadata = {
  title: "Mi perfil",
  robots: { index: false },
};

export default function Page() {
  return <ProfilePage />;
}
