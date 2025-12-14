// path: src/services/adminService.js
import api from './apiClient';

/**
 * adminService - client wrappers for admin routes
 * - listUsers(params) => GET /admin/users
 * - getUser(id) => GET /admin/users/:id
 * - updateUser(id, body) => PUT /admin/users/:id
 * - deleteUser(id) => DELETE /admin/users/:id
 */

function listUsers(params = {}) {
  return api.get('/admin/users', { params }).then(r => r.data);
}

function getUser(id) {
  return api.get(`/admin/users/${id}`).then(r => r.data);
}

function updateUser(id, body) {
  return api.put(`/admin/users/${id}`, body).then(r => r.data);
}

function deleteUser(id) {
  return api.delete(`/admin/users/${id}`).then(r => r.data);
}

export default {
  listUsers,
  getUser,
  updateUser,
  deleteUser
};
