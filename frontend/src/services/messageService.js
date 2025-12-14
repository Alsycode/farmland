// path: src/services/messageService.js
import api from './apiClient';

/**
 * messageService:
 * - send(payload) => POST /messages
 * - list(params) => GET /messages
 * - get(id) => GET /messages/:id
 */
function send(payload) {
  return api.post('/messages', payload).then(r => r.data);
}

function list(params = {}) {
  return api.get('/messages', { params }).then(r => r.data);
}

function get(id) {
  return api.get(`/messages/${id}`).then(r => r.data);
}

export default { send, list, get };
