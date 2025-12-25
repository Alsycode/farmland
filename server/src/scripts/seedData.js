// path: src/scripts/seedData.js
const SPP_DESCRIPTION_HTML = `
  <div class="section intro-section">
    <h1 class="main-title">🌿 Sai Properties and Projects (SPP)</h1>
    <p class="intro-text">
      ISO 9001:2016 certified company with 18 years of proven excellence in commercial development 
      and specialized Red Sandalwood plantations.
    </p>
  </div>

  <div class="section">
    <h2 class="section-title">Our Expertise & Scale</h2>
    <div class="divider"></div>
    <ul class="stats-grid">
      <li><strong>Total Experience:</strong> 18 years in commercial development, 8 years in Red Sandalwood</li>
      <li><strong>Completed Ventures:</strong> 53 projects successfully delivered</li>
      <li><strong>Total Acreage:</strong> 4,421+ acres developed</li>
      <li><strong>Customer Base:</strong> 13,500+ satisfied customers</li>
      <li><strong>Plantation Volume:</strong> 16 lakh+ Red Sandalwood saplings planted</li>
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">🌳 The Red Sandalwood Advantage</h2>
    <div class="divider"></div>
    <ul class="feature-list">
      <li><strong>Organic Farming:</strong> 100% organic methods to protect land fertility</li>
      <li><strong>Prime Location:</strong> Red soils surrounded by Seshachalam & Nalamalla forest ranges</li>
      <li><strong>Venture Districts:</strong> Prakasam, Nellore, Kadapa, Ananthapur</li>
      <li><strong>Land Authenticity:</strong> 100% normal lands with 100+ years ownership history</li>
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">💰 Investment Details & Returns</h2>
    <div class="divider"></div>
    
    <div class="pricing-table-container">
      <table class="pricing-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Pricing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One Acre</td>
            <td>₹34 Lakhs</td>
          </tr>
          <tr>
            <td>Five Acres</td>
            <td>₹1.7 Crore</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="subsection-title">Return Projections</h3>
    <ul class="feature-list">
      <li><strong>10-Year Return:</strong> Up to ₹12 Crores per acre</li>
      <li><strong>5-Year Resale:</strong> 3× original investment</li>
    </ul>
  </div>

  <div class="section">
    <h2 class="section-title">📄 Ownership & Documentation</h2>
    <div class="divider"></div>
    <ul class="docs-list">
      <li>✓ Original land documents</li>
      <li>✓ Lease agreement with SPP</li>
      <li>✓ 100-year ownership document trail</li>
    </ul>
  </div>

  <div class="section">
    <h3 class="subsection-title">Profit Sharing Model</h3>
    <div class="divider small"></div>
    <div class="profit-sharing">
      <div class="profit-item">
        <span class="profit-label">Owner:</span>
        <span class="profit-value">60%</span>
      </div>
      <div class="profit-item">
        <span class="profit-label">Company:</span>
        <span class="profit-value">40%</span>
      </div>
    </div>
  </div>

  <div class="section">
    <h3 class="subsection-title">Future Vision</h3>
    <div class="divider small"></div>
    <p class="vision-text">
      Establishing Red Sandalwood processing factory in Nandyala and producing high-value 
      byproducts like premium oil extracts.
    </p>
  </div>
`;

