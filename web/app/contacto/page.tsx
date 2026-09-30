import type { Metadata } from "next";

import ContactTemplate from "@/modules/static/pages/contact-template";

export const metadata: Metadata = {
  title: "Contacto",
  alternates: { canonical: "/contacto/" },
};

export default function ContactPage() {
  return <ContactTemplate />;
}
