"use client";

import { useState } from "react";
import { Copy, CopySuccess } from "reicon-react";

import styles from "./tear-off.module.css";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className={`${styles["tear-off__copy"]} ${copied ? styles["tear-off__copy--done"] : ""}`}
      onClick={handleCopy}
    >
      {copied ? <CopySuccess size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
      <span aria-live="polite">{copied ? "Correo copiado" : "Copiar correo"}</span>
    </button>
  );
}
