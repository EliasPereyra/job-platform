import { Eye, Gift, LockOpen, Send } from "reicon-react";

export const BENEFITS = [
  {
    icon: LockOpen,
    tone: "purple",
    title: "Sin registro",
    text: "Todas las ofertas están abiertas. No hace falta crear una cuenta ni recordar contraseñas.",
  },
  {
    icon: Send,
    tone: "blue",
    title: "Contacto directo",
    text: "Cada oferta trae el correo de la empresa. Mandás tu CV sin formularios ni intermediarios.",
  },
  {
    icon: Gift,
    tone: "green",
    title: "Gratis para todos",
    text: "No cobramos a quienes buscan trabajo ni a las empresas que publican. Sin suscripciones.",
  },
  {
    icon: Eye,
    tone: "yellow",
    title: "Información completa",
    text: "Tareas, requisitos, beneficios y salario cuando la empresa lo publica, antes de postularte.",
  },
] as const;

export const STEPS = [
  {
    image: "/assets/imgs/jobs.jpg",
    alt: "Lista de ofertas de trabajo de la plataforma",
    title: "Explorá las ofertas",
    text: "Revisá la lista de ofertas y filtrá por puesto o provincia.",
  },
  {
    image: "/assets/imgs/job.jpg",
    alt: "Detalle de una oferta con tareas y requisitos",
    title: "Leé el detalle del puesto",
    text: "Cada oferta explica las tareas, los requisitos, los beneficios y quién es la empresa.",
  },
  {
    image: "/assets/imgs/contact.jpg",
    alt: "Correo de contacto de la empresa en una oferta",
    title: "Escribile a la empresa",
    text: "Copiá el correo de la oferta y mandá tu CV. La empresa te responde directamente.",
  },
];
