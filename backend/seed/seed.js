// backend/seed/seed.js
/**
 * Purpose: Expanded seed script to create Admin user + sample listings + sample data.
 * Usage: node seed/seed.js
 *
 * NOTE: This script expects models to be present (PART 2) and a running MongoDB.
 * It will create:
 *  - admin user (email: admin@example.com, password: Admin@1234) if not exists
 *  - 3 sample users and 5 sample listings with geo coords
 *
 * TODO: Extend with bookings, messages, analytics events per SRS.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../src/models/User');
const Listing = require('../src/models/Listing');
const Booking = require('../src/models/Booking');
const Favorite = require('../src/models/Favorite');
const Message = require('../src/models/Message');
const AdminAnalytics = require('../src/models/AdminAnalytics');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/farmland_dev';

async function createAdmin() {
  const email = 'admin@example.com';
  let admin = await User.findOne({ email });
  if (admin) {
    console.log('Admin user already exists');
    return admin;
  }

  const password = 'Admin@1234';
  const passwordHash = bcrypt.hashSync(password, 10);

  admin = new User({
    name: 'System Admin',
    email,
    passwordHash,
    role: 'admin'
  });

  await admin.save();
  console.log('Created admin user:', email, 'password:', password);
  return admin;
}

async function createSampleUsers() {
  const users = [];
  const sample = [
    { name: 'Alice Farmer', email: 'alice@example.com' },
    { name: 'Bob Tenant', email: 'bob@example.com' },
    { name: 'Carol Agent', email: 'carol@example.com' }
  ];
  for (const u of sample) {
    let user = await User.findOne({ email: u.email });
    if (!user) {
      user = new User({
        name: u.name,
        email: u.email,
        passwordHash: bcrypt.hashSync('Password123!', 10),
        role: 'user'
      });
      await user.save();
      console.log('Created user', u.email);
    }
    users.push(user);
  }
  return users;
}

function sampleGeo(lng, lat) {
  return { type: 'Point', coordinates: [lng, lat] };
}

async function createSampleListings(users) {
  const owner = users[0];
  const existing = await Listing.countDocuments();
  if (existing >= 5) {
    console.log('Sample listings appear to already exist.');
    return;
  }

  const samples = [
    {
      title: 'Sunny Acre Farm',
      slug: 'sunny-acre-farm',
      description: 'A lovely sunny acre with rich soil and easy road access.',
      owner: owner._id,
      pricePerAcre: 25000,
      area: 2.5,
      address: 'Near Riverbend, Village X',
      location: sampleGeo(77.5946, 12.9716), // Bangalore-ish coords as placeholder
      images: [],
      amenities: ['irrigation', 'road access'],
      status: 'published',
      isAvailable: true
    },
    {
      title: 'Green Valley Plot',
      slug: 'green-valley-plot',
      description: 'Fertile valley land suitable for horticulture.',
      owner: owner._id,
      pricePerAcre: 18000,
      area: 5,
      address: 'Green Valley, District Y',
      location: sampleGeo(77.6, 12.95),
      images: [],
      amenities: ['well', 'electricity'],
      status: 'published'
    },
    {
      title: 'Hillside Terraces',
      slug: 'hillside-terraces',
      description: 'Terraced plots with great drainage and views.',
      owner: owner._id,
      pricePerAcre: 30000,
      area: 1.2,
      address: 'Hillside Area',
      location: sampleGeo(77.62, 12.98),
      images: [],
      amenities: ['access road'],
      status: 'published'
    }
  ];

  for (const s of samples) {
    const exists = await Listing.findOne({ slug: s.slug });
    if (exists) {
      console.log('Listing exists:', s.slug);
      continue;
    }
    const l = new Listing(s);
    await l.save();
    console.log('Created listing', s.slug);
  }
}

async function createAnalytics() {
  const a = new AdminAnalytics({ key: 'seed_run', value: 1, meta: { by: 'seed' } });
  await a.save();
  console.log('Created analytics seed event');
}

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to Mongo for seeding (', MONGO_URI, ')');

  try {
    const admin = await createAdmin();
    const users = await createSampleUsers();
    await createSampleListings(users);
    await createAnalytics();
    console.log('Seed complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

run();
