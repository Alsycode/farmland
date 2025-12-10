// path: src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set in environment');
  }
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri, {
    // useNewUrlParser, useUnifiedTopology etc are default in Mongoose 7+
  });
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
};

module.exports = { connectDB };
