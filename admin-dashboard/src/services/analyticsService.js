// path: src/services/analyticsService.js
import api from './apiClient';

/**
 * analyticsService wraps analytics endpoints:
 * - overview() => GET /analytics/overview
 * - topViewed(limit) => GET /analytics/top-viewed?limit=
 * - bookingsPerProperty(limit) => GET /analytics/bookings-per-property?limit=
 * - revenue({ from, to }) => GET /analytics/revenue?from=&to=
 */

function overview() {
  return api.get('/analytics/overview').then(r => r.data);
}

function topViewed(limit = 10) {
  return api.get('/analytics/top-viewed', { params: { limit } }).then(r => r.data);
}

function bookingsPerProperty(limit = 10) {
  return api.get('/analytics/bookings-per-property', { params: { limit } }).then(r => r.data);
}

function revenue(from, to) {
  const params = {};
  if (from) params.from = from;
  if (to) params.to = to;
  return api.get('/analytics/revenue', { params }).then(r => r.data);
}

export default {
  overview,
  topViewed,
  bookingsPerProperty,
  revenue
};
