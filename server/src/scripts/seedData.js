// path: src/scripts/seedData.js
/**
 * Sample seed data used by src/scripts/seed.js
 * - Passwords in this file are plaintext for development only.
 * - In production never seed with known credentials.
 *
 * You can modify these samples before running the seed script.
 */

module.exports = {
  users: [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: process.env.SEED_ADMIN_PASSWORD || 'AdminPass123!',
      role: 'admin'
    },
    {
      name: 'Manager User',
      email: 'manager@example.com',
      password: process.env.SEED_MANAGER_PASSWORD || 'ManagerPass123!',
      role: 'manager'
    },
    {
      name: 'Alice Farmer',
      email: 'alice@example.com',
      password: process.env.SEED_USER_PASSWORD || 'UserPass123!',
      role: 'user'
    },
    {
      name: 'Bob Buyer',
      email: 'bob@example.com',
      password: process.env.SEED_USER_PASSWORD || 'UserPass123!',
      role: 'user'
    }
  ],

  properties: [
    {
      title: 'Sunny River Farm',
      description: 'Fertile farmland beside a seasonal river. Includes irrigation and access road.',
      price: 8500000,
      area: 2.5,
      unit: 'acre',
      address: 'Plot 12, Green Valley',
      tags: ['irrigated', 'organic'],
      amenities: ['water', 'electricity', 'road']
      // owner will be assigned after users are created
    },
    {
      title: 'Hillside Orchard',
      description: 'Sloping orchard with established fruit trees and small farmhouse.',
      price: 12000000,
      area: 3.2,
      unit: 'acre',
      address: 'Hillside Estate, Sector 7',
      tags: ['orchard'],
      amenities: ['water', 'fenced']
    }
  ],

  bookings: [
    // bookings will be associated after properties and users exist
  ],

  favorites: [
    // will be created after properties and users exist
  ],

  messages: [
    // sample messages
    {
      subject: 'Inquiry about availability',
      content: 'Is the Sunny River Farm available for immediate purchase?'
    },
    {
      subject: 'Request visit',
      content: 'I want to schedule a site visit next week morning.'
    }
  ]
};
