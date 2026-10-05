import { Toaster as SonnerToaster } from "sonner";

import styles from "./toaster.module.css";

export function Toaster() {
  return (
    <SonnerToaster
      className={styles.toaster}
      position="bottom-right"
      closeButton
      toastOptions={{
        classNames: {
          toast: styles["toaster__toast"],
          description: styles["toaster__description"],
          actionButton: styles["toaster__action"],
        },
      }}
    />
  );
}
