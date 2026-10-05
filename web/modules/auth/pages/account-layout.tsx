import type { ReactNode } from "react";

import backdrop from "@/shared/styles/backdrop.module.css";
import { AccountSidebar } from "../components/account-sidebar";
import styles from "./account-layout.module.css";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${backdrop.backdrop} ${styles["account-layout"]}`}>
      <AccountSidebar />
      <div className={styles["account-layout__content"]}>{children}</div>
    </div>
  );
}
