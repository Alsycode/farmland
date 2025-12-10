
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const spec = YAML.load(path.join(__dirname, '..', '..', 'docs', 'openapi.yaml'));

router.use('/', swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));

module.exports = router;
