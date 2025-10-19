const Booking = require('../models/bookingModel');

/**
 * @desc    Get all bookings
 * @route   GET /api/bookings
 * @access  Public
 */
const getBookings = async (req, res) => {
    try {
        // Find all bookings and sort by creation date descending
        const bookings = await Booking.find({}).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Failed to retrieve bookings." });
    }
};

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Public
 */
const createBooking = async (req, res) => {
    const { train, passengers, dateOfJourney, totalFare } = req.body;

    if (!train || !passengers || !dateOfJourney || !totalFare) {
        return res.status(400).json({ message: 'Please provide all required booking details.' });
    }

    try {
        // Generate a new PNR. In a real app, this should be a more robust unique ID.
        const pnr = `RP${Date.now()}`.slice(0, 10);

        const newBooking = new Booking({
            pnr,
            train,
            passengers,
            dateOfJourney,
            totalFare,
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Failed to create booking." });
    }
};

module.exports = { getBookings, createBooking };
