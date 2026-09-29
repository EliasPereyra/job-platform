import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Raleway } from "next/font/google";

import { CmsLive } from "@/modules/cms/live";
import { PreviewNotice } from "@/modules/layout/components/preview-notice/preview-notice";
import Navigation from "@/modules/layout/components/navigation/navigation";
import Footer from "@/modules/layout/components/footer/footer";
import { siteUrl } from "@/shared/utils/site-url";

import "@/styles/tokens.css";
import "@/styles/globals.css";
import "@/styles/view-transitions.css";
import styles from "./layout.module.css";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "WorkStart", template: "%s | WorkStart" },
  description:
    "Trabajos exclusivos que no requieren experiencia laboral previa en Argentina.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="es" className={raleway.variable}>
      <body>
        {isEnabled && <PreviewNotice />}
        <div className={styles.layout}>
          <Navigation />
          <main className={styles["layout__main"]}>{children}</main>
          <Footer />
        </div>
        <CmsLive />
      </body>
    </html>
  );
}
