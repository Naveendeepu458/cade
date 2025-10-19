const express = require('express');
const router = express.Router();
const { getTrains } = require('../controllers/trainController');

// @desc    Fetch available trains based on search criteria
// @route   GET /api/trains
// @access  Public
router.get('/', getTrains);

module.exports = router;
