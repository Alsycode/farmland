export function buildQueryParams({ page = 1, limit = 12, q, minPrice, maxPrice, tags, status, sort } = {}) {
  const params = { page, limit };
  if (q) params.q = q;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;
  if (tags) params.tags = tags;
  if (status) params.status = status;
  if (sort) params.sort = sort;
  return params;
}