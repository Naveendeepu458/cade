const express = require('express');
const router = express.Router();
const { getBookings, createBooking } = require('../controllers/bookingController');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
router.get('/', getBookings);

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
router.post('/', createBooking);

module.exports = router;
