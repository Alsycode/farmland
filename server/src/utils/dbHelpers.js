// path: src/utils/dbHelpers.js
const mongoose = require('mongoose');

/**
 * Helper to drop collections safely (if they exist).
 * Use only in development / test!
 */
async function dropCollectionsIfExist(collectionNames = []) {
  for (const name of collectionNames) {
    try {
      if (mongoose.connection.collections[name]) {
        // eslint-disable-next-line no-console
        console.log(`Dropping collection: ${name}`);
        // Use drop if exists
        await mongoose.connection.collections[name].drop();
      }
    } catch (err) {
      // ignore "ns not found" errors and others
      // eslint-disable-next-line no-console
      console.warn(`Could not drop collection ${name}: ${err.message}`);
    }
  }
}

module.exports = { dropCollectionsIfExist };
