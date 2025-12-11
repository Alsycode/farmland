// path: src/tests/auth.controller.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth controller (integration)', () => {
  beforeAll(async () => {
    // ensure users collection is empty
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  test('register -> login flow', async () => {
    const registerPayload = {
      name: 'Integration User',
      email: 'intuser@example.com',
      password: 'Integrate123!'
    };

    // Register
    const regRes = await request(app)
      .post('/api/auth/register')
      .send(registerPayload)
      .set('Accept', 'application/json');

    expect(regRes.status).toBe(201);
    expect(regRes.body.ok).toBe(true);
    expect(regRes.body.user).toBeDefined();
    expect(regRes.body.user.email).toBe(registerPayload.email);

    // Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: registerPayload.email, password: registerPayload.password })
      .set('Accept', 'application/json');

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.ok).toBe(true);
    expect(loginRes.body.accessToken).toBeDefined();

    // Access protected endpoint /api/auth/me using Authorization header
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${loginRes.body.accessToken}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.ok).toBe(true);
    expect(meRes.body.user.email).toBe(registerPayload.email);
  });
});
