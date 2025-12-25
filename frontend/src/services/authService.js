import api from './apiClient';

async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });

  if (res.data?.accessToken) {
    localStorage.setItem('accessToken', res.data.accessToken);
  }

  return res.data;
}

async function me() {
  const res = await api.get('/auth/me');
  return res.data;
}

async function logout() {
  localStorage.removeItem('accessToken');
  return true;
}

export default {
  login,
  me,
  logout
};
