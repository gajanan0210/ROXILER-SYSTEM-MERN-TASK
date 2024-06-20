// server/routes/seedRoutes.js
const express = require('express');
const { seedDatabase } = require('../controllers/seedController');
const router = express.Router();

router.route('/').get(seedDatabase);

module.exports = router;
