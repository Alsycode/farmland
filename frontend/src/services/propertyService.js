// path: src/services/propertyService.js
import api from './apiClient';

/**
 * propertyService - wrapper for public property endpoints
 * - list(params) => GET /properties
 * - get(id) => GET /properties/:id
 * - shortlistToggle(propertyId) => POST /favorites/toggle (used from ShortlistButton)
 */

function list(params = {}) {
  return api.get('/properties', { params }).then(r => r.data);
}

function get(id) {
  return api.get(`/properties/${id}`).then(r => r.data);
}

function shortlistToggle(propertyId) {
  return api.post('/favorites/toggle', { propertyId }).then(r => r.data);
}

export default { list, get, shortlistToggle };
