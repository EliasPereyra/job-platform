import Link from "next/link";
import type { ComponentProps } from "react";

export type TransitionType = "nav-forward" | "nav-back" | "nav-lateral";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "transitionTypes"> & {
  href: string;
  transitionType: TransitionType;
};

// Tags the navigation with its direction so page-level <ViewTransition>s
// pick the matching animation. Only the known directions are allowed.
export function TransitionLink({ transitionType, ...props }: TransitionLinkProps) {
  return <Link transitionTypes={[transitionType]} {...props} />;
}
