// path: src/scripts/seedData.js
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
      amenities: ['water', 'electricity', 'road'],
      images: [
        {
          url: '/Farmland-Ownership.jpg',
          filename: 'Farmland-Ownership.jpg'
        },
        {
          url: '/Farmland-Ownership.jpg',
          filename: 'Agriculture-Land-Farmland-Market-Page.jpg'
        },
        {
          url: '/Farmland-Ownership.jpg',
          filename: 'thecabin@greensleeves.webp'
        }
      ]
    },
    {
      title: 'Hillside Orchard',
      description: 'Sloping orchard with established fruit trees and small farmhouse.',
      price: 12000000,
      area: 3.2,
      unit: 'acre',
      address: 'Hillside Estate, Sector 7',
      tags: ['orchard'],
      amenities: ['water', 'fenced'],
      images: [
        {
          url: '/Farmland-Ownership.jpg',
          filename: 'Agriculture-Land-Farmland-Market-Page.jpg'
        },
        {
          url: '/Farmland-Ownership.jpg',
          filename: 'lodge_exterior_12.webp'
        }
      ]
    }
  ],

  bookings: [],
  favorites: [],
  messages: [
    {
      subject: 'Inquiry about availability',
      content: 'Is the Sunny River Farm available for immediate purchase?'
    },
    {
      subject: 'Request visit',
      content: 'I want to schedule a site visit next week morning.'
    }
  ]
,
blogs: [
    {
      title: 'Beginner’s Guide to Farmland Ownership',
      excerpt:
        'Learn the basics of buying and owning farmland in India, from due diligence to long‑term value.',
      content:
        'Farmland ownership can be a powerful long‑term asset class when approached with the right research and structure. In this guide, we walk through how to evaluate location, soil quality, water access, legal documentation, and management models so you can make confident decisions as a first‑time buyer.',
      featuredImage: '/Farmland-Ownership.jpg',
      tags: ['farmland basics', 'ownership', 'beginners'],
      author: 'Farmland Team',
      published: true,
      publishedAt: new Date('2024-01-15T10:00:00Z'),
      seoTitle: 'Beginner’s Guide to Farmland Ownership',
      seoDescription:
        'Understand how to buy and own farmland safely, including legal checks, location analysis, and management options.'
    },
    {
      title: 'How Managed Farmland Projects Work',
      excerpt:
        'Managed farmlands offer city buyers a hands‑off way to own agricultural land with professional operations.',
      content:
        'Managed farmland projects bundle together land acquisition, development, and long‑term operations under a single professional team. Buyers typically own individual plots while day‑to‑day farming, irrigation, staffing, and compliance are handled by the operator, making the experience similar to owning a serviced holiday home.',
      featuredImage: '/Farmland-Ownership.jpg',
      tags: ['managed farmland', 'investing', 'passive ownership'],
      author: 'Farmland Team',
      published: true,
      publishedAt: new Date('2024-02-01T09:30:00Z'),
      seoTitle: 'What Are Managed Farmland Projects?',
      seoDescription:
        'Explore how managed farmland projects work, including ownership models, returns, and typical amenities.'
    },
    {
      title: 'Checklist Before Visiting a Farmland Site',
      excerpt:
        'A practical checklist you can use before and during your farmland site visit to avoid surprises later.',
      content:
        'Before visiting a farmland project, prepare a clear checklist that covers access roads, water sources, nearby developments, soil quality, fencing, power, and on‑ground amenities. During the visit, verify all claims from the brochure, speak with on‑site staff, and take photos, videos, and GPS locations to review later with your legal and financial advisors.',
      featuredImage: '/Farmland-Ownership.jpg',
      tags: ['site visit', 'checklist', 'due diligence'],
      author: 'Farmland Team',
      published: true,
      publishedAt: new Date('2024-03-10T12:00:00Z'),
      seoTitle: 'Farmland Site Visit Checklist',
      seoDescription:
        'Use this farmland site visit checklist to verify access, utilities, documentation, and on‑ground reality before you decide.'
    }
  ],
};