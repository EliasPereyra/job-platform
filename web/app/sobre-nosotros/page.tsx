import type { Metadata } from "next";

import AboutTemplate from "@/modules/static/pages/about-template";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  alternates: { canonical: "/sobre-nosotros/" },
};

export default function AboutPage() {
  return <AboutTemplate />;
}
