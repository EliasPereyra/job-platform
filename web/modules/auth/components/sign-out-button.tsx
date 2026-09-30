"use client";

import { useRouter } from "next/navigation";
import { Activity, useState, type ComponentProps } from "react";

import { Loader } from "@/shared/components/loader/loader";
import { authClient } from "../auth-client";

export function SignOutButton({
  children,
  ...props
}: Omit<ComponentProps<"button">, "onClick" | "type" | "disabled">) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleSignOut} disabled={pending} {...props}>
      <Activity mode={pending ? "visible" : "hidden"}>
        <Loader size={16} tone="inherit" label="Cerrando sesión" />
      </Activity>
      {children}
    </button>
  );
}
