// path: src/services/favoriteService.js
import api from './apiClient';

/**
 * Favorite service
 * - toggle(propertyId) => POST /favorites/toggle
 * - list(params) => GET /favorites
 * - remove(id) => DELETE /favorites/:id
 */
function toggle(propertyId) {
  return api.post('/favorites/toggle', { propertyId }).then(r => r.data);
}

function list(params = {}) {
  return api.get('/favorites', { params }).then(r => r.data);
}

function remove(id) {
  return api.delete(`/favorites/${id}`).then(r => r.data);
}

export default { toggle, list, remove };
