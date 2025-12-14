// path: src/services/favoriteService.js
import api from './apiClient';

/**
 * favoriteService:
 * - list(params) => GET /favorites
 * - toggle(propertyId) => POST /favorites/toggle
 * - remove(id) => DELETE /favorites/:id
 */
function list(params = {}) {
  return api.get('/favorites', { params }).then(r => r.data);
}

function toggle(propertyId) {
  return api.post('/favorites/toggle', { propertyId }).then(r => r.data);
}

function remove(id) {
  return api.delete(`/favorites/${id}`).then(r => r.data);
}

export default { list, toggle, remove };
