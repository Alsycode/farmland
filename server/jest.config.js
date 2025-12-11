// path: jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/tests/setup.js'],
  testTimeout: 30000
};