module.exports = {
  users: [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: process.env.SEED_ADMIN_PASSWORD || 's',
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
    title: "Sunny River Farm",
    slug: "sunny-river-farm-mandya",

    description: SPP_DESCRIPTION_HTML,

    price: 8500000,
    area: 2.5,
    unit: "acre",

    address: "Green Valley, Mandya District, Karnataka",
    location: {
      type: "Point",
      coordinates: [76.894684, 12.523731]
    },

    listingType: ["featured", "trending"],
    tags: ["irrigated", "organic"],
    amenities: ["water", "electricity", "road", "fencing"],

    seoTitle: "2.5 Acre Farmland for Sale in Mandya | Sunny River Farm",
    seoDescription:
      "Buy 2.5 acre agricultural farmland in Mandya with water, road access and clear documents. Ideal for organic farming and investment.",

    highlights: [
      "Clear title & ownership documents",
      "Motorable road access",
      "Reliable year-round water source",
      "Ideal for organic farming & investment"
    ],

    nearby: [
      { label: "Mandya Town", distance: "8 km" },
      { label: "NH-275", distance: "3 km" }
    ],

    legal: {
      landType: "Agricultural",
      documentsClear: true,
      ownershipHistoryYears: 100
    },

    idealFor: ["Farmland Investment", "Organic Farming"],

    status: "published",

    images: [
      {
        url: "/Farmland-Ownership.jpg",
        filename: "Farmland-Ownership.jpg",
        alt: "Sunny River Farm agricultural land in Mandya"
      }
    ]
  },

  {
    title: "Green Horizon Estate",
    slug: "green-horizon-estate-chikkaballapur",

    description:
      "Spacious agricultural land with fertile soil and fenced boundaries.",

    price: 12500000,
    area: 4,
    unit: "acre",

    address: "Hillview Panchayat, Chikkaballapur",
    location: {
      type: "Point",
      coordinates: [77.730401, 13.42608]
    },

    listingType: ["featured"],
    tags: ["fertile-soil"],
    amenities: ["water", "electricity", "road", "fencing"],

    seoTitle: "4 Acre Agricultural Land for Sale in Chikkaballapur",
    seoDescription:
      "Buy 4 acre fertile agricultural land in Chikkaballapur with fencing, water and road access. Suitable for farming and long-term investment.",

    highlights: [
      "Highly fertile soil",
      "Fully fenced boundaries",
      "Electricity available",
      "Easy road connectivity"
    ],

    nearby: [
      { label: "Chikkaballapur Town", distance: "6 km" }
    ],

    legal: {
      landType: "Agricultural",
      documentsClear: true
    },

    idealFor: ["Farming", "Investment"],

    status: "published",

    images: [
      {
        url: "/Farmland-Ownership.jpg",
        alt: "Green Horizon Estate farmland in Chikkaballapur"
      }
    ]
  },

  {
    title: "Hillside Orchard",
    slug: "hillside-orchard-ananthapur",

    description:
      "Established orchard land with natural slope and internal fencing.",

    price: 12000000,
    area: 3.2,
    unit: "acre",

    address: "Hillside Estate, Ananthapur",
    location: {
      type: "Point",
      coordinates: [77.595406, 14.685564]
    },

    listingType: ["trending"],
    tags: ["orchard"],
    amenities: ["water", "fencing"],

    seoTitle: "3.2 Acre Orchard Land for Sale in Ananthapur",
    seoDescription:
      "Purchase 3.2 acre orchard land in Ananthapur with fencing and water access. Ideal for plantation and orchard development.",

    highlights: [
      "Established orchard land",
      "Natural slope drainage",
      "Fenced property",
      "Peaceful surroundings"
    ],

    legal: {
      landType: "Agricultural",
      documentsClear: true
    },

    idealFor: ["Orchard Farming", "Plantation"],

    status: "published",

    images: [
      {
        url: "/Farmland-Ownership.jpg",
        alt: "Hillside orchard farmland in Ananthapur"
      }
    ]
  },

  {
    title: "Palm Grove Retreat",
    slug: "palm-grove-retreat-udupi",

    description:
      "Coconut plantation with internal roads and electricity.",

    price: 9800000,
    area: 3,
    unit: "acre",

    address: "Coastal Belt Road, Udupi",
    location: {
      type: "Point",
      coordinates: [74.742142, 13.340881]
    },

    listingType: ["featured", "upcoming"],
    tags: ["coconut"],
    amenities: ["water", "electricity", "road"],

    seoTitle: "3 Acre Coconut Plantation for Sale in Udupi",
    seoDescription:
      "Buy 3 acre coconut plantation in Udupi with internal roads, electricity and water supply. Ideal for plantation farming.",

    highlights: [
      "Established coconut plantation",
      "Internal road network",
      "Electricity connection",
      "Coastal climate advantage"
    ],

    legal: {
      landType: "Agricultural",
      documentsClear: true
    },

    idealFor: ["Plantation Farming", "Investment"],

    status: "published",

    images: [
      {
        url: "/Farmland-Ownership.jpg",
        alt: "Palm Grove Retreat coconut plantation in Udupi"
      }
    ]
  },

  {
    title: "Meadow View Acres",
    slug: "meadow-view-acres-hassan",

    description:
      "Open farmland ideal for organic vegetables and dairy.",

    price: 7200000,
    area: 2,
    unit: "acre",

    address: "Meadow Layout, Hassan",
    location: {
      type: "Point",
      coordinates: [76.102898, 13.009711]
    },

    listingType: ["upcoming"],
    tags: ["organic"],
    amenities: ["water", "road"],

    seoTitle: "2 Acre Organic Farmland for Sale in Hassan",
    seoDescription:
      "Buy 2 acre organic farmland in Hassan suitable for vegetables and dairy farming with water and road access.",

    highlights: [
      "Ideal for organic farming",
      "Open and level land",
      "Good water availability",
      "Easy road access"
    ],

    legal: {
      landType: "Agricultural",
      documentsClear: true
    },

    idealFor: ["Organic Farming", "Dairy Farming"],

    status: "published",

    images: [
      {
        url: "/Farmland-Ownership.jpg",
        alt: "Meadow View Acres organic farmland in Hassan"
      }
    ]
  },

  {
    title: "Forest Edge Plantation",
    slug: "forest-edge-plantation-kadapa",

    description:
      "Plantation land bordering reserve forest with natural water flow.",

    price: 14500000,
    area: 5,
    unit: "acre",

    address: "Forest Border Zone, Kadapa",
    location: {
      type: "Point",
      coordinates: [78.822, 14.475]
    },

    listingType: ["featured", "trending"],
    tags: ["plantation"],
    amenities: ["water", "fencing"],

    seoTitle: "5 Acre Plantation Land for Sale in Kadapa",
    seoDescription:
      "Premium 5 acre plantation land in Kadapa near forest border with natural water flow and fencing.",

    highlights: [
      "Bordering reserve forest",
      "Natural water flow",
      "Large continuous land parcel",
      "High appreciation potential"
    ],

    legal: {
      landType: "Agricultural",
      documentsClear: true
    },

    idealFor: ["Plantation", "Long-Term Investment"],

    status: "published",

    images: [
      {
        url: "/Farmland-Ownership.jpg",
        alt: "Forest Edge plantation land in Kadapa"
      }
    ]
  },

  {
    title: "Village Core Farmland",
    slug: "village-core-farmland-ramanagara",

    description:
      "Accessible farmland located within village limits.",

    price: 6800000,
    area: 1.8,
    unit: "acre",

    address: "Main Village Street, Ramanagara",
    location: {
      type: "Point",
      coordinates: [77.28176, 12.72031]
    },

    listingType: ["trending", "upcoming"],
    tags: ["village"],
    amenities: ["water", "electricity", "road"],

    seoTitle: "1.8 Acre Farmland for Sale in Ramanagara Village",
    seoDescription:
      "Buy 1.8 acre farmland in Ramanagara village with electricity, water and road access. Close to habitation.",

    highlights: [
      "Located within village limits",
      "Electricity available",
      "Motorable road access",
      "Easy daily maintenance"
    ],

    legal: {
      landType: "Agricultural",
      documentsClear: true
    },

    idealFor: ["Small Farming", "Weekend Farm"],

    status: "published",

    images: [
      {
        url: "/Farmland-Ownership.jpg",
        alt: "Village core farmland in Ramanagara"
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
  ],

  /* ====================== BLOGS (UPDATED) ====================== */

  blogs: [
    {
  title: 'Beginner’s Guide to Farmland Ownership',

  category: 'Farmland',

  excerpt:
    'Learn the fundamentals of buying and owning farmland in India, from due diligence to long-term value creation.',

  readingTime: '6 Min Read',

  content: `
    <h1>🌿 Sai Properties and Projects (SPP) Overview</h1>

    <p>
      Sai Properties and Projects (SPP) is an ISO 9001:2016 certified company with a proven track record
      in commercial development and a specialized focus on Red Sandalwood plantations.
    </p>

    <h2>Our Expertise & Scale</h2>

    <ul>
      <li><strong>Total Experience:</strong> 18 years in commercial development, with 8 dedicated years in Red Sandalwood cultivation.</li>
      <li><strong>Completed Ventures:</strong> 53 projects successfully completed.</li>
      <li><strong>Total Acreage:</strong> Over 4,421 acres developed.</li>
      <li><strong>Customer Base:</strong> Serving more than 13,500 satisfied customers.</li>
      <li><strong>Plantation Volume:</strong> Over 16 lakh (1.6 million) Red Sandalwood saplings planted across all ventures.</li>
    </ul>

    <h2>🌳 The Red Sandalwood Advantage</h2>

    <p>
      We are fully committed to providing sustainable, excellent, and expert Red Sandalwood plantation
      cultivation through organic farming methods.
    </p>

    <ul>
      <li>
        <strong>Commitment to Organic:</strong>
        We exclusively use organic farming to protect the land, recognizing that this investment
        provides excellent returns as other traditional farmlands are degraded by fertilizer use.
      </li>
      <li>
        <strong>Prime Location:</strong>
        Most of our ventures are situated on red soils surrounded by the rich hilly ranges of the
        Seshachalam and Nalamalla forests.
      </li>
      <li>
        <strong>Venture Districts:</strong>
        Our locations primarily cover Prakasam, Nellore, Kadapa, and Ananthapur districts—areas known
        to produce A or B quality Red Sandalwood output.
      </li>
      <li>
        <strong>Land Authenticity:</strong>
        All lands used for our projects are 100% normal lands exchanged from farmers, with documented
        ownership history spanning hundreds of years.
      </li>
    </ul>

    <h2>💰 Investment Details & Returns</h2>

    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <thead>
        <tr>
          <th style="border:1px solid #ccc;padding:8px;text-align:left;">Product</th>
          <th style="border:1px solid #ccc;padding:8px;text-align:left;">Pricing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border:1px solid #ccc;padding:8px;">One Acre</td>
          <td style="border:1px solid #ccc;padding:8px;">₹34 Lakhs</td>
        </tr>
        <tr>
          <td style="border:1px solid #ccc;padding:8px;">Five Acres</td>
          <td style="border:1px solid #ccc;padding:8px;">₹1.7 Crore</td>
        </tr>
      </tbody>
    </table>

    <h3>Return & Resale Projections</h3>

    <ul>
      <li>
        <strong>Expected Return (10 Years):</strong>
        A single acre of Red Sandalwood planted land is projected to yield returns of up to ₹12 Crores
        after 10 years.
      </li>
      <li>
        <strong>Resale Option (5 Years):</strong>
        Option to resell the land after 5 years for three times the original purchase price.
      </li>
    </ul>

    <h2>📄 Ownership, Partnership, and Future Plans</h2>

    <h3>Documentation and Ownership</h3>

    <p>Upon 100% payment, the company will provide:</p>

    <ul>
      <li>Original Land Ownership Documents in your name</li>
      <li>Lease Agreement between you and SPP</li>
      <li>Xerox copies of historical land documents tracing ownership over the last 100 years</li>
    </ul>

    <h3>Profit Sharing Model</h3>

    <p>
      SPP manages the land through a Lease Agreement with the owner, operating on a profit-sharing
      basis from the harvest:
    </p>

    <ul>
      <li><strong>Owner's Share:</strong> 60%</li>
      <li><strong>Company's Share:</strong> 40%</li>
    </ul>

    <p>
      <strong>Note:</strong> The company charges no additional amount beyond the prescribed price for
      the total 10 years of maintenance included in the investment.
    </p>

    <h3>Vision and Current Progress</h3>

    <ul>
      <li>
        <strong>Future Goal:</strong>
        Establishing a factory in Nandyala town to create high-value byproducts such as Red Sandalwood oil.
      </li>
      <li>
        <strong>Current Tree Growth:</strong>
        Ventures started in 2017 currently feature trees weighing more than 500 kg. Previous venture
        locations are available for viewing to demonstrate long-term maintenance practices.
      </li>
    </ul>
  `,

  featuredImage: '/Farmland-Ownership.jpg',

  tags: ['farmland', 'ownership', 'beginners', 'investment'],

  author: 'Farmland Team',

  published: true,

  publishedAt: new Date('2024-01-15T10:00:00Z'),

  seoTitle: 'Beginner’s Guide to Farmland Ownership',

  seoDescription:
    'Learn how to buy farmland safely, including due diligence, legal checks, and long-term planning.'
}
,

    {
      title: 'How Managed Farmland Projects Work',

      category: 'Investment',

      excerpt:
        'Managed farmlands allow city buyers to own agricultural land without handling daily operations.',

      readingTime: '5 Min Read',

      content: `
        <p>
          Managed farmland projects are designed for investors who want the
          benefits of land ownership without the burden of daily farming
          operations.
        </p>

        <h2>What Is Managed Farmland?</h2>

        <p>
          In a managed farmland model, you own a specific plot of land while a
          professional team handles farming, irrigation, staffing, and
          compliance.
        </p>

        <blockquote>
          <p>
            “The best investments are those that run quietly in the background.”
          </p>
        </blockquote>

        <h3>Benefits of Managed Farmland</h3>

        <ul>
          <li>Hands-off ownership</li>
          <li>Professional farm management</li>
          <li>Transparent reporting</li>
          <li>Long-term appreciation</li>
        </ul>

        <img
          src="/Farmland-Ownership.jpg"
          alt="Managed farmland"
          style="width:100%;border-radius:16px;margin:24px 0;"
        />

        <p>
          This model works well for urban professionals who want exposure to
          farmland without lifestyle disruption.
        </p>
      `,

      featuredImage: '/Farmland-Ownership.jpg',

      tags: ['managed farmland', 'passive income', 'investment'],

      author: 'Farmland Team',

      published: true,

      publishedAt: new Date('2024-02-01T09:30:00Z'),

      seoTitle: 'How Managed Farmland Projects Work',

      seoDescription:
        'Understand the managed farmland ownership model, benefits, and risks.'
    },

    {
      title: 'Checklist Before Visiting a Farmland Site',

      category: 'Due Diligence',

      excerpt:
        'Use this practical checklist before and during your farmland site visit to avoid costly mistakes.',

      readingTime: '4 Min Read',

      content: `
        <p>
          A farmland site visit is your best opportunity to verify claims made
          in brochures and presentations.
        </p>

        <h2>Before You Visit</h2>

        <ul>
          <li>Review land documents in advance</li>
          <li>Confirm exact plot boundaries</li>
          <li>Check approach roads on maps</li>
        </ul>

        <h2>During the Visit</h2>

        <ul>
          <li>Inspect soil and water sources</li>
          <li>Verify electricity and fencing</li>
          <li>Speak with nearby landowners</li>
        </ul>

        <blockquote>
          <p>
            “Seeing the land in person reveals truths no brochure ever will.”
          </p>
        </blockquote>

        <img
          src="/Farmland-Ownership.jpg"
          alt="Farmland site visit"
          style="width:100%;border-radius:16px;margin:24px 0;"
        />

        <p>
          Document everything with photos and videos so you can make a calm,
          informed decision later.
        </p>
      `,

      featuredImage: '/Farmland-Ownership.jpg',

      tags: ['site visit', 'checklist', 'due diligence'],

      author: 'Farmland Team',

      published: true,

      publishedAt: new Date('2024-03-10T12:00:00Z'),

      seoTitle: 'Farmland Site Visit Checklist',

      seoDescription:
        'A complete farmland site visit checklist covering access, utilities, soil, and documentation.'
    }
  ]
};
