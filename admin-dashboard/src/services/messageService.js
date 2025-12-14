// path: src/services/messageService.js
import api from './apiClient';

/**
 * Message service
 * - send(payload) => POST /messages
 * - list(params) => GET /messages (box=inbox|sent)
 * - markRead(id) => POST /messages/:id/read
 * - delete(id) => DELETE /messages/:id
 */
function send(payload) {
  return api.post('/messages', payload).then(r => r.data);
}

function list(params = {}) {
  return api.get('/messages', { params }).then(r => r.data);
}

function markRead(id) {
  return api.post(`/messages/${id}/read`).then(r => r.data);
}

function remove(id) {
  return api.delete(`/messages/${id}`).then(r => r.data);
}

export default { send, list, markRead, remove };
