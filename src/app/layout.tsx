import { draftMode } from "next/headers";
import { Raleway } from "next/font/google";

import "@/app/globals.css";
import styles from "./layout.module.css";

import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import Navigation from "@/components/Globals/Navigation/Navigation";

const raleway = Raleway({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body className={raleway.className}>
        {isEnabled && <PreviewNotice />}
        <div className={styles.layout}>
          <Navigation />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
