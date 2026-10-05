export const SAVED_JOBS_HREF = "/perfil/favoritos/";

export const savedJobsHref = (page = 1) =>
  page > 1 ? `${SAVED_JOBS_HREF}?page=${page}` : SAVED_JOBS_HREF;
