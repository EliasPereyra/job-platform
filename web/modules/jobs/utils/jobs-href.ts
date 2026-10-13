export const jobsHref = ({
  page = 1,
  province,
  category,
}: {
  page?: number;
  province?: string | null;
  category?: string | null;
} = {}) => {
  const params = new URLSearchParams();
  if (province) params.set("provincia", province);
  if (category) params.set("categoria", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/todos-los-trabajos/?${query}` : "/todos-los-trabajos/";
};
