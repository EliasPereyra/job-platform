import { draftMode } from "next/headers";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import styles from "./layout.module.css";

import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body className={inter.className}>
        {isEnabled && <PreviewNotice />}
        <div className={styles.layout}>{children}</div>
      </body>
    </html>
  );
}
