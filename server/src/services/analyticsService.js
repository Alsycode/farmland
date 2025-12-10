// path: src/services/analyticsService.js
const mongoose = require('mongoose');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const Favorite = require('../models/Favorite');
const User = require('../models/User');

/**
 * Returns an overview of key counts and recent trends.
 */
async function getOverview() {
  const totalProperties = await Property.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalFavorites = await Favorite.countDocuments();

  // Recent activity: properties created in last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentProperties = await Property.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
  const recentBookings = await Booking.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

  return {
    totalProperties,
    totalBookings,
    totalUsers,
    totalFavorites,
    recentProperties,
    recentBookings
  };
}

/**
 * Top viewed properties.
 * Returns array of { propertyId, title, views, owner }
 */
async function getTopViewedProperties(limit = 10) {
  const pipeline = [
    { $sort: { views: -1 } },
    { $limit: Number(limit || 10) },
    {
      $project: {
        propertyId: '$_id',
        title: '$title',
        views: '$views',
        owner: '$owner'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner'
      }
    },
    { $unwind: { path: '$owner', preserveNullAndEmptyArrays: true } },
    { $project: { propertyId: 1, title: 1, views: 1, owner: { _id: '$owner._id', name: '$owner.name', email: '$owner.email' } } }
  ];

  const result = await Property.aggregate(pipeline).exec();
  return result;
}

/**
 * Bookings per property (top N)
 * Returns array of { propertyId, title, count }
 */
async function getBookingsPerProperty(limit = 10) {
  const pipeline = [
    { $group: { _id: '$property', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: Number(limit || 10) },
    {
      $lookup: {
        from: 'properties',
        localField: '_id',
        foreignField: '_id',
        as: 'property'
      }
    },
    { $unwind: { path: '$property', preserveNullAndEmptyArrays: true } },
    { $project: { propertyId: '$_id', count: 1, title: '$property.title' } }
  ];

  const result = await Booking.aggregate(pipeline).exec();
  return result;
}

/**
 * Simple revenue calculation between date range using Booking.priceOffered
 * Fallback: if priceOffered not present, use property's listed price for confirmed bookings.
 * Query params: from (ISO date), to (ISO date)
 */
async function calculateRevenue({ from, to } = {}) {
  const match = { status: 'confirmed' };
  if (from) match.createdAt = { ...(match.createdAt || {}), $gte: new Date(from) };
  if (to) match.createdAt = { ...(match.createdAt || {}), $lte: new Date(to) };

  const pipeline = [
    { $match: match },
    {
      $lookup: {
        from: 'properties',
        localField: 'property',
        foreignField: '_id',
        as: 'property'
      }
    },
    { $unwind: { path: '$property', preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        effectivePrice: {
          $cond: [
            { $ifNull: ['$priceOffered', false] },
            '$priceOffered',
            '$property.price'
          ]
        }
      }
    },
    {
      $group: {
        _id: null,
        revenue: { $sum: { $ifNull: ['$effectivePrice', 0] } },
        bookingsCount: { $sum: 1 }
      }
    }
  ];

  const agg = await Booking.aggregate(pipeline).exec();
  const summary = agg[0] || { revenue: 0, bookingsCount: 0 };
  return { revenue: summary.revenue || 0, bookingsCount: summary.bookingsCount || 0 };
}

module.exports = {
  getOverview,
  getTopViewedProperties,
  getBookingsPerProperty,
  calculateRevenue
};
