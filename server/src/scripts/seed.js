// path: src/scripts/seed.js
/**
 * Seed script for local development.
 *
 * Usage:
 *   1. Ensure .env has MONGO_URI set (or export MONGO_URI env var).
 *   2. Run: npm run seed
 *
 * Notes:
 * - This script drops the app collections it touches (users, properties, bookings, favorites, messages).
 * - Intended for dev only. Do NOT run against production DB.
 * - You may override seed passwords via env vars:
 *     SEED_ADMIN_PASSWORD, SEED_MANAGER_PASSWORD, SEED_USER_PASSWORD
 */

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const connectDB = require('../config/db').connectDB;
const { dropCollectionsIfExist } = require('../utils/dbHelpers');
const seedData = require('./seedData');

const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const Favorite = require('../models/Favorite');
const Message = require('../models/Message');

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI not set in environment. Copy .env.example to .env and set MONGO_URI.');
      process.exit(1);
    }

    // connect
    await connectDB();

    // Collections to drop first (safe for dev)
    await dropCollectionsIfExist(['users', 'properties', 'bookings', 'favorites', 'messages']);

    // Create users
    console.log('Creating users...');
    const createdUsers = [];
    for (const u of seedData.users) {
      const user = new User({
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role
      });
      await user.save();
      createdUsers.push(user);
      console.log(`Created user ${user.email} (${user.role})`);
    }

    // Map owners: use alice as owner for property 0, manager for property 1
    const alice = createdUsers.find(x => x.email === 'alice@example.com') || createdUsers[2];
    const manager = createdUsers.find(x => x.role === 'manager') || createdUsers[1];

    // Create properties
    console.log('Creating properties...');
    const createdProps = [];
    for (let i = 0; i < seedData.properties.length; i += 1) {
      const p = seedData.properties[i];
      const owner = i === 0 ? alice : manager;
      const prop = new Property({
        ...p,
        owner: owner._id,
        status: 'published',
        images: [] // no images in seed
      });
      await prop.save();
      createdProps.push(prop);
      console.log(`Created property ${prop.title} (owner: ${owner.email})`);
    }

    // Create a booking: Bob requests visit to first property
    const bob = createdUsers.find(x => x.email === 'bob@example.com') || createdUsers.find(u => u.role === 'user' && u.email !== 'alice@example.com');
    if (bob && createdProps.length) {
      const booking = new Booking({
        property: createdProps[0]._id,
        user: bob._id,
        preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // one week from now
        preferredTime: '10:00 AM',
        message: 'I would like to schedule a visit next week.',
        status: 'pending'
      });
      await booking.save();
      console.log(`Created booking by ${bob.email} for property ${createdProps[0].title}`);
    }

    // Favorites: Alice favorites second property
    if (alice && createdProps[1]) {
      const fav = new Favorite({ property: createdProps[1]._id, user: alice._id });
      await fav.save();
      console.log(`${alice.email} favorited ${createdProps[1].title}`);
    }

    // Messages
    console.log('Creating messages...');
    // message 0: bob -> alice (about first property)
    if (bob && alice && createdProps[0]) {
      const m1 = new Message({
        from: bob._id,
        to: alice._id,
        property: createdProps[0]._id,
        subject: seedData.messages[0].subject,
        content: seedData.messages[0].content
      });
      await m1.save();
      console.log(`Message created from ${bob.email} -> ${alice.email}`);
    }

    // message 1: alice -> manager (non-property)
    const m2 = new Message({
      from: alice._id,
      to: manager._id,
      subject: seedData.messages[1].subject,
      content: seedData.messages[1].content
    });
    await m2.save();
    console.log(`Message created from ${alice.email} -> ${manager.email}`);

    console.log('Seeding complete. Disconnecting...');

    await mongoose.disconnect();
    console.log('Disconnected. You can now run the server (npm run dev) and login with seeded users.');
    console.log('Seeded users:');
    createdUsers.forEach(u => console.log(`- ${u.email} / password: (check env or default)`));
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
