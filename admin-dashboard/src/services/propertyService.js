// path: src/services/propertyService.js
import api from './apiClient';

/**
 * propertyService
 * - list(params) => GET /properties
 * - get(id) => GET /properties/:id
 * - create(formData) => POST /properties (multipart)
 * - update(id, formData) => PUT /properties/:id (multipart)
 * - remove(id) => DELETE /properties/:id
 *
 * Note: formData should be a FormData instance when images/files are included.
 */

function list(params = {}) {
  // params: { page, limit, q, minPrice, maxPrice, tags, status, sort }
  return api.get('/properties', { params }).then(res => res.data);
}

function get(id) {
  return api.get(`/properties/${id}`).then(res => res.data);
}

function create(formData) {
  // send multipart/form-data; axios will set headers automatically when FormData passed
  return api.post('/properties', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
}

function update(id, formData) {
  return api.put(`/properties/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
}

function remove(id) {
  return api.delete(`/properties/${id}`).then(res => res.data);
}

export default {
  list,
  get,
  create,
  update,
  remove
};
