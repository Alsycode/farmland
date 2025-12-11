// path: src/tests/setup.js
/**
 * Jest setup: starts an in-memory MongoDB server and connects Mongoose.
 * Also exposes a helper `global.__MONGO_URI__` for tests that need direct URI.
 */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: { dbName: 'testdb' }
  });
  const uri = mongoServer.getUri();
  process.env.MONGO_URI = uri; // ensure db connection uses this
  global.__MONGO_URI__ = uri;

  // Import connectDB (delayed) to ensure MONGO_URI is set
  // connectDB uses mongoose.connect
  const { connectDB } = require('../config/db');
  await connectDB();
});

afterAll(async () => {
  // Disconnect mongoose and stop in-memory server
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});
