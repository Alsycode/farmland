// path: src/routes/docsRoutes.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const swaggerDocument = require('../docs/swagger.json');

const router = express.Router();

// Serve Swagger UI at /api/docs
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

// Raw JSON at /api/docs/json
router.get('/json', (req, res) => {
  res.json(swaggerDocument);
});

module.exports = router;
