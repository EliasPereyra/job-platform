"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

import { authClient } from "../auth-client";

export function SignOutButton(props: Omit<ComponentProps<"button">, "onClick" | "type">) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return <button type="button" onClick={handleSignOut} {...props} />;
}
