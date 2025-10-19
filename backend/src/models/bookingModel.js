const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
}, { _id: false });

const TrainSchema = new mongoose.Schema({
    trainNumber: { type: String, required: true },
    trainName: { type: String, required: true },
    departureStation: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalStation: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },
    fare: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true },
}, { _id: false });

const BookingSchema = new mongoose.Schema({
    pnr: {
        type: String,
        required: true,
        unique: true,
    },
    train: {
        type: TrainSchema,
        required: true,
    },
    passengers: {
        type: [PassengerSchema],
        required: true,
    },
    dateOfJourney: {
        type: String,
        required: true,
    },
    totalFare: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Booking', BookingSchema);
