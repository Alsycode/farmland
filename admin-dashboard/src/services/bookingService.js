// path: src/services/bookingService.js
import api from './apiClient';

/**
 * Booking service (matches backend routes)
 * - create(payload) => POST /bookings
 * - list(params) => GET /bookings
 * - get(id) => GET /bookings/:id
 * - update(id, body) => PUT /bookings/:id
 */
function create(payload) {
  return api.post('/bookings', payload).then(r => r.data);
}

function list(params = {}) {
  return api.get('/bookings', { params }).then(r => r.data);
}

function get(id) {
  return api.get(`/bookings/${id}`).then(r => r.data);
}

function update(id, body) {
  return api.put(`/bookings/${id}`, body).then(r => r.data);
}

export default { create, list, get, update };
