// path: src/services/blogService.js
import api from './apiClient';

/**
 * blogService:
 * - list(params) => GET /blogs
 * - get(id) => GET /blogs/:id
 */

function list(params = {}) {
  return api.get('/blogs', { params }).then(r => r.data);
}

function get(id) {
  return api.get(`/blogs/${id}`).then(r => r.data);
}

export default { list, get };
