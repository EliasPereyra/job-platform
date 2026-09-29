// URL of the jobs list, optionally narrowed to a province.
export const jobsHref = ({ page = 1, province }: { page?: number; province?: string | null } = {}) => {
  const params = new URLSearchParams();
  if (province) params.set("provincia", province);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/todos-los-trabajos/?${query}` : "/todos-los-trabajos/";
};
