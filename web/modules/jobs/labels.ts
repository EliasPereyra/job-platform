import type { JobModality, JobWorkingDay } from "@/modules/cms";
import { cleanCmsValue } from "@/modules/cms/clean";

const MODALITY_LABELS: Record<JobModality, string> = {
  presencial: "Presencial",
  remoto: "Remoto",
  hibrido: "Híbrido",
};

const WORKING_DAY_LABELS: Record<JobWorkingDay, string> = {
  "full-time": "Jornada completa",
  "part-time": "Media jornada",
  shifts: "Por turnos",
  weekends: "Fines de semana",
  temporary: "Eventual",
};

export const modalityLabel = (value: string) =>
  MODALITY_LABELS[cleanCmsValue(value) as JobModality] ?? value;

export const workingDayLabel = (value: string) =>
  WORKING_DAY_LABELS[cleanCmsValue(value) as JobWorkingDay] ?? value;

export const formatLocation = (job: { city: string | null; province: string }) =>
  [job.city, job.province].filter(Boolean).join(", ");
